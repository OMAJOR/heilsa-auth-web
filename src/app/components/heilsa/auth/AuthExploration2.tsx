import { useState } from "react";
import { cn } from "../../ui/utils";
import { HeilsaButton } from "../HeilsaButton";
import { HeilsaAuthInput } from "./HeilsaAuthInput";
import { HeilsaGoogleButton } from "./HeilsaGoogleButton";
import { HeilsaLanguageDropdown } from "./HeilsaLanguageDropdown";
import { Mail, Lock, Activity, Heart, Moon, TrendingUp } from "lucide-react";

export const AuthExploration2 = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [language, setLanguage] = useState("en");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      setLoading(false);
      setError("Check your email and password.");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[var(--h-gray-100)] flex">
      {/* Left Brand Section - Hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[var(--h-teal)] via-[var(--h-blue)] to-[var(--h-violet)] p-12 flex-col justify-between text-white relative overflow-hidden">
        <div>
          <div className="w-12 h-12 rounded-[var(--r-lg)] bg-white/20 backdrop-blur flex items-center justify-center mb-4">
            <span className="text-xl font-medium">H</span>
          </div>
          <h1 className="text-4xl font-medium mb-3">Heilsa</h1>
          <p className="text-lg opacity-90 mb-12">
            Your complete health operating system
          </p>

          {/* Health Dashboard Preview */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-[var(--r-lg)] p-6">
            <h3 className="text-sm font-medium mb-4 opacity-80">Today's Overview</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur rounded-[var(--r-md)] p-4">
                <div className="w-8 h-8 rounded-[var(--r-md)] bg-white/20 flex items-center justify-center mb-2">
                  <Activity className="w-5 h-5" />
                </div>
                <div className="text-2xl font-medium mb-1">8,432</div>
                <div className="text-xs opacity-75">steps</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-[var(--r-md)] p-4">
                <div className="w-8 h-8 rounded-[var(--r-md)] bg-white/20 flex items-center justify-center mb-2">
                  <Heart className="w-5 h-5" />
                </div>
                <div className="text-2xl font-medium mb-1">72</div>
                <div className="text-xs opacity-75">bpm</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-[var(--r-md)] p-4">
                <div className="w-8 h-8 rounded-[var(--r-md)] bg-white/20 flex items-center justify-center mb-2">
                  <Moon className="w-5 h-5" />
                </div>
                <div className="text-2xl font-medium mb-1">7.4</div>
                <div className="text-xs opacity-75">hrs sleep</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-[var(--r-md)] p-4">
                <div className="w-8 h-8 rounded-[var(--r-md)] bg-white/20 flex items-center justify-center mb-2">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="text-2xl font-medium mb-1">84</div>
                <div className="text-xs opacity-75">recovery</div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-sm opacity-75">
          © 2024 Heilsa. All rights reserved.
        </div>
      </div>

      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--h-gray-300)] bg-white">
          <div className="lg:hidden flex items-center gap-3">
            <div className="w-10 h-10 rounded-[var(--r-lg)] bg-gradient-to-br from-[var(--h-teal)] via-[var(--h-blue)] to-[var(--h-violet)] flex items-center justify-center">
              <span className="text-lg font-medium text-white">H</span>
            </div>
            <span className="text-xl font-medium text-[var(--h-navy)]">Heilsa</span>
          </div>
          <div className="ml-auto">
            <HeilsaLanguageDropdown selected={language} onSelect={setLanguage} variant="compact" />
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-[400px]">
            <div className="mb-8">
              <h2 className="text-[28px] font-medium text-[var(--h-navy)] mb-2">
                {mode === "login" ? "Welcome back" : "Create account"}
              </h2>
              <p className="text-sm text-[var(--h-gray-600)]">
                {mode === "login"
                  ? "Sign in to continue to your health dashboard"
                  : "Start your health journey with Heilsa"}
              </p>
            </div>

            {/* Tab Pills */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setMode("login")}
                className={cn(
                  "px-4 py-2 rounded-[var(--r-full)] text-sm font-medium transition-all",
                  mode === "login"
                    ? "bg-[var(--h-navy)] text-white"
                    : "bg-white border border-[var(--h-gray-300)] text-[var(--h-gray-600)] hover:bg-[var(--h-gray-100)]"
                )}
              >
                Log in
              </button>
              <button
                onClick={() => setMode("signup")}
                className={cn(
                  "px-4 py-2 rounded-[var(--r-full)] text-sm font-medium transition-all",
                  mode === "signup"
                    ? "bg-[var(--h-navy)] text-white"
                    : "bg-white border border-[var(--h-gray-300)] text-[var(--h-gray-600)] hover:bg-[var(--h-gray-100)]"
                )}
              >
                Sign up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <div className="grid grid-cols-2 gap-3">
                  <HeilsaAuthInput label="First name" placeholder="John" />
                  <HeilsaAuthInput label="Last name" placeholder="Doe" />
                </div>
              )}

              <HeilsaAuthInput
                label="Email"
                type="email"
                placeholder="you@example.com"
                leftIcon={<Mail className="w-full h-full" />}
                error={error}
              />

              <HeilsaAuthInput
                label="Password"
                type="password"
                placeholder="••••••••"
                leftIcon={<Lock className="w-full h-full" />}
              />

              {mode === "login" && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-sm text-[var(--h-teal-dark)] hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <HeilsaButton
                type="submit"
                variant="primary"
                className="w-full"
                disabled={loading}
              >
                {loading
                  ? mode === "login"
                    ? "Signing in..."
                    : "Creating account..."
                  : mode === "login"
                  ? "Log in"
                  : "Create account"}
              </HeilsaButton>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[var(--h-gray-300)]"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-[var(--h-gray-100)] text-[var(--h-gray-600)]">OR</span>
                </div>
              </div>

              <HeilsaGoogleButton />

              <div className="text-center pt-2">
                <span className="text-sm text-[var(--h-gray-600)]">
                  {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                </span>
                <button
                  type="button"
                  onClick={() => setMode(mode === "login" ? "signup" : "login")}
                  className="text-sm text-[var(--h-teal-dark)] hover:underline font-medium"
                >
                  {mode === "login" ? "Sign up" : "Log in"}
                </button>
              </div>
            </form>

            <p className="text-xs text-[var(--h-gray-400)] mt-8 text-center">
              By continuing, you agree to Heilsa's Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
