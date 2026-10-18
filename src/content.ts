// Every business fact on the site lives here, so a price or number changes in one place.

export type ModalId = 'plan' | 'get-started' | 'services' | 'results';

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export const WHATSAPP_NUMBER = '918951707767';
export const WHATSAPP_DISPLAY = '+91 89517 07767';

export const waLink = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const NAV_ITEMS: NavItem[] = [
  { id: 'results', label: 'Results', href: '#results' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'clients', label: 'Clients', href: '#clients' },
  { id: 'pricing', label: 'Pricing', href: '#pricing' },
];

// GST wording is still to be confirmed by the owner ("incl." or "+ GST").
export const PRICE = {
  setup: '₹19,999',
  monthly: '₹1,200',
  gstNote: 'GST as applicable',
};

// Daily figures from Dr. Nafia's clinic, Varthur, before and after the plan.
export const CASE_STUDY = [
  { label: 'Phone calls', sub: 'per day, from Google', before: 0, after: 45, suffix: '' },
  { label: 'WhatsApp messages', sub: 'per day', before: 2, after: 80, suffix: '' },
  { label: 'Profile impressions', sub: 'per day, on Search and Maps', before: 12, after: 600, suffix: '+' },
];

export const CLIENTS = [
  {
    initials: 'DN',
    name: "Dr. Nafia's Homoeopathic Medical Centre",
    place: 'Varthur, Bengaluru',
    doctors: 'Dr. Nafia M, BHMS',
    rating: '4.9',
    reviews: '150+',
    site: 'dnhcare.co.in',
    work: ['Website', 'Google profile', 'AI agents'],
  },
  {
    initials: 'DT',
    name: "Dr. Talal's Alsharaf Homoeo Medical Centre",
    place: 'Kappalandimukku, Kochi',
    doctors: 'Dr. Talal M, Dr. Tariq M, Dr. Safna M.S',
    rating: '5.0',
    reviews: '163',
    site: 'drtalalhomeo.in',
    work: ['Website', 'Google profile'],
  },
];

export const SERVICES = [
  {
    title: 'Google Business Profile + AI agent',
    text: 'Categories, services, photos and hours set up right. Then a fresh Google post every week and a reply drafted for every review.',
  },
  {
    title: 'Website + AI agent',
    text: 'A fast mobile site that matches your Google listing, with call and WhatsApp buttons on every page. Kept fresh by AI.',
  },
  {
    title: 'Meta Ads, set up and run',
    text: 'Facebook and Instagram ads shown to people in your area. 2 ad creatives included free for the whole plan.',
  },
  {
    title: 'Free ranking report',
    text: 'A map of where you rank across your area, your top 3 competitors and 3 things they do that you don’t. Within 24 hours.',
  },
];

export const INCLUDED = [
  'Google profile optimisation',
  'Google profile AI agent',
  'Mobile website with AI agent',
  'Monthly website update requests',
  'Meta Ads setup, running and optimisation',
  '2 ad creatives free for the whole plan',
];

export const NOT_INCLUDED = [
  'Domain name (yearly renewal, in your name)',
  'Meta ad spend, paid to Meta from your card',
  'Any Google fees',
  'Social media handling: Reels, posts and page management',
];

export const MONTHS = [
  { tag: 'Month 1 · Set up', title: 'Fix the foundations', text: 'We build your website, optimise your Google profile and launch your first Meta Ads in your area.' },
  { tag: 'Month 2 · Run', title: 'AI agents take over the routine', text: 'Weekly Google posts, review replies and website updates run on their own. We tune the ads on what brings real enquiries.' },
  { tag: 'Month 3 · Grow', title: 'Review the numbers together', text: 'We compare calls, WhatsApp messages and profile views against where you started, then plan what comes next.' },
];

export const BEFORE = [
  'Google profile set up once, years ago, with old photos and wrong hours',
  'Reviews left without a reply for weeks',
  'No website, or one that is slow and hard to use on a phone',
  'Boosted posts on Instagram with no idea what they brought in',
];

export const AFTER = [
  'Profile optimised, with a fresh Google post every week',
  'A reply drafted for every new review',
  'A mobile website with call and WhatsApp buttons, matching your listing',
  'Meta Ads aimed at your area, tracked by calls and WhatsApp enquiries',
];

export const FAQ = [
  { q: 'Can you get my business to No. 1 on Google?', a: 'No one can guarantee a ranking. Google says so itself. We fix everything Google looks at for local results, keep your profile active every week, and send nearby people to you through ads. Most businesses climb as a result.' },
  { q: 'How soon will I see more calls?', a: 'The website, profile fixes and ads go live in the first month, and ads can bring enquiries within days. Google rankings take longer to move, which is why the plan runs for 3 months.' },
  { q: 'My Google profile is new. Can I still join?', a: 'Yes. Google only lets AI tools manage profiles that are verified and 60+ days old. Until yours qualifies, we optimise it by hand, and the rest of the plan runs as normal.' },
  { q: 'Will you manage my Instagram and Facebook page?', a: 'We run your ads, we don’t manage your page. Reels, regular posts and page management are not part of this plan.' },
  { q: 'How much should I spend on Meta Ads?', a: 'Ad spend is paid directly to Meta from your own card, so you stay in control. We suggest a daily budget that suits your area when we set up the campaign.' },
  { q: 'What happens if I stop?', a: 'You can stop anytime with no penalty. The AI automations pause, and your domain, Google profile and ad account stay with you.' },
];
