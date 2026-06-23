export type ScamCategory =
  | 'credential-harvest'
  | 'invoice-fraud'
  | 'ceo-fraud'
  | 'prize-scam'
  | 'tech-support'
  | 'shipping-scam'
  | 'hr-payroll'
  | 'account-suspension'
  | 'legitimate';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface EmailLink {
  id: string;
  /** The visible anchor text shown in the email body */
  label: string;
  /** What the link *looks* like it points to, shown in body text */
  displayUrl: string;
  /** What it actually resolves to underneath — revealed on hover/inspect */
  actualUrl: string;
  /** Whether this particular link is the suspicious one */
  suspicious: boolean;
}

export interface EmailAttachment {
  name: string;
  size: string;
  suspicious: boolean;
}

export interface RedFlag {
  id: string;
  label: string;
  description: string;
  /** which part of the UI this points at, for the inspector overlay */
  target: 'sender' | 'subject' | 'greeting' | 'body' | 'link' | 'attachment' | 'urgency';
}

export interface TrustSignal {
  id: string;
  label: string;
  description: string;
  target: 'sender' | 'subject' | 'greeting' | 'body' | 'link' | 'attachment' | 'urgency';
}

export interface EmailScenario {
  id: string;
  isPhishing: boolean;
  category: ScamCategory;
  difficulty: Difficulty;
  senderName: string;
  /** the email address shown in the "from" field */
  senderEmail: string;
  /** if true, the display name doesn't match the real sending domain */
  spoofedDisplayName?: boolean;
  subject: string;
  preview: string;
  date: string;
  greeting: string;
  bodyParagraphs: string[];
  links: EmailLink[];
  attachments: EmailAttachment[];
  redFlags: RedFlag[];
  trustSignals: TrustSignal[];
  /** archetype used to pair phishing/legit lookalikes, e.g. "meridian-bank" */
  archetype: string;
  isCustom?: boolean;
}

export type UserVerdict = 'phishing' | 'safe';

export interface AttemptRecord {
  scenarioId: string;
  verdict: UserVerdict;
  correct: boolean;
  usedInspector: boolean;
  timestamp: number;
}

export interface SessionStats {
  attempts: AttemptRecord[];
  streak: number;
  bestStreak: number;
}

export const CATEGORY_LABELS: Record<ScamCategory, string> = {
  'credential-harvest': 'Credential harvesting',
  'invoice-fraud': 'Invoice fraud',
  'ceo-fraud': 'CEO / executive fraud',
  'prize-scam': 'Prize & lottery scam',
  'tech-support': 'Tech support scam',
  'shipping-scam': 'Shipping & delivery scam',
  'hr-payroll': 'HR & payroll phishing',
  'account-suspension': 'Account suspension scare',
  legitimate: 'Legitimate email',
};
