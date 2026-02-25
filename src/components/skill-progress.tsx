"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface SkillProgressProps {
  skill: string;
  level: number;
  color?: string;
  className?: string;
  delay?: number;
}

export function SkillProgress({
  skill,
  level,
  color = "from-accent to-accent/60",
  className = "",
  delay = 0,
}: SkillProgressProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-foreground">{skill}</span>
        <span className="text-sm text-muted/80">{level}%</span>
      </div>
      <div className="h-2 bg-surface/50 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${color} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: isVisible ? `${level}%` : 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 + delay }}
        />
      </div>
    </div>
  );
}
