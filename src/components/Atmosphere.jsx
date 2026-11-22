import Peaks from "./Peaks";

function seeded(count, map) {
  const items = [];
  let seed = 91;

  const next = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  for (let index = 0; index < count; index += 1) {
    items.push(map(next, index));
  }

  return items;
}

const STARS = seeded(46, (next) => ({
  left: `${(next() * 100).toFixed(2)}%`,
  top: `${(next() * 72).toFixed(2)}%`,
  size: next() > 0.86 ? 2.4 : next() > 0.5 ? 1.5 : 1,
  opacity: 0.25 + next() * 0.5,
  twinkle: next() > 0.72,
  delay: `${(next() * 7).toFixed(2)}s`,
}));

const moteColors = ["rgba(16,185,129,0.45)", "rgba(34,211,238,0.35)", "rgba(214,181,106,0.4)"];

const MOTES = seeded(12, (next, index) => ({
  left: `${(next() * 100).toFixed(2)}%`,
  top: `${(next() * 86).toFixed(2)}%`,
  size: 3 + next() * 5,
  color: moteColors[index % moteColors.length],
  duration: `${16 + next() * 14}s`,
  delay: `${-next() * 12}s`,
}));

export default function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-ink" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(214,181,106,0.07),transparent_42%)]" />
      <div className="aurora" />
      <div className="aurora-cyan" />

      {STARS.map((star, index) => (
        <span
          key={`star-${index}`}
          className={`absolute rounded-full bg-white ${star.twinkle ? "star-twinkle" : ""}`}
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            animationDelay: star.delay,
          }}
        />
      ))}

      {MOTES.map((mote, index) => (
        <span
          key={`mote-${index}`}
          className="mote"
          style={{
            left: mote.left,
            top: mote.top,
            width: mote.size,
            height: mote.size,
            background: mote.color,
            animationDuration: mote.duration,
            animationDelay: mote.delay,
            boxShadow: `0 0 12px ${mote.color}`,
          }}
        />
      ))}

      <div className="ridge-drift absolute inset-x-[-8%] bottom-[-2%] h-[50vh] min-h-[240px]">
        <Peaks className="h-full w-[110%] max-w-none" />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.42)_100%)]" />
      <div className="noise" />
    </div>
  );
}
