"use client";

import type React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Search,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Mic,
  Send,
  Zap,
  Brain,
  MessageSquare,
  Code,
  FileText,
  ImageIcon,
  Calculator,
  Globe,
} from "lucide-react";
import SiriWave from "./ui/Wave";
import { useSearchParams } from "next/navigation";

interface SearchSuggestion {
  id: string;
  text: string;
  category: "recent" | "trending" | "suggested" | "popular";
  icon: React.ReactNode;
  description?: string;
}

interface PremiumSearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export default function PremiumSearchBar({
  onSearch,
  placeholder = "Ask me anything...",
  className = "",
}: PremiumSearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    SearchSuggestion[]
  >([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const suggestions: SearchSuggestion[] = [
    {
      id: "1",
      text: "Write a professional email for a job application",
      category: "trending",
      icon: <FileText className="h-4 w-4" />,
      description: "Create compelling professional content",
    },
    {
      id: "2",
      text: "Explain quantum computing in simple terms",
      category: "suggested",
      icon: <Brain className="h-4 w-4" />,
      description: "Complex topics made easy",
    },
    {
      id: "3",
      text: "Generate a React component with TypeScript",
      category: "popular",
      icon: <Code className="h-4 w-4" />,
      description: "Code generation and assistance",
    },
    {
      id: "4",
      text: "Create a marketing strategy for my startup",
      category: "trending",
      icon: <TrendingUp className="h-4 w-4" />,
      description: "Business strategy and planning",
    },
    {
      id: "5",
      text: "Summarize this article about AI trends",
      category: "recent",
      icon: <MessageSquare className="h-4 w-4" />,
      description: "Text analysis and summarization",
    },
    {
      id: "6",
      text: "Help me solve this math problem",
      category: "popular",
      icon: <Calculator className="h-4 w-4" />,
      description: "Mathematical problem solving",
    },
    {
      id: "7",
      text: "Design a logo concept for my brand",
      category: "suggested",
      icon: <ImageIcon className="h-4 w-4" />,
      description: "Creative design assistance",
    },
    {
      id: "8",
      text: "Research the latest web development trends",
      category: "trending",
      icon: <Globe className="h-4 w-4" />,
      description: "Research and analysis",
    },
  ];


  // Enhanced filtering with fuzzy search
  useEffect(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const filtered = suggestions.filter((suggestion) => {
        const textMatch = suggestion.text.toLowerCase().includes(query);
        const descMatch = suggestion.description?.toLowerCase().includes(query);
        return textMatch || descMatch;
      });
      setFilteredSuggestions(filtered.slice(0, 6));
    } else {
      // Show categorized suggestions when no query
      const categorized = [
        ...suggestions.filter((s) => s.category === "trending").slice(0, 2),
        ...suggestions.filter((s) => s.category === "popular").slice(0, 2),
        ...suggestions.filter((s) => s.category === "suggested").slice(0, 2),
      ];
      setFilteredSuggestions(categorized);
    }
    setSelectedIndex(-1);
  }, [searchQuery]);

  // Typing indicator
  useEffect(() => {
    if (searchQuery) {
      setIsTyping(true);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
      }, 500);
    } else {
      setIsTyping(false);
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  // Enhanced keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!showSuggestions) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < filteredSuggestions.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case "Enter":
          e.preventDefault();
          if (selectedIndex >= 0) {
            handleSuggestionClick(filteredSuggestions[selectedIndex]);
          } else {
            handleSearch();
          }
          break;
        case "Escape":
          setShowSuggestions(false);
          setSelectedIndex(-1);
          inputRef.current?.blur();
          break;
        case "Tab":
          if (selectedIndex >= 0) {
            e.preventDefault();
            setSearchQuery(filteredSuggestions[selectedIndex].text);
          }
          break;
      }
    },
    [showSuggestions, selectedIndex, filteredSuggestions]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Enhanced voice recognition
  const toggleVoiceRecognition = () => {
    if (!isListening) {
      startVoiceRecognition();
    } else {
      stopVoiceRecognition();
    }
  };

  const startVoiceRecognition = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join("");
        setSearchQuery(transcript);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognition.start();
    } else {
      alert("Speech recognition is not supported in your browser.");
    }
  };

  const stopVoiceRecognition = () => {
    setIsListening(false);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch?.(searchQuery);
      setShowSuggestions(false);
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setSearchQuery(suggestion.text);
    setShowSuggestions(false);
    setIsFocused(false);
    onSearch?.(suggestion.text);
  };

  const getCategoryInfo = (category: SearchSuggestion["category"]) => {
    switch (category) {
      case "trending":
        return {
          color: "text-orange-500",
          bg: "bg-orange-50",
          label: "Trending",
        };
      case "recent":
        return { color: "text-blue-500", bg: "bg-blue-50", label: "Recent" };
      case "suggested":
        return {
          color: "text-emerald-500",
          bg: "bg-emerald-50",
          label: "Suggested",
        };
      case "popular":
        return {
          color: "text-purple-500",
          bg: "bg-purple-50",
          label: "Popular",
        };
      default:
        return { color: "text-gray-500", bg: "bg-gray-50", label: "General" };
    }
  };

  return (
    <div className={`relative max-w-3xl mx-auto ${className}`}>
      {/* Main Search Container */}
      <motion.div
        className="relative"
        animate={{
          scale: isFocused ? 1.02 : 1,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {/* Glow Effect */}
        <div
          className={`absolute inset-0 rounded-3xl transition-all duration-300 ${
            isFocused ? "bg-purple-500/25 blur-xl scale-105" : "bg-transparent"
          }`}
        />

        {/* Search Input Container */}
        <div className={`relative bg-white/50 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-3xl transition-all duration-300 ${!isFocused && "shadow-sky-700/20"}`}>
          {/* Search Icon */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10">
            <motion.div
              animate={{
                scale: isFocused ? 1.1 : 1,
                color: isFocused ? "purple" : "#6b7280",
              }}
              transition={{ duration: 0.2 }}
            >
              <Search className="h-6 w-6" />
            </motion.div>
          </div>

          {/* Input Field */}
          <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            className={`w-full h-20 pl-16 pr-40 text-lg font-medium bg-transparent ${
              isFocused && "bg-white border-0"
            } rounded-3xl border-none outline-none placeholder:text-gray-400 text-gray-800`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              setIsFocused(true);
              setShowSuggestions(true);
            }}
            onBlur={() => {
              setTimeout(() => {
                setIsFocused(false);
                setShowSuggestions(false);
              }, 150);
            }}
          />

          {/* Voice Wave Animation Overlay */}
          {isListening && (
            <div className="absolute left-16 right-40 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
              <SiriWave
                isWaveMode={isListening}
                height={40}
                colors={["#0ea5e9", "#3b82f6", "#6366f1", "#8b5cf6"]}
                style="hybrid"
                amplitude={15}
              />
            </div>
          )}
          {/* Action Buttons */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 z-10">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              {searchQuery.trim() ? (
                <Button
                  size="lg"
                  className={`h-14 px-6 rounded-2xl font-semibold transition-all duration-300 ${
                    searchQuery.trim()
                      ? "bg-gradient-to-r from-sky-200 via-sky-500 to-sky-600 text-white shadow-lg shadow-blue-500/25"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                  onClick={handleSearch}
                  disabled={!searchQuery.trim()}
                >
                  <Send className="h-5 w-5 scale-150 mx-[5px]" />
                </Button>
              ) : (
                <>
                  <div className="relative ">
                    {isListening && (
                      <>
                        <div className="absolute w-18 -top-2 -left-2 -z-10 h-18 rounded-2xl bg-red-500 animate-pulse" />
                        <div className="absolute w-16 -top-1 -left-1 -z-7 h-16 rounded-2xl bg-red-500 animate-pulse" />
                      </>
                    )}
                    <Button
                      size="lg"
                      variant="ghost"
                      className={`h-14 w-14 rounded-2xl transition-all duration-300 ${
                        isListening
                          ? "bg-red-500 text-white shadow-lg shadow-red-500/25"
                          : "bg-transparent hover:bg-transparent text-sky-500 hover:text-sky-600"
                      }`}
                      onClick={toggleVoiceRecognition}
                    >
                      <Mic
                        className={`h-8 w-8 ${
                          isListening ? "scale-180" : "scale-150"
                        }`}
                      />
                      {isListening && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl bg-red-400/30"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 1,
                            repeat: Number.POSITIVE_INFINITY,
                          }}
                        />
                      )}
                    </Button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && filteredSuggestions.length > 0 && (
          <motion.div
            ref={suggestionsRef}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 mt-4 z-50"
          >
            <Card className="p-4 bg-white/40 backdrop-blur-md shadow-2xl border-0 rounded-3xl">
              {/* Suggestions List */}
              <div className="space-y-2">
                {filteredSuggestions.map((suggestion, index) => {
                  const categoryInfo = getCategoryInfo(suggestion.category);
                  return (
                    <motion.button
                      key={suggestion.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      className={`w-full text-left p-4 rounded-2xl transition-all duration-200 flex items-start gap-4 group ${
                        selectedIndex === index
                          ? "bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 shadow-md"
                          : "hover:bg-transparent border border-transparent"
                      }`}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {/* Icon */}

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <div
                            className={`${categoryInfo.color} rounded-xl group-hover:scale-110 transition-transform duration-200`}
                          >
                            {suggestion.icon}
                          </div>
                          <span className="font-medium text-gray-800 group-hover:text-gray-900 truncate">
                            {suggestion.text}
                          </span>
                          <ArrowRight className="h-5 w-5 text-black opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1" />
                        </div>
                      </div>

                      {/* Arrow */}
                    </motion.button>
                  );
                })}
              </div>

              {/* Footer */}
              <div>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>
                    Use ↑↓ to navigate • Enter to select • Tab to complete
                  </span>
                  <span>Esc to close</span>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
