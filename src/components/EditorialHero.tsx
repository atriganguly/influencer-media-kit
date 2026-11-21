import { ArrowUpRight, MapPin } from 'lucide-react';
import type { HeadlineMetric, MediaKitData, NicheVertical } from '../types/mediaKit';

interface EditorialHeroProps {
  meta: MediaKitData['meta'];
  creator: MediaKitData['creator'];
  headlineMetrics: HeadlineMetric[];
  activeVerticalInfo: NicheVertical;
}

export function EditorialHero({
  meta,
  creator,
  headlineMetrics,
  activeVerticalInfo,
}: EditorialHeroProps) {
  return (
    <section className="border-b border-hairline pb-12 pt-8 sm:pt-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-2 border-b border-hairline pb-4 text-xs uppercase tracking-[0.2em] text-ink-secondary">
        <span>{meta.editionLabel}</span>
        <span>Updated {meta.lastUpdated}</span>
      </div>

      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <div className="mb-4 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-bronze">
            <span>{activeVerticalInfo.label}</span>
          </div>

          <h1 className="font-serif text-5xl font-normal leading-[1.02] tracking-tight text-ink-primary sm:text-6xl lg:text-7xl">
            {creator.fullName}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-ink-secondary">
            <a
              href={creator.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-mono text-xs font-medium text-ink-primary underline decoration-hairline underline-offset-4 hover:decoration-bronze"
            >
              <span>IG {creator.handle}</span>
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.25} />
            </a>
            {creator.tiktokHandle && (
              <span className="font-mono text-xs text-ink-secondary">
                TikTok {creator.tiktokHandle}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 text-xs">
              <MapPin className="h-3.5 w-3.5 text-bronze" strokeWidth={1.25} />
              <span>{creator.locations.join(' · ')}</span>
            </span>
          </div>

          <p className="mt-6 font-serif text-2xl italic leading-snug text-ink-primary sm:text-3xl">
            {creator.tagline}
          </p>

          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink-secondary sm:text-base">
            {creator.editorialBio}
          </p>

          <div className="mt-8 border-t border-hairline pt-6">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-secondary">
              Core Editorial Pillars
            </p>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {creator.pillarsList.map((pillar) => (
                <li
                  key={pillar}
                  className="flex items-start gap-2 text-xs leading-relaxed text-ink-primary"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-bronze" />
                  <span>{pillar}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="avoid-break overflow-hidden border border-hairline bg-surface p-2">
            <div className="aspect-[3/4] w-full overflow-hidden bg-surface">
              <img
                src={creator.heroPortraitUrl}
                alt={creator.heroPortraitAlt}
                className="h-full w-full object-cover object-top"
              />
            </div>
            <div className="flex items-center justify-between px-1 pb-1 pt-3 text-[11px] uppercase tracking-[0.16em] text-ink-secondary">
              <span>Editorial Dossier</span>
              <span className="font-mono">{creator.handle}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {headlineMetrics.map((metric) => (
          <div
            key={metric.id}
            className="avoid-break border border-hairline bg-surface p-5"
          >
            <p className="text-[11px] uppercase tracking-[0.16em] text-ink-secondary">
              {metric.label}
            </p>
            <p className="mt-2 font-mono text-3xl font-medium tracking-tight text-ink-primary tabular-nums sm:text-4xl">
              {metric.value}
            </p>
            <p className="mt-2 text-xs font-medium text-ink-primary">
              {metric.sublabel}
            </p>
            <p className="mt-1 font-mono text-[11px] text-bronze">
              {metric.benchmarkNote}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
