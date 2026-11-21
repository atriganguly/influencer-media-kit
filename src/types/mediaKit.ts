/** Vertical ids are defined in kit.data.json (`verticals[].id`). 'all' is reserved for the unfiltered view. */
export type NicheVerticalId = string;
export const ALL_VERTICALS = 'all';

export interface NicheVertical {
  id: NicheVerticalId;
  label: string;
  shortLabel: string;
  description: string;
}

export interface HeadlineMetric {
  id: string;
  label: string;
  value: string;
  sublabel: string;
  benchmarkNote: string;
}

export interface FormatMetric {
  format: string;
  avgViewsOrReach: string;
  primaryKpiLabel: string;
  primaryKpiValue: string;
  secondaryKpiLabel: string;
  secondaryKpiValue: string;
  editorialNote: string;
}

export interface DemographicBreakdown {
  genderSplit: { female: number; male: number; other: number };
  ageBrackets: Array<{ range: string; percentage: number }>;
  topCountries: Array<{ country: string; code: string; percentage: number }>;
  topCities: string[];
  purchasingPowerSignals: Array<{ label: string; value: string }>;
}

export interface CaseStudy {
  id: string;
  vertical: NicheVerticalId;
  verticalBadge: string;
  brandName: string;
  campaignTitle: string;
  deliverablesSummary: string;
  heroImage: string;
  imageAlt: string;
  summary: string;
  metrics: Array<{ label: string; value: string }>;
  clientQuote?: string;
}

export interface BrandPartner {
  name: string;
  vertical: NicheVerticalId;
  tier: string;
}

export interface RatePackage {
  id: string;
  name: string;
  verticalFit: NicheVerticalId[];
  startingPriceUsd: number;
  turnaroundDays: number;
  deliverables: string[];
  idealFor: string;
}

export interface PricingConfig {
  defaultPublicVisible: boolean;
  remoteFlagUrl: string;
  currencySymbol: string;
  packages: RatePackage[];
  usageRightsMultipliers: Array<{
    id: string;
    label: string;
    multiplier: number;
    description: string;
  }>;
  exclusivityMultipliers: Array<{
    id: string;
    label: string;
    multiplier: number;
    description: string;
  }>;
  privateInquiryMessage: string;
}

export interface MediaKitData {
  meta: {
    /** While true: shows a "demo content" ribbon, adds noindex, and warns in CI. */
    demoMode: boolean;
    lastUpdated: string;
    liveUrl: string;
    canonicalPdfPath: string;
    pdfFileName: string;
    /** Optional override; defaults to the generated og-image.png */
    ogImage?: string;
    editionLabel: string;
  };
  creator: {
    fullName: string;
    initials?: string;
    handle: string;
    instagramUrl: string;
    tiktokHandle?: string;
    tagline: string;
    editorialBio: string;
    pillarsList: string[];
    locations: string[];
    heroPortraitUrl: string;
    heroPortraitAlt: string;
  };
  verticals: NicheVertical[];
  headlineMetrics: HeadlineMetric[];
  formatPerformance: FormatMetric[];
  audience: DemographicBreakdown;
  caseStudies: CaseStudy[];
  brandPartners: BrandPartner[];
  pricing: PricingConfig;
  contact: {
    representationLabel: string;
    managerName: string;
    bookingEmail: string;
    pressEmail: string;
    phoneDisplay: string;
    giftingCityNote: string;
  };
}
