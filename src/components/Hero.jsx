import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { freelancers } from "../data/mockData";
import { Avatar, Button, MountainMark, Stars } from "./ui";
import Peaks from "./Peaks";

const faizan = freelancers.find((person) => person.id === "faizan-rahim");

export default function Hero({ onOpenProfile, onJoin }) {
  useEffect(() => {
    const node = document.getElementById("top");
    if (!node) return undefined;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        node.style.setProperty("--py", String(Math.min(window.scrollY, 700)));
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function onPointerMove(event) {
    if (event.pointerType && event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty("--mx", x.toFixed(3));
    event.currentTarget.style.setProperty("--my", y.toFixed(3));
  }

  return (
    <section
      id="top"
      className="relative overflow-hidden"
      onPointerMove={onPointerMove}
      style={{ "--mx": 0, "--my": 0 }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-52 sm:h-72"
        style={{ transform: "translate3d(0, calc(var(--py, 0) * 0.12px), 0)" }}
      >
        <Peaks className="h-full w-full" strong />
      </div>

      <div className="shell relative grid items-center gap-12 pt-32 pb-16 sm:pt-36 lg:min-h-svh lg:grid-cols-[1.12fr_0.88fr] lg:pt-28 lg:pb-20">
        <div className="relative max-w-2xl">
          <div className="pointer-events-none absolute -top-16 -left-10 h-56 w-56 rounded-full bg-emerald-400/15 blur-3xl" />
          <p className="rise inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-xs text-mist backdrop-blur-md sm:text-sm">
            <MountainMark className="h-3.5 w-3.5 shrink-0" />
            <span>Built from the Northern Valleys • Connected to the World</span>
          </p>

          <h1
            className="rise mt-6 max-w-[12ch] font-display text-[clamp(2.25rem,4.8vw,4.15rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-snow"
            style={{ animationDelay: "80ms" }}
          >
            Where <span className="text-gradient">Northern Talent</span> Meets Global Opportunity.
          </h1>

          <p className="rise mt-5 max-w-lg text-sm leading-relaxed text-mist sm:text-base" style={{ animationDelay: "160ms" }}>
            Discover skilled freelancers, showcase your expertise, and build meaningful connections with clients around the world.
          </p>

          <div className="rise mt-8 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "240ms" }}>
            <a href="#talent" className="btn btn-primary w-full sm:w-auto">
              Explore Talent
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <Button variant="secondary" className="w-full sm:w-auto" onClick={onJoin}>
              Join as a Freelancer
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute top-6 right-4 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
          <div style={{ transform: "translate3d(calc(var(--mx) * 16px), calc(var(--my) * 10px), 0)" }}>
            <div className="hero-image-card hero-portrait-card glass float-mid overflow-hidden rounded-4xl">
              <img
                src="/faizan.png"
                alt="Faizan"
                className="hero-image hero-portrait-image"
              />
            </div>

            <button
              type="button"
              onClick={() => onOpenProfile(faizan.id)}
              className="glass float-slow ml-auto mt-4 block w-full max-w-md rounded-3xl p-5 text-left"
              aria-label={`View ${faizan.name}'s profile`}
            >
              <div className="flex items-start gap-4">
                <Avatar name={faizan.name} hue={faizan.hue} size={56} />
                <div className="min-w-0">
                  <p className="font-display text-lg font-semibold text-snow">{faizan.name}</p>
                  <p className="text-sm text-mint">{faizan.title}</p>
                  <p className="mt-2 text-sm text-mist">{faizan.skills.join(" • ")}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Stars rating={faizan.rating} />
                <span className="text-sm text-snow">{faizan.rating.toFixed(1)}</span>
              </div>
            </button>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4">
            <div style={{ transform: "translate3d(calc(var(--mx) * -12px), calc(var(--my) * 8px), 0)" }}>
              <div className="glass float-mid h-full overflow-hidden rounded-3xl">
                <img src="/faizan.png" alt="Faizan" className="glow-card-image" />
                <div className="p-4">
                  <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-gold uppercase">Faizan Rahim</p>
                  <p className="mt-2 text-sm leading-relaxed text-mist">Your profile image shown directly on the home page.</p>
                </div>
              </div>
            </div>
            <div style={{ transform: "translate3d(calc(var(--mx) * 10px), calc(var(--my) * -8px), 0)" }}>
              <div className="glass float-late h-full rounded-3xl p-4">
                <span className="pulse-dot" aria-hidden="true" />
                <p className="mt-3 font-display text-xl leading-tight font-semibold text-snow">Available for Work</p>
                <p className="mt-2 text-xs leading-relaxed text-mist">Replies within a few hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
