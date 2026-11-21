import { Check, Copy, Mail, Phone } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';
import type { MediaKitData } from '../types/mediaKit';

interface BookingFooterProps {
  contact: MediaKitData['contact'];
  meta: MediaKitData['meta'];
  creator: MediaKitData['creator'];
}

export function BookingFooter({ contact, meta, creator }: BookingFooterProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(contact.bookingEmail).catch(() => {});
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = contact.bookingEmail;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopiedEmail(true);
    window.setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <footer className="avoid-break py-12">
      <div className="grid grid-cols-1 items-center gap-8 border border-hairline bg-surface p-6 sm:p-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-bronze">
            {contact.representationLabel}
          </p>
          <h2 className="mt-2 font-serif text-3xl font-normal text-ink-primary">
            {contact.managerName}
          </h2>

          <div className="mt-5 flex flex-wrap items-center gap-4 text-xs">
            <a
              href={`mailto:${contact.bookingEmail}`}
              className="inline-flex items-center gap-2 font-mono text-ink-primary underline decoration-hairline underline-offset-4 hover:decoration-bronze"
            >
              <Mail className="h-3.5 w-3.5 text-bronze" strokeWidth={1.25} />
              <span>{contact.bookingEmail}</span>
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="no-print inline-flex items-center gap-1.5 rounded-sm border border-hairline bg-canvas px-2.5 py-1 text-[11px] font-medium text-ink-primary hover:border-ink-primary"
            >
              {copiedEmail ? (
                <>
                  <Check className="h-3 w-3 text-bronze" strokeWidth={1.5} />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" strokeWidth={1.25} />
                  <span>Copy Email</span>
                </>
              )}
            </button>

            <span className="inline-flex items-center gap-1.5 font-mono text-ink-secondary">
              <Phone className="h-3.5 w-3.5 text-bronze" strokeWidth={1.25} />
              <span>{contact.phoneDisplay}</span>
            </span>
          </div>

          <p className="mt-4 text-xs text-ink-secondary">
            Press Inquiries:{' '}
            <a
              href={`mailto:${contact.pressEmail}`}
              className="font-mono text-ink-primary underline decoration-hairline underline-offset-4"
            >
              {contact.pressEmail}
            </a>
          </p>
          <p className="mt-2 text-xs text-ink-secondary">
            {contact.giftingCityNote}
          </p>
        </div>

        <div className="flex items-center gap-4 border-t border-hairline pt-6 lg:col-span-4 lg:justify-end lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <div className="border border-hairline bg-white p-2">
            <QRCodeSVG
              value={meta.liveUrl}
              size={84}
              bgColor="#FFFFFF"
              fgColor="#141413"
              level="M"
            />
          </div>
          <div className="text-xs">
            <p className="font-medium uppercase tracking-[0.14em] text-ink-primary">
              Live Dossier
            </p>
            <p className="mt-1 font-mono text-[11px] text-ink-secondary">
              {creator.handle}
            </p>
            <p className="mt-1 text-[11px] text-ink-secondary">
              Scan for real-time rates &amp; video reels
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
