import type { Guide } from "./guidesContent";
import type { ClusterGuideInput, GuideCluster } from "./clusterTypes";
import { developerTestingGuides } from "./clusters/developer-testing";
import { emailDeliverabilityGuides } from "./clusters/email-deliverability";
import { temporaryEmailGuides } from "./clusters/temporary-email";
import { verificationCodesGuides } from "./clusters/verification-codes";

export const clusterMeta: Record<GuideCluster, { category: string; label: string; blurb: string }> = {
  "temporary-email": {
    category: "Temporary Email",
    label: "Temporary email",
    blurb: "How temporary inboxes work, how long they last, and why some sites block them.",
  },
  "verification-codes": {
    category: "Verification Codes",
    label: "Verification codes",
    blurb: "Fix missing codes and expired links, and choose between email, SMS, and authenticator apps.",
  },
  "developer-testing": {
    category: "Developer Testing",
    label: "Developer testing",
    blurb: "Test signup, reset, and transactional emails safely in staging and QA.",
  },
  "email-deliverability": {
    category: "Email Deliverability",
    label: "DNS and deliverability",
    blurb: "Read MX, SPF, DKIM, and DMARC records and fix messages that do not arrive.",
  },
};

export const clusterOrder = Object.keys(clusterMeta) as GuideCluster[];

const author = "Igor Corrêa";
// Date these guides were written and checked against the product and tools.
const updated = "November 19, 2026";

const inputs: Record<GuideCluster, ClusterGuideInput[]> = {
  "temporary-email": temporaryEmailGuides,
  "verification-codes": verificationCodesGuides,
  "developer-testing": developerTestingGuides,
  "email-deliverability": emailDeliverabilityGuides,
};

export const clusterGuides: Guide[] = clusterOrder.flatMap((cluster) =>
  inputs[cluster].map((guide) => ({
    ...guide,
    category: clusterMeta[cluster].category,
    cluster,
    image: `/guides/${guide.slug}.webp`,
    author,
    updated,
  })),
);

export const clusterGuideSlugs = clusterGuides.map((guide) => guide.slug);
