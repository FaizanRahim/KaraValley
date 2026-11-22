import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { circles, faqs, jobs, posts, projects } from "../data/mockData";
import { Button } from "./ui";

function PageHero({ eyebrow, title, lede }) {
  return (
    <header className="shell pt-32 pb-8 sm:pt-36">
      <a href="#top" className="inline-flex items-center gap-2 text-sm text-mint hover:text-snow">
        <ArrowLeft size={15} aria-hidden="true" />
        Back to marketplace
      </a>
      <p className="eyebrow mt-6">{eyebrow}</p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight text-snow sm:text-5xl sm:leading-[1.08]">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-mist sm:text-lg">{lede}</p>
    </header>
  );
}

function FindWork({ showNotice }) {
  const [sent, setSent] = useState({});
  const [active, setActive] = useState("All");
  const names = ["All", ...Array.from(new Set(projects.map((project) => project.category)))];
  const visible = projects.filter((project) => active === "All" || project.category === active);

  return (
    <>
      <PageHero
        eyebrow="Open briefs"
        title="Find work with a clear brief."
        lede="Projects from clients who would rather meet a person than run an auction. Express interest and the conversation starts there."
      />
      <div className="shell pb-24">
        <div className="flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Filter projects">
          {names.map((name) => (
            <button
              key={name}
              type="button"
              aria-pressed={active === name}
              className={`chip shrink-0 ${active === name ? "border-mint/50 text-snow" : ""}`}
              onClick={() => setActive(name)}
            >
              {name}
            </button>
          ))}
        </div>
        <ul className="mt-6 grid gap-4">
          {visible.map((project) => {
            const done = sent[project.id];
            return (
              <li key={project.id} className="glass rounded-3xl p-5 sm:p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-2xl">
                    <p className="text-xs tracking-[0.14em] text-gold uppercase">{project.category}</p>
                    <h2 className="mt-2 font-display text-2xl font-semibold text-snow">{project.title}</h2>
                    <p className="mt-1 text-sm text-mint">
                      {project.client} · {project.location}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-mist">{project.summary}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {project.skills.map((skill) => (
                        <li key={skill} className="chip">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="shrink-0 lg:text-right">
                    <p className="font-display text-xl text-snow">{project.budget}</p>
                    <p className="mt-1 text-sm text-mist">{project.timeline}</p>
                    <Button
                      className="mt-4"
                      variant={done ? "secondary" : "primary"}
                      disabled={done}
                      onClick={() => {
                        setSent((current) => ({ ...current, [project.id]: true }));
                        showNotice(`Interest sent for “${project.title}”.`);
                      }}
                    >
                      {done ? (
                        <>
                          <Check size={16} aria-hidden="true" /> Interest sent
                        </>
                      ) : (
                        "Express interest"
                      )}
                    </Button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        {visible.length === 0 ? <p className="mt-8 text-mist">No open briefs in that category right now.</p> : null}
      </div>
    </>
  );
}

function About() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Technology, with the long view of a valley."
        lede="KaraValley is a talent marketplace for freelancers who want a serious profile and clients who want a direct way to hire."
      />
      <div className="shell max-w-3xl pb-24">
        <div className="space-y-4 text-base leading-relaxed text-mist">
          <p>
            The name joins a person with a landscape. The Karakoram has always been a passage — of trade, language, and craft — rather than a closed border. The product takes that idea into the work of hiring.
          </p>
          <p>
            Freelancers showcase real projects, rates, and availability. Clients search, read, and write to them. There is no public bidding war and no costume of mountain clichés over a generic catalog.
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            ["Quiet profiles", "Work first. Tools second. Geography never as a discount."],
            ["Direct talk", "The first message is between the two people who will do the work."],
            ["A global room", "Built from the northern valleys, open to clients and talent everywhere."],
          ].map(([title, text]) => (
            <article key={title} className="glass rounded-3xl p-5">
              <h2 className="font-display text-lg text-snow">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-mist">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}

function Contact({ showNotice }) {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({ name: "", email: "", topic: "Hiring", message: "" });

  function update(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function submit(event) {
    event.preventDefault();
    const next = {};
    if (form.name.trim().length < 2) next.name = "Add your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) next.email = "Enter a valid email.";
    if (form.message.trim().length < 12) next.message = "Tell us a little more.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setSent(true);
    showNotice("Message received. We’ll reply from the studio inbox.");
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Write to the studio."
        lede="Hiring, freelancing, press, or something that doesn’t fit a category. A person reads this."
      />
      <div className="shell max-w-xl pb-24">
        {sent ? (
          <div className="glass rounded-3xl p-6" role="status">
            <h2 className="font-display text-2xl text-snow">Message sent.</h2>
            <p className="mt-2 text-sm leading-relaxed text-mist">
              Thanks, {form.name.trim()}. This preview keeps your note in the session only.
            </p>
          </div>
        ) : (
          <form className="glass space-y-4 rounded-3xl p-6" onSubmit={submit} noValidate>
            <label className="block">
              <span className="mb-1.5 block text-sm text-mist">Name</span>
              <input className="field" value={form.name} onChange={(event) => update("name", event.target.value)} />
              {errors.name ? <span className="mt-1 block text-xs text-gold" role="alert">{errors.name}</span> : null}
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm text-mist">Email</span>
              <input className="field" type="email" value={form.email} onChange={(event) => update("email", event.target.value)} />
              {errors.email ? <span className="mt-1 block text-xs text-gold" role="alert">{errors.email}</span> : null}
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm text-mist">Topic</span>
              <select className="field" value={form.topic} onChange={(event) => update("topic", event.target.value)}>
                {["Hiring", "Freelancing", "Press", "Something else"].map((topic) => (
                  <option key={topic}>{topic}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm text-mist">Message</span>
              <textarea className="field min-h-32 resize-y" value={form.message} onChange={(event) => update("message", event.target.value)} />
              {errors.message ? <span className="mt-1 block text-xs text-gold" role="alert">{errors.message}</span> : null}
            </label>
            <Button type="submit">Send message</Button>
          </form>
        )}
      </div>
    </>
  );
}

function Careers({ showNotice }) {
  const [openJob, setOpenJob] = useState(null);
  const [sent, setSent] = useState(null);
  const [note, setNote] = useState({ name: "", email: "" });
  const [error, setError] = useState("");

  function apply(event) {
    event.preventDefault();
    if (note.name.trim().length < 2 || !/^\S+@\S+\.\S+$/.test(note.email)) {
      setError("Add your name and a valid email.");
      return;
    }
    setSent(openJob);
    setOpenJob(null);
    setError("");
    showNotice("Application noted for this preview.");
  }

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Come build the room."
        lede="A small team working on profiles, search, and the first conversation between a client and a freelancer."
      />
      <div className="shell grid gap-4 pb-24">
        {jobs.map((job) => (
          <article key={job.id} className="glass rounded-3xl p-6">
            <p className="text-xs tracking-[0.14em] text-gold uppercase">{job.team} · {job.location}</p>
            <h2 className="mt-2 font-display text-2xl text-snow">{job.title}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-mist">{job.summary}</p>
            {sent === job.id ? (
              <p className="mt-4 text-sm text-mint" role="status">Application received.</p>
            ) : openJob === job.id ? (
              <form className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto]" onSubmit={apply}>
                <input className="field" placeholder="Name" aria-label="Name" value={note.name} onChange={(event) => setNote((current) => ({ ...current, name: event.target.value }))} />
                <input className="field" placeholder="Email" aria-label="Email" value={note.email} onChange={(event) => setNote((current) => ({ ...current, email: event.target.value }))} />
                <Button type="submit">Submit</Button>
                {error ? <p className="text-xs text-gold sm:col-span-3" role="alert">{error}</p> : null}
              </form>
            ) : (
              <Button className="mt-4" variant="secondary" onClick={() => { setOpenJob(job.id); setError(""); }}>
                Apply
              </Button>
            )}
          </article>
        ))}
      </div>
    </>
  );
}

function Help() {
  const [open, setOpen] = useState(0);

  return (
    <>
      <PageHero
        eyebrow="Help Center"
        title="Answers, before you write to us."
        lede="The short version of how the marketplace works. If yours isn’t here, the contact page is staffed by a person."
      />
      <div className="shell max-w-3xl pb-24">
        <div className="space-y-3">
          {faqs.map((item, index) => {
            const expanded = open === index;
            return (
              <div key={item.q} className="glass rounded-2xl">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={expanded}
                  onClick={() => setOpen(expanded ? -1 : index)}
                >
                  <span className="font-medium text-snow">{item.q}</span>
                  <span className="text-mint" aria-hidden="true">{expanded ? "–" : "+"}</span>
                </button>
                {expanded ? <p className="px-5 pb-5 text-sm leading-relaxed text-mist">{item.a}</p> : null}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

function Community({ showNotice }) {
  return (
    <>
      <PageHero
        eyebrow="Community"
        title="Rooms for the work, not the performance."
        lede="Small circles for freelancers and the occasional client. Show something. Leave with notes."
      />
      <div className="shell grid gap-4 pb-24 md:grid-cols-3">
        {circles.map((circle) => (
          <article key={circle.name} className="glass flex h-full flex-col rounded-3xl p-6">
            <h2 className="font-display text-xl text-snow">{circle.name}</h2>
            <p className="mt-2 text-sm text-gold">{circle.when}</p>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">{circle.detail}</p>
            <Button
              className="mt-6"
              variant="secondary"
              onClick={() => showNotice(`You’re marked for ${circle.name}.`)}
            >
              Join circle
            </Button>
          </article>
        ))}
      </div>
    </>
  );
}

function Blog() {
  const [slug, setSlug] = useState(null);
  const article = posts.find((post) => post.slug === slug);

  if (article) {
    return (
      <>
        <header className="shell pt-32 pb-6 sm:pt-36">
          <button type="button" className="inline-flex items-center gap-2 text-sm text-mint hover:text-snow" onClick={() => setSlug(null)}>
            <ArrowLeft size={15} aria-hidden="true" />
            All notes
          </button>
          <p className="eyebrow mt-6">{article.tag}</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight text-snow sm:text-5xl">
            {article.title}
          </h1>
          <p className="mt-3 text-sm text-mist">{article.date} · {article.read}</p>
        </header>
        <article className="shell max-w-3xl space-y-4 pb-24 text-base leading-relaxed text-mist">
          {article.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </article>
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Notes from the studio."
        lede="How we think about hiring, profiles, and the landscape that named the product."
      />
      <div className="shell grid gap-4 pb-24">
        {posts.map((post) => (
          <article key={post.slug} className="glass rounded-3xl p-6">
            <p className="text-xs tracking-[0.14em] text-gold uppercase">{post.tag} · {post.read}</p>
            <h2 className="mt-2 font-display text-2xl text-snow">{post.title}</h2>
            <p className="mt-2 text-sm text-mist">{post.date}</p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mist">{post.paragraphs[0]}</p>
            <button type="button" className="mt-4 text-sm font-semibold text-mint hover:text-snow" onClick={() => setSlug(post.slug)}>
              Read note
            </button>
          </article>
        ))}
      </div>
    </>
  );
}

function Legal({ kind }) {
  const privacy = kind === "privacy";
  const sections = privacy
    ? [
        ["What you share", "Name, email, profile details, and messages you choose to send. In this preview, that information stays in your browser tab and is not transmitted."],
        ["How it’s used", "To show your profile, to let a client reach you, and to reply when you write to the studio. We don’t sell personal information."],
        ["Cookies", "The site uses only what it needs to remember this session in the tab. There is no advertising profile."],
        ["Contact", "Privacy questions go to the contact page, marked Press or Something else, with the subject “Privacy”."],
      ]
    : [
        ["Using the marketplace", "Search, profiles, and messages are for hiring and being hired. Don’t scrape the directory or misrepresent your work."],
        ["Profiles and briefs", "You are responsible for the accuracy of what you publish. Clients and freelancers agree scope and payment between themselves."],
        ["Acceptable use", "No harassment, no deceptive listings, no attempts to break the product or other people’s accounts."],
        ["Changes", "These terms will be updated before the marketplace charges a fee. Continued use after that notice means you accept the update."],
      ];

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={privacy ? "Privacy Policy" : "Terms of Service"}
        lede={privacy
          ? "How KaraValley treats the information you choose to share."
          : "The ground rules for using the marketplace."}
      />
      <div className="shell max-w-3xl space-y-8 pb-24">
        {sections.map(([title, text]) => (
          <section key={title}>
            <h2 className="font-display text-2xl text-snow">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-mist">{text}</p>
          </section>
        ))}
      </div>
    </>
  );
}

export default function SitePages({ page, showNotice }) {
  if (page === "work") return <FindWork showNotice={showNotice} />;
  if (page === "about") return <About />;
  if (page === "contact") return <Contact showNotice={showNotice} />;
  if (page === "careers") return <Careers showNotice={showNotice} />;
  if (page === "help") return <Help />;
  if (page === "community") return <Community showNotice={showNotice} />;
  if (page === "blog") return <Blog />;
  if (page === "privacy") return <Legal kind="privacy" />;
  if (page === "terms") return <Legal kind="terms" />;
  return null;
}
