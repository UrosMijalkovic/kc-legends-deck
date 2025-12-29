"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface HeroSlide {
  src: string;
  name: string;
  alias: string;
}

interface HeroGalleryProps {
  slides: HeroSlide[];
  autoPlayInterval?: number;
}

export function HeroGallery({ slides, autoPlayInterval = 5000 }: HeroGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [goToNext, autoPlayInterval, isPaused]);

  return (
    <div
      className="relative w-full max-w-5xl mx-auto mt-16"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden border-2 border-[#00d4ff]/30 bg-[#0a1628]">
        {/* Corner Decorations */}
        <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#00d4ff] z-20" />
        <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#00d4ff] z-20" />
        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#00d4ff] z-20" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#00d4ff] z-20" />

        {/* Slides */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={slides[currentIndex].src}
              alt={slides[currentIndex].name}
              fill
              className="object-cover"
              priority
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030810] via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#030810]/50 via-transparent to-[#030810]/50" />

            {/* Character Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute bottom-8 left-8 z-10"
            >
              <h3 className="font-orbitron text-3xl md:text-4xl font-bold text-white mb-2">
                {slides[currentIndex].name}
              </h3>
              <p className="font-rajdhani text-xl md:text-2xl text-[#00d4ff] tracking-wider">
                &quot;{slides[currentIndex].alias}&quot;
              </p>
            </motion.div>

            {/* Scan Lines Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,212,255,0.02)_50%)] bg-[length:100%_4px] pointer-events-none" />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-[#030810]/80 border border-[#00d4ff]/50 text-[#00d4ff] hover:bg-[#00d4ff]/20 hover:border-[#00d4ff] transition-all duration-300 group"
          aria-label="Previous slide"
        >
          <svg
            className="w-6 h-6 group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-[#030810]/80 border border-[#00d4ff]/50 text-[#00d4ff] hover:bg-[#00d4ff]/20 hover:border-[#00d4ff] transition-all duration-300 group"
          aria-label="Next slide"
        >
          <svg
            className="w-6 h-6 group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slide Counter */}
        <div className="absolute top-4 right-4 z-20 bg-[#030810]/80 border border-[#00d4ff]/30 px-4 py-2">
          <span className="font-orbitron text-[#00d4ff] text-sm">
            {String(currentIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="flex justify-center gap-3 mt-6">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative w-20 h-14 md:w-24 md:h-16 overflow-hidden border-2 transition-all duration-300 ${
              index === currentIndex
                ? "border-[#00d4ff] shadow-[0_0_20px_rgba(0,212,255,0.5)]"
                : "border-[#00d4ff]/20 opacity-50 hover:opacity-80 hover:border-[#00d4ff]/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            <Image
              src={slide.src}
              alt={slide.name}
              fill
              className="object-cover"
            />
            {index === currentIndex && (
              <motion.div
                layoutId="activeThumb"
                className="absolute inset-0 border-2 border-[#00d4ff]"
              />
            )}
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="relative h-1 bg-[#00d4ff]/20 mt-4 overflow-hidden">
        <motion.div
          key={currentIndex}
          initial={{ width: "0%" }}
          animate={{ width: isPaused ? `${(currentIndex + 1) / slides.length * 100}%` : "100%" }}
          transition={{ duration: isPaused ? 0 : autoPlayInterval / 1000, ease: "linear" }}
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#00d4ff] to-[#66ff00]"
        />
      </div>
    </div>
  );
}
