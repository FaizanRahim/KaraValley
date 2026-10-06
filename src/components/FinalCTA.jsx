import { ArrowRight } from "lucide-react";
import Peaks from "./Peaks";

export default function FinalCTA({ onJoin }) {
  return (
    <section className="relative overflow-hidden pt-8 pb-24 md:pb-32" aria-labelledby="final-cta">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64">
        <Peaks className="h-full w-full" strong />
      </div>
      <div className="pointer-events-none absolute top-10 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-emerald-400/15 blur-3xl" />
      <div className="shell relative text-center">
        <p className="eyebrow eyebrow-center">Begin</p>
        <h2
          id="final-cta"
          className="mx-auto mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight text-snow sm:text-6xl sm:leading-[1.05]"
        >
          Build Something Remarkable.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-mist sm:text-lg">Great ideas deserve great people.</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="#talent" className="btn btn-primary w-full sm:w-auto">
            Explore Talent
            <ArrowRight size={16} aria-hidden="true" />
          </a>
          <button type="button" className="btn btn-secondary w-full sm:w-auto" onClick={onJoin}>
            Join KaraValley
          </button>
        </div>
      </div>
    </section>
  );
}
