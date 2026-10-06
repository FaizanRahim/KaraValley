import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Avatar, Button, Logo } from "./ui";

const links = [
  { href: "#search", label: "Find Talent" },
  { href: "#/work", label: "Find Work" },
  { href: "#categories", label: "Categories" },
  { href: "#how-it-works", label: "How It Works" },
];

export default function Navbar({ user, onLogout, onAuth }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function focusSearch() {
    window.setTimeout(() => {
      document.getElementById("talent-search")?.focus({ preventScroll: true });
    }, 450);
  }

  return (
    <header className={`fixed inset-x-0 top-0 z-50 px-3 transition-all duration-500 sm:px-4 ${scrolled ? "pt-2" : "pt-4"}`}>
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-2xl border px-3 py-2 transition-all duration-500 sm:px-4 ${
          scrolled
            ? "border-white/15 bg-[#070b0a]/80 shadow-[0_10px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl"
            : "border-white/10 bg-white/[0.04] backdrop-blur-lg"
        }`}
      >
        <Logo />

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-1 lg:flex">
          {user ? (
            <>
              <span className="mr-1 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-1 pr-3 pl-1">
                <Avatar name={user.name} hue={user.role === "freelancer" ? 162 : 198} size={28} />
                <span className="max-w-28 truncate text-sm text-snow">{user.name}</span>
              </span>
              <Button variant="quiet" onClick={onLogout}>
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button variant="quiet" onClick={() => onAuth("login", "client")}>
                Log In
              </Button>
              <Button variant="quiet" onClick={() => onAuth("signup", "freelancer")}>
                Sign Up
              </Button>
            </>
          )}
          <a href="#search" className="btn btn-primary ml-1" onClick={focusSearch}>
            Start Hiring
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <div className="hidden sm:block">
            <a href="#search" className="btn btn-primary px-3" onClick={focusSearch}>
              Start Hiring
            </a>
          </div>
          <button
            type="button"
            className="icon-btn"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-menu" className="menu-pop glass-strong mx-auto mt-2 max-h-[calc(100dvh-5.5rem)] max-w-7xl overflow-y-auto rounded-3xl p-4 lg:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-xl px-3 py-3 text-base text-snow transition hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-3 grid gap-2 border-t border-white/10 pt-3">
            {user ? (
              <div className="flex items-center justify-between gap-3 px-1">
                <span className="inline-flex items-center gap-2">
                  <Avatar name={user.name} hue={user.role === "freelancer" ? 162 : 198} size={36} />
                  <span>
                    <span className="block text-sm text-snow">{user.name}</span>
                    <span className="block text-xs text-mist">{user.role === "freelancer" ? "Freelancer" : "Client"}</span>
                  </span>
                </span>
                <Button variant="secondary" onClick={() => { onLogout(); setOpen(false); }}>
                  Log out
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Button variant="secondary" onClick={() => { onAuth("login", "client"); setOpen(false); }}>
                  Log In
                </Button>
                <Button variant="secondary" onClick={() => { onAuth("signup", "freelancer"); setOpen(false); }}>
                  Sign Up
                </Button>
              </div>
            )}
            <a href="#search" className="btn btn-primary" onClick={() => { setOpen(false); focusSearch(); }}>
              Start Hiring
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
