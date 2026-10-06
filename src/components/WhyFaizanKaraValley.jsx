import { BadgeCheck, Compass, Globe, MessagesSquare, Mountain, UserRound } from "lucide-react";
import { reasons } from "../data/mockData";
import { Reveal, SectionHeading } from "./ui";

const icons = {
  globe: Globe,
  badge: BadgeCheck,
  messages: MessagesSquare,
  mountain: Mountain,
  user: UserRound,
  compass: Compass,
};

export default function WhyKaraValley() {
  return (
    <section id="why" className="section" aria-labelledby="why-heading">
      <div className="shell">
        <SectionHeading
          id="why-heading"
          eyebrow="The platform"
          title="Built for Talent. Designed for Opportunity."
          subtitle="A marketplace with room to breathe — for the people doing the work, and the people hiring them."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => {
            const Icon = icons[reason.icon];
            return (
              <Reveal key={reason.title} delay={Math.min(index, 5) * 60}>
                <article className="lift glass relative h-full overflow-hidden rounded-3xl p-6">
                  {reason.icon === "mountain" ? (
                    <Mountain
                      className="pointer-events-none absolute -right-3 -bottom-4 h-28 w-28 text-white/4"
                      strokeWidth={1}
                      aria-hidden="true"
                    />
                  ) : null}
                  <span className="icon-orb" style={{ animationDelay: `${index * 0.4}s` }}>
                    <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-snow">{reason.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{reason.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
