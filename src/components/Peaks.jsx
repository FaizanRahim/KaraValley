const DISTANT =
  "M0 226 C90 214 150 176 230 194 C320 214 370 150 460 170 C545 188 600 124 690 146 C775 166 835 108 920 134 C1005 160 1060 116 1150 146 C1235 174 1300 138 1440 156";

const NEAR =
  "M0 252 L62 240 L118 262 L176 210 L236 232 L304 170 L356 204 L428 124 L478 166 L538 82 L592 140 L662 104 L734 162 L802 90 L864 148 L942 62 L1004 136 L1076 102 L1146 168 L1216 118 L1288 184 L1354 146 L1440 172";

export default function Peaks({ className = "", strong = false }) {
  const distantFill = strong ? "rgba(255,255,255,0.045)" : "rgba(255,255,255,0.03)";
  const nearFill = strong ? "rgba(16,185,129,0.12)" : "rgba(16,185,129,0.055)";
  const gold = strong ? "rgba(214,181,106,0.55)" : "rgba(214,181,106,0.28)";
  const cyan = strong ? "rgba(34,211,238,0.35)" : "rgba(34,211,238,0.16)";

  return (
    <svg className={className} viewBox="0 0 1440 320" preserveAspectRatio="none" aria-hidden="true">
      <path d={`${DISTANT} L1440 320 L0 320 Z`} fill={distantFill} />
      <path d={DISTANT} fill="none" stroke={cyan} strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
      <path d={`${NEAR} L1440 320 L0 320 Z`} fill={nearFill} />
      <path d={NEAR} fill="none" stroke={gold} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
