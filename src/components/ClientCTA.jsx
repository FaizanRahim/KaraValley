import { ArrowRight } from "lucide-react";
import { freelancers } from "../data/mockData";
import { Avatar } from "./ui";

const preview = freelancers.filter((person) => person.availability !== "Booked").slice(0, 4);

export default function ClientCTA({ onFind }) {
  return (
    <section className="pt-6 pb-20 md:pb-28" aria-labelledby="client-cta">
      <div className="shell">
        <div className="glass relative overflow-hidden rounded-[28px] px-6 py-8 sm:px-10 sm:py-10">
          <div className="pointer-events-none absolute -right-10 -bottom-16 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="eyebrow">For clients</p>
              <h2 id="client-cta" className="mt-3 font-display text-3xl font-semibold tracking-tight text-snow sm:text-4xl">
                Have a Project in Mind?
              </h2>
              <p className="mt-3 text-base leading-relaxed text-mist sm:text-lg">
                Find skilled professionals ready to help you turn your ideas into reality.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {preview.map((person) => (
                    <Avatar
                      key={person.id}
                      name={person.name}
                      hue={person.hue}
                      size={36}
                      className="ring-2 ring-[#0c1412]"
                    />
                  ))}
                </div>
                <p className="max-w-36 text-xs leading-relaxed text-mist">People ready to talk this week</p>
              </div>
              <button type="button" className="btn btn-primary" onClick={onFind}>
                Find Talent
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
