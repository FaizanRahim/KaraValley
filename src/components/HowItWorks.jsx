import { useState } from "react";
import { clientSteps, freelancerSteps } from "../data/mockData";
import { Reveal, SectionHeading } from "./ui";

export default function HowItWorks() {
  const [audience, setAudience] = useState("clients");
  const steps = audience === "clients" ? clientSteps : freelancerSteps;

  return (
    <section id="how-it-works" className="section" aria-labelledby="how-heading">
      <div className="shell">
        <SectionHeading
          id="how-heading"
          eyebrow="The path"
          title="How It Works"
          subtitle="Three quiet steps. No bidding board, no noise between the work and the people doing it."
        />

        <div className="mt-8 inline-flex rounded-full border border-white/10 bg-white/[0.04] p-1" role="group" aria-label="Choose an audience">
          {[
            ["clients", "For Clients"],
            ["freelancers", "For Freelancers"],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={audience === value}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                audience === value ? "bg-white/10 text-snow" : "text-mist hover:text-snow"
              }`}
              onClick={() => setAudience(value)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="relative mt-10">
          <div className="pointer-events-none absolute top-8 right-[8%] left-[8%] hidden lg:block" aria-hidden="true">
            <div className="flow-line" />
          </div>
          <ol key={audience} className="relative z-10 grid gap-5 lg:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.number}>
                <Reveal delay={index * 90}>
                  <article className="glass h-full rounded-3xl p-6">
                    <p className="font-display text-sm tracking-[0.22em] text-gold">{step.number}</p>
                    <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-snow">{step.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-mist">{step.text}</p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
