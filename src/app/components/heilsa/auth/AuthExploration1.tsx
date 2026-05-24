import { useState } from "react";
import { cn } from "../../ui/utils";
import { HeilsaButton } from "../HeilsaButton";
import { HeilsaAuthInput } from "./HeilsaAuthInput";
import { HeilsaGoogleButton } from "./HeilsaGoogleButton";
import { HeilsaLanguageDropdown } from "./HeilsaLanguageDropdown";
import { Mail, Lock } from "lucide-react";

export const AuthExploration1 = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [language, setLanguage] = useState("en");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setError("Check your email and password.");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[var(--h-gray-100)] flex flex-col items-center justify-center p-4 relative">
      {/* Language Dropdown - Top Right */}
      <div className="absolute top-4 right-4">
        <HeilsaLanguageDropdown selected={language} onSelect={setLanguage} variant="compact" />
      </div>

      {/* Logo & Brand */}
      <div className="text-center mb-8">
        <div className="w-14 h-14 mx-auto mb-3 rounded-[var(--r-xl)] bg-gradient-to-br from-[var(--h-teal)] via-[var(--h-blue)] to-[var(--h-violet)] flex items-center justify-center shadow-[var(--shadow-card)]">
          <span className="text-2xl font-medium text-white">H</span>
        </div>
        <h1 className="text-[28px] font-medium text-[var(--h-navy)] mb-1">Heilsa</h1>
        <p className="text-sm text-[var(--h-gray-600)]">Your health companion</p>
      </div>

      {/* Auth Card */}
      <div className="w-full max-w-[400px] bg-white rounded-[var(--r-lg)] border border-[var(--h-gray-300)] shadow-[var(--shadow-card)] p-6">
        {/* Segmented Control */}
        <div className="flex gap-1 p-1 bg-[var(--h-gray-200)] rounded-[var(--r-md)] mb-6">
          <button
            onClick={() => setMode("login")}
            className={cn(
              "flex-1 py-2 px-4 rounded-[calc(var(--r-md)-4px)] text-sm font-medium transition-all",
              mode === "login"
                ? "bg-white text-[var(--h-navy)] shadow-sm"
                : "text-[var(--h-gray-600)] hover:text-[var(--h-navy)]"
            )}
          >
            Log in
          </button>
          <button
            onClick={() => setMode("signup")}
            className={cn(
              "flex-1 py-2 px-4 rounded-[calc(var(--r-md)-4px)] text-sm font-medium transition-all",
              mode === "signup"
                ? "bg-white text-[var(--h-navy)] shadow-sm"
                : "text-[var(--h-gray-600)] hover:text-[var(--h-navy)]"
            )}
          >
            Sign up
          </button>
        </div>

        {/* Form */}
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
              <span className="px-2 bg-white text-[var(--h-gray-600)]">OR</span>
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
      </div>

      {/* Footer */}
      <p className="text-xs text-[var(--h-gray-400)] mt-6 text-center">
        By continuing, you agree to Heilsa's Terms of Service and Privacy Policy
      </p>
    </div>
  );
};
