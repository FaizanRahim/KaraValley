import { useId } from "react";
import { Star } from "lucide-react";
import { useInView } from "../hooks/useInView";

const buttonVariants = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
  quiet: "btn btn-quiet",
};

export function Button({ variant = "primary", className = "", type = "button", ...props }) {
  return <button type={type} className={`${buttonVariants[variant]} ${className}`} {...props} />;
}

export function MountainMark({ className = "h-5 w-5" }) {
  const rawId = useId().replace(/:/g, "");

  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        d="M3 25.5 11.2 13.2 16 19.2 21.2 8.5 29 25.5"
        fill="none"
        stroke={`url(#${rawId})`}
        strokeWidth="1.7"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d="M21.2 8.5 22.4 12" stroke="#D6B56A" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="25.2" cy="7.2" r="1.15" fill="#D6B56A" />
      <defs>
        <linearGradient id={rawId} x1="4" y1="8" x2="28" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6EE7B7" />
          <stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Logo({ className = "" }) {
  return (
    <a href="#top" className={`group flex shrink-0 items-center gap-2.5 ${className}`} aria-label="KaraValley, home">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] transition group-hover:border-mint/40">
        <MountainMark />
      </span>
      <span className="font-display text-[0.92rem] font-semibold tracking-tight whitespace-nowrap text-snow sm:text-base">
        Faizan<span className="text-mint">Kara</span>Valley
      </span>
    </a>
  );
}

export function Avatar({ name, hue = 162, size = 48, className = "" }) {
  const rawId = useId().replace(/:/g, "");
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      className={`shrink-0 rounded-full ${className}`}
      role="img"
      aria-label={`Portrait of ${name}`}
    >
      <defs>
        <linearGradient id={rawId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={`hsl(${hue} 42% 32%)`} />
          <stop offset="55%" stopColor={`hsl(${(hue + 18) % 360} 38% 18%)`} />
          <stop offset="100%" stopColor={`hsl(${(hue + 46) % 360} 30% 12%)`} />
        </linearGradient>
      </defs>
      <rect width="80" height="80" rx="40" fill={`url(#${rawId})`} />
      <path d="M8 62 24 40 36 50 48 28 74 62" fill="none" stroke="rgba(214,181,106,0.55)" strokeWidth="2" />
      <text
        x="40"
        y="48"
        textAnchor="middle"
        fill="#F8FAFC"
        fontFamily="Outfit Variable, sans-serif"
        fontSize="26"
        fontWeight="600"
      >
        {initials}
      </text>
    </svg>
  );
}

export function Stars({ rating }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => {
        const filled = index < Math.round(rating);
        return (
          <Star
            key={index}
            size={14}
            strokeWidth={1.6}
            className={filled ? "fill-gold text-gold" : "fill-transparent text-white/20"}
            aria-hidden="true"
          />
        );
      })}
    </span>
  );
}

const availabilityTone = {
  "Available now": "bg-mint",
  "This week": "bg-gold",
  Booked: "bg-white/35",
};

export function Availability({ status }) {
  const pulsing = status === "Available now";

  return (
    <span className="inline-flex items-center gap-2 text-xs text-mist">
      <span
        className={pulsing ? "pulse-dot" : `h-1.5 w-1.5 rounded-full ${availabilityTone[status] || "bg-white/35"}`}
        aria-hidden="true"
      />
      {status}
    </span>
  );
}

export function Reveal({ children, className = "", delay = 0, blur = false }) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className={`reveal ${blur ? "reveal-blur" : ""} ${inView ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function SectionHeading({ eyebrow, title, subtitle, align = "left", id }) {
  const centered = align === "center";

  return (
    <Reveal blur className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? <p className={`eyebrow ${centered ? "eyebrow-center" : ""}`}>{eyebrow}</p> : null}
      <h2
        id={id}
        className="mt-3 font-display text-3xl font-semibold tracking-tight text-snow sm:text-4xl md:text-[2.75rem] md:leading-[1.1]"
      >
        {title}
      </h2>
      {subtitle ? <p className="mt-4 text-base leading-relaxed text-mist sm:text-lg">{subtitle}</p> : null}
    </Reveal>
  );
}

export function SocialIcon({ name }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true };

  if (name === "github") {
    return (
      <svg {...common}>
        <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.25 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
      </svg>
    );
  }

  if (name === "linkedin") {
    return (
      <svg {...common}>
        <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.48h4.52V24H.24V8.48zM8.34 8.48h4.33v2.12h.06c.6-1.14 2.08-2.34 4.28-2.34 4.58 0 5.42 3.01 5.42 6.93V24h-4.52v-6.86c0-1.64-.03-3.74-2.28-3.74-2.28 0-2.63 1.78-2.63 3.62V24H8.34V8.48z" />
      </svg>
    );
  }

  if (name === "instagram") {
    return (
      <svg {...common}>
        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zm0 1.8c-3.16 0-3.53.01-4.77.07-2.18.1-3.2 1.14-3.3 3.3-.06 1.24-.07 1.61-.07 4.77s.01 3.53.07 4.77c.1 2.16 1.12 3.2 3.3 3.3 1.24.06 1.61.07 4.77.07s3.53-.01 4.77-.07c2.18-.1 3.2-1.14 3.3-3.3.06-1.24.07-1.61.07-4.77s-.01-3.53-.07-4.77c-.1-2.16-1.12-3.2-3.3-3.3-1.24-.06-1.61-.07-4.77-.07zm0 3.07a4.97 4.97 0 1 1 0 9.94 4.97 4.97 0 0 1 0-9.94zm0 1.8a3.17 3.17 0 1 0 0 6.34 3.17 3.17 0 0 0 0-6.34zm6.16-2.07a1.16 1.16 0 1 1-2.32 0 1.16 1.16 0 0 1 2.32 0z" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M18.24 2H21.5l-7.5 8.57L22.8 22h-6.59l-5.16-6.74L5.4 22H2.12l8.02-9.17L1.2 2h6.76l4.66 6.17L18.24 2zm-1.16 18h1.8L7.01 3.9H5.08L17.08 20z" />
    </svg>
  );
}
