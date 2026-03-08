import { motion } from "framer-motion";
import { useMemo } from "react";

const COLORS = [
  "hsl(12, 80%, 62%)",
  "hsl(340, 70%, 65%)",
  "hsl(35, 90%, 70%)",
  "hsl(180, 50%, 55%)",
  "hsl(260, 60%, 65%)",
  "hsl(50, 90%, 60%)",
];

export function Confetti({ count = 30 }: { count?: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        size: Math.random() * 8 + 4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * 360,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-50">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-sm"
          style={{
            left: `${p.left}%`,
            top: -10,
            width: p.size,
            height: p.size * 1.5,
            backgroundColor: p.color,
            rotate: p.rotation,
          }}
          animate={{
            y: ["0vh", "105vh"],
            rotate: [p.rotation, p.rotation + 720],
            opacity: [1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: p.delay,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  );
}
