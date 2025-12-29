"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Milestone {
  quarter: string;
  year: string;
  title: string;
  description: string;
  status: "completed" | "current" | "upcoming";
  icon: string;
}

const milestones: Milestone[] = [
  {
    quarter: "Q1",
    year: "2026",
    title: "Pre-Production",
    description: "Final game design, asset pipeline, marketing prep",
    status: "upcoming",
    icon: "📋",
  },
  {
    quarter: "Q2",
    year: "2026",
    title: "Production",
    description: "Full development, content creation, beta testing",
    status: "upcoming",
    icon: "⚙️",
  },
  {
    quarter: "Q3",
    year: "2026",
    title: "Release",
    description: "Global launch, marketing campaign, live ops",
    status: "upcoming",
    icon: "🚀",
  },
];

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <div ref={containerRef} className="relative py-12">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="font-rajdhani text-[#00d4ff] text-sm uppercase tracking-[0.3em] mb-3">
          Roadmap
        </p>
        <h2 className="font-orbitron text-2xl md:text-4xl font-bold text-white">
          Path to Launch
        </h2>
      </motion.div>

      {/* Timeline Container */}
      <div className="relative max-w-5xl mx-auto">
        {/* Animated Progress Line - Background */}
        <div className="absolute top-[60px] left-0 right-0 h-1 bg-[#0a1628] hidden md:block">
          <div className="absolute inset-0 bg-[#00d4ff]/20" />
        </div>

        {/* Animated Progress Line - Filling */}
        <motion.div
          className="absolute top-[60px] left-0 h-1 bg-gradient-to-r from-[#00d4ff] via-[#66ff00] to-[#ffcc00] hidden md:block"
          initial={{ width: "0%" }}
          animate={isInView ? { width: "100%" } : {}}
          transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
        >
          {/* Glow effect */}
          <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#00d4ff]"
            animate={{
              boxShadow: [
                "0 0 10px #00d4ff, 0 0 20px #00d4ff",
                "0 0 20px #00d4ff, 0 0 40px #00d4ff",
                "0 0 10px #00d4ff, 0 0 20px #00d4ff",
              ],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>

        {/* Milestones */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-4 relative">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.quarter}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.3 }}
              className="relative flex flex-col items-center"
            >
              {/* Node */}
              <motion.div
                className="relative z-10 mb-6"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  delay: 0.5 + index * 0.4,
                }}
              >
                {/* Outer ring */}
                <motion.div
                  className="w-[120px] h-[120px] rounded-full border-2 border-[#00d4ff]/30 flex items-center justify-center"
                  animate={
                    isInView
                      ? {
                          borderColor: [
                            "rgba(0,212,255,0.3)",
                            "rgba(0,212,255,0.8)",
                            "rgba(0,212,255,0.3)",
                          ],
                        }
                      : {}
                  }
                  transition={{
                    duration: 2,
                    delay: 1 + index * 0.3,
                    repeat: Infinity,
                  }}
                >
                  {/* Inner circle */}
                  <div className="w-[100px] h-[100px] rounded-full bg-gradient-to-br from-[#0a1628] to-[#0d2238] border border-[#00d4ff]/50 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(0,212,255,0.2)]">
                    <span className="text-3xl mb-1">{milestone.icon}</span>
                    <span className="font-orbitron text-[#00d4ff] text-lg font-bold">
                      {milestone.quarter}
                    </span>
                    <span className="font-rajdhani text-gray-400 text-xs">
                      {milestone.year}
                    </span>
                  </div>
                </motion.div>

                {/* Pulse effect */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-[#00d4ff]"
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={
                    isInView
                      ? {
                          scale: [1, 1.3, 1.3],
                          opacity: [0.5, 0, 0],
                        }
                      : {}
                  }
                  transition={{
                    duration: 2,
                    delay: 1.5 + index * 0.3,
                    repeat: Infinity,
                  }}
                />
              </motion.div>

              {/* Content Card */}
              <motion.div
                className="bg-[#0a1628]/80 border border-[#00d4ff]/20 p-6 text-center w-full max-w-[280px] hover:border-[#00d4ff]/50 transition-colors"
                whileHover={{ y: -5, boxShadow: "0 10px 40px rgba(0,212,255,0.15)" }}
              >
                <h3 className="font-orbitron text-lg font-bold text-white mb-2">
                  {milestone.title}
                </h3>
                <p className="font-rajdhani text-gray-400 text-sm leading-relaxed">
                  {milestone.description}
                </p>
              </motion.div>

              {/* Connector line for mobile */}
              {index < milestones.length - 1 && (
                <div className="md:hidden w-0.5 h-8 bg-gradient-to-b from-[#00d4ff] to-[#00d4ff]/20 mt-4" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Current Status Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 2 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-[#0a1628]/80 border border-[#66ff00]/30 px-6 py-3">
            <motion.div
              className="w-3 h-3 rounded-full bg-[#66ff00]"
              animate={{
                boxShadow: [
                  "0 0 5px #66ff00",
                  "0 0 15px #66ff00",
                  "0 0 5px #66ff00",
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="font-rajdhani text-[#66ff00] uppercase tracking-wider text-sm">
              Currently: Seeking Main Sponsor
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
