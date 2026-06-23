import { EmailScenario } from '../types';

/**
 * All organizations, people, and domains below are fictional archetypes built
 * for training purposes. They are designed to mirror the *structure* of real
 * scam patterns (urgency, look-alike domains, mismatched links, generic
 * greetings) without referencing any real company or person.
 */

export const BUILT_IN_SCENARIOS: EmailScenario[] = [
  // ───────────────────────── 1. MERIDIAN BANK — PHISHING ─────────────────────────
  {
    id: 'meridian-phish',
    isPhishing: true,
    category: 'credential-harvest',
    difficulty: 'easy',
    senderName: 'Meridian Bank Security',
    senderEmail: 'alerts@meridian-bank-verify.com',
    spoofedDisplayName: true,
    subject: 'URGENT: Your account has been temporarily limited',
    preview: "We've noticed unusual activity on your account. Verify now to avoid...",
    date: 'Today, 8:41 AM',
    greeting: 'Dear Valued Customer,',
    bodyParagraphs: [
      'We detected unusual sign-in activity on your Meridian Bank account from an unrecognized device. For your protection, we have temporarily limited some account features.',
      'To restore full access, you must verify your identity within 24 hours. Accounts that are not verified in time may be permanently suspended.',
      'Click the secure link below to confirm your details and unlock your account immediately.',
    ],
    links: [
      {
        id: 'l1',
        label: 'Verify My Account',
        displayUrl: 'meridianbank.com/secure-verify',
        actualUrl: 'http://meridian-bank-verify.com/login.php?id=88421',
        suspicious: true,
      },
    ],
    attachments: [],
    redFlags: [
      { id: 'f1', label: 'Look-alike domain', description: 'The sender domain is "meridian-bank-verify.com" — not the bank\'s real domain. Scammers register similar-looking domains to seem legitimate at a glance.', target: 'sender' },
      { id: 'f2', label: 'Generic greeting', description: 'Real banks almost always use your actual name. "Dear Valued Customer" means they don\'t know who you are.', target: 'greeting' },
      { id: 'f3', label: 'Manufactured urgency', description: 'A tight, scary deadline ("24 hours" or your account is "permanently suspended") is designed to make you act before you think.', target: 'urgency' },
      { id: 'f4', label: 'Link text doesn\'t match destination', description: 'The link displays "meridianbank.com" but actually points to a completely different domain with a suspicious login script.', target: 'link' },
    ],
    trustSignals: [],
    archetype: 'meridian-bank',
  },

  // ───────────────────────── 2. MERIDIAN BANK — LEGIT ─────────────────────────
  {
    id: 'meridian-legit',
    isPhishing: false,
    category: 'legitimate',
    difficulty: 'easy',
    senderName: 'Meridian Bank',
    senderEmail: 'statements@meridianbank.com',
    subject: 'Your June e-statement is ready to view',
    preview: 'Hi Aaron, your latest account statement is now available in online banking.',
    date: 'Yesterday, 6:02 PM',
    greeting: 'Hi Aaron,',
    bodyParagraphs: [
      'Your e-statement for the account ending in 4821 is now ready. You can view or download it any time from your online banking dashboard.',
      'As always, we will never ask you to confirm your password, PIN, or card number by email. If anything ever looks off, log in directly through the app instead of clicking email links.',
    ],
    links: [
      {
        id: 'l1',
        label: 'View Statement',
        displayUrl: 'meridianbank.com/statements',
        actualUrl: 'https://meridianbank.com/statements',
        suspicious: false,
      },
    ],
    attachments: [],
    redFlags: [],
    trustSignals: [
      { id: 't1', label: 'Domain matches exactly', description: 'Sent from "meridianbank.com" — the bank\'s actual, consistent domain, not a variant.', target: 'sender' },
      { id: 't2', label: 'Personalized greeting', description: 'Addressed to you by name, with the specific last 4 digits of your real account — not a generic "Dear Customer."', target: 'greeting' },
      { id: 't3', label: 'No pressure or threats', description: 'There\'s no countdown, no threat of suspension, nothing demanding immediate action.', target: 'urgency' },
      { id: 't4', label: 'Link text matches destination', description: 'Hovering the link shows it actually goes to the bank\'s real domain — not a redirect to somewhere else.', target: 'link' },
    ],
    archetype: 'meridian-bank',
  },

  // ───────────────────────── 3. CASCADE CLOUD — PHISHING ─────────────────────────
  {
    id: 'cascade-phish',
    isPhishing: true,
    category: 'credential-harvest',
    difficulty: 'medium',
    senderName: 'Cascade Cloud',
    senderEmail: 'no-reply@cascade-cloud-storage.net',
    spoofedDisplayName: true,
    subject: 'A document was shared with you: "Q3_Budget_Final.xlsx"',
    preview: 'Priya Nair shared a file with you via Cascade Cloud. Click to view.',
    date: 'Today, 11:14 AM',
    greeting: 'Hello,',
    bodyParagraphs: [
      'Priya Nair (priya.nair@yourcompany.com) has shared a file with you on Cascade Cloud.',
      '"Q3_Budget_Final.xlsx" — Shared with: you only',
      'To view this file, you\'ll need to sign in with your work email and password to confirm you\'re authorized to access it.',
    ],
    links: [
      {
        id: 'l1',
        label: 'Open Document',
        displayUrl: 'cascadecloud.com/shared/Q3_Budget_Final',
        actualUrl: 'http://cascade-cloud-storage.net/auth/share?doc=2291&redir=1',
        suspicious: true,
      },
    ],
    attachments: [],
    redFlags: [
      { id: 'f1', label: 'Sender domain is not the real product domain', description: '"cascade-cloud-storage.net" is not Cascade Cloud\'s actual domain — note the extra words and the .net ending used to look official.', target: 'sender' },
      { id: 'f2', label: 'Login required just to "view" a shared file', description: 'Legitimate file shares usually open straight into a viewer for people already signed in. Being asked to re-enter your password just to preview a file is a major red flag.', target: 'body' },
      { id: 'f3', label: 'No greeting by name', description: 'A real internal share would usually be addressed to you specifically, not a generic "Hello."', target: 'greeting' },
      { id: 'f4', label: 'Mismatched link destination', description: 'The link text shows the real product domain, but the underlying URL is the look-alike domain with a generic "auth" path.', target: 'link' },
    ],
    trustSignals: [],
    archetype: 'cascade-cloud',
  },

  // ───────────────────────── 4. CASCADE CLOUD — LEGIT ─────────────────────────
  {
    id: 'cascade-legit',
    isPhishing: false,
    category: 'legitimate',
    difficulty: 'easy',
    senderName: 'Cascade Cloud',
    senderEmail: 'security@cascadecloud.com',
    subject: 'New sign-in to your account from a new device',
    preview: 'We noticed a new sign-in from a Windows device in Bengaluru, India.',
    date: '2 days ago, 9:30 PM',
    greeting: 'Hi Aaron,',
    bodyParagraphs: [
      'We noticed a new sign-in to your Cascade Cloud account from a Windows device in Bengaluru, India, on June 21 at 9:28 PM.',
      'If this was you, no action is needed. If you don\'t recognize this activity, you can review your active sessions and secure your account from your security settings — no need to click anything in this email.',
    ],
    links: [
      {
        id: 'l1',
        label: 'Review account activity',
        displayUrl: 'cascadecloud.com/security/activity',
        actualUrl: 'https://cascadecloud.com/security/activity',
        suspicious: false,
      },
    ],
    attachments: [],
    redFlags: [],
    trustSignals: [
      { id: 't1', label: 'Correct, consistent domain', description: 'Sent from "cascadecloud.com" — matching the real product name with no extra words or unusual TLD.', target: 'sender' },
      { id: 't2', label: 'Specific, verifiable details', description: 'Names a real device type, location, and timestamp you can cross-check yourself, rather than vague claims of "unusual activity."', target: 'body' },
      { id: 't3', label: 'Explicitly says no action is required', description: 'Genuine security alerts often reassure you that doing nothing is fine — phishing almost never does this.', target: 'urgency' },
    ],
    archetype: 'cascade-cloud',
  },

  // ───────────────────────── 5. APEX HR — PHISHING ─────────────────────────
  {
    id: 'apex-hr-phish',
    isPhishing: true,
    category: 'hr-payroll',
    difficulty: 'hard',
    senderName: 'Apex HR Self-Service',
    senderEmail: 'payroll-update@apex-hrportal.com',
    spoofedDisplayName: false,
    subject: 'Action required: Confirm your direct deposit details before payroll runs',
    preview: 'Our records show your bank verification is incomplete. Update before Friday.',
    date: 'Today, 7:55 AM',
    greeting: 'Dear Employee,',
    bodyParagraphs: [
      'As part of this quarter\'s payroll system migration, all employees must re-confirm their direct deposit information by Friday at 5 PM, or your next paycheck may be delayed.',
      'This will only take two minutes. Please use the secure portal below to verify your bank account and routing number.',
      'If you have already updated your information this quarter, you can disregard this message.',
    ],
    links: [
      {
        id: 'l1',
        label: 'Confirm My Direct Deposit',
        displayUrl: 'apexhr.com/payroll/confirm',
        actualUrl: 'http://apex-hrportal.com/dd-verify/index.html?ref=q3migration',
        suspicious: true,
      },
    ],
    attachments: [],
    redFlags: [
      { id: 'f1', label: 'Domain is close, but not exact', description: '"apex-hrportal.com" is close enough to look real at a glance, but it isn\'t the same domain the link text claims ("apexhr.com"). Always compare the actual sending domain, not just the brand name in it.', target: 'sender' },
      { id: 'f2', label: 'Asks for bank routing & account numbers', description: 'A legitimate "system migration" notice describes a process — it doesn\'t ask you to re-type your full bank routing and account number into a link from an email.', target: 'body' },
      { id: 'f3', label: 'Payroll-tied deadline pressure', description: 'Threatening a delayed paycheck creates urgency specifically tuned to make employees skip their usual caution.', target: 'urgency' },
      { id: 'f4', label: 'Convenient "disregard if already done" line', description: 'This line is a common scam tactic — it lowers suspicion for people who hesitate, while still hoping enough people click without thinking.', target: 'body' },
    ],
    trustSignals: [],
    archetype: 'apex-hr',
  },

  // ───────────────────────── 6. APEX HR — LEGIT ─────────────────────────
  {
    id: 'apex-hr-legit',
    isPhishing: false,
    category: 'legitimate',
    difficulty: 'medium',
    senderName: 'Apex HR Self-Service',
    senderEmail: 'noreply@apexhr.com',
    subject: 'Your June payslip is now available',
    preview: 'Hi Aaron, your payslip for June 2026 has been posted to your HR portal.',
    date: '3 days ago, 10:00 AM',
    greeting: 'Hi Aaron,',
    bodyParagraphs: [
      'Your payslip for June 2026 is now available in the HR portal. Log in through the usual portal (not through this email) to view or download it.',
      'As a reminder, Apex HR will never ask you to provide your bank details by email — all banking updates are made directly inside the portal after you sign in.',
    ],
    links: [
      {
        id: 'l1',
        label: 'Go to HR Portal',
        displayUrl: 'apexhr.com/login',
        actualUrl: 'https://apexhr.com/login',
        suspicious: false,
      },
    ],
    attachments: [],
    redFlags: [],
    trustSignals: [
      { id: 't1', label: 'Exact domain match', description: 'Sent from "apexhr.com" with no extra words, hyphens, or unusual endings.', target: 'sender' },
      { id: 't2', label: 'Tells you not to trust links blindly', description: 'It explicitly nudges you to log in through the usual portal rather than clicking through — a sign of a security-conscious organization.', target: 'body' },
      { id: 't3', label: 'No request for sensitive data', description: 'It never asks you to type bank details anywhere in the email.', target: 'body' },
    ],
    archetype: 'apex-hr',
  },

  // ───────────────────────── 7. NORTHWIND IT — PHISHING ─────────────────────────
  {
    id: 'northwind-phish',
    isPhishing: true,
    category: 'account-suspension',
    difficulty: 'easy',
    senderName: 'Northwind IT Helpdesk',
    senderEmail: 'helpdesk@northwind-itsupport-alert.com',
    spoofedDisplayName: true,
    subject: 'Your password expires today — verify now to keep access',
    preview: 'Your email password will expire in a few hours. Click here to keep your account.',
    date: 'Today, 6:10 AM',
    greeting: 'Dear User,',
    bodyParagraphs: [
      'Our system shows that your password is set to expire today. If you do not verify your credentials immediately, you will lose access to your email and calendar.',
      'Click below now to keep your current password and avoid being locked out.',
    ],
    links: [
      {
        id: 'l1',
        label: 'Keep My Password Active',
        displayUrl: 'northwindcorp.com/it/verify',
        actualUrl: 'http://northwind-itsupport-alert.com/verify-now.html',
        suspicious: true,
      },
    ],
    attachments: [
      { name: 'IT_Policy_Update.zip', size: '212 KB', suspicious: true },
    ],
    redFlags: [
      { id: 'f1', label: 'Suspicious sender domain', description: '"northwind-itsupport-alert.com" is not a real IT department domain — note the alarmist word "alert" baked right into it.', target: 'sender' },
      { id: 'f2', label: 'Same-day deadline', description: 'A same-day, no-warning deadline is designed to short-circuit careful thinking.', target: 'urgency' },
      { id: 'f3', label: 'Unexpected zipped attachment', description: 'A compressed attachment you didn\'t ask for, attached to an urgent password message, is a classic malware delivery pattern.', target: 'attachment' },
      { id: 'f4', label: 'Generic greeting', description: '"Dear User" instead of your name — real IT systems usually know exactly who you are.', target: 'greeting' },
    ],
    trustSignals: [],
    archetype: 'northwind-it',
  },

  // ───────────────────────── 8. NORTHWIND IT — LEGIT ─────────────────────────
  {
    id: 'northwind-legit',
    isPhishing: false,
    category: 'legitimate',
    difficulty: 'easy',
    senderName: 'Northwind IT Helpdesk',
    senderEmail: 'it-helpdesk@northwindcorp.com',
    subject: 'Scheduled maintenance this Saturday, 11 PM – 2 AM',
    preview: 'Email and VPN access will be briefly unavailable during planned maintenance.',
    date: '4 days ago, 3:45 PM',
    greeting: 'Hi team,',
    bodyParagraphs: [
      'We\'ll be performing scheduled server maintenance this Saturday from 11 PM to 2 AM IST. Email, calendar, and VPN access may be intermittently unavailable during this window.',
      'No action is needed on your part. If you experience any issues after the window ends, raise a ticket through the helpdesk portal as usual.',
    ],
    links: [
      {
        id: 'l1',
        label: 'Helpdesk Portal',
        displayUrl: 'northwindcorp.com/helpdesk',
        actualUrl: 'https://northwindcorp.com/helpdesk',
        suspicious: false,
      },
    ],
    attachments: [],
    redFlags: [],
    trustSignals: [
      { id: 't1', label: 'Matches the real corporate domain', description: 'Sent from "northwindcorp.com" — the organization\'s actual domain, no extra alarming words tacked on.', target: 'sender' },
      { id: 't2', label: 'No action required', description: 'A routine maintenance notice that explicitly says nothing needs to be done is a normal, low-pressure IT communication.', target: 'urgency' },
      { id: 't3', label: 'No attachments, no credential requests', description: 'Nothing to download, nothing to "verify."', target: 'attachment' },
    ],
    archetype: 'northwind-it',
  },

  // ───────────────────────── 9. GLOBALSHIP — PHISHING ─────────────────────────
  {
    id: 'globalship-phish',
    isPhishing: true,
    category: 'shipping-scam',
    difficulty: 'medium',
    senderName: 'GlobalShip Couriers',
    senderEmail: 'tracking@globalship-delivery-status.com',
    spoofedDisplayName: true,
    subject: 'Delivery failed: Customs fee of ₹149 required',
    preview: 'Your parcel #GS44129837 could not be delivered. Pay a small fee to reschedule.',
    date: 'Today, 1:02 PM',
    greeting: 'Hello,',
    bodyParagraphs: [
      'We attempted to deliver your parcel #GS44129837 today but were unable to complete delivery due to an outstanding customs handling fee of ₹149.',
      'Please settle this fee within 48 hours to release your parcel for redelivery, or it will be returned to the sender.',
    ],
    links: [
      {
        id: 'l1',
        label: 'Pay Customs Fee & Reschedule',
        displayUrl: 'globalshipcouriers.com/track/pay',
        actualUrl: 'http://globalship-delivery-status.com/fee-payment?ref=GS44129837',
        suspicious: true,
      },
    ],
    attachments: [],
    redFlags: [
      { id: 'f1', label: 'Unexpected parcel you weren\'t tracking', description: 'If you weren\'t already expecting a delivery, an urgent "your parcel is stuck" message should raise suspicion immediately.', target: 'body' },
      { id: 'f2', label: 'Small, easy-to-pay fee', description: 'Scammers often ask for a tiny amount specifically because people don\'t think twice about paying it — the real goal is harvesting your card details on the page that follows.', target: 'body' },
      { id: 'f3', label: 'Look-alike sender domain', description: '"globalship-delivery-status.com" is not the courier\'s real domain — compare it carefully to the link text shown.', target: 'sender' },
      { id: 'f4', label: 'Link destination doesn\'t match the brand domain', description: 'The button text shows the real-looking brand domain, but the underlying link goes somewhere else entirely.', target: 'link' },
    ],
    trustSignals: [],
    archetype: 'globalship',
  },

  // ───────────────────────── 10. GLOBALSHIP — LEGIT ─────────────────────────
  {
    id: 'globalship-legit',
    isPhishing: false,
    category: 'legitimate',
    difficulty: 'easy',
    senderName: 'GlobalShip Couriers',
    senderEmail: 'noreply@globalshipcouriers.com',
    subject: 'Delivered: Your package #GS39102841 has arrived',
    preview: 'Your package was delivered today at 2:14 PM and left at your doorstep.',
    date: 'Today, 2:15 PM',
    greeting: 'Hi Aaron,',
    bodyParagraphs: [
      'Good news! Your package #GS39102841 was delivered today at 2:14 PM. A photo of the delivery is available in your tracking history.',
      'No further action is needed. If something looks wrong, you can always raise it directly from your order page — never from a link asking for payment in an email.',
    ],
    links: [
      {
        id: 'l1',
        label: 'View Delivery Photo',
        displayUrl: 'globalshipcouriers.com/track/GS39102841',
        actualUrl: 'https://globalshipcouriers.com/track/GS39102841',
        suspicious: false,
      },
    ],
    attachments: [],
    redFlags: [],
    trustSignals: [
      { id: 't1', label: 'Matches a parcel you\'re actually expecting', description: 'Tied to a real order with a tracking number you recognize, not an out-of-the-blue claim.', target: 'body' },
      { id: 't2', label: 'No payment requested', description: 'A delivery confirmation never asks for money — only a failed-delivery scam does that.', target: 'body' },
      { id: 't3', label: 'Correct domain', description: 'Sent from and linking to the same real domain, "globalshipcouriers.com."', target: 'sender' },
    ],
    archetype: 'globalship',
  },

  // ───────────────────────── 11. CEO / EXECUTIVE FRAUD ─────────────────────────
  {
    id: 'ceo-fraud',
    isPhishing: true,
    category: 'ceo-fraud',
    difficulty: 'hard',
    senderName: 'Marcus Lindqvist',
    senderEmail: 'marcus.lindqvist@gmaiil.com',
    spoofedDisplayName: true,
    subject: 'Quick favor',
    preview: 'Are you at your desk? Need you to handle something discreetly today.',
    date: 'Today, 9:18 AM',
    greeting: 'Hi,',
    bodyParagraphs: [
      'Are you at your desk? I\'m stuck in back-to-back board calls and can\'t talk, but I need a quick favor handled discreetly before noon.',
      'I need you to purchase five $100 gift cards for a client gesture — I\'ll explain and reimburse you later today. Just reply here once you\'ve got them and I\'ll tell you where to send the codes.',
      'Please keep this between us for now, it\'s a bit of a surprise. Thanks — appreciate you.',
    ],
    links: [],
    attachments: [],
    redFlags: [
      { id: 'f1', label: 'Display name matches, email address doesn\'t', description: 'The name "Marcus Lindqvist" might match your real executive, but the address is a free, misspelled "gmaiil.com" account — not a company email.', target: 'sender' },
      { id: 'f2', label: 'Asks for secrecy', description: '"Keep this between us" is a major warning sign — legitimate requests from leadership are rarely asked to be hidden from colleagues or finance.', target: 'body' },
      { id: 'f3', label: 'Unusual, urgent, hard-to-verify request', description: 'Gift cards are untraceable and irreversible once the codes are sent — a favorite payout method for scammers impersonating executives.', target: 'body' },
      { id: 'f4', label: 'Manufactured unavailability', description: 'Claiming to be "unreachable" pre-empts you calling to verify the request through a different channel.', target: 'urgency' },
    ],
    trustSignals: [],
    archetype: 'exec-request',
  },

  // ───────────────────────── 12. PRIZE / SWEEPSTAKES SCAM ─────────────────────────
  {
    id: 'prize-scam',
    isPhishing: true,
    category: 'prize-scam',
    difficulty: 'easy',
    senderName: 'Rewards Center',
    senderEmail: 'winner-notice@reward-claim-center.info',
    spoofedDisplayName: true,
    subject: 'Congratulations! You\'ve been selected to win a $1,000 gift card',
    preview: 'Your email was randomly selected as today\'s lucky winner. Claim your prize now!',
    date: 'Today, 4:02 AM',
    greeting: 'Dear Winner,',
    bodyParagraphs: [
      'CONGRATULATIONS! Your email address has been randomly selected to receive a $1,000 prepaid gift card as part of our monthly customer rewards draw.',
      'This offer is only valid for the next 30 minutes. Claim your prize now by confirming your details — all we need is your full name, address, and a small verification payment to cover shipping.',
    ],
    links: [
      {
        id: 'l1',
        label: 'Claim Your $1,000 Prize',
        displayUrl: 'official-rewards.com/claim',
        actualUrl: 'http://reward-claim-center.info/claim?winner=true&id=58821',
        suspicious: true,
      },
    ],
    attachments: [],
    redFlags: [
      { id: 'f1', label: 'You never entered anything', description: 'A prize you never entered to win, for a contest you\'ve never heard of, is the single biggest tell of a sweepstakes scam.', target: 'body' },
      { id: 'f2', label: 'Asks for payment to receive a "free" prize', description: 'Real prizes never require you to pay a fee upfront — that\'s the entire scam.', target: 'body' },
      { id: 'f3', label: 'Extremely short, fake deadline', description: 'A 30-minute countdown removes any time to think it through or check if it\'s real.', target: 'urgency' },
      { id: 'f4', label: 'Suspicious domain', description: '"reward-claim-center.info" is a generic, made-up domain with no real brand behind it.', target: 'sender' },
    ],
    trustSignals: [],
    archetype: 'sweepstakes',
  },

  // ───────────────────────── 13. TECH SUPPORT SCAM ─────────────────────────
  {
    id: 'tech-support-scam',
    isPhishing: true,
    category: 'tech-support',
    difficulty: 'easy',
    senderName: 'Windows Security Center',
    senderEmail: 'security-alert@pc-protect-now.com',
    spoofedDisplayName: true,
    subject: '⚠️ 3 viruses detected on your computer — act immediately',
    preview: 'Critical security threats found. Your personal files are at risk. Call support now.',
    date: 'Today, 5:30 AM',
    greeting: 'Attention Computer User,',
    bodyParagraphs: [
      'Our scan has detected 3 critical viruses and 12 vulnerabilities on your computer. Your personal files, photos, and banking information are at immediate risk of being stolen.',
      'Do not restart your computer. Call our certified technical support line right away at the number below, or click to start an emergency remote repair session.',
    ],
    links: [
      {
        id: 'l1',
        label: 'Start Emergency Repair',
        displayUrl: 'windows-support.com/repair',
        actualUrl: 'http://pc-protect-now.com/remote-access-install.exe',
        suspicious: true,
      },
    ],
    attachments: [
      { name: 'scan_report.exe', size: '4.8 MB', suspicious: true },
    ],
    redFlags: [
      { id: 'f1', label: 'Scary, vague technical claims', description: '"3 viruses and 12 vulnerabilities" sounds alarming but is meaningless — no legitimate antivirus alerts you by email this way.', target: 'body' },
      { id: 'f2', label: 'Pushes you toward remote access or a download', description: 'The real goal is getting you to install remote-access software or run an .exe file, which hands control of your computer to the scammer.', target: 'attachment' },
      { id: 'f3', label: '"Don\'t restart" instruction', description: 'Telling you not to restart or investigate is meant to stop you from simply closing the popup and walking away — the easiest real fix.', target: 'urgency' },
      { id: 'f4', label: 'No real company name or domain', description: '"pc-protect-now.com" doesn\'t belong to any real operating system or antivirus vendor.', target: 'sender' },
    ],
    trustSignals: [],
    archetype: 'browser-alert',
  },

  // ───────────────────────── 14. VENDOR INVOICE — PHISHING ─────────────────────────
  {
    id: 'vendor-invoice-phish',
    isPhishing: true,
    category: 'invoice-fraud',
    difficulty: 'hard',
    senderName: 'Stratton Office Supplies — Accounts',
    senderEmail: 'accounts@strattonsupplies-billing.com',
    spoofedDisplayName: false,
    subject: 'Invoice #4521 overdue — updated payment details enclosed',
    preview: 'Please note our banking details have changed. See attached invoice for new account.',
    date: 'Today, 10:47 AM',
    greeting: 'Hi Accounts Team,',
    bodyParagraphs: [
      'Following up on Invoice #4521, which is now 14 days overdue. Please note that our bank recently changed our merchant account — kindly use the updated bank details in the attached invoice for this and all future payments.',
      'Please process payment today to avoid a late fee being applied to your account.',
    ],
    links: [],
    attachments: [
      { name: 'Invoice_4521_Updated.pdf', size: '188 KB', suspicious: true },
    ],
    redFlags: [
      { id: 'f1', label: 'A change in bank details, requested only by email', description: 'Real vendors confirm banking changes by phone or through an existing verified contact — never solely through an unsolicited email, since this is the #1 way invoice fraud happens.', target: 'body' },
      { id: 'f2', label: 'Slightly altered sender domain', description: '"strattonsupplies-billing.com" adds an extra word to what is likely the vendor\'s normal domain — a subtle change that\'s easy to miss when you\'re used to seeing their invoices.', target: 'sender' },
      { id: 'f3', label: 'Pressure to pay "today"', description: 'A late-fee threat pushes Accounts to process payment quickly, before anyone double-checks the new bank details by calling the vendor directly.', target: 'urgency' },
      { id: 'f4', label: 'Payment details inside an attachment, not the portal', description: 'Burying changed bank details inside a PDF attachment — rather than your normal vendor portal — makes it harder to flag and easier to slip through.', target: 'attachment' },
    ],
    trustSignals: [],
    archetype: 'vendor-invoice',
  },

  // ───────────────────────── 15. VENDOR INVOICE — LEGIT ─────────────────────────
  {
    id: 'vendor-invoice-legit',
    isPhishing: false,
    category: 'legitimate',
    difficulty: 'medium',
    senderName: 'Stratton Office Supplies — Accounts',
    senderEmail: 'accounts@strattonsupplies.com',
    subject: 'Receipt: Invoice #4519 payment received, thank you',
    preview: 'We\'ve received your payment for Invoice #4519. Receipt attached for your records.',
    date: '5 days ago, 2:20 PM',
    greeting: 'Hi Accounts Team,',
    bodyParagraphs: [
      'This confirms we\'ve received your payment for Invoice #4519 in full. A receipt is attached for your records — no action needed.',
      'As always, if our banking details ever appear to change, please call our office directly using the number on file before updating anything, rather than relying on email alone.',
    ],
    links: [],
    attachments: [
      { name: 'Receipt_4519.pdf', size: '94 KB', suspicious: false },
    ],
    redFlags: [],
    trustSignals: [
      { id: 't1', label: 'Consistent vendor domain', description: '"strattonsupplies.com" — the plain, real vendor domain, with no extra qualifying words.', target: 'sender' },
      { id: 't2', label: 'No request to change anything', description: 'A receipt for a known invoice, with nothing new being asked of you.', target: 'body' },
      { id: 't3', label: 'Proactively tells you how to verify changes safely', description: 'Explicitly recommends calling to confirm any future bank-detail changes — a sign of a vendor that takes invoice fraud seriously.', target: 'body' },
    ],
    archetype: 'vendor-invoice',
  },

  // ───────────────────────── 16. INTERNAL CALENDAR INVITE — LEGIT ─────────────────────────
  {
    id: 'calendar-legit',
    isPhishing: false,
    category: 'legitimate',
    difficulty: 'easy',
    senderName: 'Priya Nair',
    senderEmail: 'priya.nair@yourcompany.com',
    subject: 'Weekly sync — moved to 4 PM this Thursday',
    preview: 'Hey, shifting our usual Thursday sync by an hour — same agenda doc as always.',
    date: '1 day ago, 11:05 AM',
    greeting: 'Hey Aaron,',
    bodyParagraphs: [
      'Quick heads up — moving our weekly sync from 3 PM to 4 PM this Thursday, same call link as always. Calendar invite updated.',
      'Same agenda doc as last week — add anything you want to cover before Thursday.',
    ],
    links: [
      {
        id: 'l1',
        label: 'Open Agenda Doc',
        displayUrl: 'docs.yourcompany.com/sync-agenda',
        actualUrl: 'https://docs.yourcompany.com/sync-agenda',
        suspicious: false,
      },
    ],
    attachments: [],
    redFlags: [],
    trustSignals: [
      { id: 't1', label: 'Internal, consistent domain', description: 'From a real colleague at your company\'s actual domain, with nothing unusual added.', target: 'sender' },
      { id: 't2', label: 'Casual, specific, low-stakes content', description: 'References a real recurring meeting and an existing shared doc — nothing being requested that you wouldn\'t expect.', target: 'body' },
    ],
    archetype: 'internal-colleague',
  },

  // ───────────────────────── 17. PRODUCT NEWSLETTER — LEGIT ─────────────────────────
  {
    id: 'newsletter-legit',
    isPhishing: false,
    category: 'legitimate',
    difficulty: 'easy',
    senderName: 'Cascade Cloud Updates',
    senderEmail: 'updates@cascadecloud.com',
    subject: 'What\'s new this month: faster search, dark mode, and more',
    preview: 'A quick look at what shipped this month, plus a few tips to get more out of search.',
    date: '6 days ago, 9:00 AM',
    greeting: 'Hi Aaron,',
    bodyParagraphs: [
      'Here\'s what shipped this month: search results now load up to 2x faster, dark mode is available across all platforms, and shared folders now support custom emoji reactions.',
      'As always, you can manage your notification preferences or unsubscribe at the bottom of this email — no login required.',
    ],
    links: [
      {
        id: 'l1',
        label: 'See full changelog',
        displayUrl: 'cascadecloud.com/changelog',
        actualUrl: 'https://cascadecloud.com/changelog',
        suspicious: false,
      },
    ],
    attachments: [],
    redFlags: [],
    trustSignals: [
      { id: 't1', label: 'Real, matching domain', description: 'Sent from and linking to the same consistent "cascadecloud.com" domain.', target: 'sender' },
      { id: 't2', label: 'No login or personal data requested', description: 'A routine product update that asks nothing of you beyond optionally reading more.', target: 'body' },
      { id: 't3', label: 'Easy, no-pressure opt-out', description: 'Mentions unsubscribing without requiring sign-in — typical of a legitimate mailing list, not a phishing lure.', target: 'body' },
    ],
    archetype: 'cascade-cloud',
  },
];
