import { Logo, SocialIcon } from "./ui";

const columns = [
  {
    title: "Platform",
    label: "Platform",
    links: [
      ["Find Talent", "#search"],
      ["Find Work", "#/work"],
      ["Categories", "#categories"],
      ["How It Works", "#how-it-works"],
    ],
  },
  {
    title: "Company",
    label: "Company",
    links: [
      ["About", "#/about"],
      ["Contact", "#/contact"],
      ["Careers", "#/careers"],
    ],
  },
  {
    title: "Resources",
    label: "Resources",
    links: [
      ["Help Center", "#/help"],
      ["Community", "#/community"],
      ["Blog", "#/blog"],
    ],
  },
  {
    title: "Legal",
    label: "Legal",
    links: [
      ["Privacy Policy", "#/privacy"],
      ["Terms of Service", "#/terms"],
    ],
  },
];

const socials = [
  ["github", "GitHub", "https://github.com"],
  ["linkedin", "LinkedIn", "https://www.linkedin.com"],
  ["x", "X", "https://x.com"],
  ["instagram", "Instagram", "https://instagram.com"],
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#070b0a]/80">
      <div className="shell py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="sm:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist">
              A modern talent marketplace connecting Northern talent with global opportunities.
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map(([name, label, href]) => (
                <a
                  key={name}
                  href={href}
                  className="icon-btn"
                  aria-label={`KaraValley on ${label}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <SocialIcon name={name} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.label}>
              <h2 className="text-sm font-semibold text-snow">{column.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {column.links.map(([label, href]) => (
                  <li key={href}>
                    <a href={href} className="footer-link text-sm">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-sm text-mist">© 2026 KaraValley. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
