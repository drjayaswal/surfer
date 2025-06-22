"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Sparkles,
  MessageSquare,
  Users,
  Briefcase,
  Code,
  Zap,
  CheckCircle,
  Bot,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Navigation from "@/components/navigation";
import WaveBackground from "@/components/waveBackground";

interface FormData {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
  inquiryType: string;
  urgency: string;
}

interface AIResponse {
  suggestion: string;
  estimatedResponse: string;
  relevantTeam: string;
  priority: "low" | "medium" | "high";
}

export default function ContactPage() {
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
    inquiryType: "",
    urgency: "medium",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // AI-powered form analysis
  useEffect(() => {
    if (formData.message.length > 50 && formData.inquiryType) {
      setIsAnalyzing(true);
      const timer = setTimeout(() => {
        const response = generateAIResponse(formData);
        setAiResponse(response);
        setIsAnalyzing(false);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setAiResponse(null);
    }
  }, [formData]); // Updated to include formData as a dependency

  const generateAIResponse = (data: FormData): AIResponse => {
    const responses = {
      sales: {
        suggestion:
          "I can help you explore our enterprise solutions and pricing options.",
        estimatedResponse: "2-4 hours",
        relevantTeam: "Sales Team",
        priority: "high" as const,
      },
      support: {
        suggestion:
          "I'll route this to our technical support team for immediate assistance.",
        estimatedResponse: "1-2 hours",
        relevantTeam: "Support Team",
        priority: "high" as const,
      },
      partnership: {
        suggestion:
          "Our partnerships team will review your proposal and get back to you.",
        estimatedResponse: "1-2 business days",
        relevantTeam: "Partnerships",
        priority: "medium" as const,
      },
      general: {
        suggestion:
          "I'll make sure your inquiry reaches the right team member.",
        estimatedResponse: "4-8 hours",
        relevantTeam: "General Inquiries",
        priority: "medium" as const,
      },
    };

    return (
      responses[data.inquiryType as keyof typeof responses] || responses.general
    );
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const inquiryTypes = [
    {
      value: "sales",
      label: "Sales & Pricing",
      icon: <Briefcase className="h-4 w-4" />,
    },
    {
      value: "support",
      label: "Technical Support",
      icon: <Code className="h-4 w-4" />,
    },
    {
      value: "partnership",
      label: "Partnerships",
      icon: <Users className="h-4 w-4" />,
    },
    {
      value: "general",
      label: "General Inquiry",
      icon: <MessageSquare className="h-4 w-4" />,
    },
  ];

  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      description: "Get in touch via email",
      value: "hello@surfer.ai",
      action: "mailto:hello@surfer.ai",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Call Us",
      description: "Speak with our team",
      value: "+1 (555) 123-4567",
      action: "tel:+15551234567",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Visit Us",
      description: "Our headquarters",
      value: "San Francisco, CA",
      action: "#",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Business Hours",
      description: "We're here to help",
      value: "Mon-Fri, 9AM-6PM PST",
      action: "#",
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "Head of Sales",
      specialty: "Enterprise Solutions",
      avatar: "/placeholder.svg?height=60&width=60",
      status: "online",
    },
    {
      name: "Mike Rodriguez",
      role: "Technical Lead",
      specialty: "API Integration",
      avatar: "/placeholder.svg?height=60&width=60",
      status: "online",
    },
    {
      name: "Emma Thompson",
      role: "Customer Success",
      specialty: "Onboarding & Training",
      avatar: "/placeholder.svg?height=60&width=60",
      status: "away",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-sky-50/50 relative">
      <div className="absolute inset-0 overflow-hidden">
        <WaveBackground opacity={0.05} />
      </div>

      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-tr from-sky-400 to-sky-600 rounded-2xl flex items-center justify-center">
                <MessageSquare className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Get in Touch
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Have questions about SURFER? Our AI-powered support team is here
              to help you find the perfect solution.
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Our AI assistant is analyzing inquiries in real-time</span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 relative">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 bg-white/90 backdrop-blur-sm border-0 shadow-xl">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex items-center space-x-3 mb-6">
                      <Sparkles className="h-6 w-6 text-sky-600" />
                      <h2 className="text-2xl font-bold text-gray-900">
                        AI-Powered Contact Form
                      </h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Basic Info */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label
                            htmlFor="name"
                            className="text-sm font-medium text-gray-700 mb-2 block"
                          >
                            Full Name *
                          </Label>
                          <Input
                            id="name"
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={(e) =>
                              handleInputChange("name", e.target.value)
                            }
                            className="h-12"
                            required
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="email"
                            className="text-sm font-medium text-gray-700 mb-2 block"
                          >
                            Email Address *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            className="h-12"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label
                            htmlFor="company"
                            className="text-sm font-medium text-gray-700 mb-2 block"
                          >
                            Company
                          </Label>
                          <Input
                            id="company"
                            placeholder="Your company name"
                            value={formData.company}
                            onChange={(e) =>
                              handleInputChange("company", e.target.value)
                            }
                            className="h-12"
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="inquiryType"
                            className="text-sm font-medium text-gray-700 mb-2 block"
                          >
                            Inquiry Type *
                          </Label>
                          <Select
                            value={formData.inquiryType}
                            onValueChange={(value) =>
                              handleInputChange("inquiryType", value)
                            }
                          >
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select inquiry type" />
                            </SelectTrigger>
                            <SelectContent>
                              {inquiryTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  <div className="flex items-center space-x-2">
                                    {type.icon}
                                    <span>{type.label}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label
                          htmlFor="subject"
                          className="text-sm font-medium text-gray-700 mb-2 block"
                        >
                          Subject *
                        </Label>
                        <Input
                          id="subject"
                          placeholder="Brief description of your inquiry"
                          value={formData.subject}
                          onChange={(e) =>
                            handleInputChange("subject", e.target.value)
                          }
                          className="h-12"
                          required
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="message"
                          className="text-sm font-medium text-gray-700 mb-2 block"
                        >
                          Message *
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us more about your needs, questions, or how we can help..."
                          value={formData.message}
                          onChange={(e) =>
                            handleInputChange("message", e.target.value)
                          }
                          className="min-h-32 resize-none"
                          required
                        />
                        <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                          <span>{formData.message.length} characters</span>
                          {formData.message.length > 50 && (
                            <span className="text-sky-600">
                              ✨ AI analyzing your message...
                            </span>
                          )}
                        </div>
                      </div>

                      {/* AI Response */}
                      <AnimatePresence>
                        {(isAnalyzing || aiResponse) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-gradient-to-r from-sky-50 to-blue-50 p-6 rounded-xl border border-sky-200"
                          >
                            {isAnalyzing ? (
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center">
                                  <Bot className="h-4 w-4 text-white animate-pulse" />
                                </div>
                                <div></div>
                              </div>
                            ) : (
                              aiResponse && (
                                <div>
                                  <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center">
                                      <Bot className="h-4 w-4 text-white" />
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-gray-900">
                                        AI Analysis Complete
                                      </h4>
                                      <p className="text-sm text-gray-600">
                                        Here's what I found about your inquiry
                                      </p>
                                    </div>
                                  </div>
                                  <div className="grid md:grid-cols-3 gap-4">
                                    <div className="bg-white p-4 rounded-lg">
                                      <div className="text-sm text-gray-600 mb-1">
                                        Routing to
                                      </div>
                                      <div className="font-medium text-gray-900">
                                        {aiResponse.relevantTeam}
                                      </div>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg">
                                      <div className="text-sm text-gray-600 mb-1">
                                        Expected Response
                                      </div>
                                      <div className="font-medium text-gray-900">
                                        {aiResponse.estimatedResponse}
                                      </div>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg">
                                      <div className="text-sm text-gray-600 mb-1">
                                        Priority
                                      </div>
                                      <Badge
                                        className={cn(
                                          aiResponse.priority === "high"
                                            ? "bg-red-100 text-red-700"
                                            : aiResponse.priority === "medium"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-green-100 text-green-700"
                                        )}
                                      >
                                        {aiResponse.priority.toUpperCase()}
                                      </Badge>
                                    </div>
                                  </div>
                                  <div className="mt-4 p-4 bg-white rounded-lg">
                                    <p className="text-gray-700 italic">
                                      "{aiResponse.suggestion}"
                                    </p>
                                  </div>
                                </div>
                              )
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <Button
                        type="submit"
                        disabled={
                          isSubmitting ||
                          !formData.name ||
                          !formData.email ||
                          !formData.message
                        }
                        className="w-full h-12 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl"
                      >
                        {isSubmitting ? (
                          <>
                            <Zap className="h-5 w-5 mr-2 animate-spin" />
                            Sending Message...
                          </>
                        ) : (
                          <>
                            <Send className="h-5 w-5 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Thank you for reaching out. Our AI has analyzed your
                      message and routed it to the right team.
                      {aiResponse &&
                        ` You can expect a response within ${aiResponse.estimatedResponse}.`}
                    </p>
                    <Button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: "",
                          email: "",
                          company: "",
                          subject: "",
                          message: "",
                          inquiryType: "",
                          urgency: "medium",
                        });
                        setAiResponse(null);
                      }}
                      variant="outline"
                      className="border-sky-300 text-sky-700 hover:bg-sky-50"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Methods */}
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Other Ways to Reach Us
              </h3>
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={index}
                    href={method.action}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div
                      className={`p-3 rounded-lg ${method.bg} ${method.color} group-hover:scale-110 transition-transform`}
                    >
                      {method.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {method.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {method.description}
                      </p>
                      <p className="text-sm font-medium text-gray-800">
                        {method.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </Card>

            {/* Team Members */}
            <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Meet Our Team
              </h3>
              <div className="space-y-4">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="relative">
                      <img
                        src={member.avatar || "/placeholder.svg"}
                        alt={member.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div
                        className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                          member.status === "online"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }`}
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {member.name}
                      </h4>
                      <p className="text-sm text-gray-600">{member.role}</p>
                      <p className="text-xs text-gray-500">
                        {member.specialty}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 bg-gradient-to-br from-sky-50 to-blue-50 border-sky-200 shadow-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start border-sky-300 text-sky-700 hover:bg-sky-50"
                >
                  Schedule a Demo
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-sky-300 text-sky-700 hover:bg-sky-50"
                >
                  Book a Coffee Chat
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-sky-300 text-sky-700 hover:bg-sky-50"
                >
                  Join Our Community
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
