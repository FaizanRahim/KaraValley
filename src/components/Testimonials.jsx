import { useState } from "react";
import { Quote } from "lucide-react";
import { testimonials } from "../data/mockData";
import { Avatar, SectionHeading, Stars } from "./ui";

function Card({ item }) {
  return (
    <figure className="glass w-[min(82vw,22.5rem)] shrink-0 rounded-3xl p-5">
      <Quote size={18} className="text-gold/80" aria-hidden="true" />
      <blockquote className="mt-3 text-sm leading-relaxed text-snow">{item.quote}</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <Avatar name={item.name} hue={item.hue} size={42} />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-snow">{item.name}</p>
          <p className="truncate text-xs text-mist">{item.role}</p>
          <div className="mt-1">
            <Stars rating={item.rating} />
          </div>
        </div>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  const [paused, setPaused] = useState(false);

  return (
    <section id="stories" className="section overflow-hidden" aria-labelledby="stories-heading">
      <div className="shell">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            id="stories-heading"
            eyebrow="In their words"
            title="Trusted on both sides of the work."
            subtitle="Clients and freelancers, after the project — not before the pitch."
          />
          <button
            type="button"
            className="btn btn-secondary self-start"
            aria-pressed={paused}
            onClick={() => setPaused((value) => !value)}
          >
            {paused ? "Play stories" : "Pause stories"}
          </button>
        </div>
      </div>

      <div className="mt-10 overflow-hidden" aria-roledescription="carousel" aria-label="Testimonials">
        <div className={`marquee flex w-max ${paused ? "is-paused" : ""}`}>
          <div className="flex gap-4 pr-4">
            {testimonials.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
          <div className="flex gap-4 pr-4" aria-hidden="true">
            {testimonials.map((item) => (
              <Card key={`${item.id}-copy`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
