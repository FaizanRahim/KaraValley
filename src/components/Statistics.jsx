import { useEffect, useState } from "react";
import { stats } from "../data/mockData";
import { useInView } from "../hooks/useInView";

function useCountUp(target, active) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return undefined;

    let frame = 0;
    const start = performance.now();
    const duration = 1200;

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target]);

  return value;
}

function Stat({ value, suffix, label, active, className }) {
  const count = useCountUp(value, active);

  return (
    <div className={`px-4 py-8 text-center sm:px-6 ${className}`}>
      <p className="font-display text-4xl font-semibold tracking-tight text-snow tabular-nums sm:text-5xl">
        {count}
        <span className="text-mint">{suffix}</span>
      </p>
      <p className="mt-2 text-sm text-mist">{label}</p>
    </div>
  );
}

const borders = [
  "border-b border-r border-white/10 md:border-b-0",
  "border-b border-white/10 md:border-r md:border-b-0",
  "border-r border-white/10",
  "",
];

export default function Statistics() {
  const [ref, inView] = useInView();

  return (
    <section id="stats" className="section pt-0!" aria-label="Marketplace statistics">
      <div className="shell">
        <div ref={ref} className="glass grid grid-cols-2 overflow-hidden rounded-[28px] md:grid-cols-4">
          {stats.map((stat, index) => (
            <Stat key={stat.label} {...stat} active={inView} className={borders[index]} />
          ))}
        </div>
      </div>
    </section>
  );
}
