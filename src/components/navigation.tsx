"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Waves } from "lucide-react";
import Link from "next/link";

interface NavigationProps {
  scrollY: number;
}

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "/upgrade", label: "Upgrade" },
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "About" },
  { href: "/auth/login", label: "Login" },
];
export default function Navigation({ scrollY }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (scrollY > 100 && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [scrollY, isMenuOpen]);

  return (
    <nav className="fixed top-0 w-full bg-white/10 z-50 transition-all duration-300 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-bold bg-gradient-to-r from-sky-200 via-sky-400 to-sky-600 bg-clip-text text-transparent">
              SURFER
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="text-sky-600/50 hover:text-sky-600 transition-colors relative group text-lg font-bold"
              >
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-600 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-4">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="block text-gray-600 hover:text-sky-600 py-2 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
