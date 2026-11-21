import { Quote } from 'lucide-react';
import type { CaseStudy, NicheVerticalId } from '../types/mediaKit';

interface VerticalShowcaseProps {
  caseStudies: CaseStudy[];
  activeVertical: NicheVerticalId;
}

export function VerticalShowcase({
  caseStudies,
  activeVertical,
}: VerticalShowcaseProps) {
  const filtered =
    activeVertical === 'all'
      ? caseStudies
      : caseStudies.filter((cs) => cs.vertical === activeVertical);

  return (
    <section className="page-break-before border-b border-hairline py-12">
      <div className="section-head mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">
            03 / Selected Campaign Dossiers
          </p>
          <h2 className="mt-1 font-serif text-3xl font-normal text-ink-primary sm:text-4xl">
            Editorial Case Studies &amp; Commercial Attribution
          </h2>
        </div>
        <p className="font-mono text-xs text-ink-secondary">
          Showing {filtered.length} of {caseStudies.length} Dossiers
        </p>
      </div>

      <div className="space-y-8">
        {filtered.map((study) => (
          <article
            key={study.id}
            className="avoid-break grid grid-cols-1 overflow-hidden border border-hairline bg-surface lg:grid-cols-12"
          >
            <div className="aspect-[4/3] w-full overflow-hidden bg-canvas lg:col-span-5 lg:aspect-auto">
              <img
                src={study.heroImage}
                alt={study.imageAlt}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-7">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-bronze">
                    {study.verticalBadge}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wider text-ink-secondary">
                    {study.brandName}
                  </span>
                </div>

                <h3 className="mt-2 font-serif text-2xl font-normal text-ink-primary sm:text-3xl">
                  {study.campaignTitle}
                </h3>

                <p className="mt-2 font-mono text-[11px] text-ink-secondary">
                  {study.deliverablesSummary}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-ink-secondary">
                  {study.summary}
                </p>
              </div>

              <div className="mt-6">
                <div className="grid grid-cols-3 gap-4 border-t border-hairline pt-5">
                  {study.metrics.map((m) => (
                    <div key={m.label}>
                      <p className="text-[11px] text-ink-secondary">{m.label}</p>
                      <p className="mt-1 font-mono text-lg font-medium tabular-nums text-ink-primary sm:text-xl">
                        {m.value}
                      </p>
                    </div>
                  ))}
                </div>

                {study.clientQuote && (
                  <blockquote className="mt-5 flex items-start gap-2.5 border-t border-hairline pt-4 text-xs italic leading-relaxed text-ink-secondary">
                    <Quote
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-bronze"
                      strokeWidth={1.25}
                    />
                    <span>&ldquo;{study.clientQuote}&rdquo;</span>
                  </blockquote>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
