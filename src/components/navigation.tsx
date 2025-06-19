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
  { href: "#pricing", label: "Pricing" },
  { href: "#about", label: "About" },
];

const ctaButtons: {
  label: string;
  props: {
    variant?:
      | "outline"
      | "link"
      | "default"
      | "destructive"
      | "secondary"
      | "ghost";
    className: string;
  };
}[] = [
  {
    label: "Login",
    props: {
      variant: "default",
      className:
        "bg-gradient-to-br from-sky-500/60 via-sky-600/60 to-sky-700/60 text-white px-6 py-2 rounded-[10px] shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 font-semibold hover:bg-sky-600",
    },
  },
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
            <div className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <Waves className="h-5 w-5 text-sky-500" />
            </div>
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

            {ctaButtons.map(({ label, props }) => (
              <Button key={label} {...props}>
                {label}
              </Button>
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

              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                {ctaButtons.map(({ label, props }) => (
                  <Button key={label} {...props}>
                    {label}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
