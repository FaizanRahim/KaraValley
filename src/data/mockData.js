export const initialFilters = {
  query: "",
  skill: "Any",
  category: "Any",
  experience: "Any",
  availability: "Any",
};

export const experienceOptions = ["Any", "Mid-level", "Senior", "Expert"];
export const availabilityOptions = ["Any", "Available now", "This week", "Booked"];

export const freelancers = [
  {
    id: "faizan-rahim",
    name: "Faizan Rahim",
    title: "Frontend Developer",
    location: "Hunza, Gilgit-Baltistan",
    category: "Web Development",
    skills: ["React", "Next.js", "Tailwind"],
    bio: "Designs and builds calm product interfaces for teams who care how the work feels, not only how it functions. Most recently rebuilt booking for a lodge collective along the Karakoram Highway.",
    rating: 4.9,
    reviews: 128,
    projects: 86,
    rate: 48,
    availability: "Available now",
    experience: "Senior",
    hue: 162,
    languages: ["English", "Urdu", "Burushaski"],
    response: "Within a few hours",
    memberSince: "2023",
    work: [
      { name: "Valley Routes", result: "Checkout completed 38% faster", from: "#115e59", to: "#155e75" },
      { name: "Northline", result: "Marketing site with a 1.1s LCP", from: "#134e4a", to: "#1e3a4c" },
      { name: "Atlas Ledger", result: "Dashboard for a distributed finance team", from: "#1f3d36", to: "#3f3f1f" },
    ],
  },
  {
    id: "ayesha-noor",
    name: "Ayesha Noor",
    title: "UI/UX Designer",
    location: "Skardu, Gilgit-Baltistan",
    category: "UI/UX Design",
    skills: ["Figma", "Design Systems", "Prototyping"],
    bio: "Turns unclear product ideas into flows people can finish. The work sits between research and a precise interface, mostly for travel, education, and tools used in the field.",
    rating: 5,
    reviews: 96,
    projects: 64,
    rate: 55,
    availability: "Available now",
    experience: "Senior",
    hue: 188,
    languages: ["English", "Urdu", "Balti"],
    response: "Within a day",
    memberSince: "2022",
    work: [
      { name: "Paper Kite", result: "Onboarding completion up 22%", from: "#164e63", to: "#1e293b" },
      { name: "Field Schools", result: "Design system for 14 contributors", from: "#14532d", to: "#134e4a" },
      { name: "Karimabad Tea House", result: "Brand site for a valley tea house", from: "#3f3a1d", to: "#1c3a32" },
    ],
  },
  {
    id: "hamza-ali",
    name: "Hamza Ali",
    title: "Full Stack Developer",
    location: "Gilgit, Gilgit-Baltistan",
    category: "Web Development",
    skills: ["Node.js", "PostgreSQL", "React"],
    bio: "Builds the parts that keep a product trustworthy: accounts, payments, and data that does not surprise anyone. Most at home in a small team that ships every week.",
    rating: 4.8,
    reviews: 154,
    projects: 112,
    rate: 62,
    availability: "This week",
    experience: "Expert",
    hue: 152,
    languages: ["English", "Urdu", "Shina"],
    response: "Within a few hours",
    memberSince: "2021",
    work: [
      { name: "Harbor Invoice", result: "Billing rebuilt on Postgres", from: "#1e3a4c", to: "#134e4a" },
      { name: "Trail Cooperative", result: "Member portal for 600 guides", from: "#14532d", to: "#1c1917" },
      { name: "Kindred Health", result: "Secure patient intake", from: "#134e4a", to: "#312e81" },
    ],
  },
  {
    id: "sana-iqbal",
    name: "Sana Iqbal",
    title: "Mobile App Developer",
    location: "Karimabad, Hunza",
    category: "Mobile Development",
    skills: ["React Native", "Swift", "Firebase"],
    bio: "Makes mobile products that stay fast on ordinary phones and ordinary networks. Offline support is part of the design, because that is how many of her clients actually work.",
    rating: 4.9,
    reviews: 73,
    projects: 47,
    rate: 52,
    availability: "Available now",
    experience: "Senior",
    hue: 174,
    languages: ["English", "Urdu"],
    response: "Same day",
    memberSince: "2023",
    work: [
      { name: "Passkeeper", result: "Offline trail permits", from: "#115e59", to: "#0f3d3e" },
      { name: "Soma", result: "41% still active on day 30", from: "#1e3a4c", to: "#14532d" },
      { name: "Market Day", result: "Vendor inventory for iOS", from: "#3f3a1d", to: "#134e4a" },
    ],
  },
  {
    id: "bilal-hussain",
    name: "Bilal Hussain",
    title: "Graphic Designer",
    location: "Lahore, Pakistan",
    category: "Graphic Design",
    skills: ["Branding", "Illustration", "Packaging"],
    bio: "Identity, print, and packaging for founders who want a brand with a point of view. Grew up between Lahore and summers in the north, and that range shows up in the work.",
    rating: 4.7,
    reviews: 88,
    projects: 93,
    rate: 36,
    availability: "Available now",
    experience: "Mid-level",
    hue: 42,
    languages: ["English", "Urdu", "Punjabi"],
    response: "Within a day",
    memberSince: "2022",
    work: [
      { name: "Karimabad Tea House", result: "Identity, tins, and labels", from: "#3f3a1d", to: "#44403c" },
      { name: "Blue Pine", result: "A wordmark that still works small", from: "#14532d", to: "#1e3a4c" },
      { name: "Evening Press", result: "A year of editorial covers", from: "#1c1917", to: "#3f3a1d" },
    ],
  },
  {
    id: "mina-chen",
    name: "Mina Chen",
    title: "Digital Marketer",
    location: "Singapore",
    category: "Digital Marketing",
    skills: ["SEO", "Lifecycle", "Content Strategy"],
    bio: "Helps specialist companies become easy to find and easy to trust. The work is positioning, search, and lifecycle programs that do not need to shout.",
    rating: 4.8,
    reviews: 101,
    projects: 71,
    rate: 44,
    availability: "This week",
    experience: "Senior",
    hue: 198,
    languages: ["English", "Mandarin"],
    response: "Within a few hours",
    memberSince: "2021",
    work: [
      { name: "Northline", result: "Organic signups up 3.1×", from: "#164e63", to: "#14532d" },
      { name: "Fieldnote", result: "Launch story across 6 countries", from: "#1e3a4c", to: "#134e4a" },
      { name: "Harbor", result: "Client notes people actually open", from: "#1f3d36", to: "#1e293b" },
    ],
  },
  {
    id: "zara-malik",
    name: "Zara Malik",
    title: "Content Writer",
    location: "Islamabad, Pakistan",
    category: "Content Writing",
    skills: ["Copywriting", "Case Studies", "UX Writing"],
    bio: "Writes the way a good guide talks: specific, calm, and oriented. Product copy, case studies, and essays for companies that would rather be clear than loud.",
    rating: 4.8,
    reviews: 132,
    projects: 120,
    rate: 32,
    availability: "Available now",
    experience: "Mid-level",
    hue: 210,
    languages: ["English", "Urdu"],
    response: "Same day",
    memberSince: "2022",
    work: [
      { name: "Atlas Ledger", result: "Help center in plain language", from: "#1e293b", to: "#134e4a" },
      { name: "Valley Routes", result: "Lodge stories with longer reads", from: "#14532d", to: "#3f3a1d" },
      { name: "Kindred", result: "Appointment emails people finish", from: "#164e63", to: "#1c1917" },
    ],
  },
  {
    id: "jonas-berg",
    name: "Jonas Berg",
    title: "Motion Designer",
    location: "Stockholm, Sweden",
    category: "Video & Animation",
    skills: ["After Effects", "Editing", "Storyboarding"],
    bio: "Short films and product motion for teams who want warmth instead of a stock-footage gloss. Cut a documentary in Hunza last autumn and stayed an extra week for the light.",
    rating: 4.6,
    reviews: 64,
    projects: 54,
    rate: 58,
    availability: "Available now",
    experience: "Senior",
    hue: 200,
    languages: ["English", "Swedish"],
    response: "Within a day",
    memberSince: "2020",
    work: [
      { name: "Autumn Hunza", result: "Eight-minute documentary cut", from: "#3f3a1d", to: "#14532d" },
      { name: "Paper Kite", result: "Seventy-second product film", from: "#1e3a4c", to: "#0f172a" },
      { name: "Soma", result: "Motion system for the app", from: "#134e4a", to: "#1e293b" },
    ],
  },
  {
    id: "leila-amiri",
    name: "Leila Amiri",
    title: "AI Automation Engineer",
    location: "Dubai, UAE",
    category: "AI & Automation",
    skills: ["Python", "Automation", "LLMs"],
    bio: "Automates the work people quietly dread — intake, routing, and reporting — with systems a human can still inspect. If it cannot be explained, it does not ship.",
    rating: 5,
    reviews: 57,
    projects: 38,
    rate: 78,
    availability: "Booked",
    experience: "Expert",
    hue: 168,
    languages: ["English", "Arabic", "French"],
    response: "Within two days",
    memberSince: "2024",
    work: [
      { name: "Fieldnote", result: "Intake that files itself", from: "#134e4a", to: "#1e3a4c" },
      { name: "Harbor", result: "Weekly reports drafted from the ledger", from: "#1f3d36", to: "#3f3a1d" },
      { name: "Kindred", result: "Triage notes for a support desk", from: "#14532d", to: "#312e81" },
    ],
  },
];

export const skillOptions = [
  "Any",
  ...Array.from(new Set(freelancers.flatMap((person) => person.skills))).sort((a, b) =>
    a.localeCompare(b),
  ),
];

export const categories = [
  {
    name: "Web Development",
    description: "Interfaces, platforms, and product websites.",
    count: "2,400",
    icon: "code",
  },
  {
    name: "Mobile Development",
    description: "iOS and Android products with careful craft.",
    count: "860",
    icon: "mobile",
  },
  {
    name: "UI/UX Design",
    description: "Research, flows, and interface systems.",
    count: "1,120",
    icon: "design",
  },
  {
    name: "Graphic Design",
    description: "Identity, print, and visual stories.",
    count: "980",
    icon: "graphic",
  },
  {
    name: "Digital Marketing",
    description: "Positioning, campaigns, and measured growth.",
    count: "740",
    icon: "marketing",
  },
  {
    name: "Content Writing",
    description: "Clear writing for products and brands.",
    count: "690",
    icon: "writing",
  },
  {
    name: "Video & Animation",
    description: "Motion, film, and visual explanation.",
    count: "430",
    icon: "video",
  },
  {
    name: "AI & Automation",
    description: "Practical automation and intelligent tools.",
    count: "510",
    icon: "ai",
  },
];

export const clientSteps = [
  {
    number: "01",
    title: "Discover Talent",
    text: "Search by skill, review real profiles, and shortlist people who fit the work.",
  },
  {
    number: "02",
    title: "Connect & Discuss",
    text: "Message directly, align on scope, and choose how you want to collaborate.",
  },
  {
    number: "03",
    title: "Hire & Collaborate",
    text: "Start the work with a clear agreement and stay in conversation as it ships.",
  },
];

export const freelancerSteps = [
  {
    number: "01",
    title: "Create Your Profile",
    text: "Introduce your craft, your rate, and the kind of work you want to be hired for.",
  },
  {
    number: "02",
    title: "Showcase Your Work",
    text: "Add projects that show how you think and what you actually deliver.",
  },
  {
    number: "03",
    title: "Connect With Clients",
    text: "Be discovered by teams looking for your skills, and talk with them directly.",
  },
];

export const reasons = [
  {
    title: "Global Opportunities",
    text: "Connect with clients beyond geographical boundaries.",
    icon: "globe",
  },
  {
    title: "Authentic Profiles",
    text: "Showcase real skills, experience, and portfolio work.",
    icon: "badge",
  },
  {
    title: "Direct Connections",
    text: "Let clients and freelancers communicate directly.",
    icon: "messages",
  },
  {
    title: "Northern Spirit",
    text: "Inspired by the resilience, creativity, and beauty of the Karakoram region.",
    icon: "mountain",
  },
  {
    title: "Professional Profiles",
    text: "Build a profile that represents your skills and experience.",
    icon: "user",
  },
  {
    title: "Simple Discovery",
    text: "Find the right people without unnecessary complexity.",
    icon: "compass",
  },
];

export const testimonials = [
  {
    id: "elena",
    name: "Elena Voss",
    role: "Founder, Valley Routes",
    rating: 5,
    hue: 168,
    quote:
      "We hired Faizan to rebuild our lodge booking flow. It finally feels as considered as the place itself.",
  },
  {
    id: "daniel",
    name: "Daniel Okonkwo",
    role: "Product Lead, Northline",
    rating: 5,
    hue: 200,
    quote:
      "The profiles are quiet and specific. I knew who I was talking to before the first call.",
  },
  {
    id: "ayesha",
    name: "Ayesha Noor",
    role: "UI/UX Designer, Skardu",
    rating: 5,
    hue: 188,
    quote:
      "I joined from Hunza’s wider valley and had a client in Toronto within two weeks. The work spoke before the geography did.",
  },
  {
    id: "hana",
    name: "Hana Suzuki",
    role: "Director, Paper Kite Studio",
    rating: 5,
    hue: 210,
    quote:
      "No bidding circus. I described the project and met three people who could actually do it.",
  },
  {
    id: "yusuf",
    name: "Yusuf Karim",
    role: "Owner, Karimabad Tea House",
    rating: 5,
    hue: 40,
    quote:
      "Our brand feels rooted, not templated. Bilal understood the valley without turning it into a postcard.",
  },
  {
    id: "priya",
    name: "Priya Raman",
    role: "Operations, Fieldnote",
    rating: 4,
    hue: 152,
    quote:
      "Clear profiles, direct messages, and none of the noise I expected from a marketplace.",
  },
];

export const stats = [
  { value: 10, suffix: "K+", label: "Freelancers" },
  { value: 25, suffix: "K+", label: "Projects" },
  { value: 120, suffix: "+", label: "Skills" },
  { value: 50, suffix: "+", label: "Countries" },
];

export const projects = [
  {
    id: "valley-booking",
    title: "Rebuild a lodge booking flow",
    client: "Valley Routes",
    category: "Web Development",
    budget: "$4,200–6,000",
    timeline: "5 weeks",
    location: "Remote",
    skills: ["React", "UX Writing"],
    summary:
      "Guests book from patchy connections. The team wants a quieter, faster flow and a frontend partner who has shipped something like it.",
  },
  {
    id: "fieldnote-system",
    title: "Design system for a field-research app",
    client: "Fieldnote",
    category: "UI/UX Design",
    budget: "$5,500",
    timeline: "6 weeks",
    location: "Remote",
    skills: ["Figma", "Design Systems"],
    summary:
      "Researchers use the product outdoors. The interface needs a system that stays readable in sun, dust, and a hurry.",
  },
  {
    id: "tea-house",
    title: "Identity for a small-batch tea house",
    client: "Karimabad Tea House",
    category: "Graphic Design",
    budget: "$2,400",
    timeline: "3 weeks",
    location: "Remote, visit welcome",
    skills: ["Branding", "Packaging"],
    summary:
      "A family tea house needs tins, a wordmark, and a small site. The brief is specific: rooted, never souvenir-shop.",
  },
  {
    id: "autumn-film",
    title: "Cut a short film on the autumn harvest",
    client: "Independent",
    category: "Video & Animation",
    budget: "$3,500",
    timeline: "4 weeks",
    location: "Hybrid",
    skills: ["Editing", "Storyboarding"],
    summary:
      "Footage is already in the can from orchards above Karimabad. The edit should feel observational, with almost no graphics.",
  },
  {
    id: "harbor-intake",
    title: "Automate client onboarding",
    client: "Harbor Invoice",
    category: "AI & Automation",
    budget: "$5,100",
    timeline: "4 weeks",
    location: "Remote",
    skills: ["Python", "Automation"],
    summary:
      "New clients still arrive by email. The studio wants intake that files itself and can be checked by a person.",
  },
  {
    id: "northline-lifecycle",
    title: "Lifecycle program for a product launch",
    client: "Northline",
    category: "Digital Marketing",
    budget: "$3,800",
    timeline: "5 weeks",
    location: "Remote",
    skills: ["Lifecycle", "Content Strategy"],
    summary:
      "A specialist tool is launching in six countries. They need a narrative and a sequence of notes that do not sound like a blast.",
  },
];

export const posts = [
  {
    slug: "crossroads",
    title: "A marketplace named for a crossroads",
    date: "March 12, 2026",
    read: "4 min",
    tag: "Studio",
    paragraphs: [
      "The Karakoram has never been a closed room. For centuries the valleys carried trade, language, and craft between places that maps draw far apart. KaraValley takes that idea seriously: talent is personal, and opportunity should not stop at a border.",
      "The product is deliberately quiet. Profiles lead with work, not badges. Clients and freelancers talk directly. The mountain atmosphere is a reminder of where the idea began, not a costume laid over a generic marketplace.",
      "We are building for people who already know their craft — frontend engineers in Hunza, designers in Skardu, writers in Islamabad, marketers in Singapore — and for clients who would rather meet them than scroll a bidding war.",
    ],
  },
  {
    slug: "brief",
    title: "How to brief someone without the noise",
    date: "February 2, 2026",
    read: "5 min",
    tag: "For clients",
    paragraphs: [
      "A good brief is shorter than people expect. Say what the work is for, who it is for, what already exists, and what done looks like. Then stop. The rest belongs in a conversation.",
      "On KaraValley, that conversation is the point. Search to find a few people whose work resembles the problem. Read the projects, not only the skills. Then write to them as you would write to a colleague.",
      "If you need a lodge booking flow, say so. If you need it to work on a slow connection, say that too. Specific constraints attract the right people faster than a list of twenty tools.",
    ],
  },
  {
    slug: "hunza-week",
    title: "A week in a frontend studio above the river",
    date: "January 18, 2026",
    read: "6 min",
    tag: "For freelancers",
    paragraphs: [
      "Faizan Rahim starts before the light hits the ridge. The morning is for the hard interface problems; the afternoon is for review with clients who are just waking up in other time zones. The river is loud enough that calls happen indoors.",
      "None of that is a brand story we invented. It is simply how a lot of serious work already happens in the north: carefully, with a long view, and in conversation with people elsewhere.",
      "A profile here should sound like that. Name the work. Show the result. Leave the postcard language for someone else.",
    ],
  },
];

export const jobs = [
  {
    id: "designer",
    title: "Product Designer",
    location: "Remote",
    team: "Design",
    summary: "Shape the marketplace surfaces people trust: profiles, search, and the first conversation.",
  },
  {
    id: "community",
    title: "Community Lead, Northern Pakistan",
    location: "Gilgit",
    team: "Community",
    summary: "Host circles and help freelancers from the valleys put their work in front of global clients.",
  },
  {
    id: "support",
    title: "Support Specialist",
    location: "Remote",
    team: "Support",
    summary: "Help clients and freelancers reach a clear first conversation, without scripts that sound like scripts.",
  },
];

export const circles = [
  {
    name: "Friday ship room",
    when: "Fridays · 18:00 PKT",
    detail: "A short room for freelancers showing one thing they shipped. No slides required.",
  },
  {
    name: "Design critique",
    when: "First Tuesday · 19:00 PKT",
    detail: "Interface and brand work, reviewed by peers. Bring a file, leave with notes.",
  },
  {
    name: "Karakoram founders",
    when: "Monthly · Gilgit & online",
    detail: "Clients and freelancers building from the north, or with it. One conversation, no pitches.",
  },
];

export const faqs = [
  {
    q: "Is KaraValley only for talent in Northern Pakistan?",
    a: "No. The marketplace is inspired by the Karakoram and built for a global audience. Freelancers join from the valleys and from cities around the world. Clients can hire from anywhere.",
  },
  {
    q: "How do clients and freelancers talk?",
    a: "Directly. There is no bidding board and no public race to the lowest price. You find a person, open their profile, and start a conversation about the work.",
  },
  {
    q: "Do I need a finished portfolio to join?",
    a: "You need enough real work to show how you think. Three specific projects are more useful than a long list of tools. You can refine the profile after you create it.",
  },
  {
    q: "What does it cost?",
    a: "Creating a profile is free while the marketplace is opening. Hiring terms are agreed between the client and the freelancer. We will publish fees before any are charged.",
  },
  {
    q: "Can I hire someone for a small project?",
    a: "Yes. Briefs on the Find Work board range from a three-week identity to a multi-week product engagement. Scope is part of the conversation, not a fixed package.",
  },
];

export function hasActiveFilters(filters) {
  return (
    filters.query.trim() !== "" ||
    filters.skill !== "Any" ||
    filters.category !== "Any" ||
    filters.experience !== "Any" ||
    filters.availability !== "Any"
  );
}

export function filterTalent(people, filters) {
  const query = filters.query.trim().toLowerCase();

  return people.filter((person) => {
    if (filters.skill !== "Any" && !person.skills.includes(filters.skill)) return false;
    if (filters.category !== "Any" && person.category !== filters.category) return false;
    if (filters.experience !== "Any" && person.experience !== filters.experience) return false;
    if (filters.availability !== "Any" && person.availability !== filters.availability) return false;

    if (!query) return true;

    const haystack = [person.name, person.title, person.bio, person.location, person.category, ...person.skills]
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });
}
