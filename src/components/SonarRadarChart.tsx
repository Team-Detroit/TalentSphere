import { useState } from "react";

interface RadarMetric {
  name: string;
  score: number; // Out of 100
  color: string;
}

interface SonarRadarChartProps {
  metrics?: RadarMetric[];
  overallScore?: number;
}

export default function SonarRadarChart({ metrics, overallScore = 92 }: SonarRadarChartProps) {
  const defaultMetrics: RadarMetric[] = metrics || [
    { name: "Academics", score: 94, color: "#22c55e" },
    { name: "Projects", score: 88, color: "#ffffff" },
    { name: "Coding", score: 90, color: "#22c55e" },
    { name: "Leadership", score: 85, color: "#ffffff" },
    { name: "Internships", score: 80, color: "#22c55e" },
    { name: "Certifications", score: 95, color: "#ffffff" },
    { name: "Hackathons", score: 92, color: "#22c55e" },
  ];

  const [activeMetric, setActiveMetric] = useState<RadarMetric | null>(defaultMetrics[0]);

  // Center coordinate and radius of the SVG
  const cx = 150;
  const cy = 150;
  const r = 110;
  const totalSides = defaultMetrics.length;

  // Calculates coordinate for a point on heptagon
  const getCoordinates = (index: number, valueRatio: number) => {
    const angle = (index * 2 * Math.PI) / totalSides - Math.PI / 2;
    const distance = valueRatio * r;
    const x = cx + distance * Math.cos(angle);
    const y = cy + distance * Math.sin(angle);
    return { x, y };
  };

  // Generate web polygon paths
  const levels = [0.25, 0.5, 0.75, 1.0];
  const levelPolygons = levels.map((lvl) => {
    const points = Array.from({ length: totalSides })
      .map((_, i) => {
        const { x, y } = getCoordinates(i, lvl);
        return `${x},${y}`;
      })
      .join(" ");
    return points;
  });

  // Score polygon
  const scorePoints = defaultMetrics
    .map((m, i) => {
      const { x, y } = getCoordinates(i, m.score / 100);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="relative flex flex-col items-center justify-between gap-6 overflow-hidden border-2 border-white bg-black p-6 md:flex-row shadow-[4px_4px_0px_0px_#ffffff] font-mono">
      
      {/* Chart Canvas */}
      <div className="relative h-[300px] w-[300px] shrink-0">
        <svg className="h-full w-full" viewBox="0 0 300 300">
          <defs>
            <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Core Glow */}
          <circle cx={cx} cy={cy} r={r} fill="url(#radarGlow)" />

          {/* Level nested rings */}
          {levelPolygons.map((points, index) => (
            <polygon
              key={index}
              points={points}
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1.5"
              strokeDasharray={index === 3 ? "0" : "4,4"}
            />
          ))}

          {/* Metric lines radiating from center */}
          {Array.from({ length: totalSides }).map((_, i) => {
            const { x, y } = getCoordinates(i, 1.0);
            return (
              <line
                key={i}
                x1={cx}
                y1={cy}
                x2={x}
                y2={y}
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="1.5"
              />
            );
          })}

          {/* Filled user score blueprint polygon */}
          <polygon
            points={scorePoints}
            fill="rgba(34, 197, 94, 0.35)"
            stroke="#22c55e"
            strokeWidth="3"
            className="transition-all duration-500"
          />

          {/* Vertex circular nodes with color indicators */}
          {defaultMetrics.map((m, i) => {
            const { x, y } = getCoordinates(i, m.score / 100);
            const isHovered = activeMetric?.name === m.name;
            return (
              <g
                key={i}
                className="cursor-pointer group"
                onClick={() => setActiveMetric(m)}
                onMouseEnter={() => setActiveMetric(m)}
              >
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? "8" : "5"}
                  fill={m.color}
                  stroke="#000000"
                  strokeWidth="1.5"
                  className="transition-all duration-200 group-hover:scale-125"
                />
              </g>
            );
          })}

          {/* Radial Floating Labels */}
          {defaultMetrics.map((m, i) => {
            const { x, y } = getCoordinates(i, 1.2);
            const isHovered = activeMetric?.name === m.name;
            return (
              <text
                key={i}
                x={x}
                y={y}
                fill={isHovered ? "#22c55e" : "#ffffff"}
                fontSize="10"
                fontWeight="900"
                textAnchor="middle"
                alignmentBaseline="middle"
                className="transition-colors duration-150 font-mono uppercase cursor-pointer"
                onClick={() => setActiveMetric(m)}
              >
                {m.name}
              </text>
            );
          })}
        </svg>

        {/* Center score readout */}
        <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center bg-black p-2 text-center h-[76px] w-[76px] border-2 border-white shadow-[2px_2px_0px_#ffffff]">
          <span className="text-[8px] font-black uppercase text-[#22c55e]">SCORE</span>
          <span className="text-xl font-black text-white">
            {overallScore}
          </span>
          <span className="text-[8px] text-slate-400">/100</span>
        </div>
      </div>

      {/* Profile Score Right Side Breakdown */}
      <div className="flex w-full flex-col justify-center gap-4">
        <div>
          <h4 className="text-[11px] font-black uppercase tracking-wider text-[#22c55e]">[ TALENT SPECTRUM LOG ]</h4>
          <p className="mt-1 text-xs text-slate-300 leading-relaxed font-mono">
            Multidimensional grid evaluating verified student competencies across structural nodes.
          </p>
        </div>

        {/* Current Selected Metric Card */}
        {activeMetric && (
          <div className="border-2 border-white bg-[#020e06] p-4 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-none border border-white"
                  style={{ backgroundColor: activeMetric.color }}
                />
                <span className="text-xs font-black uppercase text-white">{activeMetric.name}</span>
              </div>
              <span className="bg-[#22c55e] text-black px-2 py-0.5 text-[9px] font-black uppercase">
                {activeMetric.score}% LEVEL
              </span>
            </div>

            {/* Micro-bar chart */}
            <div className="mt-3 overflow-hidden border border-white bg-black h-3">
              <div
                className="h-full bg-[#22c55e] transition-all duration-500"
                style={{
                  width: `${activeMetric.score}%`,
                }}
              />
            </div>

            {/* Custom Evaluation Text */}
            <p className="mt-2 text-[10px] text-slate-400 leading-normal">
              {activeMetric.name === "Academics" && "Maintained a top-tier CGPA. Excellent foundational concepts and systemic logic."}
              {activeMetric.name === "Projects" && "High level of software craftsmanship. Experience building scalable peer-to-peer networks and web ecosystems."}
              {activeMetric.name === "Coding" && "Outstanding algorithmic profile. Active solver on LeetCode with strong performance records."}
              {activeMetric.name === "Leadership" && "Dynamic student representation. Great coordination skills in hackathons and club boards."}
              {activeMetric.name === "Internships" && "Applied industrial experience. Successfully pushed API web enhancements with global engineering teams."}
              {activeMetric.name === "Certifications" && "Globally verified expertise across major clouds and deep machine learning organizations."}
              {activeMetric.name === "Hackathons" && "Multiple national-level hackathon wins. Proven capability under high intensity limits."}
            </p>
          </div>
        )}

        {/* Dynamic Strengths Pill Summary */}
        <div className="flex flex-wrap gap-2 pt-2">
          <span className="bg-[#020e06] border border-white px-2.5 py-1 text-[9px] font-black text-[#22c55e] uppercase">
            [+] STRENGTH: CLOUD & SYSTEMS
          </span>
          <span className="bg-[#020e06] border border-white px-2.5 py-1 text-[9px] font-black text-white uppercase">
            [+] FOCUS: PEER NETWORKS
          </span>
        </div>
      </div>
    </div>
  );
}
