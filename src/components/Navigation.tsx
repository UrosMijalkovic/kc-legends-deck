"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navItems = [
  { href: "#hero", label: "Home" },
  { href: "#origin", label: "Story" },
  { href: "#status", label: "Status" },
  { href: "#market", label: "Market" },
  { href: "#sponsorship", label: "Opportunity" },
  { href: "#demo", label: "Demo" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Find active section
      const sections = navItems.map((item) => item.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#030810]/95 backdrop-blur-md shadow-[0_2px_30px_rgba(0,212,255,0.15)]"
            : "bg-gradient-to-b from-[#030810]/90 to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="#hero" className="flex items-center gap-2">
              <motion.span
                className="font-orbitron font-bold text-lg text-[#00d4ff] tracking-wider glitch"
                data-text="KC: LEGENDS"
                whileHover={{ scale: 1.05 }}
              >
                KC: LEGENDS
              </motion.span>
            </Link>

            {/* Desktop Nav */}
            <ul className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`relative font-rajdhani font-semibold text-sm uppercase tracking-widest transition-colors ${
                      activeSection === item.href.slice(1)
                        ? "text-[#00d4ff]"
                        : "text-gray-400 hover:text-[#00d4ff]"
                    }`}
                  >
                    {item.label}
                    {activeSection === item.href.slice(1) && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#00d4ff]"
                        style={{ boxShadow: "0 0 10px #00d4ff" }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <motion.a
              href="#sponsorship"
              className="hidden md:block px-6 py-2 border border-[#00d4ff] text-[#00d4ff] font-rajdhani font-bold text-sm uppercase tracking-wider btn-shine"
              whileHover={{
                backgroundColor: "rgba(0, 212, 255, 0.1)",
                boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Partner With Us
            </motion.a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2"
            >
              <motion.span
                animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 8 : 0 }}
                className="w-6 h-0.5 bg-[#00d4ff]"
              />
              <motion.span
                animate={{ opacity: mobileOpen ? 0 : 1 }}
                className="w-6 h-0.5 bg-[#00d4ff]"
              />
              <motion.span
                animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -8 : 0 }}
                className="w-6 h-0.5 bg-[#00d4ff]"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-40 bg-[#030810]/98 backdrop-blur-lg md:hidden"
          >
            <ul className="flex flex-col p-6 gap-4">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-2 font-rajdhani font-semibold text-lg uppercase tracking-wider ${
                      activeSection === item.href.slice(1)
                        ? "text-[#00d4ff]"
                        : "text-gray-400"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
              >
                <a
                  href="#sponsorship"
                  onClick={() => setMobileOpen(false)}
                  className="block py-3 mt-4 text-center border border-[#00d4ff] text-[#00d4ff] font-rajdhani font-bold uppercase tracking-wider"
                >
                  Partner With Us
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
