"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface CharacterCardProps {
  src: string;
  name: string;
  alias?: string;
  delay?: number;
}

export function CharacterCard({ src, name, alias, delay = 0 }: CharacterCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateX = (mouseY / (rect.height / 2)) * -15;
    const rotateY = (mouseX / (rect.width / 2)) * 15;

    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative group cursor-pointer"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      <motion.div
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative"
      >
        {/* Glow effect */}
        <div
          className={`absolute -inset-1 bg-gradient-to-r from-[#00d4ff] via-[#a855f7] to-[#ff3366] rounded-lg blur-md transition-opacity duration-300 ${
            isHovered ? "opacity-60" : "opacity-0"
          }`}
        />

        {/* Card container */}
        <div className="relative bg-[#0a1628] border border-[rgba(0,212,255,0.3)] overflow-hidden">
          {/* Tech corners */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#00d4ff] transition-all duration-300 group-hover:w-10 group-hover:h-10" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#00d4ff] transition-all duration-300 group-hover:w-10 group-hover:h-10" />

          {/* Image */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={src}
              alt={name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030810] via-transparent to-transparent" />

            {/* Scan line effect on hover */}
            <div
              className={`absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,212,255,0.03)_50%)] bg-[length:100%_4px] pointer-events-none transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Energy effect on hover */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                background: isHovered
                  ? [
                      "radial-gradient(circle at 50% 100%, rgba(0,212,255,0.2) 0%, transparent 50%)",
                      "radial-gradient(circle at 50% 100%, rgba(0,212,255,0.4) 0%, transparent 60%)",
                      "radial-gradient(circle at 50% 100%, rgba(0,212,255,0.2) 0%, transparent 50%)",
                    ]
                  : "radial-gradient(circle at 50% 100%, transparent 0%, transparent 50%)",
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>

          {/* Name plate */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#030810] to-transparent">
            <h3 className="font-orbitron font-bold text-white text-sm tracking-wider">
              {name}
            </h3>
            {alias && (
              <p className="font-rajdhani text-[#00d4ff] text-xs tracking-wider">
                &quot;{alias}&quot;
              </p>
            )}
          </div>

          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: isHovered
                ? [
                    "linear-gradient(105deg, transparent 40%, rgba(0,212,255,0.1) 45%, transparent 50%)",
                    "linear-gradient(105deg, transparent 45%, rgba(0,212,255,0.1) 50%, transparent 55%)",
                    "linear-gradient(105deg, transparent 50%, rgba(0,212,255,0.1) 55%, transparent 60%)",
                  ]
                : "linear-gradient(105deg, transparent 40%, transparent 45%, transparent 50%)",
            }}
            transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
