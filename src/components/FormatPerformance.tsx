import { Film, Layers, Smartphone } from 'lucide-react';
import type { FormatMetric } from '../types/mediaKit';

interface FormatPerformanceProps {
  formats: FormatMetric[];
}

export function FormatPerformance({ formats }: FormatPerformanceProps) {
  const getIcon = (format: FormatMetric['format']) => {
    if (format.startsWith('Reels')) return Film;
    if (format.startsWith('Editorial')) return Layers;
    return Smartphone;
  };

  return (
    <section className="avoid-break border-b border-hairline py-12">
      <div className="section-head mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">
            02 / Format-Specific Attention Depth
          </p>
          <h2 className="mt-1 font-serif text-3xl font-normal text-ink-primary sm:text-4xl">
            Channel &amp; Deliverable Benchmarks
          </h2>
        </div>
        <p className="max-w-md text-xs leading-relaxed text-ink-secondary">
          Evaluated by hook retention, editorial bookmark intent, and outbound Story click-through rate.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {formats.map((item) => {
          const Icon = getIcon(item.format);
          return (
            <article
              key={item.format}
              className="avoid-break flex flex-col justify-between border border-hairline bg-surface p-6"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium uppercase tracking-[0.14em] text-ink-secondary">
                    {item.format}
                  </span>
                  <Icon className="h-4 w-4 text-bronze" strokeWidth={1.25} />
                </div>

                <p className="mt-3 font-mono text-lg font-medium text-ink-primary tabular-nums">
                  {item.avgViewsOrReach}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-4 border-y border-hairline py-4">
                  <div>
                    <p className="text-[11px] text-ink-secondary">
                      {item.primaryKpiLabel}
                    </p>
                    <p className="mt-1 font-mono text-2xl font-medium tabular-nums text-ink-primary">
                      {item.primaryKpiValue}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] text-ink-secondary">
                      {item.secondaryKpiLabel}
                    </p>
                    <p className="mt-1 font-mono text-2xl font-medium tabular-nums text-bronze">
                      {item.secondaryKpiValue}
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-ink-secondary">
                {item.editorialNote}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
