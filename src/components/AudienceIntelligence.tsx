import type { DemographicBreakdown } from '../types/mediaKit';

interface AudienceIntelligenceProps {
  audience: DemographicBreakdown;
}

export function AudienceIntelligence({ audience }: AudienceIntelligenceProps) {
  return (
    <section className="avoid-break border-b border-hairline py-12">
      <div className="section-head mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">
            01 / Audience Intelligence
          </p>
          <h2 className="mt-1 font-serif text-3xl font-normal text-ink-primary sm:text-4xl">
            Verified Demographics &amp; Purchasing Power
          </h2>
        </div>
        <p className="max-w-md text-xs leading-relaxed text-ink-secondary">
          Concentration in Tier-1 luxury capitals and prime 25–44 wealth-accumulation brackets.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Gender & Age */}
        <div className="avoid-break border border-hairline bg-surface p-6 lg:col-span-4">
          <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-ink-secondary">
            Gender Composition
          </h3>

          <div className="mt-4">
            <svg
              viewBox="0 0 100 6"
              className="h-2.5 w-full overflow-hidden rounded-full bg-hairline"
              role="img"
              aria-label={`Female ${audience.genderSplit.female}%, Male ${audience.genderSplit.male}%, Other ${audience.genderSplit.other}%`}
            >
              <rect x="0" y="0" width={audience.genderSplit.female} height="6" fill="#141413" />
              <rect
                x={audience.genderSplit.female}
                y="0"
                width={audience.genderSplit.male}
                height="6"
                fill="#9A7B4F"
              />
              <rect
                x={audience.genderSplit.female + audience.genderSplit.male}
                y="0"
                width={audience.genderSplit.other}
                height="6"
                fill="#D4CEC3"
              />
            </svg>
            <div className="mt-3 flex items-center justify-between gap-2 font-mono text-xs tabular-nums">
              <span>Female {audience.genderSplit.female}%</span>
              <span className="text-bronze">Male {audience.genderSplit.male}%</span>
              <span className="text-ink-secondary">Other {audience.genderSplit.other}%</span>
            </div>
          </div>

          <h3 className="mt-8 text-xs font-medium uppercase tracking-[0.18em] text-ink-secondary">
            Age Distribution
          </h3>
          <div className="mt-4 space-y-3">
            {audience.ageBrackets.map((bracket) => (
              <div key={bracket.range}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-ink-primary">{bracket.range}</span>
                  <span className="font-mono tabular-nums text-ink-primary">
                    {bracket.percentage}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-hairline">
                  <div
                    className="h-full bg-ink-primary"
                    style={{ width: `${bracket.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tier-1 Geo Split */}
        <div className="avoid-break border border-hairline bg-surface p-6 lg:col-span-4">
          <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-ink-secondary">
            Tier-1 Geographic Markets
          </h3>
          <div className="mt-4 space-y-3.5">
            {audience.topCountries.map((item) => (
              <div key={item.code}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-ink-primary">
                    {item.country}{' '}
                    <span className="font-mono text-[10px] text-ink-secondary">
                      ({item.code})
                    </span>
                  </span>
                  <span className="font-mono tabular-nums text-ink-primary">
                    {item.percentage}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-hairline">
                  <div
                    className="h-full bg-bronze"
                    style={{ width: `${Math.min(item.percentage * 2.2, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-hairline pt-4">
            <p className="text-[11px] uppercase tracking-[0.16em] text-ink-secondary">
              Key Luxury Capitals
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-primary">
              {audience.topCities.join(' · ')}
            </p>
          </div>
        </div>

        {/* Purchasing Power Signals */}
        <div className="avoid-break border border-hairline bg-surface p-6 lg:col-span-4">
          <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-ink-secondary">
            Affluence &amp; Intent Signals
          </h3>
          <div className="mt-4 divide-y divide-hairline">
            {audience.purchasingPowerSignals.map((signal) => (
              <div
                key={signal.label}
                className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0"
              >
                <span className="text-xs leading-snug text-ink-primary">
                  {signal.label}
                </span>
                <span className="shrink-0 font-mono text-base font-medium tabular-nums text-bronze">
                  {signal.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
