import type { MediaKitData } from '../types/mediaKit';

/** RFC 6350 text escaping for vCard values. */
const esc = (v: string): string =>
  v
    .replace(/\\/g, '\\\\')
    .replace(/\r?\n/g, '\\n')
    .replace(/([,;])/g, '\\$1');

export function downloadVCard(data: MediaKitData): void {
  const nameParts = data.creator.fullName.trim().split(/\s+/);
  const firstName = nameParts[0] ?? data.creator.fullName;
  const lastName = nameParts.slice(1).join(' ');

  const vcfLines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${esc(lastName)};${esc(firstName)};;;`,
    `FN:${esc(`${data.creator.fullName} (${data.creator.handle})`)}`,
    `ORG:${esc(data.contact.managerName)}`,
    `TITLE:${esc(data.contact.representationLabel)}`,
    `TEL;TYPE=WORK,VOICE:${data.contact.phoneDisplay}`,
    `EMAIL;TYPE=PREF,INTERNET:${data.contact.bookingEmail}`,
    `EMAIL;TYPE=INTERNET:${data.contact.pressEmail}`,
    `URL:${data.meta.liveUrl}`,
    `NOTE:${esc(`${data.creator.tagline} | ${data.contact.giftingCityNote}`)}`,
    'END:VCARD',
  ];

  const blob = new Blob([vcfLines.join('\r\n')], {
    type: 'text/vcard;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `${data.creator.fullName.toLowerCase().replace(/\s+/g, '-')}-media-kit.vcf`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
