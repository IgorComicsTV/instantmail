export type GuideCluster =
  | "temporary-email"
  | "verification-codes"
  | "developer-testing"
  | "email-deliverability";

type ClusterGuideSection = {
  heading: string;
  body: string[];
  bullets?: string[];
};

// What a cluster file provides. author, updated, image, category and cluster are added in clusterGuides.ts.
export type ClusterGuideInput = {
  slug: string;
  title: string;
  description: string;
  readTime: string;
  // Direct answer shown first, 1 to 3 sentences.
  quickAnswer: string;
  intro: string[];
  // Includes one step-by-step or checklist section (use bullets).
  sections: ClusterGuideSection[];
  // "Try it with Instant Mail": real steps the reader can follow in the tool.
  demo: { heading: string; steps: string[]; note?: string };
  cta: { label: string; href: string };
  takeaway: string;
};
