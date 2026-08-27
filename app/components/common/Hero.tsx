"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";

import { ExploreSolutionsButton, StartProjectButton } from "./buttons";
import LightTunnel from "./LightTunnel";
import MoltenMetal from "./MoltenMetal";

const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 1, 1];
  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ];
};

const FAN_MODE = { center: 0, left: 1, right: 2 } as const;

const webThreadsVertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const webThreadsFragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uSpeed;
uniform float uThreadCount;
uniform float uFrequency;
uniform float uSpread;
uniform float uTaper;
uniform float uPosition;
uniform float uFanMode;
uniform float uGlow;
uniform float uFalloff;
uniform float uThickness;
uniform float uBrightness;
uniform float uOpacity;
uniform float uMirror;
uniform float uShimmer;
uniform float uGrain;
uniform float uGrainIntensity;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec2 uMouse;
uniform float uMouseStrength;
uniform float uEnableMouse;
uniform float uMouseActive;
out vec4 fragColor;

#define TAU 6.28318530718
#define MAX_THREADS 10

float glow(float x, float str, float dist) {
  return dist / pow(max(x, 1e-4), str);
}

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  float n = max(uThreadCount, 1.0);

  float pinchX = uFanMode < 0.5 ? 0.5 : (uFanMode < 1.5 ? 0.0 : 1.0);
  if (uEnableMouse > 0.5) {
    pinchX = mix(pinchX, uMouse.x, clamp(uMouseStrength, 0.0, 1.0) * uMouseActive);
  }

  float spreadDx = uSpread * abs(uv.x - pinchX);
  float baseT = iTime * uSpeed;
  float tauOverN = TAU / n;
  float mirror = uMirror > 0.5 ? sign(pinchX - uv.x) : 1.0;
  bool doShimmer = uShimmer > 0.5;
  float shimmerT = iTime * 1.7;
  float invThickness = 1.0 / max(uThickness, 0.01);
  float xFreq = uv.x * uFrequency;
  float yOff = uv.y - uPosition;
  float ciScale = n > 1.0 ? 1.0 / (n - 1.0) : 0.0;

  vec3 col = vec3(0.0);
  float gsum = 0.0;

  for (int idx = 0; idx < MAX_THREADS; idx++) {
    float i = float(idx);
    if (i >= n) break;

    float amplitude = spreadDx * (1.0 + i * uTaper);
    float shimmer = doShimmer ? sin(shimmerT + i * 1.3) * 0.35 : 0.0;
    float phase = (baseT + i * tauOverN) * mirror + shimmer;

    float sdf = abs(yOff + sin(xFreq + phase) * amplitude) * invThickness;

    float g = glow(sdf, uFalloff, uGlow);
    float ci = i * ciScale;
    vec3 threadCol = mix(uColor1, uColor2, ci);

    col += g * threadCol;
    gsum += g;
  }

  float coreAmt = smoothstep(0.5, 2.2, gsum);
  col = mix(col, uColor3 * gsum, coreAmt * 0.5);

  float bright = uBrightness;
  if (uEnableMouse > 0.5) {
    vec2 md = uv - uMouse;
    float d2 = dot(md, md);
    bright += clamp(uMouseStrength, 0.0, 1.0) * uMouseActive * exp(-d2 * 6.0) * 0.6;
  }
  col *= bright;

  float alpha = clamp(gsum, 0.0, 1.0) * uOpacity;

  vec3 outRgb = col * alpha;

  if (uGrain > 0.5) {
    float gv = (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233)) + iTime) * 43758.5453) - 0.5) * uGrainIntensity;
    outRgb = clamp(outRgb + gv, 0.0, 1.0);
    alpha = clamp(alpha + gv, 0.0, 1.0);
  }

  fragColor = vec4(outRgb, alpha);
}
`;

type WebThreadsContext = {
  renderer: Renderer;
  program: Program;
  mesh: Mesh;
};

const webThreadsCtxMap = new WeakMap<HTMLElement, WebThreadsContext>();

type WebThreadsProps = {
  color1?: string;
  color2?: string;
  color3?: string;
  speed?: number;
  threadCount?: number;
  frequency?: number;
  spread?: number;
  taper?: number;
  position?: number;
  fanMode?: keyof typeof FAN_MODE;
  glow?: number;
  falloff?: number;
  thickness?: number;
  brightness?: number;
  opacity?: number;
  mirror?: boolean;
  shimmer?: boolean;
  grain?: boolean;
  grainIntensity?: number;
  mouseInteraction?: boolean;
  mouseStrength?: number;
  className?: string;
};

function WebThreads({
  color1 = "#3179ab",
  color2 = "#5aa3d4",
  color3 = "#ffffff",
  speed = 0.2,
  threadCount = 6,
  frequency = 5.0,
  spread = 0.18,
  taper = 1.0,
  position = 0.5,
  fanMode = "center",
  glow = 0.02,
  falloff = 0.6,
  thickness = 1.1,
  brightness = 0.6,
  opacity = 1.0,
  mirror = true,
  shimmer = false,
  grain = true,
  grainIntensity = 0.05,
  mouseInteraction = true,
  mouseStrength = 0.3,
  className = "",
}: WebThreadsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ enabled: mouseInteraction, strength: mouseStrength });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      webgl: 2,
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: webThreadsVertex,
      fragment: webThreadsFragment,
      transparent: true,
      depthTest: false,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([1, 1]) },
        uSpeed: { value: 0.2 },
        uThreadCount: { value: 6 },
        uFrequency: { value: 5.0 },
        uSpread: { value: 0.18 },
        uTaper: { value: 1.0 },
        uPosition: { value: 0.5 },
        uFanMode: { value: 0 },
        uGlow: { value: 0.02 },
        uFalloff: { value: 0.6 },
        uThickness: { value: 1.1 },
        uBrightness: { value: 0.6 },
        uOpacity: { value: 1.0 },
        uMirror: { value: 1.0 },
        uShimmer: { value: 0.0 },
        uGrain: { value: 1.0 },
        uGrainIntensity: { value: 0.05 },
        uColor1: { value: new Float32Array([1, 1, 1]) },
        uColor2: { value: new Float32Array([1, 1, 1]) },
        uColor3: { value: new Float32Array([1, 1, 1]) },
        uMouse: { value: new Float32Array([0.5, 0.5]) },
        uMouseStrength: { value: 0.3 },
        uEnableMouse: { value: 1.0 },
        uMouseActive: { value: 0 },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    webThreadsCtxMap.set(container, { renderer, program, mesh });

    const setSize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      renderer.setSize(w, h);
      const res = program.uniforms.iResolution.value as Float32Array;
      res[0] = gl.drawingBufferWidth;
      res[1] = gl.drawingBufferHeight;
      renderer.render({ scene: mesh });
    };

    const ro = new ResizeObserver(setSize);
    ro.observe(container);
    setSize();

    const currentMouse = [0.5, 0.5];
    const targetMouse = [0.5, 0.5];
    let currentActive = 0;
    let targetActive = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (!inside) {
        targetActive = 0;
        return;
      }
      targetMouse[0] = (e.clientX - rect.left) / rect.width;
      targetMouse[1] = 1.0 - (e.clientY - rect.top) / rect.height;
      targetActive = 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    let raf = 0;
    let isVisible = true;
    let isPageVisible = !document.hidden;
    const t0 = performance.now();

    const loop = (t: number) => {
      program.uniforms.iTime.value = (t - t0) * 0.001;
      currentMouse[0] += 0.05 * (targetMouse[0] - currentMouse[0]);
      currentMouse[1] += 0.05 * (targetMouse[1] - currentMouse[1]);
      currentActive += 0.05 * (targetActive - currentActive);
      const mouse = program.uniforms.uMouse.value as Float32Array;
      mouse[0] = currentMouse[0];
      mouse[1] = currentMouse[1];
      program.uniforms.uMouseActive.value = currentActive;
      program.uniforms.uEnableMouse.value = mouseRef.current.enabled ? 1.0 : 0.0;
      program.uniforms.uMouseStrength.value = mouseRef.current.strength;
      renderer.render({ scene: mesh });
      raf = requestAnimationFrame(loop);
    };

    const tryStart = () => {
      if (isVisible && isPageVisible && raf === 0) raf = requestAnimationFrame(loop);
    };
    const tryStop = () => {
      if (raf !== 0) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        isVisible ? tryStart() : tryStop();
      },
      { threshold: 0 },
    );
    io.observe(container);

    const onVisibility = () => {
      isPageVisible = !document.hidden;
      isPageVisible ? tryStart() : tryStop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    tryStart();

    return () => {
      tryStop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("mousemove", onMouseMove);
      webThreadsCtxMap.delete(container);
      try {
        container.removeChild(canvas);
      } catch {
        /* already detached */
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ctx = webThreadsCtxMap.get(container);
    if (!ctx) return;
    const { program } = ctx;
    const u = program.uniforms;

    u.uSpeed.value = speed;
    u.uThreadCount.value = Math.round(threadCount);
    u.uFrequency.value = frequency;
    u.uSpread.value = spread;
    u.uTaper.value = taper;
    u.uPosition.value = position;
    u.uFanMode.value = FAN_MODE[fanMode] ?? 0;
    u.uGlow.value = glow;
    u.uFalloff.value = falloff;
    u.uThickness.value = thickness;
    u.uBrightness.value = brightness;
    u.uOpacity.value = opacity;
    u.uMirror.value = mirror ? 1.0 : 0.0;
    u.uShimmer.value = shimmer ? 1.0 : 0.0;
    u.uGrain.value = grain ? 1.0 : 0.0;
    u.uGrainIntensity.value = grainIntensity;
    const c1 = u.uColor1.value as Float32Array;
    const rgb1 = hexToRgb(color1);
    c1[0] = rgb1[0];
    c1[1] = rgb1[1];
    c1[2] = rgb1[2];
    const c2 = u.uColor2.value as Float32Array;
    const rgb2 = hexToRgb(color2);
    c2[0] = rgb2[0];
    c2[1] = rgb2[1];
    c2[2] = rgb2[2];
    const c3 = u.uColor3.value as Float32Array;
    const rgb3 = hexToRgb(color3);
    c3[0] = rgb3[0];
    c3[1] = rgb3[1];
    c3[2] = rgb3[2];
    u.uMouseStrength.value = mouseStrength;
    u.uEnableMouse.value = mouseInteraction ? 1.0 : 0.0;
    mouseRef.current.enabled = mouseInteraction;
    mouseRef.current.strength = mouseStrength;
  }, [
    color1,
    color2,
    color3,
    speed,
    threadCount,
    frequency,
    spread,
    taper,
    position,
    fanMode,
    glow,
    falloff,
    thickness,
    brightness,
    opacity,
    mirror,
    shimmer,
    grain,
    grainIntensity,
    mouseInteraction,
    mouseStrength,
  ]);

  return <div ref={containerRef} className={`web-threads-container ${className}`.trim()} />;
}

const directionToFloat = (dir: string) =>
  dir === "horizontal" ? 1.0 : dir === "diagonal" ? 2.0 : 0.0;

const scannerVertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const scannerFragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uSpeed;
uniform float uSweepSpeed;
uniform float uSweepWidth;
uniform float uSweepFalloff;
uniform float uScale;
uniform float uFrequency;
uniform float uRipple;
uniform float uBandDensity;
uniform float uLineSharpness;
uniform float uGlow;
uniform float uColorSpread;
uniform float uBrightness;
uniform float uContrast;
uniform float uSoftness;
uniform float uVignette;
uniform float uOpacity;
uniform float uScanline;
uniform float uGrain;
uniform float uGrainIntensity;
uniform float uDirection;
uniform vec2 uMouse;
uniform float uMouseEnabled;
uniform float uMouseRadius;
uniform float uMouseStrength;
uniform float uMouseActive;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
out vec4 fragColor;

const float TAU = 6.2831853;

float signalField(vec2 p, float t) {
  float w = sin(p.x * 1.3 + t * 0.7);
  w += sin(p.y * 1.7 - t * 0.52) * 0.8;
  w += sin((p.x + p.y) * 0.9 + t * 0.91) * 0.6;
  w += sin((p.x - p.y) * 1.53 - t * 0.63) * 0.42;
  return w * 0.35;
}

vec3 palette(float f) {
  f = clamp(f, 0.0, 1.0);
  f = pow(f, uContrast);
  vec3 c = mix(uColor1, uColor2, smoothstep(0.08, 0.6, f));
  return mix(c, uColor3, smoothstep(0.68, 1.0, f));
}

float scanBand(float x, float aa, float sharp) {
  float v = mix(0.5, 0.5 + 0.5 * cos(x * TAU), aa);
  return pow(v, sharp);
}

void main() {
  float aspect = iResolution.x / iResolution.y;
  vec2 uv0 = (gl_FragCoord.xy * 2.0 - iResolution.xy) / iResolution.y;
  vec2 p = uv0 / max(uScale, 0.001);

  float t = iTime * uSpeed;

  float mouseBoost = 0.0;
  if (uMouseEnabled > 0.5) {
    vec2 mUv = vec2((uMouse.x * 2.0 - 1.0) * aspect, uMouse.y * 2.0 - 1.0);
    vec2 md = uv0 - mUv;
    float r = max(uMouseRadius, 0.001);
    mouseBoost = exp(-dot(md, md) / (r * r)) * uMouseStrength * uMouseActive;
  }

  float axis;
  if (uDirection < 0.5) axis = p.y;
  else if (uDirection < 1.5) axis = p.x;
  else axis = (p.x + p.y) * 0.70710678;

  float sig = signalField(p * uFrequency, t);
  float coord = axis + sig * uRipple;

  float phase = coord / max(uSweepWidth, 0.05) - t * uSweepSpeed;
  float sweep = pow(0.5 + 0.5 * cos(phase * TAU), max(uSweepFalloff, 0.1));

  float lc = coord * uBandDensity;
  float aa = 1.0 / (1.0 + uSoftness * fwidth(lc) * 3.0);
  aa = clamp(aa * (1.0 + mouseBoost * 0.6), 0.0, 1.0);

  float bodyBase = clamp(0.5 + 0.5 * sig, 0.0, 1.0);
  float body = bodyBase * bodyBase * uGlow * sweep;

  float sharp = max(uLineSharpness, 0.1);
  float split = uColorSpread * 0.16;
  float fr = clamp(scanBand(lc + split, aa, sharp) * sweep + body, 0.0, 1.0);
  float fg = clamp(scanBand(lc, aa, sharp) * sweep + body, 0.0, 1.0);
  float fb = clamp(scanBand(lc - split, aa, sharp) * sweep + body, 0.0, 1.0);

  vec3 col = vec3(palette(fr).r, palette(fg).g, palette(fb).b);

  float inten = (fr + fg + fb) * 0.3333333 * uBrightness;
  inten *= 1.0 + mouseBoost * 0.9;

  if (uScanline > 0.5) {
    inten *= 1.0 - 0.18 * (0.5 + 0.5 * cos(gl_FragCoord.y * 1.7));
  }

  if (uGrain > 0.5) {
    float g = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233)) + iTime) * 43758.5453);
    inten += (g - 0.5) * uGrainIntensity;
  }

  inten *= clamp(1.0 - uVignette * smoothstep(0.55, 1.65, length(uv0)), 0.0, 1.0);
  inten = clamp(inten, 0.0, 1.0);

  float a = clamp(inten * uOpacity, 0.0, 1.0);
  fragColor = vec4(clamp(col, 0.0, 1.0) * a, a);
}
`;

type ScannerContext = {
  renderer: Renderer;
  program: Program;
  mesh: Mesh;
};

const scannerCtxMap = new WeakMap<HTMLElement, ScannerContext>();

type ScannerProps = {
  color1?: string;
  color2?: string;
  color3?: string;
  speed?: number;
  sweepSpeed?: number;
  sweepWidth?: number;
  sweepFalloff?: number;
  scale?: number;
  frequency?: number;
  ripple?: number;
  bandDensity?: number;
  lineSharpness?: number;
  glow?: number;
  scanDirection?: "vertical" | "horizontal" | "diagonal";
  colorSpread?: number;
  brightness?: number;
  contrast?: number;
  softness?: number;
  vignette?: number;
  scanline?: boolean;
  grain?: boolean;
  grainIntensity?: number;
  opacity?: number;
  mouseInteraction?: boolean;
  mouseRadius?: number;
  mouseStrength?: number;
  className?: string;
};

function Scanner({
  color1 = "#123b56",
  color2 = "#3179ab",
  color3 = "#ffffff",
  speed = 0.5,
  sweepSpeed = 0.25,
  sweepWidth = 1.6,
  sweepFalloff = 6,
  scale = 1.5,
  frequency = 2,
  ripple = 0.22,
  bandDensity = 11,
  lineSharpness = 5.5,
  glow = 0.22,
  scanDirection = "vertical",
  colorSpread = 0.7,
  brightness = 1.0,
  contrast = 1.15,
  softness = 1.4,
  vignette = 0.45,
  scanline = true,
  grain = true,
  grainIntensity = 0.05,
  opacity = 1.0,
  mouseInteraction = true,
  mouseRadius = 0.5,
  mouseStrength = 0.5,
  className = "",
}: ScannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseEnabledRef = useRef(mouseInteraction);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      webgl: 2,
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: scannerVertex,
      fragment: scannerFragment,
      transparent: true,
      depthTest: false,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([1, 1]) },
        uSpeed: { value: 0.5 },
        uSweepSpeed: { value: 0.25 },
        uSweepWidth: { value: 1.6 },
        uSweepFalloff: { value: 6 },
        uScale: { value: 1.5 },
        uFrequency: { value: 2 },
        uRipple: { value: 0.22 },
        uBandDensity: { value: 11 },
        uLineSharpness: { value: 5.5 },
        uGlow: { value: 0.22 },
        uColorSpread: { value: 0.7 },
        uBrightness: { value: 1.0 },
        uContrast: { value: 1.15 },
        uSoftness: { value: 1.4 },
        uVignette: { value: 0.45 },
        uOpacity: { value: 1.0 },
        uScanline: { value: 1.0 },
        uGrain: { value: 1.0 },
        uGrainIntensity: { value: 0.05 },
        uDirection: { value: 0.0 },
        uMouse: { value: new Float32Array([0.5, 0.5]) },
        uMouseEnabled: { value: 1.0 },
        uMouseRadius: { value: 0.5 },
        uMouseStrength: { value: 0.5 },
        uMouseActive: { value: 0.0 },
        uColor1: { value: new Float32Array([1, 1, 1]) },
        uColor2: { value: new Float32Array([1, 1, 1]) },
        uColor3: { value: new Float32Array([1, 1, 1]) },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    scannerCtxMap.set(container, { renderer, program, mesh });

    const setSize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      renderer.setSize(w, h);
      const res = program.uniforms.iResolution.value as Float32Array;
      res[0] = gl.drawingBufferWidth;
      res[1] = gl.drawingBufferHeight;
      renderer.render({ scene: mesh });
    };

    const ro = new ResizeObserver(setSize);
    ro.observe(container);
    setSize();

    const currentMouse = [0.5, 0.5];
    const targetMouse = [0.5, 0.5];
    let mouseActive = 0;
    let targetMouseActive = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (!inside) {
        targetMouseActive = 0;
        return;
      }
      targetMouse[0] = (e.clientX - rect.left) / rect.width;
      targetMouse[1] = 1.0 - (e.clientY - rect.top) / rect.height;
      targetMouseActive = 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    let raf = 0;
    let isVisible = true;
    let isPageVisible = !document.hidden;
    const t0 = performance.now();

    const loop = (t: number) => {
      program.uniforms.iTime.value = (t - t0) * 0.001;
      if (!mouseEnabledRef.current) {
        targetMouseActive = 0;
      }
      currentMouse[0] += 0.05 * (targetMouse[0] - currentMouse[0]);
      currentMouse[1] += 0.05 * (targetMouse[1] - currentMouse[1]);
      const mouse = program.uniforms.uMouse.value as Float32Array;
      mouse[0] = currentMouse[0];
      mouse[1] = currentMouse[1];
      mouseActive += 0.05 * (targetMouseActive - mouseActive);
      program.uniforms.uMouseActive.value = mouseActive;
      renderer.render({ scene: mesh });
      raf = requestAnimationFrame(loop);
    };

    const tryStart = () => {
      if (isVisible && isPageVisible && raf === 0) raf = requestAnimationFrame(loop);
    };
    const tryStop = () => {
      if (raf !== 0) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        isVisible ? tryStart() : tryStop();
      },
      { threshold: 0 },
    );
    io.observe(container);

    const onVisibility = () => {
      isPageVisible = !document.hidden;
      isPageVisible ? tryStart() : tryStop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    tryStart();

    return () => {
      tryStop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("mousemove", onMouseMove);
      scannerCtxMap.delete(container);
      try {
        container.removeChild(canvas);
      } catch {
        /* already detached */
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ctx = scannerCtxMap.get(container);
    if (!ctx) return;
    const { program } = ctx;
    const u = program.uniforms;

    u.uSpeed.value = speed;
    u.uSweepSpeed.value = sweepSpeed;
    u.uSweepWidth.value = sweepWidth;
    u.uSweepFalloff.value = sweepFalloff;
    u.uScale.value = scale;
    u.uFrequency.value = frequency;
    u.uRipple.value = ripple;
    u.uBandDensity.value = bandDensity;
    u.uLineSharpness.value = lineSharpness;
    u.uGlow.value = glow;
    u.uColorSpread.value = colorSpread;
    u.uBrightness.value = brightness;
    u.uContrast.value = contrast;
    u.uSoftness.value = softness;
    u.uVignette.value = vignette;
    u.uOpacity.value = opacity;
    u.uScanline.value = scanline ? 1.0 : 0.0;
    u.uGrain.value = grain ? 1.0 : 0.0;
    u.uGrainIntensity.value = grainIntensity;
    u.uDirection.value = directionToFloat(scanDirection);
    u.uMouseEnabled.value = mouseInteraction ? 1.0 : 0.0;
    u.uMouseRadius.value = mouseRadius;
    u.uMouseStrength.value = mouseStrength;
    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);
    const c3 = hexToRgb(color3);
    const color1Value = u.uColor1.value as Float32Array;
    const color2Value = u.uColor2.value as Float32Array;
    const color3Value = u.uColor3.value as Float32Array;
    color1Value[0] = c1[0];
    color1Value[1] = c1[1];
    color1Value[2] = c1[2];
    color2Value[0] = c2[0];
    color2Value[1] = c2[1];
    color2Value[2] = c2[2];
    color3Value[0] = c3[0];
    color3Value[1] = c3[1];
    color3Value[2] = c3[2];
    mouseEnabledRef.current = mouseInteraction;
  }, [
    speed,
    sweepSpeed,
    sweepWidth,
    sweepFalloff,
    scale,
    frequency,
    ripple,
    bandDensity,
    lineSharpness,
    glow,
    colorSpread,
    brightness,
    contrast,
    softness,
    vignette,
    opacity,
    scanline,
    grain,
    grainIntensity,
    scanDirection,
    mouseInteraction,
    mouseRadius,
    mouseStrength,
    color1,
    color2,
    color3,
  ]);

  return <div ref={containerRef} className={`scanner-container ${className}`.trim()} />;
}

type HeroProps = {
  variant?: "home" | "about" | "projects" | "insights";
};

export default function Hero({ variant = "home" }: HeroProps) {
  const isAbout = variant === "about";
  const isProjects = variant === "projects";
  const isInsights = variant === "insights";
  const isCompact = isAbout || isProjects || isInsights;
  const t = useTranslations(
    isAbout ? "aboutPage" : isProjects ? "projects" : isInsights ? "insightsPage" : "hero",
  );
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const titleWords = t("title").split(" ");

  return (
    <section className="relative overflow-hidden bg-soft-background">
      <div className="absolute inset-0">
        {isAbout ? (
          <LightTunnel
            cableColor="#3179ab"
            pulseColor={isDark ? "#9ecce8" : "#5aa3d4"}
            tunnelColor="#123b56"
            tunnelOpacity={isDark ? 0.18 : 0.08}
            speed={0.1}
            flowDirection="outward"
            pulseSpeed={2}
            pulseLength={0.28}
            pulseBlend={1}
            pulseWidth={1}
            cableCount={20}
            thickness={0.35}
            rimWidth={0.15}
            waviness={0.3}
            sway={0.5}
            size={1}
            centerX={0}
            centerY={0}
            glow={isDark ? 1.15 : 0.95}
            fadeNear={0.5}
            fadeFar={2}
            brightness={isDark ? 1.05 : 0.92}
            colorVariance
            grain
            grainIntensity={0.05}
            opacity={isDark ? 0.92 : 0.88}
            mouseInteraction
            mouseStrength={0.1}
          />
        ) : isProjects ? (
          <WebThreads
            color1="#3179ab"
            color2={isDark ? "#9ecce8" : "#5aa3d4"}
            color3={isDark ? "#f4f7f9" : "#ffffff"}
            speed={0.2}
            threadCount={6}
            frequency={5}
            spread={0.18}
            taper={1}
            position={0.5}
            fanMode="center"
            glow={0.02}
            falloff={0.6}
            thickness={1.1}
            brightness={isDark ? 0.72 : 0.55}
            opacity={1}
            mirror
            shimmer={false}
            grain
            grainIntensity={0.05}
            mouseInteraction
            mouseStrength={0.3}
          />
        ) : isInsights ? (
          <Scanner
            color1="#123b56"
            color2="#3179ab"
            color3={isDark ? "#f4f7f9" : "#ffffff"}
            speed={0.5}
            sweepSpeed={0.25}
            sweepWidth={1.6}
            sweepFalloff={6}
            scale={1.5}
            frequency={2}
            ripple={0.22}
            bandDensity={11}
            lineSharpness={5.5}
            glow={0.22}
            scanDirection="vertical"
            colorSpread={0.7}
            brightness={isDark ? 1.05 : 0.88}
            contrast={1.15}
            softness={1.4}
            vignette={0.45}
            scanline
            grain
            grainIntensity={0.05}
            opacity={isDark ? 0.92 : 0.88}
            mouseInteraction
            mouseRadius={0.5}
            mouseStrength={0.5}
          />
        ) : (
          <MoltenMetal
            color1="#123b56"
            color2="#3179ab"
            color3={isDark ? "#1a3d52" : "#F4F7F9"}
            colorMode="frost"
            speed={0.28}
            scale={3.6}
            detail={3}
            glow={isDark ? 0.9 : 1.4}
            coreSize={0.12}
            swirl={0.85}
            fold={-0.18}
            blackPoint={isDark ? 0.22 : 0.08}
            brightness={isDark ? 0.72 : 1.15}
            grain
            grainIntensity={0.04}
            mouseInteraction
            mouseStrength={0.25}
            opacity={0.9}
          />
        )}
      </div>

      <div
        className={
          isCompact
            ? "pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(244,247,249,0.9)_0%,rgba(244,247,249,0.72)_38%,rgba(244,247,249,0.38)_68%,rgba(244,247,249,0.14)_100%)] dark:bg-[linear-gradient(90deg,rgba(11,26,36,0.82)_0%,rgba(11,26,36,0.62)_42%,rgba(11,26,36,0.28)_100%)]"
            : "pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(244,247,249,0.96)_0%,rgba(244,247,249,0.88)_36%,rgba(244,247,249,0.55)_62%,rgba(244,247,249,0.22)_100%)] dark:bg-[linear-gradient(90deg,rgba(11,26,36,0.88)_0%,rgba(11,26,36,0.72)_40%,rgba(11,26,36,0.42)_100%)]"
        }
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(49,121,171,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(18,59,86,0.12),transparent_32%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(49,121,171,0.22),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(18,59,86,0.28),transparent_36%)]" />

      <div
        className={
          isCompact
            ? "relative mx-auto flex min-h-[28rem] max-w-7xl items-center justify-center px-4 py-12 sm:min-h-[32rem] sm:px-6 md:min-h-[36rem] md:py-16 lg:px-8"
            : "relative mx-auto flex min-h-[calc(100vh-4.25rem)] max-w-7xl items-center justify-center px-4 py-12 sm:px-6 md:py-16 lg:px-8 lg:py-20"
        }
      >
        <div className="max-w-4xl text-center">
          <span className="inline-flex max-w-full rounded-full border border-primary/15 bg-surface/80 px-3.5 py-1.5 text-center text-xs font-semibold tracking-[0.12em] text-primary uppercase shadow-sm sm:px-6 sm:py-2.5 sm:text-xl sm:tracking-tight md:text-2xl">
            {t("eyebrow")}
          </span>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-dark sm:text-5xl lg:text-6xl">
            {titleWords.map((word, index) => (
              <span
                key={`${word}-${index}`}
                className="hero-title-word"
                style={{ animationDelay: `${index * 400}ms` }}
              >
                {word}&nbsp;
              </span>
            ))}
          </h1>

          <p className="mt-4 text-lg leading-8 text-text/75">{t("subtitle")}</p>

          <p className="mt-5 text-base leading-7 text-text/70 sm:text-lg">
            {t("description")}
          </p>

          <div className="mt-8 flex flex-row flex-wrap items-center justify-center gap-2 sm:gap-3">
            <ExploreSolutionsButton className="inline-flex px-3.5 whitespace-nowrap sm:px-4" />
            <StartProjectButton className="inline-flex px-3.5 whitespace-nowrap sm:px-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
