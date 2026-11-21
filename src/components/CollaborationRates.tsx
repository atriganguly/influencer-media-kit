import { Check, Copy, Lock, Mail, Sparkles } from 'lucide-react';
import { useState } from 'react';
import type { NicheVerticalId, PricingConfig } from '../types/mediaKit';

interface CollaborationRatesProps {
  pricing: PricingConfig;
  isVisible: boolean;
  isLoading: boolean;
  visibilitySource: 'url-override' | 'remote-flag' | 'static-default';
  activeVertical: NicheVerticalId;
  bookingEmail: string;
  creatorName: string;
  selectedPackageId: string;
  selectedUsageId: string;
  selectedExclusivityId: string;
  onSelectPackage: (id: string) => void;
  onSelectUsage: (id: string) => void;
  onSelectExclusivity: (id: string) => void;
}

export function CollaborationRates({
  pricing,
  isVisible,
  isLoading,
  visibilitySource,
  activeVertical,
  bookingEmail,
  creatorName,
  selectedPackageId,
  selectedUsageId,
  selectedExclusivityId,
  onSelectPackage,
  onSelectUsage,
  onSelectExclusivity,
}: CollaborationRatesProps) {
  const [copiedBrief, setCopiedBrief] = useState(false);

  // Avoid flashing rates (or the private card) while the remote flag resolves.
  if (isLoading) {
    return (
      <section className="border-b border-hairline py-12" aria-busy="true">
        <div className="h-64 animate-pulse border border-hairline bg-surface" />
      </section>
    );
  }

  if (!isVisible) {
    return (
      <section className="border-b border-hairline py-12">
        <div className="avoid-break border border-hairline bg-surface p-8 sm:p-10">
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">
            <Lock className="h-3.5 w-3.5" strokeWidth={1.25} />
            <span>05 / Private Rate Card &amp; Bespoke Commissioning</span>
          </div>
          <h2 className="mt-3 font-serif text-3xl font-normal text-ink-primary sm:text-4xl">
            Bespoke Commercial Commissioning
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-secondary">
            {pricing.privateInquiryMessage}
          </p>
          <div className="mt-6">
            <a
              href={`mailto:${bookingEmail}?subject=${encodeURIComponent(
                `Private Rate Card Request — ${creatorName}`
              )}`}
              className="inline-flex items-center gap-2 rounded-sm bg-ink-primary px-5 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-canvas transition-opacity hover:opacity-90"
            >
              <Mail className="h-3.5 w-3.5" strokeWidth={1.25} />
              <span>Request Private Rate Sheet</span>
            </a>
          </div>
        </div>
      </section>
    );
  }

  const filteredPackages =
    activeVertical === 'all'
      ? pricing.packages
      : pricing.packages.filter((pkg) => pkg.verticalFit.includes(activeVertical));

  const activePackage =
    pricing.packages.find((p) => p.id === selectedPackageId) ?? pricing.packages[0];
  const activeUsage =
    pricing.usageRightsMultipliers.find((u) => u.id === selectedUsageId) ??
    pricing.usageRightsMultipliers[0];
  const activeExclusivity =
    pricing.exclusivityMultipliers.find((e) => e.id === selectedExclusivityId) ??
    pricing.exclusivityMultipliers[0];

  const estimatedTotal = Math.round(
    activePackage.startingPriceUsd *
      activeUsage.multiplier *
      activeExclusivity.multiplier
  );

  const proposalBrief = [
    `Partnership Brief — ${creatorName}`,
    `Deliverable Package: ${activePackage.name} (${pricing.currencySymbol}${activePackage.startingPriceUsd.toLocaleString()})`,
    `Usage Rights: ${activeUsage.label} (${activeUsage.multiplier}x)`,
    `Category Exclusivity: ${activeExclusivity.label} (${activeExclusivity.multiplier}x)`,
    `Estimated Investment: ${pricing.currencySymbol}${estimatedTotal.toLocaleString()}`,
    `Turnaround: ${activePackage.turnaroundDays} business days from brief & product receipt`,
  ].join('\n');

  const handleCopyBrief = () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(proposalBrief).catch(() => {});
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = proposalBrief;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopiedBrief(true);
    window.setTimeout(() => setCopiedBrief(false), 2200);
  };

  return (
    <section className="border-b border-hairline py-12">
      <div className="section-head mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">
            05 / Baseline Rate Card &amp; Scope Estimator
          </p>
          <h2 className="mt-1 font-serif text-3xl font-normal text-ink-primary sm:text-4xl">
            Commercial Investment &amp; Licensing
          </h2>
        </div>
        {visibilitySource === 'url-override' && (
          <span className="no-print rounded-full border border-bronze/40 bg-bronze/10 px-3 py-1 font-mono text-[11px] text-bronze">
            Private Agency Link Unlocked
          </span>
        )}
      </div>

      {/* Baseline Organic Packages */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {filteredPackages.map((pkg) => {
          const isSelected = pkg.id === activePackage.id;
          return (
            <div
              key={pkg.id}
              className={`avoid-break flex flex-col justify-between border p-6 transition-colors ${
                isSelected
                  ? 'border-bronze bg-surface'
                  : 'border-hairline bg-surface/60'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-serif text-2xl font-normal text-ink-primary">
                    {pkg.name}
                  </h3>
                  <span className="font-mono text-[11px] text-ink-secondary">
                    {pkg.turnaroundDays}d SLA
                  </span>
                </div>

                <div className="mt-3 flex items-baseline gap-1.5 border-b border-hairline pb-4">
                  <span className="text-[11px] uppercase tracking-[0.14em] text-ink-secondary">
                    Starting at
                  </span>
                  <span className="font-mono text-2xl font-medium tabular-nums text-ink-primary">
                    {pricing.currencySymbol}
                    {pkg.startingPriceUsd.toLocaleString()}
                  </span>
                </div>

                <ul className="mt-4 space-y-2">
                  {pkg.deliverables.map((line) => (
                    <li
                      key={line}
                      className="flex items-start gap-2 text-xs leading-relaxed text-ink-primary"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-bronze" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 border-t border-hairline pt-4">
                <p className="text-[11px] leading-relaxed text-ink-secondary">
                  <strong className="font-medium text-ink-primary">Ideal for:</strong>{' '}
                  {pkg.idealFor}
                </p>
                <button
                  type="button"
                  onClick={() => onSelectPackage(pkg.id)}
                  aria-pressed={isSelected}
                  className={`no-print mt-4 w-full rounded-sm border px-3 py-2 text-xs font-medium uppercase tracking-[0.14em] transition-colors ${
                    isSelected
                      ? 'border-ink-primary bg-ink-primary text-canvas'
                      : 'border-hairline bg-canvas text-ink-primary hover:border-ink-primary'
                  }`}
                >
                  {isSelected ? 'Selected in Estimator' : 'Configure Scope'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Bespoke Scope & Quote Builder */}
      <div className="avoid-break mt-8 border border-hairline bg-surface p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-hairline pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-bronze" strokeWidth={1.25} />
            <h3 className="font-serif text-2xl font-normal text-ink-primary">
              Bespoke Scope &amp; Licensing Estimator
            </h3>
          </div>
          <span className="font-mono text-xs text-ink-secondary">
            {activePackage.name}
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            <div>
              <p className="mb-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ink-secondary">
                1. Paid Usage Rights / Whitelisting
              </p>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                {pricing.usageRightsMultipliers.map((opt) => {
                  const selected = opt.id === activeUsage.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => onSelectUsage(opt.id)}
                      aria-pressed={selected}
                      className={`border p-3 text-left transition-colors ${
                        selected
                          ? 'border-bronze bg-canvas'
                          : 'border-hairline bg-canvas/50 hover:border-ink-secondary'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-medium text-bronze">
                          {opt.multiplier.toFixed(2).replace(/\.00$/, '.0')}x
                        </span>
                        {selected && (
                          <Check className="h-3.5 w-3.5 text-bronze" strokeWidth={1.5} />
                        )}
                      </div>
                      <p className="mt-1 text-xs font-medium text-ink-primary">
                        {opt.label}
                      </p>
                      <p className="mt-1 text-[11px] leading-snug text-ink-secondary">
                        {opt.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="mb-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ink-secondary">
                2. Category Exclusivity
              </p>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                {pricing.exclusivityMultipliers.map((opt) => {
                  const selected = opt.id === activeExclusivity.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => onSelectExclusivity(opt.id)}
                      aria-pressed={selected}
                      className={`border p-3 text-left transition-colors ${
                        selected
                          ? 'border-bronze bg-canvas'
                          : 'border-hairline bg-canvas/50 hover:border-ink-secondary'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-medium text-bronze">
                          {opt.multiplier.toFixed(2).replace(/\.00$/, '.0')}x
                        </span>
                        {selected && (
                          <Check className="h-3.5 w-3.5 text-bronze" strokeWidth={1.5} />
                        )}
                      </div>
                      <p className="mt-1 text-xs font-medium text-ink-primary">
                        {opt.label}
                      </p>
                      <p className="mt-1 text-[11px] leading-snug text-ink-secondary">
                        {opt.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between border border-hairline bg-canvas p-6 lg:col-span-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-ink-secondary">
                Estimated Scope Investment
              </p>
              <p className="mt-2 font-mono text-4xl font-medium tabular-nums text-ink-primary">
                {pricing.currencySymbol}
                {estimatedTotal.toLocaleString()}
              </p>
              <p className="mt-2 text-xs text-ink-secondary">
                {activePackage.name} · {activeUsage.multiplier}x usage ·{' '}
                {activeExclusivity.multiplier}x exclusivity
              </p>
            </div>

            <div className="no-print mt-6 space-y-2.5">
              <a
                href={`mailto:${bookingEmail}?subject=${encodeURIComponent(
                  `Campaign Proposal — ${activePackage.name}`
                )}&body=${encodeURIComponent(proposalBrief)}`}
                className="flex w-full items-center justify-center gap-2 rounded-sm bg-ink-primary px-4 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-canvas transition-opacity hover:opacity-90"
              >
                <Mail className="h-3.5 w-3.5" strokeWidth={1.25} />
                <span>Send Proposal Inquiry</span>
              </a>

              <button
                type="button"
                onClick={handleCopyBrief}
                className="flex w-full items-center justify-center gap-2 rounded-sm border border-hairline bg-surface px-4 py-2 text-xs font-medium text-ink-primary transition-colors hover:border-ink-primary"
              >
                {copiedBrief ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-bronze" strokeWidth={1.5} />
                    <span>Brief Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" strokeWidth={1.25} />
                    <span>Copy Proposal Brief</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
