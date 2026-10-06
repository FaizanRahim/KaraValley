import {
  Clapperboard,
  Code2,
  FileText,
  Megaphone,
  Palette,
  PenTool,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { categories } from "../data/mockData";
import { Reveal, SectionHeading } from "./ui";

const icons = {
  code: Code2,
  mobile: Smartphone,
  design: PenTool,
  graphic: Palette,
  marketing: Megaphone,
  writing: FileText,
  video: Clapperboard,
  ai: Sparkles,
};

export default function Categories({ active, onSelect }) {
  return (
    <section id="categories" className="section" aria-labelledby="categories-heading">
      <div className="shell">
        <SectionHeading
          id="categories-heading"
          eyebrow="Disciplines"
          title="Categories"
          subtitle="Eight practices. A direct way to reach the people who do them."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => {
            const Icon = icons[category.icon];
            const selected = active === category.name;

            return (
              <Reveal key={category.name} delay={Math.min(index, 7) * 50}>
                <button
                  type="button"
                  onClick={() => onSelect(category.name)}
                  aria-pressed={selected}
                  className={`lift glass h-full w-full rounded-3xl p-5 text-left ${
                    selected ? "border-mint/50 bg-white/10" : ""
                  }`}
                >
                  <span className="icon-orb" style={{ animationDelay: `${index * 0.35}s` }}>
                    <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-snow">{category.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{category.description}</p>
                  <p className="mt-4 text-xs tracking-wide text-gold">{category.count} professionals</p>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
