const KEYS = {
  site: 'fkv_site_v2',
  freelancers: 'fkv_freelancers_v2',
  session: 'fkv_session_v2',
  messages: 'fkv_messages_v2',
};

export const defaultSite = {
  brand: 'KaraValley',
  heroTitle: 'Hire trusted online freelancers for every digital service.',
  heroText: 'A curated freelance marketplace where every professional profile is reviewed before it goes live.',
  missionTitle: 'My Mission',
  missionText: 'My mission is to connect talented freelancers with real opportunities, build trust between clients and professionals, and create a platform where skills are valued fairly across borders.',
  ownerName: 'Faizan Rahim',
  ownerRole: 'Founder, KaraValley',
  ownerImage: '',
  aboutTitle: 'Building a trusted bridge between talent and opportunity.',
  aboutText: 'KaraValley is an online services marketplace created to help clients discover verified freelance talent while giving professionals a clean, credible place to showcase their skills. Profiles are reviewed by the platform administrator before publication.',
  phone: '+92 300 0000000',
  email: 'hello@KaraValley.com',
  primary: '#2997ff',
  accent: '#6ee7b7',
  background: '#050607',
  surface: '#111318',
  text: '#f5f5f7',
};

export const defaultFreelancers = [
  {
    id: 'faizan-rahim',
    name: 'Faizan Rahim',
    email: 'faizan@example.com',
    password: 'demo1234',
    title: 'Full Stack Developer',
    category: 'Web Development',
    skills: 'React, JavaScript, Tailwind CSS, Node.js',
    bio: 'I build responsive websites, dashboards and business platforms with a strong focus on clean UX and reliable delivery.',
    rate: '35',
    location: 'Pakistan',
    portfolio: 'https://example.com',
    image: '',
    status: 'approved',
    createdAt: '2026-10-01T00:00:00.000Z',
  },
];

export const services = [
  'Web Development', 'Mobile App Development', 'UI/UX Design', 'Graphic Design', 'WordPress & Shopify',
  'SEO & Digital Marketing', 'Social Media Management', 'Content Writing', 'Video Editing & Animation',
  'AI & Automation', 'Data Entry & Virtual Assistance', 'E-commerce Management', 'Accounting & Bookkeeping',
  'Customer Support', 'Translation & Transcription', 'Cybersecurity', 'Cloud & DevOps', 'Data Analytics',
  'Business Consulting', 'Online Tutoring', 'Voice Over & Audio', 'Presentation Design', 'Email Marketing',
  'Lead Generation', 'Software Testing & QA', '3D Design & Rendering', 'Architecture & CAD', 'Legal Research',
];

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent('fkv-change', { detail: key }));
  return value;
}

export const store = {
  getSite: () => read(KEYS.site, defaultSite),
  setSite: (site) => write(KEYS.site, site),
  getFreelancers: () => read(KEYS.freelancers, defaultFreelancers),
  setFreelancers: (items) => write(KEYS.freelancers, items),
  getSession: () => read(KEYS.session, null),
  setSession: (session) => write(KEYS.session, session),
  logout: () => write(KEYS.session, null),
  getMessages: () => read(KEYS.messages, []),
  addMessage: (message) => write(KEYS.messages, [{ ...message, id: crypto.randomUUID(), createdAt: new Date().toISOString() }, ...read(KEYS.messages, [])]),
  reset: () => {
    localStorage.removeItem(KEYS.site);
    localStorage.removeItem(KEYS.freelancers);
    localStorage.removeItem(KEYS.session);
    localStorage.removeItem(KEYS.messages);
    window.dispatchEvent(new CustomEvent('fkv-change'));
  },
};

export const ADMIN = { email: 'admin@KaraValley.com', password: 'Admin@123' };
