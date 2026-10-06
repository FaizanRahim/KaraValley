import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { availabilityOptions, experienceOptions, skillOptions, categories } from "../data/mockData";
import { Button } from "./ui";

const fields = [
  { key: "skill", label: "Skills", options: skillOptions },
  { key: "category", label: "Category", options: ["Any", ...categories.map((item) => item.name)] },
  { key: "experience", label: "Experience", options: experienceOptions },
  { key: "availability", label: "Availability", options: availabilityOptions },
];

export default function SearchTalent({ filters, onSearch }) {
  const [draft, setDraft] = useState(filters);
  const [searching, setSearching] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setSearching(true);
    await new Promise((resolve) => {
      window.setTimeout(resolve, 420);
    });
    setSearching(false);
    onSearch(draft);
  }

  return (
    <section id="search" className="section pt-4! md:pt-8!">
      <div className="shell">
        <div className="glass relative overflow-hidden rounded-[28px] px-5 py-7 sm:px-8 sm:py-10">
          <div className="pointer-events-none absolute -top-16 right-0 h-48 w-48 rounded-full bg-emerald-400/10 blur-3xl" />
          <p className="eyebrow">Talent search</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-snow sm:text-4xl md:text-5xl md:leading-[1.1]">
            Find the right talent for your next project.
          </h2>

          <form className="relative mt-8" role="search" aria-label="Search talent" onSubmit={onSubmit}>
            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="relative block flex-1">
                <span className="sr-only">Search freelancers, skills, or services</span>
                <Search size={18} className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-mist" aria-hidden="true" />
                <input
                  id="talent-search"
                  className="field pl-11"
                  placeholder="Search freelancers, skills, or services…"
                  value={draft.query}
                  onChange={(event) => setDraft((current) => ({ ...current, query: event.target.value }))}
                  autoComplete="off"
                />
              </label>
              <Button type="submit" className="w-full sm:w-auto sm:min-w-40" disabled={searching}>
                {searching ? "Searching…" : "Search Talent"}
              </Button>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {fields.map((field) => (
                <label key={field.key} className="block">
                  <span className="mb-2 block text-[0.68rem] font-semibold tracking-[0.16em] text-mist uppercase">
                    {field.label}
                  </span>
                  <span className="relative block">
                    <select
                      className="field appearance-none"
                      value={draft[field.key]}
                      aria-label={field.label}
                      onChange={(event) =>
                        setDraft((current) => ({ ...current, [field.key]: event.target.value }))
                      }
                    >
                      {field.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-mist"
                      aria-hidden="true"
                    />
                  </span>
                </label>
              ))}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
