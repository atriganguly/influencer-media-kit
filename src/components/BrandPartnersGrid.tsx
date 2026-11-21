import type { BrandPartner, NicheVerticalId } from '../types/mediaKit';

interface BrandPartnersGridProps {
  partners: BrandPartner[];
  activeVertical: NicheVerticalId;
}

export function BrandPartnersGrid({
  partners,
  activeVertical,
}: BrandPartnersGridProps) {
  const visiblePartners =
    activeVertical === 'all'
      ? partners
      : partners.filter((p) => p.vertical === activeVertical);

  return (
    <section className="avoid-break border-b border-hairline py-12">
      <div className="section-head mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">
            04 / Maison &amp; Hospitality Roster
          </p>
          <h2 className="mt-1 font-serif text-3xl font-normal text-ink-primary sm:text-4xl">
            Selected Brand Collaborations
          </h2>
        </div>
        <p className="text-xs text-ink-secondary">
          Global campaigns, private salon previews &amp; residency commissions
        </p>
      </div>

      <div className="grid grid-cols-1 gap-px border border-hairline bg-hairline sm:grid-cols-3">
        {visiblePartners.map((partner) => (
          <div
            key={partner.name}
            className="avoid-break flex items-center justify-between bg-canvas px-6 py-5"
          >
            <span className="font-serif text-xl tracking-[0.14em] text-ink-primary">
              {partner.name}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-secondary">
              {partner.tier}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
