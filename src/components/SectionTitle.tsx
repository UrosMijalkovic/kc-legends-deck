"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  align?: "left" | "center";
}

export function SectionTitle({ subtitle, title, align = "left" }: SectionTitleProps) {
  const { language } = useLanguage();

  return (
    <div className={`mb-12 ${align === "center" ? "text-center" : ""}`}>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`text-[#00d4ff] text-sm md:text-base uppercase tracking-[0.3em] mb-3 ${language === 'ja' ? 'font-noto-jp' : 'font-rajdhani'}`}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="font-orbitron text-3xl md:text-5xl font-extrabold uppercase tracking-wider text-white relative inline-block title-glow glitch cursor-pointer"
        data-text={title}
      >
        {title}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute -bottom-3 left-0 h-1 bg-gradient-to-r from-[#00d4ff] to-transparent origin-left"
          style={{ width: align === "center" ? "50%" : "150px", marginLeft: align === "center" ? "25%" : 0 }}
        />
      </motion.h2>
    </div>
  );
}
