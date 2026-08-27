export const ARTICLE_TYPES = [
  "news",
  "article",
  "guide",
  "caseStudy",
  "whitePaper",
  "report",
  "webinar",
] as const;

export type ArticleType = (typeof ARTICLE_TYPES)[number];

export const ARTICLES = [
  {
    id: "publicDigitalPlatforms",
    slug: "webinar-digital-platforms-public-institutions",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&h=900&q=80",
    type: "webinar",
    date: "2026-07-08",
    featured: false,
  },
  {
    id: "mittelstandRoadmap",
    slug: "mittelstand-digitalization-roadmap",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&h=900&q=80",
    type: "guide",
    date: "2026-06-12",
    featured: true,
  },
  {
    id: "iotWaterUtilities",
    slug: "iot-monitoring-for-water-utilities",
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1600&h=900&q=80",
    type: "article",
    date: "2026-05-28",
    featured: false,
  },
  {
    id: "industry40Smes",
    slug: "industry-4-0-without-a-factory-reset",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&h=900&q=80",
    type: "article",
    date: "2026-04-15",
    featured: false,
  },
  {
    id: "hvacEnergy",
    slug: "energy-efficient-ventilation-in-operations",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&h=900&q=80",
    type: "caseStudy",
    date: "2026-03-20",
    featured: false,
  },
  {
    id: "germanTechMena",
    slug: "connecting-german-technology-with-mena-programmes",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&h=900&q=80",
    type: "whitePaper",
    date: "2026-01-22",
    featured: false,
  },
  {
    id: "mewfForumRecap",
    slug: "notes-from-the-middle-east-water-forum",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&h=900&q=80",
    type: "news",
    date: "2025-11-10",
    featured: false,
  },
  {
    id: "smartUrbanInfra",
    slug: "smart-urban-infrastructure-field-report",
    image:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1600&h=900&q=80",
    type: "report",
    date: "2025-09-18",
    featured: false,
  },
] as const satisfies ReadonlyArray<{
  id: string;
  slug: string;
  image: string;
  type: ArticleType;
  date: string;
  featured: boolean;
}>;

export type Article = (typeof ARTICLES)[number];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((article) => article.slug === slug);
}

const MONTHS: Record<string, readonly string[]> = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  de: ["Jan.", "Feb.", "März", "Apr.", "Mai", "Juni", "Juli", "Aug.", "Sept.", "Okt.", "Nov.", "Dez."],
};

export function formatArticleDate(date: string, locale: string) {
  const [year, month, day] = date.split("-").map(Number);
  const months = MONTHS[locale] ?? MONTHS.en;
  return `${day} ${months[month - 1]} ${year}`;
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  const others = ARTICLES.filter((item) => item.id !== article.id);
  const sameType = others.filter((item) => item.type === article.type);
  const rest = others.filter((item) => item.type !== article.type);

  return [...sameType, ...rest].slice(0, limit);
}
