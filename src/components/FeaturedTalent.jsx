import { X } from "lucide-react";
import { hasActiveFilters } from "../data/mockData";
import { Reveal, SectionHeading } from "./ui";
import TalentCard from "./TalentCard";

const labels = {
  query: "Search",
  skill: "Skill",
  category: "Category",
  experience: "Experience",
  availability: "Availability",
};

export default function FeaturedTalent({ people, filters, onOpen, onFilters }) {
  const active = hasActiveFilters(filters);
  const pills = Object.entries(labels).flatMap(([key, label]) => {
    const value = key === "query" ? filters.query.trim() : filters[key];
    if (!value || value === "Any") return [];
    return [{ key, label, value }];
  });

  function remove(key) {
    onFilters({ ...filters, [key]: key === "query" ? "" : "Any" });
  }

  return (
    <section id="talent" className="section" aria-labelledby="talent-heading">
      <div className="shell">
        <SectionHeading
          id="talent-heading"
          eyebrow="Featured"
          title="Meet Exceptional Talent"
          subtitle="Discover skilled professionals ready to bring your ideas to life."
        />

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-mist" aria-live="polite">
            {people.length} profile{people.length === 1 ? "" : "s"}
            {active ? " match your search" : " featured this week"}.
          </p>
          {active ? (
            <button type="button" className="text-sm text-mint hover:text-snow" onClick={() => onFilters({
              query: "",
              skill: "Any",
              category: "Any",
              experience: "Any",
              availability: "Any",
            })}
            >
              Clear filters
            </button>
          ) : null}
        </div>

        {pills.length ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {pills.map((pill) => (
              <li key={pill.key}>
                <button
                  type="button"
                  className="chip"
                  onClick={() => remove(pill.key)}
                  aria-label={`Remove ${pill.label} filter ${pill.value}`}
                >
                  {pill.label}: {pill.value}
                  <X size={12} className="ml-1.5" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        ) : null}

        {people.length ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {people.map((person, index) => (
              <Reveal key={person.id} delay={Math.min(index, 5) * 70}>
                <TalentCard person={person} onOpen={onOpen} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="glass mt-8 rounded-3xl px-6 py-14 text-center">
            <p className="font-display text-2xl text-snow">No profiles match those filters.</p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-mist">
              Try a broader skill, or clear the search to see this week’s featured talent.
            </p>
            <button
              type="button"
              className="btn btn-secondary mt-6"
              onClick={() =>
                onFilters({
                  query: "",
                  skill: "Any",
                  category: "Any",
                  experience: "Any",
                  availability: "Any",
                })
              }
            >
              Show all talent
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
