import { ArrowUpRight, MapPin } from "lucide-react";
import { Availability, Avatar, Stars } from "./ui";

export default function TalentCard({ person, onOpen }) {
  return (
    <article className="talent-card glass flex h-full flex-col rounded-3xl p-5">
      <div className="flex items-start gap-3.5">
        <Avatar name={person.name} hue={person.hue} size={52} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-lg font-semibold tracking-tight text-snow">{person.name}</h3>
          </div>
          <p className="text-sm text-mint">{person.title}</p>
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-mist">
            <MapPin size={13} aria-hidden="true" />
            <span className="truncate">{person.location}</span>
          </p>
        </div>
      </div>

      <div className="mt-4">
        <Availability status={person.availability} />
      </div>

      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-mist">{person.bio}</p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {person.skills.map((skill) => (
          <li key={skill} className="chip">
            {skill}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4 text-sm">
        <div className="flex items-center gap-2">
          <Stars rating={person.rating} />
          <span className="text-snow">{person.rating.toFixed(1)}</span>
        </div>
        <p className="text-mist">{person.projects} projects</p>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="font-display text-2xl font-semibold tracking-tight text-snow">
          ${person.rate}
          <span className="text-sm font-medium text-mist">/hr</span>
        </p>
        <button type="button" className="profile-btn btn btn-secondary px-4" onClick={() => onOpen(person.id)}>
          View Profile
          <ArrowUpRight size={15} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
