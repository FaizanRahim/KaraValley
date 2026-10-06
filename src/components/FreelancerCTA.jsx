import { ArrowRight } from "lucide-react";
import Peaks from "./Peaks";

export default function FreelancerCTA({ onCreate }) {
  return (
    <section className="pt-20 pb-6 md:pt-28" aria-labelledby="freelancer-cta">
      <div className="shell">
        <div className="glass relative overflow-hidden rounded-[28px] px-6 py-12 sm:px-10 sm:py-16">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 opacity-90">
            <Peaks className="h-full w-full" strong />
          </div>
          <div className="pointer-events-none absolute -top-10 left-1/3 h-40 w-40 rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="relative max-w-xl">
            <p className="eyebrow">For freelancers</p>
            <h2 id="freelancer-cta" className="mt-3 font-display text-3xl font-semibold tracking-tight text-snow sm:text-5xl sm:leading-[1.08]">
              Your Skills Deserve to Be Seen.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-mist sm:text-lg">
              Create your profile, showcase your work, and connect with opportunities around the world.
            </p>
            <button type="button" className="btn btn-primary mt-8" onClick={onCreate}>
              Create Your Profile
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
