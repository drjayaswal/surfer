"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Waves,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Loader2,
  Github,
  Chrome,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import WaveBackground from "@/components/wave-background";
import Link from "next/link";

interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  rememberMe?: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  general?: string;
}

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSuccess, setIsSuccess] = useState(false);

  // Reset form when switching tabs
  useEffect(() => {
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      rememberMe: false,
    });
    setErrors({});
    setIsSuccess(false);
  }, [activeTab]);

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }

    // Signup-specific validation
    if (activeTab === "signup") {
      if (!formData.firstName) {
        newErrors.firstName = "First name is required";
      }
      if (!formData.lastName) {
        newErrors.lastName = "Last name is required";
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate success
      setIsSuccess(true);

      // Redirect after success
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);
    } catch (error) {
      setErrors({
        general: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });

  const loginRef = useRef<HTMLButtonElement>(null);
  const signupRef = useRef<HTMLButtonElement>(null);

  const updateSlider = () => {
    const currentRef = activeTab === "login" ? loginRef : signupRef;
    if (currentRef.current) {
      const { offsetLeft, offsetWidth } = currentRef.current;
      setSliderStyle({ left: offsetLeft, width: offsetWidth });
    }
  };

  useEffect(() => {
    updateSlider();
    window.addEventListener("resize", updateSlider);
    return () => window.removeEventListener("resize", updateSlider);
  }, [activeTab]);


  // Handle input changes
  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Handle social login
  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // Implement social login logic here
  };

  // Tab switching with smooth animation
  const handleTabSwitch = (tab: "login" | "signup") => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-white">
      {/* Animated Wave Background */}
      <div className="absolute inset-0 z-0">
        <WaveBackground opacity={0.1} />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-10">
        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-20 w-4 h-4 bg-sky-400/30 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-40 right-32 w-6 h-6 bg-blue-400/20 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            y: [0, -25, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute bottom-32 left-40 w-3 h-3 bg-indigo-400/25 rounded-full blur-sm"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-20 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo and Branding */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          ></motion.div>

          {/* Auth Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 shadow-2xl rounded-4xl shadow-sky-700/40 border-0 bg-white/90 backdrop-blur-xl relative overflow-hidden">
              {/* Success State */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 bg-white/95 backdrop-blur-sm z-50 flex items-center justify-center"
                  >
                    <div className="text-center py-8">
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                        {activeTab === "login"
                          ? "Welcome back!"
                          : "Account created!"}
                      </h3>
                      <p className="text-gray-600">
                        {activeTab === "login"
                          ? "You're being redirected to your dashboard..."
                          : "Your account has been created successfully. Redirecting..."}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="text-center">
                <span className="bg-gradient-to-r from-sky-200 via-sky-400 to-sky-600 bg-clip-text text-transparent text-5xl font-bold">
                  {/* {activeTab === "login" ? "Login Portal" : "Welcome Portal"} */}
                  Surfer AI
                </span>
              </div>

              <div className="relative mb-4">
                <div className="flex bg-sky-100 rounded-2xl p-1 relative overflow-hidden">
                  {/* Sliding Background */}
                  <motion.div
                    className="absolute top-1 bottom-1 bg-white rounded-xl shadow-sm"
                    animate={{
                      left: sliderStyle.left,
                      width: sliderStyle.width,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />

                  {/* Tab Buttons */}
                  <button
                    ref={loginRef}
                    onClick={() => handleTabSwitch("login")}
                    className={cn(
                      "relative z-10 flex-1 py-3 text-sm font-semibold rounded-xl transition-colors duration-200",
                      activeTab === "login"
                        ? "text-sky-600"
                        : "text-gray-600 hover:text-sky-500"
                    )}
                  >
                    Login
                  </button>
                  <button
                    ref={signupRef}
                    onClick={() => handleTabSwitch("signup")}
                    className={cn(
                      "relative z-10 flex-1 py-3 text-sm font-semibold rounded-xl transition-colors duration-200",
                      activeTab === "signup"
                        ? "text-sky-600"
                        : "text-gray-600 hover:text-sky-500"
                    )}
                  >
                    Signup
                  </button>
                </div>
              </div>
              {/* Form Container with Sliding Animation */}
              <div className="relative overflow-hidden">
                <motion.div
                  className="flex"
                  animate={{
                    x: activeTab === "login" ? "0%" : "-100%",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  {/* Login Form */}
                  <div className="w-full flex-shrink-0">
                    <AnimatePresence mode="wait">
                      {activeTab === "login" && (
                        <motion.div
                          key="login"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Field */}
                            <div className="space-y-2">
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-sky-600" />
                                <Input
                                  id="email"
                                  type="email"
                                  placeholder="Enter your email"
                                  className={cn(
                                    "pl-10 h-12 focus-visible:border-sky-500 focus-visible:ring-0 rounded-xl",
                                    errors.email &&
                                      "border-red-300 focus:border-red-400 focus:ring-red-400"
                                  )}
                                  value={formData.email}
                                  onChange={(e) =>
                                    handleInputChange("email", e.target.value)
                                  }
                                />
                              </div>
                              {errors.email && (
                                <motion.p
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="text-sm text-red-600 flex items-center gap-1"
                                >
                                  <AlertCircle className="h-4 w-4" />
                                  {errors.email}
                                </motion.p>
                              )}
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                              <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-sky-600" />
                                <Input
                                  id="password"
                                  type={showPassword ? "text" : "password"}
                                  placeholder="Enter your password"
                                  className={cn(
                                    "pl-10 h-12 focus-visible:border-sky-500 focus-visible:ring-0 rounded-xl",

                                    errors.password &&
                                      "border-red-300 focus:border-red-400 focus:ring-red-400"
                                  )}
                                  value={formData.password}
                                  onChange={(e) =>
                                    handleInputChange(
                                      "password",
                                      e.target.value
                                    )
                                  }
                                />
                                <button
                                  type="button"
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  {showPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                  ) : (
                                    <Eye className="h-5 w-5" />
                                  )}
                                </button>
                              </div>
                              {errors.password && (
                                <motion.p
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="text-sm text-red-600 flex items-center gap-1"
                                >
                                  <AlertCircle className="h-4 w-4" />
                                  {errors.password}
                                </motion.p>
                              )}
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="remember"
                                  checked={formData.rememberMe}
                                  className="data-[state=checked]:bg-sky-600
                                  data-[state=checked]:border-0"
                                  onCheckedChange={(checked) =>
                                    handleInputChange(
                                      "rememberMe",
                                      checked as boolean
                                    )
                                  }
                                />
                                <Label
                                  htmlFor="remember"
                                  className="text-sm text-gray-600"
                                >
                                  Remember me
                                </Label>
                              </div>
                              <Link
                                href="/auth/forgot-password"
                                className="text-sm text-sky-600 hover:text-sky-700"
                              >
                                Forgot password?
                              </Link>
                            </div>

                            {/* General Error */}
                            {errors.general && (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 bg-red-50 border border-red-200 rounded-xl"
                              >
                                <p className="text-sm text-red-600 flex items-center gap-2">
                                  <AlertCircle className="h-4 w-4" />
                                  {errors.general}
                                </p>
                              </motion.div>
                            )}
                            {/* Submit Button */}
                            <div className="grid grid-cols-2 gap-2">
                              <Button
                                type="submit"
                                disabled={isLoading}
                                className="h-12 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
                              >
                                {isLoading ? (
                                  <>
                                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                    Logging in...
                                  </>
                                ) : (
                                  <>
                                    Login
                                    <ArrowRight className="h-5 w-5 ml-2" />
                                  </>
                                )}
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                className="h-12 border-0 hover:bg-sky-100 rounded-xl cursor-pointer"
                                onClick={() => handleSocialLogin("google")}
                              >
                                <svg
                                  className="w-5 h-5 mr-3"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                  />
                                  <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                  />
                                  <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                  />
                                  <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                  />
                                </svg>
                                Google
                              </Button>
                            </div>
                          </form>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Signup Form */}
                  <div className="w-full flex-shrink-0">
                    <AnimatePresence mode="wait">
                      {activeTab === "signup" && (
                        <motion.div
                          key="signup"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Fields */}
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <div className="relative">
                                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-sky-600" />
                                  <Input
                                    id="firstName"
                                    type="text"
                                    placeholder="First name"
                                    className={cn(
                                      "pl-10 h-12 focus-visible:border-sky-500 focus-visible:ring-0 rounded-xl",

                                      errors.firstName &&
                                        "border-red-300 focus:border-red-400 focus:ring-red-400"
                                    )}
                                    value={formData.firstName}
                                    onChange={(e) =>
                                      handleInputChange(
                                        "firstName",
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                                {errors.firstName && (
                                  <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-sm text-red-600 flex items-center gap-1"
                                  >
                                    <AlertCircle className="h-4 w-4" />
                                    {errors.firstName}
                                  </motion.p>
                                )}
                              </div>

                              <div className="space-y-2">
                                <Input
                                  id="lastName"
                                  type="text"
                                  placeholder="Last name"
                                  className={cn(
                                    "pl-10 h-12 focus-visible:border-sky-500 focus-visible:ring-0 rounded-xl",

                                    errors.lastName &&
                                      "border-red-300 focus:border-red-400 focus:ring-red-400"
                                  )}
                                  value={formData.lastName}
                                  onChange={(e) =>
                                    handleInputChange(
                                      "lastName",
                                      e.target.value
                                    )
                                  }
                                />
                                {errors.lastName && (
                                  <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-sm text-red-600 flex items-center gap-1"
                                  >
                                    <AlertCircle className="h-4 w-4" />
                                    {errors.lastName}
                                  </motion.p>
                                )}
                              </div>
                            </div>

                            {/* Email Field */}
                            <div className="space-y-2">
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-sky-600" />
                                <Input
                                  id="signup-email"
                                  type="email"
                                  placeholder="Enter your email"
                                  className={cn(
                                    "pl-10 h-12 focus-visible:border-sky-500 focus-visible:ring-0 rounded-xl",

                                    errors.email &&
                                      "border-red-300 focus:border-red-400 focus:ring-red-400"
                                  )}
                                  value={formData.email}
                                  onChange={(e) =>
                                    handleInputChange("email", e.target.value)
                                  }
                                />
                              </div>
                              {errors.email && (
                                <motion.p
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="text-sm text-red-600 flex items-center gap-1"
                                >
                                  <AlertCircle className="h-4 w-4" />
                                  {errors.email}
                                </motion.p>
                              )}
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                              <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-sky-600" />
                                <Input
                                  id="signup-password"
                                  type={showPassword ? "text" : "password"}
                                  placeholder="Create a password"
                                  className={cn(
                                    "pl-10 h-12 focus-visible:border-sky-500 focus-visible:ring-0 rounded-xl",

                                    errors.password &&
                                      "border-red-300 focus:border-red-400 focus:ring-red-400"
                                  )}
                                  value={formData.password}
                                  onChange={(e) =>
                                    handleInputChange(
                                      "password",
                                      e.target.value
                                    )
                                  }
                                />
                                <button
                                  type="button"
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sky-600 hover:text-sky-700 cursor-pointer"
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  {showPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                  ) : (
                                    <Eye className="h-5 w-5" />
                                  )}
                                </button>
                              </div>
                              {errors.password && (
                                <motion.p
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="text-sm text-red-600 flex items-center gap-1"
                                >
                                  <AlertCircle className="h-4 w-4" />
                                  {errors.password}
                                </motion.p>
                              )}
                            </div>

                            {/* Confirm Password Field */}
                            <div className="space-y-2">
                              <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-sky-600" />
                                <Input
                                  id="confirmPassword"
                                  type={
                                    showConfirmPassword ? "text" : "password"
                                  }
                                  placeholder="Confirm your password"
                                  className={cn(
                                    "pl-10 h-12 focus-visible:border-sky-500 focus-visible:ring-0 rounded-xl",

                                    errors.confirmPassword &&
                                      "border-red-300 focus:border-red-400 focus:ring-red-400"
                                  )}
                                  value={formData.confirmPassword}
                                  onChange={(e) =>
                                    handleInputChange(
                                      "confirmPassword",
                                      e.target.value
                                    )
                                  }
                                />
                                <button
                                  type="button"
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sky-600 hover:text-sky-700 cursor-pointer"
                                  onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                  }
                                >
                                  {showConfirmPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                  ) : (
                                    <Eye className="h-5 w-5" />
                                  )}
                                </button>
                              </div>
                              {errors.confirmPassword && (
                                <motion.p
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="text-sm text-red-600 flex items-center gap-1"
                                >
                                  <AlertCircle className="h-4 w-4" />
                                  {errors.confirmPassword}
                                </motion.p>
                              )}
                            </div>
                            <hr />
                            {/* Terms Agreement */}
                            <div className="flex items-start space-x-2">
                              <Checkbox
                                id="terms"
                                className="mt-1 data-[state=checked]:bg-sky-600 data-[state=checked]:border-0"
                              />
                              <Label
                                htmlFor="terms"
                                className="text-sm text-gray-600 leading-relaxed"
                              >
                                I agree to the{" "}
                                <Link
                                  href="/terms"
                                  className="text-sky-600 hover:text-sky-700"
                                >
                                  Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link
                                  href="/privacy"
                                  className="text-sky-600 hover:text-sky-700"
                                >
                                  Privacy Policy
                                </Link>
                              </Label>
                            </div>

                            {/* General Error */}
                            {errors.general && (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 bg-red-50 border border-red-200 rounded-xl"
                              >
                                <p className="text-sm text-red-600 flex items-center gap-2">
                                  <AlertCircle className="h-4 w-4" />
                                  {errors.general}
                                </p>
                              </motion.div>
                            )}

                            {/* Submit Button */}
                            <div className="grid grid-cols-2 gap-2">
                              <Button
                                type="submit"
                                disabled={isLoading}
                                className="h-12 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
                              >
                                {isLoading ? (
                                  <>
                                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                    Creating Account...
                                  </>
                                ) : (
                                  <>
                                    Create Account
                                    <ArrowRight className="h-5 w-5 ml-2" />
                                  </>
                                )}
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                className="h-12 border-0 hover:bg-sky-100 rounded-xl cursor-pointer"
                                onClick={() => handleSocialLogin("google")}
                              >
                                <svg
                                  className="w-5 h-5 mr-3"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                  />
                                  <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                  />
                                  <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                  />
                                  <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                  />
                                </svg>
                                Google
                              </Button>
                            </div>
                          </form>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>

              {/* Footer */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  {activeTab === "login"
                    ? "Don't have an account? "
                    : "Already have an account? "}
                  <button
                    type="button"
                    className="text-sky-600 hover:text-sky-700 font-medium"
                    onClick={() =>
                      setActiveTab(activeTab === "login" ? "signup" : "login")
                    }
                  >
                    {activeTab === "login" ? "Sign up" : "Sign in"}
                  </button>
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Back to Home */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-6"
          >
            <Link
              href="/"
              className="inline-flex items-center text-sm text-sky-600 font-medium transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to home
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
