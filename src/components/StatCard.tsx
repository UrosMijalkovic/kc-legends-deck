"use client";

import { motion } from "framer-motion";
import { useCounter } from "@/hooks/useCounter";

interface StatCardProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  highlight?: boolean;
  delay?: number;
  staticValue?: string;
}

export function StatCard({
  value,
  label,
  suffix = "",
  prefix = "",
  highlight = false,
  delay = 0,
  staticValue,
}: StatCardProps) {
  const { ref, value: animatedValue, isInView } = useCounter(value, 2000, suffix, prefix);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
      className="relative group"
    >
      <div
        className={`relative bg-[#0a1628]/80 border border-[rgba(0,212,255,0.2)] p-4 md:p-6 text-center overflow-hidden transition-all duration-300 hover:border-[rgba(0,212,255,0.5)] hover:shadow-[0_0_30px_rgba(0,212,255,0.15)] h-full flex flex-col justify-center min-h-[120px]`}
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent opacity-50" />

        {/* Shimmer effect */}
        <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Value */}
        <div
          className={`font-orbitron text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 transition-all duration-300 ${
            highlight ? "text-[#66ff00]" : "text-[#00d4ff]"
          } ${isInView ? "glow-text" : ""}`}
        >
          {staticValue || animatedValue}
        </div>

        {/* Label */}
        <div className="font-rajdhani text-[10px] sm:text-xs md:text-sm text-gray-400 uppercase tracking-wider md:tracking-widest leading-tight">
          {label}
        </div>

        {/* Corner accents */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#00d4ff]/30 transition-all duration-300 group-hover:border-[#00d4ff]" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#00d4ff]/30 transition-all duration-300 group-hover:border-[#00d4ff]" />
      </div>
    </motion.div>
  );
}

export function BigStatCard({
  value,
  label,
  suffix = "",
  sublabel,
  delay = 0,
}: {
  value: number;
  label: string;
  suffix?: string;
  sublabel?: string;
  delay?: number;
}) {
  const { ref, value: animatedValue } = useCounter(value, 2500, suffix);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      className="relative group"
    >
      <div className="relative bg-gradient-to-br from-[rgba(0,212,255,0.15)] to-[rgba(0,212,255,0.05)] border-2 border-[#00d4ff] p-8 md:p-12 text-center overflow-hidden energy-border">
        {/* Rotating gradient background */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -inset-full animate-spin"
            style={{
              background:
                "conic-gradient(from 0deg, transparent, rgba(0,212,255,0.1), transparent)",
              animationDuration: "10s",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="font-orbitron text-5xl md:text-7xl font-black text-[#00d4ff] title-glow mb-3">
            {animatedValue}
          </div>
          <div className="font-rajdhani text-sm md:text-base text-white uppercase tracking-[0.2em]">
            {label}
          </div>
          {sublabel && (
            <p className="mt-4 text-gray-400 italic text-sm">{sublabel}</p>
          )}
        </div>

        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#00d4ff]" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#00d4ff]" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#00d4ff]" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#00d4ff]" />
      </div>
    </motion.div>
  );
}
