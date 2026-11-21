import { Download, FileText, UserPlus } from 'lucide-react';
import type { NicheVertical, NicheVerticalId } from '../types/mediaKit';

interface TopUtilityBarProps {
  creatorHandle: string;
  verticals: NicheVertical[];
  activeVertical: NicheVerticalId;
  onSelectVertical: (id: NicheVerticalId) => void;
  onDownloadVCard: () => void;
  isCustomView: boolean;
  canonicalPdfPath: string;
  pdfFileName: string;
  onExportCustomPdf: () => void;
}

export function TopUtilityBar({
  creatorHandle,
  verticals,
  activeVertical,
  onSelectVertical,
  onDownloadVCard,
  isCustomView,
  canonicalPdfPath,
  pdfFileName,
  onExportCustomPdf,
}: TopUtilityBarProps) {
  return (
    <header className="no-print z-40 sm:sticky sm:top-0 border-b border-hairline bg-canvas/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="font-serif text-lg font-medium tracking-tight text-ink-primary">
            {creatorHandle}
          </span>
          <span className="hidden h-4 w-px bg-hairline sm:inline-block" />
          <span className="hidden text-xs uppercase tracking-[0.18em] text-ink-secondary sm:inline-block">
            Editorial Media Kit
          </span>
        </div>

        <nav
          aria-label="Filter by niche vertical"
          className="-mx-1 flex max-w-full items-center gap-1.5 overflow-x-auto px-1 pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:overflow-visible"
        >
          {verticals.map((vertical) => {
            const isActive = vertical.id === activeVertical;
            return (
              <button
                key={vertical.id}
                type="button"
                onClick={() => onSelectVertical(vertical.id)}
                aria-pressed={isActive}
                className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? 'border-bronze bg-bronze text-white'
                    : 'border-hairline bg-canvas text-ink-secondary hover:border-ink-primary hover:text-ink-primary'
                }`}
              >
                {vertical.shortLabel}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onDownloadVCard}
            className="inline-flex items-center gap-1.5 rounded-sm border border-hairline bg-surface px-3 py-1.5 text-xs font-medium text-ink-primary transition-colors hover:border-ink-primary"
            title="Save representation contact (.vcf)"
          >
            <UserPlus className="h-3.5 w-3.5" strokeWidth={1.25} />
            <span className="hidden sm:inline">Save Contact</span>
          </button>

          {isCustomView ? (
            <button
              type="button"
              onClick={onExportCustomPdf}
              title="Opens your browser's print dialog — choose 'Save as PDF' as the destination"
              className="inline-flex items-center gap-1.5 rounded-sm bg-ink-primary px-3.5 py-1.5 text-xs font-medium text-canvas transition-opacity hover:opacity-90"
            >
              <FileText className="h-3.5 w-3.5" strokeWidth={1.25} />
              <span>Export Custom View (PDF)</span>
            </button>
          ) : (
            <a
              href={canonicalPdfPath}
              download={pdfFileName}
              className="inline-flex items-center gap-1.5 rounded-sm bg-ink-primary px-3.5 py-1.5 text-xs font-medium text-canvas transition-opacity hover:opacity-90"
            >
              <Download className="h-3.5 w-3.5" strokeWidth={1.25} />
              <span>Download Full Media Kit (PDF)</span>
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
