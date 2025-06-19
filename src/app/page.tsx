"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  Brain,
  Zap,
  Shield,
  Users,
  ChevronDown,
  Bot,
  MessageCircle,
  TrendingUp,
  Waves,
} from "lucide-react";
import Link from "next/link";
import WaveBackground from "@/components/wave-background";
import Navigation from "@/components/navigation";
import EnhancedSearchBar from "@/components/searchBar";
import SiriWave from "@/components/ui/Wave";

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [isWaveActive, setIsWaveActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Activate wave animation periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setIsWaveActive(true);
      setTimeout(() => setIsWaveActive(false), 3000);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Advanced AI Intelligence",
      description:
        "Powered by cutting-edge AI models for superior understanding and responses",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description:
        "Get instant responses with our optimized AI processing pipeline",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure & Private",
      description:
        "Your data is protected with enterprise-grade security measures",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Team Collaboration",
      description: "Work together seamlessly with shared AI workspaces",
    },
  ];

  const stats = [
    { number: "10M+", label: "Queries Processed" },
    { number: "50K+", label: "Active Users" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" },
  ];

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    // Redirect to dashboard with search query
    window.location.href = `/dashboard/ai?q=${encodeURIComponent(query)}`;
  };

  return (
    <div className="min-h-full bg-white  relative overflow-visible">
      {/* Background Wave Animation */}
      <WaveBackground opacity={0.1} />

      {/* Navigation */}
      <Navigation scrollY={scrollY} />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h1 className="text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-sky-200 via-sky-400 to-sky-600 bg-clip-text text-transparent">
                  Surf the <span className="italic">Wave</span>
                </span>
                <br />
                <span className="text-gray-800">of AI Innovation</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-800 max-w-3xl mx-auto leading-relaxed text-center">
                <span className="italic text-black">Intuitive</span>{" "}
                <span className="text-black font-bold">Smart</span>{" "}
                <span className="text-black font-semibold tracking-wide animate-pulse">
                  Fast
                </span>{" "}
                <span className="text-black font-medium">Effortless</span>{" "}
                <span className="text-black font-light">Productive</span>
              </p>{" "}
            </motion.div>

            {/* Enhanced Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <EnhancedSearchBar onSearch={handleSearch} />
            </motion.div>
          </div>
        </div>

        {/* Decorative Wave Animation */}
        <div className="absolute bottom-0 left-0 right-0 h-20">
          <SiriWave
            isWaveMode={true}
            height={120}
            colors={[
              "rgba(255,255,255,0.1)",
              "rgba(255,255,255,0.2)",
              "rgba(255,255,255,0.15)",
            ]}
            style="smooth"
            amplitude={30}
            frequency={0.01}
            speed={0.5}
          />
        </div>
      </section>

      {/* CTA Section with Wave Animation */}
      <section className="py-20  relative overflow-hidden">
        {/* Background Wave Animation */}
        <div className="absolute inset-0">
          <SiriWave
            isWaveMode={true}
            height={120}
            colors={[
              "rgba(255,255,255,0.1)",
              "rgba(255,255,255,0.2)",
              "rgba(255,255,255,0.15)",
            ]}
            style="smooth"
            amplitude={30}
            frequency={0.01}
            speed={0.5}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-200 via-sky-400 to-sky-600 bg-clip-text text-transparent mb-6">
              Ready to Surf the AI Wave?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-transparent text-sky-600 hover:bg-transparent px-8 py-4 text-lg rounded-2xl hover:shadow-xl shadow-none transition-all duration-300 hover:scale-102"
                >
                  <TrendingUp className="h-6 w-6 mr-3" />
                  Start Your Journey
                  <ArrowRight className="h-6 w-6 ml-3" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
