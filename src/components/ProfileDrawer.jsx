import { useState } from "react";
import { MapPin, X } from "lucide-react";
import { useDialog } from "../hooks/useDialog";
import { Availability, Avatar, Button, Stars } from "./ui";

export default function ProfileDrawer({ person, user, onClose, showNotice }) {
  const ref = useDialog(true, onClose);
  const [inviting, setInviting] = useState(false);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const savedLabel = user?.role === "freelancer";

  function sendInvite(event) {
    event.preventDefault();
    if (note.trim().length < 12) {
      setError("Add a sentence or two about the work.");
      return;
    }
    setError("");
    setSent(true);
    showNotice(savedLabel ? `${person.name} saved for later.` : `Invitation noted for ${person.name}.`);
  }

  return (
    <div
      className="overlay-fade fixed inset-0 z-[60] flex justify-end bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-title"
        className="glass-strong drawer-in flex h-dvh w-full max-w-xl flex-col overflow-y-auto"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 sm:px-7">
          <p className="text-xs tracking-[0.16em] text-mist uppercase">Profile</p>
          <button type="button" className="icon-btn" aria-label="Close profile" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="px-5 pb-10 sm:px-7">
          <div className="flex items-start gap-4">
            <Avatar name={person.name} hue={person.hue} size={72} />
            <div className="min-w-0">
              <h2 id="profile-title" className="font-display text-2xl font-semibold tracking-tight text-snow">
                {person.name}
              </h2>
              <p className="text-mint">{person.title}</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-mist">
                <MapPin size={14} aria-hidden="true" />
                {person.location}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <Availability status={person.availability} />
            <span className="inline-flex items-center gap-1.5 text-sm text-mist">
              <Stars rating={person.rating} />
              <span className="text-snow">{person.rating.toFixed(1)}</span>
              <span>({person.reviews})</span>
            </span>
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["Rate", `$${person.rate}/hr`],
              ["Projects", String(person.projects)],
              ["Experience", person.experience],
              ["Replies", person.response],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-3">
                <dt className="text-[0.68rem] tracking-[0.14em] text-mist uppercase">{label}</dt>
                <dd className="mt-1 text-sm font-semibold text-snow">{value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 text-sm leading-relaxed text-mist">{person.bio}</p>
          <p className="mt-3 text-xs text-mist">Member since {person.memberSince}</p>

          <h3 className="mt-8 font-display text-lg text-snow">Skills</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {person.skills.map((skill) => (
              <li key={skill} className="chip">
                {skill}
              </li>
            ))}
          </ul>

          <h3 className="mt-8 font-display text-lg text-snow">Languages</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {person.languages.map((language) => (
              <li key={language} className="chip">
                {language}
              </li>
            ))}
          </ul>

          <h3 className="mt-8 font-display text-lg text-snow">Selected work</h3>
          <ul className="mt-3 space-y-3">
            {person.work.map((piece) => (
              <li key={piece.name} className="overflow-hidden rounded-2xl border border-white/10">
                <div className="h-16" style={{ background: `linear-gradient(135deg, ${piece.from}, ${piece.to})` }} />
                <div className="px-4 py-3">
                  <p className="font-medium text-snow">{piece.name}</p>
                  <p className="text-sm text-mist">{piece.result}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            {sent ? (
              <div className="rounded-2xl border border-mint/30 bg-emerald-400/10 px-4 py-4" role="status">
                <p className="font-medium text-snow">{savedLabel ? "Saved in this session." : "Invitation noted."}</p>
                <p className="mt-1 text-sm text-mist">
                  {savedLabel
                    ? `${person.name} is on your list for this visit.`
                    : `${person.name} would receive this note in a live workspace.`}
                </p>
              </div>
            ) : inviting ? (
              <form onSubmit={sendInvite} className="space-y-3">
                <label className="block">
                  <span className="mb-1.5 block text-sm text-mist">
                    {savedLabel ? "Why this profile?" : "What do you need?"}
                  </span>
                  <textarea
                    className="field min-h-28 resize-y"
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                  />
                  {error ? <span className="mt-1 block text-xs text-gold" role="alert">{error}</span> : null}
                </label>
                <div className="flex gap-2">
                  <Button type="submit">{savedLabel ? "Save profile" : "Send invitation"}</Button>
                  <Button variant="secondary" onClick={() => setInviting(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <Button onClick={() => setInviting(true)}>
                {savedLabel ? "Save for later" : "Invite to project"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
