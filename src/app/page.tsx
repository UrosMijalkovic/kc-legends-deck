"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Navigation } from "@/components/Navigation";
import { CharacterCard } from "@/components/CharacterCard";
import { HeroGallery } from "@/components/HeroGallery";
import { Timeline } from "@/components/Timeline";
import { SciFiBackground } from "@/components/SciFiBackground";
import { StatCard, BigStatCard } from "@/components/StatCard";
import { SectionTitle } from "@/components/SectionTitle";
import { useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

// Dynamic import for 3D components (no SSR)
const ParticleField = dynamic(
  () => import("@/components/ParticleField").then((mod) => mod.ParticleField),
  { ssr: false }
);

export default function Home() {
  const { t, language } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);


  return (
    <main className="relative">
      {/* Animated Sci-Fi Background */}
      <SciFiBackground />

      <Navigation />

      {/* Hero Section */}
      <section
        ref={heroRef}
        id="hero"
        className="relative h-screen flex items-center overflow-hidden"
      >
        {/* Background Image with Parallax */}
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="absolute inset-0"
        >
          <Image
            src="/images/background.jpeg"
            alt="KC Legends of the Pit"
            fill
            className="object-cover object-right md:object-center"
            priority
          />
        </motion.div>

        {/* 3D Particles */}
        <ParticleField />

        {/* Gradient Overlays - stronger on left for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030810]/60 via-transparent to-[#030810]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030810]/90 via-[#030810]/40 to-transparent" />

        {/* Content - Left Aligned */}
        <div className="relative z-10 text-left px-6 sm:px-12 lg:px-20 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1
              className="font-orbitron text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-wider mb-4 title-glow glitch cursor-pointer"
              data-text="LEGENDS OF THE PIT"
            >
              LEGENDS <span className="text-[#00d4ff]">OF THE</span> PIT
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`text-[#00d4ff] text-lg sm:text-xl md:text-2xl uppercase tracking-[0.3em] md:tracking-[0.5em] mb-6 ${language === 'ja' ? 'font-noto-jp' : 'font-rajdhani'}`}
          >
            {t.hero.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className={`text-lg sm:text-xl md:text-3xl text-white/90 mb-10 font-light leading-relaxed ${language === 'ja' ? 'font-noto-jp' : 'font-exo2'}`}
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.a
              href="#sponsorship"
              className={`px-8 py-4 bg-[#00d4ff] text-[#030810] font-bold text-lg uppercase tracking-wider btn-shine text-center ${language === 'ja' ? 'font-noto-jp' : 'font-rajdhani'}`}
              whileHover={{
                boxShadow: "0 0 40px rgba(0, 212, 255, 0.5)",
                scale: 1.02,
              }}
              whileTap={{ scale: 0.98 }}
            >
              {t.hero.cta}
            </motion.a>
            <motion.a
              href="#demo"
              className={`px-8 py-4 border-2 border-[#00d4ff] text-[#00d4ff] font-bold text-lg uppercase tracking-wider btn-shine text-center ${language === 'ja' ? 'font-noto-jp' : 'font-rajdhani'}`}
              whileHover={{
                backgroundColor: "rgba(0, 212, 255, 0.1)",
                boxShadow: "0 0 30px rgba(0, 212, 255, 0.3)",
                scale: 1.02,
              }}
              whileTap={{ scale: 0.98 }}
            >
              {language === 'ja' ? 'デモを見る' : 'Watch Demo'}
            </motion.a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className={`text-[#00d4ff] text-xs uppercase tracking-widest ${language === 'ja' ? 'font-noto-jp' : 'font-rajdhani'}`}>
            {t.hero.scroll}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-[#00d4ff] rounded-full flex justify-center pt-2"
          >
            <motion.div className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Overview / Highlights Section */}
      <section className="relative py-16 md:py-20 bg-gradient-to-b from-[#030810]/90 to-[#0a1628]/90">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/50 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="font-rajdhani text-[#00d4ff] text-sm uppercase tracking-[0.3em] mb-3">
              The Opportunity at a Glance
            </p>
            <h2
              className="font-orbitron text-2xl md:text-4xl font-bold text-white title-glow glitch cursor-pointer"
              data-text="Why This, Why Now?"
            >
              Why This, Why Now?
            </h2>
          </motion.div>

          {/* Key Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#0a1628]/80 border border-[#00d4ff]/20 p-6 text-center hover:border-[#00d4ff]/50 transition-colors"
            >
              <div className="font-orbitron text-3xl md:text-4xl font-bold text-[#00d4ff] mb-2 glow-cyan">$2.5M</div>
              <div className="font-rajdhani text-xs md:text-sm text-gray-400 uppercase tracking-wider">Media Value</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#0a1628]/80 border border-[#00d4ff]/20 p-6 text-center hover:border-[#00d4ff]/50 transition-colors"
            >
              <div className="font-orbitron text-3xl md:text-4xl font-bold text-[#66ff00] mb-2 glow-green">500M</div>
              <div className="font-rajdhani text-xs md:text-sm text-gray-400 uppercase tracking-wider">Annual Impressions</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-[#0a1628]/80 border border-[#00d4ff]/20 p-6 text-center hover:border-[#00d4ff]/50 transition-colors"
            >
              <div className="font-orbitron text-3xl md:text-4xl font-bold text-[#ffcc00] mb-2 glow-yellow">1B+</div>
              <div className="font-rajdhani text-xs md:text-sm text-gray-400 uppercase tracking-wider">Karate Combat Reach</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-[#0a1628]/80 border border-[#00d4ff]/20 p-6 text-center hover:border-[#00d4ff]/50 transition-colors"
            >
              <div className="font-orbitron text-3xl md:text-4xl font-bold text-[#ff3366] mb-2 glow-red">1.6yr</div>
              <div className="font-rajdhani text-xs md:text-sm text-gray-400 uppercase tracking-wider">In Development</div>
            </motion.div>
          </div>

          {/* Key Points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-10 grid md:grid-cols-3 gap-6 text-center"
          >
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center mb-3">
                <span className="text-xl">🎮</span>
              </div>
              <p className="font-rajdhani text-white font-semibold">Playable Demo Ready</p>
              <p className="text-gray-500 text-sm">Self-funded, battle-tested</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center mb-3">
                <span className="text-xl">📝</span>
              </div>
              <p className="font-rajdhani text-white font-semibold">IP & Marketing Rights Secured</p>
              <p className="text-gray-500 text-sm">Official Karate Combat partnership</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center mb-3">
                <span className="text-xl">🔥</span>
              </div>
              <p className="font-rajdhani text-white font-semibold">100K+ Waiting</p>
              <p className="text-gray-500 text-sm">7 years of community anticipation</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Origin Section */}
      <section id="origin" className="relative py-24 md:py-32 bg-gradient-to-b from-[#030810]/90 via-[#0a1628]/90 to-[#0d2238]/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle={t.origin.subtitle} title={t.origin.title} />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-400 text-lg max-w-3xl mb-12"
          >
            In 2015, while still at university, the idea of creating the first-ever karate game
            featuring real-life karate champions was born.
          </motion.p>

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            {/* Founder Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 relative bg-[#0a1628]/80 border border-[rgba(0,212,255,0.2)] overflow-hidden tech-corners"
            >
              <div className="absolute top-4 right-4 font-orbitron text-5xl font-black text-[#00d4ff]/10 z-10">
                2015
              </div>

              {/* Photo */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/Uros.jpg"
                  alt="Uroš - Founder"
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/50 to-transparent" />
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="font-orbitron text-2xl font-bold mb-1">Uroš</h3>
                <p className="font-rajdhani text-[#00d4ff] uppercase tracking-widest mb-4 text-sm">
                  Founder & CEO
                </p>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-[#00d4ff] mt-0.5">▸</span>
                    Ex-pro Karate athlete
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00d4ff] mt-0.5">▸</span>
                    Multi-European medalist, Top 20 WKF
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00d4ff] mt-0.5">▸</span>
                    Started Karate Do franchise in 2015
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00d4ff] mt-0.5">▸</span>
                    New game development began 2020
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Right Column - Stats, Phone Mockups, Emotion Photos */}
            <div className="lg:col-span-3 space-y-8">
              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-3 md:gap-4 lg:gap-6">
                <StatCard value={1000000} suffix="" label="Players" delay={0.1} />
                <StatCard value={100000} suffix="+" label="Die-Hard Gamers" delay={0.2} />
                <StatCard value={0} suffix="" prefix="$" label="Marketing Budget" highlight delay={0.3} staticValue="$0" />
              </div>

              {/* Phone Mockups Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <p className="font-rajdhani text-[#00d4ff] text-xs uppercase tracking-[0.2em] mb-3 text-center">
                  First Karate Do Game Screenshots (2015-2019)
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3].map((num, index) => (
                    <motion.div
                      key={`mockup-${num}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index }}
                      className="relative aspect-[9/16] border border-[#00d4ff]/20 rounded-lg overflow-hidden group hover:border-[#00d4ff]/50 transition-colors"
                    >
                      <Image
                        src={`/kd-old/${num}.png`}
                        alt={`Phone mockup ${num}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#030810]/40 to-transparent" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>

          {/* Community Love - Featured Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <div className="text-center mb-8">
              <p className="font-rajdhani text-[#00d4ff] text-sm uppercase tracking-[0.3em] mb-2">
                Community Love
              </p>
              <h3 className="font-orbitron text-xl md:text-2xl font-bold text-white">
                Players Around The World
              </h3>
            </div>

            {/* Featured Community Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative max-w-4xl mx-auto"
            >
              <div className="relative aspect-video border-2 border-[#00d4ff]/30 rounded-lg overflow-hidden group">
                <Image
                  src="/kd-old/6.png"
                  alt="Community Love"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030810]/70 via-transparent to-[#030810]/30" />

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#00d4ff]/50" />
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#00d4ff]/50" />
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#00d4ff]/50" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#00d4ff]/50" />
              </div>
            </motion.div>

            <p className="text-center text-gray-400 mt-6 text-sm">
              Real players sharing their Karate Do moments
            </p>
          </motion.div>

        </div>
      </section>

      {/* Status Section */}
      <section id="status" className="relative py-24 md:py-32 bg-[#0d2238]/90">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,212,255,0.3)] to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle={t.status.subtitle} title={t.status.title} />

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {/* IP Rights Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
              whileHover={{ y: -5 }}
              className="relative bg-[#0a1628]/80 border border-[rgba(0,212,255,0.2)] p-8 group hover:border-[#00d4ff] hover:shadow-[0_0_40px_rgba(0,212,255,0.15)] transition-all duration-300 tech-corners"
            >
              <div className="mb-6 h-10 w-auto">
                <Image
                  src="/karate-logo-white.svg"
                  alt="Karate Combat"
                  width={120}
                  height={40}
                  className="h-10 w-auto object-contain"
                />
              </div>
              <h3 className="font-orbitron text-lg font-bold text-[#00d4ff] uppercase tracking-wider mb-4">
                IP Rights & Marketing Deal Signed
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Partnership with Karate Combat — one of the fastest-growing fight-sports organizations. Rights to use KC brand, fighters, and likenesses. Joint promotion through KC media (1B+ digital impressions).
              </p>
            </motion.div>

            {/* Playable Demo Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="relative bg-[#0a1628]/80 border border-[rgba(0,212,255,0.2)] p-8 group hover:border-[#00d4ff] hover:shadow-[0_0_40px_rgba(0,212,255,0.15)] transition-all duration-300 tech-corners"
            >
              <div className="text-4xl mb-6">🎮</div>
              <h3 className="font-orbitron text-lg font-bold text-[#00d4ff] uppercase tracking-wider mb-4">
                Playable Game / Demo Built
              </h3>
              <p className="text-gray-400 leading-relaxed">
                In development for 1.6 years (self-funded). Built on the learnings of Karate Do (1M+ downloads). Fully playable demo/game vertical ready.
              </p>
            </motion.div>

            {/* Community Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="relative bg-[#0a1628]/80 border border-[rgba(0,212,255,0.2)] p-8 group hover:border-[#00d4ff] hover:shadow-[0_0_40px_rgba(0,212,255,0.15)] transition-all duration-300 tech-corners"
            >
              <div className="text-4xl mb-6">🔥</div>
              <h3 className="font-orbitron text-lg font-bold text-[#00d4ff] uppercase tracking-wider mb-4">
                Community Anticipation
              </h3>
              <p className="text-gray-400 leading-relaxed">
                The Karate Do fanbase has waited 7 years for the next game. A loyal audience ready to re-engage. Battle-tested marketing pipeline.
              </p>
            </motion.div>
          </div>

          {/* Game Demo Video */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <div className="text-center mb-8">
              <p className="font-rajdhani text-[#00d4ff] text-sm uppercase tracking-[0.3em] mb-2">
                See It In Action
              </p>
              <h3 className="font-orbitron text-xl md:text-2xl font-bold text-white">
                Game Demo
              </h3>
            </div>

            <div className="relative max-w-5xl mx-auto">
              <div className="relative p-1 bg-gradient-to-br from-[#00d4ff] to-[rgba(0,212,255,0.3)] video-glow">
                <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#00d4ff] -translate-x-2 -translate-y-2" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#00d4ff] translate-x-2 translate-y-2" />

                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  poster="/images/video-thumbnail.jpg"
                  className="w-full bg-[#030810]"
                >
                  <source src="/gameplay-compressed.mp4#t=30" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            <p className="text-center text-gray-400 mt-4 text-sm">
              Click to unmute
            </p>

            <div className="flex justify-center mt-6">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="inline-block px-6 py-2 bg-[#66ff00] text-[#030810] font-rajdhani font-bold uppercase tracking-wider"
              >
                Playable Demo Available for Android
              </motion.span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Distribution Section - Built-In Audience */}
      <section id="distribution" className="relative py-24 md:py-32 bg-gradient-to-b from-[#0d2238]/90 to-[#0a1628]/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle={t.distribution.subtitle} title={t.distribution.title} />

          <div className="grid lg:grid-cols-2 gap-8 mt-12">
            {/* Karate Combat */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden border border-[rgba(0,212,255,0.2)] tech-corners"
            >
              {/* YouTube Background Video */}
              <div className="absolute inset-0 z-0">
                <iframe
                  src="https://www.youtube.com/embed/P_gM47tVJVw?autoplay=1&mute=1&loop=1&playlist=P_gM47tVJVw&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] pointer-events-none"
                  allow="autoplay; encrypted-media"
                  frameBorder="0"
                />
                {/* Dark overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/85 via-[#0a1628]/75 to-[#0a1628]/90" />
              </div>

              <div className="relative z-10 p-8">
                <h3 className="font-orbitron text-xl font-bold mb-2">Karate Combat</h3>
                <p className="text-[#00d4ff] text-sm mb-6">
                  Targeting the global combat-sports audience
                </p>

                <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6">
                  <StatCard value={1} suffix="B+" label="Impressions" delay={0} />
                  <StatCard value={3} suffix="M+" label="Followers" delay={0.1} />
                  <StatCard value={2} suffix="M" label="Views/Event" delay={0.2} />
                </div>

                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-[#00d4ff]">▹</span>
                    Elite global roster of 100+ fighters & influencers
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00d4ff]">▹</span>
                    Individual fanbases of 100K-1M+
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Karate Do Legacy */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden border border-[rgba(0,212,255,0.2)] tech-corners"
            >
              {/* YouTube Background Video */}
              <div className="absolute inset-0 z-0">
                <iframe
                  src="https://www.youtube.com/embed/TPvRrflCu9s?autoplay=1&mute=1&loop=1&playlist=TPvRrflCu9s&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&start=550"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] pointer-events-none"
                  allow="autoplay; encrypted-media"
                  frameBorder="0"
                />
                {/* Dark overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/85 via-[#0a1628]/75 to-[#0a1628]/90" />
              </div>

              <div className="relative z-10 p-8">
                <h3 className="font-orbitron text-xl font-bold mb-2">Karate Do Legacy Pipeline</h3>
                <p className="text-[#00d4ff] text-sm mb-6">
                  Targeting cult-like niche of WKF karate athletes
                </p>

                <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6">
                  <StatCard value={1.5} suffix="M+" label="Champion Followers" delay={0} />
                  <StatCard value={1} suffix="M+" label="Downloads" delay={0.1} />
                  <StatCard value={150} suffix="K+" label="Hardcore Community" delay={0.2} />
                </div>

                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-[#00d4ff]">▹</span>
                    20+ owned karate channels with 1M+ followers
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00d4ff]">▹</span>
                    Reaching 100M+ global karate athletes
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Merging Statement */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-4 md:gap-6">
              <div className="h-px w-12 md:w-24 bg-gradient-to-r from-transparent to-[#00d4ff]" />
              <h3 className="font-orbitron text-xl md:text-3xl font-black uppercase tracking-wider text-white glow-text">
                {t.distribution.mergingWorlds}
              </h3>
              <div className="h-px w-12 md:w-24 bg-gradient-to-l from-transparent to-[#00d4ff]" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 max-w-4xl mx-auto"
          >
            <div className="relative bg-gradient-to-r from-[rgba(0,212,255,0.1)] via-[rgba(0,212,255,0.05)] to-[rgba(0,212,255,0.1)] border border-[#00d4ff]/30 p-8 text-center overflow-hidden">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#00d4ff]" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#00d4ff]" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#00d4ff]" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#00d4ff]" />

              <p className="font-rajdhani text-xl md:text-2xl text-white leading-relaxed">
                <span className="text-[#00d4ff] font-bold">Targeting natural believers:</span>{" "}
                fighters at heart, gamers by habit.
              </p>
              <p className="font-orbitron text-2xl md:text-3xl font-bold mt-4">
                We expect{" "}
                <span className="text-[#66ff00] glow-text">2-3× higher conversions</span>{" "}
                <span className="text-gray-400 font-normal text-lg md:text-xl">than generic audiences.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section id="problem" className="relative py-24 md:py-32 bg-gradient-to-b from-[#0d2238]/90 to-[#0a1628]/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="The Opportunity" title="Problem & Solution" />

          <div className="grid lg:grid-cols-2 gap-8 mt-12">
            {/* Problem */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[rgba(255,51,102,0.1)] to-transparent border border-[rgba(255,51,102,0.3)] p-8"
            >
              <h3 className="font-orbitron text-2xl font-bold text-[#ff3366] mb-6">
                The Problem
              </h3>
              <p className="text-gray-300 mb-6">
                The biggest sports organizations are focused on creating games with the same
                real-life rules and graphics.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                {["NBA 2K", "EA Sports UFC", "EA FIFA"].map((game) => (
                  <span
                    key={game}
                    className="px-4 py-2 bg-white/10 text-gray-400 font-rajdhani font-bold"
                  >
                    {game}
                  </span>
                ))}
              </div>
              <p className="text-[#ff3366] font-semibold">
                They are failing to engage with gamers, younger generations, and subcultures.
              </p>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[rgba(0,212,255,0.1)] to-transparent border border-[rgba(0,212,255,0.3)] p-8"
            >
              <h3 className="font-orbitron text-2xl font-bold text-[#00d4ff] mb-6">
                The Solution
              </h3>
              <p className="text-gray-300 mb-6">
                An anime-inspired Karate Combat gaming universe that transforms real athletes
                into legendary heroes.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "Hero-collector (gacha) game",
                  "Turn-based team-building RPG gameplay",
                  "Real athletes as playable characters",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[#00d4ff]">
                    <span>✦</span>
                    {item}
                  </li>
                ))}
              </ul>
              <motion.blockquote
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative border-l-4 border-[#00d4ff] pl-6 py-4 mt-6"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#00d4ff]/10 to-transparent rounded-r-lg" />
                <p className="relative font-orbitron text-xl md:text-2xl font-bold text-white glow-text">
                  &quot;To become the largest Karate entertainment IP since Karate Kid.&quot;
                </p>
              </motion.blockquote>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cinematic Trailer Section */}
      <section className="relative py-16 md:py-24 bg-[#030810] overflow-hidden">
        {/* Animated glow borders */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/50 to-transparent" />

        {/* Side glow effects */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#00d4ff]/5 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#00d4ff]/5 to-transparent pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <p className="font-rajdhani text-[#00d4ff] text-sm uppercase tracking-[0.5em] mb-3">
              {language === 'ja' ? 'ビジョン' : 'The Vision'}
            </p>
            <h2
              className="font-orbitron text-3xl md:text-5xl font-black uppercase tracking-wider text-white title-glow glitch cursor-pointer"
              data-text={language === 'ja' ? 'ピットへ入れ' : 'Enter The Pit'}
            >
              {language === 'ja' ? 'ピットへ入れ' : 'Enter The Pit'}
            </h2>
          </motion.div>

          {/* Video Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Glowing frame */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00d4ff]/20 via-[#a855f7]/20 to-[#ff3366]/20 rounded-lg blur-sm" />
            <div className="absolute -inset-px bg-gradient-to-r from-[#00d4ff]/40 via-[#a855f7]/40 to-[#ff3366]/40 rounded-lg" />

            {/* Video wrapper */}
            <div className="relative bg-[#030810] rounded-lg overflow-hidden">
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/hDhL9bOYIKU?autoplay=1&mute=1&loop=1&playlist=hDhL9bOYIKU&controls=1&modestbranding=1&rel=0&showinfo=0&playsinline=1"
                  className="w-full h-full"
                  allow="autoplay; encrypted-media; fullscreen"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#00d4ff] rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#ff3366] rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#a855f7] rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#00d4ff] rounded-br-lg" />
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className={`text-center mt-6 text-gray-400 text-sm md:text-base ${language === 'ja' ? 'font-noto-jp' : 'font-rajdhani'}`}
          >
            {language === 'ja'
              ? 'アニメ風格闘ゲームユニバース — 実在の空手コンバット選手が登場'
              : 'An anime-inspired fighting game universe — featuring real Karate Combat athletes'}
          </motion.p>
        </div>
      </section>

      {/* Creative Value Section */}
      <section id="creative" className="relative py-24 md:py-32 bg-[#0a1628]/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle={t.creative.subtitle} title={t.creative.title} />

          <div className="grid lg:grid-cols-3 gap-8 mt-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center lg:text-left"
            >
              <h3 className="font-orbitron text-2xl font-bold mb-2">Rafael Aghayev</h3>
              <p className="font-rajdhani text-[#00d4ff] text-xl mb-4">
                &quot;The Panther&quot;
              </p>
              <p className="text-gray-400">
                5× WKF & KC World Champion
                <br />
                Olympic Medalist
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative lg:col-span-2"
            >
              <div className="relative border-2 border-[rgba(0,212,255,0.3)] overflow-hidden tech-corners">
                <Image
                  src="/images/Tabela_5.png"
                  alt="Athlete to Hero Transformation"
                  width={800}
                  height={400}
                  className="w-full"
                />
              </div>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-[#00d4ff] text-xl italic mt-12"
          >
            Unveiling a cool fictional story that goes beyond sports
          </motion.p>
        </div>
      </section>

      {/* Gameplay Section */}
      <section id="gameplay" className="relative py-24 md:py-32 bg-gradient-to-b from-[#0a1628]/90 to-[#0d2238]/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Core Gameplay Loop"
            title="Ensuring Long-Term Retention"
            align="center"
          />

          {/* Gameplay Flow */}
          <div className="flex flex-wrap justify-center items-center gap-4 mt-12">
            {["Campaign", "Team Building", "Game Modes", "Upgrading"].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.05, borderColor: "#00d4ff" }}
                  className="bg-[#0a1628] border border-[rgba(0,212,255,0.3)] px-6 py-4 text-center min-w-[150px]"
                >
                  <p className="font-orbitron text-sm text-[#00d4ff] uppercase tracking-wider">
                    {item}
                  </p>
                </motion.div>
                {index < 3 && (
                  <span className="text-[#00d4ff] text-2xl hidden sm:block">→</span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Character Showcase - Hero Gallery */}
          <HeroGallery
            slides={[
              {
                src: "/images/WhatsApp Image 2025-12-29 at 13.52.07 (1).jpeg",
                name: "Aline Pereira",
                alias: "The Lioness",
              },
              {
                src: "/images/WhatsApp Image 2025-12-29 at 13.52.07 (7).jpeg",
                name: "Shahzaib Rind",
                alias: "King Khan",
              },
              {
                src: "/images/WhatsApp Image 2025-12-29 at 13.52.07 (2).jpeg",
                name: "Asim Zaidi",
                alias: "President Awesome",
              },
              {
                src: "/images/WhatsApp Image 2025-12-29 at 13.52.07 (6).jpeg",
                name: "Aline Pereira",
                alias: "Battle Form",
              },
            ]}
            autoPlayInterval={4000}
          />
        </div>
      </section>

      {/* Market Section */}
      <section id="market" className="relative py-24 md:py-32 bg-[#0d2238]/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Market Overview" title="Why Gacha RPG?" />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-400 text-lg max-w-3xl mb-8"
          >
            &quot;Gacha&quot; RPG games have the{" "}
            <span className="text-[#00d4ff] font-semibold">best download-to-revenue ratio</span>{" "}
            in mobile gaming.
          </motion.p>

          {/* Market Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-x-auto"
          >
            <table className="w-full bg-[#0a1628]/80 border border-[rgba(0,212,255,0.2)]">
              <thead>
                <tr className="bg-[rgba(0,212,255,0.1)]">
                  <th className="px-6 py-4 text-left font-orbitron text-sm uppercase tracking-wider text-[#00d4ff]">
                    Game
                  </th>
                  <th className="px-6 py-4 text-left font-orbitron text-sm uppercase tracking-wider text-[#00d4ff]">
                    Downloads
                  </th>
                  <th className="px-6 py-4 text-left font-orbitron text-sm uppercase tracking-wider text-[#00d4ff]">
                    Revenue
                  </th>
                  <th className="px-6 py-4 text-left font-orbitron text-sm uppercase tracking-wider text-[#00d4ff]">
                    $/Download
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { game: "Fate/Grand Order", downloads: "80M+", revenue: "$6B", ratio: "$75" },
                  { game: "Star Wars: Galaxy of Heroes", downloads: "50M+", revenue: "$1.4B", ratio: "$28" },
                  { game: "Marvel Strike Force", downloads: "50M+", revenue: "$750M", ratio: "$15" },
                  { game: "Epic Seven", downloads: "10M+", revenue: "$300M", ratio: "$30" },
                ].map((row, index) => (
                  <motion.tr
                    key={row.game}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-[rgba(0,212,255,0.1)] hover:bg-[rgba(0,212,255,0.05)]"
                  >
                    <td className="px-6 py-4 text-white">{row.game}</td>
                    <td className="px-6 py-4 text-gray-400">{row.downloads}</td>
                    <td className="px-6 py-4 text-[#66ff00] font-orbitron font-bold">
                      {row.revenue}
                    </td>
                    <td className="px-6 py-4 text-[#ffcc00] font-semibold">{row.ratio}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Anime Quote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-8 bg-gradient-to-br from-[rgba(0,212,255,0.1)] to-transparent border-l-4 border-[#00d4ff]"
          >
            <p className="font-exo2 text-2xl italic text-white">
              &quot;Anime is eating the world&quot;
            </p>
            <cite className="block mt-2 text-[#00d4ff] not-italic">— a16z</cite>
          </motion.blockquote>
        </div>
      </section>

      {/* Reach Section */}
      <section id="reach" className="relative py-24 md:py-32 bg-[#0a1628]/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Reach & Visibility" title="Year 1 Projections" />

          <div className="grid lg:grid-cols-3 gap-6 md:gap-8 mt-12">
            <div className="lg:col-span-2 grid grid-cols-2 gap-3 md:gap-4">
              <StatCard value={1.69} suffix="M" label="Total Installs" delay={0} />
              <StatCard value={400} suffix="K+" label="Monthly Active Users" delay={0.1} />
              <StatCard value={90} suffix="K" label="Daily Active Users" delay={0.2} />
              <StatCard value={2.3} suffix="" label="Sessions/Player/Day" delay={0.3} staticValue="2.3" />
            </div>

            <BigStatCard
              value={500}
              suffix="M"
              label="Annual In-Game Brand Impressions"
              sublabel="Branded, trusted, and loved — not skipped."
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-b from-[#0a1628]/90 via-[#0d2238]/90 to-[#0a1628]/90">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff]/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Timeline />
        </div>
      </section>

      {/* Sponsorship Section */}
      <section id="sponsorship" className="relative py-24 md:py-32 bg-gradient-to-b from-[#0a1628]/90 to-[#030810]/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle={t.sponsorship.subtitle} title={t.sponsorship.title} />

          <div className="grid lg:grid-cols-5 gap-8 mt-12">
            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3 bg-[#0a1628]/80 border border-[rgba(0,212,255,0.2)] p-8"
            >
              <h3 className="font-orbitron text-xl font-bold text-[#00d4ff] mb-2">
                Hero-Level Integration
              </h3>
              <p className="text-gray-400 text-sm mb-6">Across all major touchpoints</p>

              <ul className="space-y-4">
                {[
                  "Ultimate boss partner for KC: Legends of the Pit — the centerpiece brand presence",
                  "Always-on visibility across arenas, menus, and fight intros",
                  "Sponsored fighter gear, items, and visual identity integrated into gameplay",
                  "Inclusion within the reward economy — loot boxes, XP boosters, energy refills",
                  "Featured in UGC, highlight reels, and influencer content",
                  "Official social media mentions and cross-channel activations",
                ].map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-3 py-3 border-b border-[rgba(0,212,255,0.1)] last:border-0"
                  >
                    <span className="text-[#66ff00] font-bold">✓</span>
                    <span className="text-gray-300">{benefit}</span>
                  </motion.li>
                ))}
              </ul>

              <p className="mt-6 text-sm text-gray-500 italic">
                Smaller, event-based integration packages available upon request.
              </p>
            </motion.div>

            {/* Value Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="relative bg-gradient-to-br from-[rgba(0,212,255,0.2)] to-[rgba(0,212,255,0.05)] border-2 border-[#00d4ff] p-8 text-center h-full flex flex-col justify-center energy-border overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0 overflow-hidden">
                  <div
                    className="absolute -inset-full"
                    style={{
                      background:
                        "conic-gradient(from 0deg, transparent, rgba(0,212,255,0.15), transparent)",
                      animation: "spin 8s linear infinite",
                    }}
                  />
                </div>

                <div className="relative z-10">
                  <p className="font-rajdhani text-sm text-gray-400 uppercase tracking-widest">
                    Media Value
                  </p>
                  <p className="font-orbitron text-5xl md:text-6xl font-black text-[#00d4ff] title-glow my-4">
                    $2.5M
                  </p>
                  <p className="font-rajdhani text-lg text-white">at $5 CPM</p>
                  <p className="mt-6 text-gray-400">
                    With{" "}
                    <span className="text-[#66ff00] font-semibold">3-4× higher engagement</span>
                    <br />
                    and positive brand impact
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-b from-[#030810]/90 via-[#0a1628]/90 to-[#030810]/90 overflow-hidden">
        {/* Animated background glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] bg-[#00d4ff]/10 rounded-full blur-[150px] animate-pulse" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-rajdhani text-[#00d4ff] text-sm uppercase tracking-[0.3em] mb-4"
            >
              Limited Opportunity
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-orbitron text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 title-glow glitch cursor-pointer"
              data-text={t.cta.title}
            >
              {t.cta.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className={`text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto ${language === 'ja' ? 'font-noto-jp' : 'font-exo2'}`}
            >
              {t.cta.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex justify-center"
            >
              <motion.a
                href="mailto:mijalkovic@miracledojo.com?subject=KC%20Legends%20of%20the%20Pit%20-%20Sponsorship%20Inquiry"
                className={`px-10 py-5 bg-[#00d4ff] text-[#030810] font-bold text-lg uppercase tracking-wider btn-shine ${language === 'ja' ? 'font-noto-jp' : 'font-rajdhani'}`}
                whileHover={{
                  boxShadow: "0 0 50px rgba(0, 212, 255, 0.6)",
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.98 }}
              >
                {t.cta.button}
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-16 md:py-20 bg-gradient-to-b from-[#030810]/90 to-[#0a1628]/90">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-orbitron text-4xl md:text-5xl font-black text-white mb-4">
              {t.contact.thankYou}
            </h2>
            <p className="font-orbitron text-3xl text-[#00d4ff]">{t.contact.oss}</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#030810]/90 border-t border-[rgba(0,212,255,0.1)] py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className={`text-gray-500 text-sm ${language === 'ja' ? 'font-noto-jp' : 'font-rajdhani'}`}>
            {t.footer.copyright}
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </main>
  );
}
