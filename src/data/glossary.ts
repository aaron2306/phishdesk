export interface GlossaryEntry {
  id: string;
  title: string;
  summary: string;
  details: string;
}

export const RED_FLAG_GLOSSARY: GlossaryEntry[] = [
  {
    id: 'urgency',
    title: 'Manufactured urgency',
    summary: 'Tight deadlines, countdowns, or threats designed to make you act before you think.',
    details: 'Phrases like "within 24 hours," "your account will be suspended," or "act now" exist to short-circuit careful reading. Legitimate organizations rarely demand instant action over email — they give you time and multiple ways to verify.',
  },
  {
    id: 'sender-domain',
    title: 'Look-alike or mismatched domains',
    summary: 'The sending address is close to — but not exactly — the real domain.',
    details: 'Watch for extra words ("-secure", "-verify", "-alert"), swapped letters, or unfamiliar endings (.info, .net, .xyz) on a domain that should be a single, consistent address. Always compare it to a domain you already know is correct.',
  },
  {
    id: 'mismatched-link',
    title: 'Link text that doesn\'t match its destination',
    summary: 'What a link says and where it actually goes can be two different things.',
    details: 'Hovering over a link (or long-pressing on mobile) reveals its real destination before you click. If the visible text says one domain but the underlying link goes somewhere else, that\'s a hard stop.',
  },
  {
    id: 'generic-greeting',
    title: 'Generic greetings',
    summary: '"Dear Customer," "Dear User," or no name at all.',
    details: 'Organizations that actually hold your account information almost always greet you by name. Mass phishing campaigns sent to thousands of addresses usually can\'t.',
  },
  {
    id: 'sensitive-requests',
    title: 'Requests for sensitive information',
    summary: 'Being asked to type a password, OTP, card number, or bank details directly.',
    details: 'No legitimate bank, employer, or service should ever ask you to re-enter your password or full financial details by following a link in an email. When in doubt, navigate to the site yourself instead of clicking through.',
  },
  {
    id: 'unexpected-attachments',
    title: 'Unexpected attachments',
    summary: 'A file you weren\'t expecting, especially .zip or .exe files.',
    details: 'Malware is frequently delivered as an attachment paired with an urgent pretext ("invoice," "policy update," "scan report"). If you weren\'t expecting a file, verify with the sender through another channel before opening it.',
  },
  {
    id: 'too-good',
    title: 'Too good to be true offers',
    summary: 'Prizes, refunds, or gift cards you never asked for.',
    details: 'If you don\'t remember entering a contest or requesting a refund, an email announcing you\'ve won something is almost always a lure — especially if claiming it requires paying a "small fee" first.',
  },
  {
    id: 'secrecy',
    title: 'Requests for secrecy or to bypass normal process',
    summary: '"Keep this between us," or skipping the usual approval steps.',
    details: 'Common in executive-impersonation scams. Legitimate requests from leadership rarely ask you to hide what you\'re doing from colleagues, finance, or your manager.',
  },
  {
    id: 'verify-out-of-band',
    title: 'No way to verify out-of-band',
    summary: 'The message discourages or prevents you from confirming through another channel.',
    details: 'Claims of being "unreachable" or "too busy to call" are designed to stop you from picking up the phone and verifying the request directly with the person or organization involved.',
  },
  {
    id: 'spelling',
    title: 'Spelling and formatting inconsistencies',
    summary: 'Odd phrasing, inconsistent fonts, or subtle typos in brand names.',
    details: 'While modern phishing is often polished, inconsistent formatting, awkward phrasing, or a misspelled brand name (e.g. "gmaiil.com") are still common tells worth scanning for.',
  },
];
