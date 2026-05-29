import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const trailRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const auraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Smooth lag / trail effect for the background glowing aura
      if (auraRef.current) {
        trailRef.current.x += (e.clientX - trailRef.current.x) * 0.15;
        trailRef.current.y += (e.clientY - trailRef.current.y) * 0.15;
        auraRef.current.style.transform = `translate3d(${trailRef.current.x - 128}px, ${trailRef.current.y - 128}px, 0)`;
      }

      // Check if target or any parent is interactive
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest(".interactive-card") ||
        target.classList.contains("cursor-pointer") ||
        window.getComputedStyle(target).cursor === "pointer";

      setLinkHovered(!!isInteractive);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Brutalist tracking crosshair indicator */}
      <div
        className={`pointer-events-none fixed top-0 left-0 z-50 h-6 w-6 -translate-x-1/2 -translate-y-1/2 border-2 border-[#22c55e] bg-[#22c55e]/10 transition-all duration-75 ease-out hidden md:block ${
          clicked ? "scale-90 bg-[#22c55e]/40 border-white" : ""
        } ${linkHovered ? "h-10 w-10 border-white bg-[#22c55e]/20 scale-110 rotate-45" : ""}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          willChange: "left, top, transform",
        }}
      />

      {/* Retro chunky terminal block center dot */}
      <div
        className={`pointer-events-none fixed top-0 left-0 z-50 h-2 w-2 -translate-x-1/2 -translate-y-1/2 bg-white transition-transform duration-75 hidden md:block ${
          linkHovered ? "scale-125 bg-[#22c55e]" : ""
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  );
}
