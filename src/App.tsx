import { useState } from 'react';
import { AudienceIntelligence } from './components/AudienceIntelligence';
import { BookingFooter } from './components/BookingFooter';
import { BrandPartnersGrid } from './components/BrandPartnersGrid';
import { CollaborationRates } from './components/CollaborationRates';
import { EditorialHero } from './components/EditorialHero';
import { FormatPerformance } from './components/FormatPerformance';
import { TopUtilityBar } from './components/TopUtilityBar';
import { VerticalShowcase } from './components/VerticalShowcase';
import rawData from './data/kit.data.json';
import { useRateVisibility } from './hooks/useRateVisibility';
import { ALL_VERTICALS, type MediaKitData, type NicheVerticalId } from './types/mediaKit';
import { resolveSiteUrl } from './utils/siteUrl';
import { downloadVCard } from './utils/vcard';

// Typed assignment (not a cast) so tsc validates kit.data.json against MediaKitData.
const kitData: MediaKitData = rawData;
const siteUrl = resolveSiteUrl(kitData.meta.liveUrl);
const liveMeta: MediaKitData['meta'] = { ...kitData.meta, liveUrl: siteUrl };

export function App() {
  const [activeVertical, setActiveVertical] = useState<NicheVerticalId>(ALL_VERTICALS);
  const [selectedPackageId, setSelectedPackageId] = useState<string>(
    kitData.pricing.packages[0]?.id ?? ''
  );
  const [selectedUsageId, setSelectedUsageId] = useState<string>(
    kitData.pricing.usageRightsMultipliers[0]?.id ?? ''
  );
  const [selectedExclusivityId, setSelectedExclusivityId] = useState<string>(
    kitData.pricing.exclusivityMultipliers[0]?.id ?? ''
  );

  const rateVisibility = useRateVisibility(
    kitData.pricing.defaultPublicVisible,
    kitData.pricing.remoteFlagUrl
  );

  const hasQuoteCustomization =
    selectedPackageId !== (kitData.pricing.packages[0]?.id ?? '') ||
    selectedUsageId !== (kitData.pricing.usageRightsMultipliers[0]?.id ?? '') ||
    selectedExclusivityId !== (kitData.pricing.exclusivityMultipliers[0]?.id ?? '');

  const isCustomView =
    activeVertical !== ALL_VERTICALS ||
    rateVisibility.hasUrlOverride ||
    hasQuoteCustomization;

  const activeVerticalInfo =
    kitData.verticals.find((v) => v.id === activeVertical) ?? kitData.verticals[0];

  return (
    <div className="min-h-screen bg-canvas text-ink-primary">
      {kitData.meta.demoMode && (
        <div className="bg-bronze px-4 py-1.5 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-white">
          Demo content &mdash; sample data, not a real creator
        </div>
      )}
      <TopUtilityBar
        creatorHandle={kitData.creator.handle}
        verticals={kitData.verticals}
        activeVertical={activeVertical}
        onSelectVertical={setActiveVertical}
        onDownloadVCard={() => downloadVCard({ ...kitData, meta: liveMeta })}
        isCustomView={isCustomView}
        canonicalPdfPath={kitData.meta.canonicalPdfPath}
        pdfFileName={kitData.meta.pdfFileName}
        onExportCustomPdf={() => window.print()}
      />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <EditorialHero
          meta={kitData.meta}
          creator={kitData.creator}
          headlineMetrics={kitData.headlineMetrics}
          activeVerticalInfo={activeVerticalInfo}
        />

        <AudienceIntelligence audience={kitData.audience} />

        <FormatPerformance formats={kitData.formatPerformance} />

        <VerticalShowcase
          caseStudies={kitData.caseStudies}
          activeVertical={activeVertical}
        />

        <BrandPartnersGrid
          partners={kitData.brandPartners}
          activeVertical={activeVertical}
        />

        <CollaborationRates
          pricing={kitData.pricing}
          isVisible={rateVisibility.isVisible}
          isLoading={rateVisibility.isLoading}
          visibilitySource={rateVisibility.source}
          activeVertical={activeVertical}
          bookingEmail={kitData.contact.bookingEmail}
          creatorName={kitData.creator.fullName}
          selectedPackageId={selectedPackageId}
          selectedUsageId={selectedUsageId}
          selectedExclusivityId={selectedExclusivityId}
          onSelectPackage={setSelectedPackageId}
          onSelectUsage={setSelectedUsageId}
          onSelectExclusivity={setSelectedExclusivityId}
        />

        <BookingFooter
          contact={kitData.contact}
          meta={liveMeta}
          creator={kitData.creator}
        />

        <p className="print-only border-t border-hairline pt-3 text-center font-mono text-[9pt] text-ink-secondary">
          {siteUrl} &middot; Updated {kitData.meta.lastUpdated}
        </p>
      </main>
    </div>
  );
}

export default App;
