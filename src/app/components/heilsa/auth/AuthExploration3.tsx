import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "../../ui/utils";
import { HeilsaButton } from "../HeilsaButton";
import { Logo } from "../Logo";
import { HeilsaAuthInput } from "./HeilsaAuthInput";
import { HeilsaGoogleButton } from "./HeilsaGoogleButton";
import { HeilsaLanguageDropdown } from "./HeilsaLanguageDropdown";
import { Mail, Lock, Sparkles, User as UserIcon } from "lucide-react";
import { supabase } from "../../../../lib/supabase";

export const AuthExploration3 = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [language, setLanguage] = useState("en");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);
    try {
      if (mode === "login") {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) {
          setError(err.message);
        } else {
          navigate("/dashboard");
        }
      } else {
        const { data, error: err } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}${import.meta.env.BASE_URL}verify-email`,
            data: { first_name: firstName, last_name: lastName },
          },
        });
        if (err) {
          setError(err.message);
        } else if (data.session) {
          navigate("/dashboard");
        } else {
          setInfo("Check your email to confirm your account.");
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setGoogleLoading(true);
    // Build the OAuth URL but don't auto-redirect; we need to open it in the
    // top window because Google refuses to render inside an iframe (e.g. the
    // Replit preview), which surfaces as a generic 403 from accounts.google.com.
    const { data, error: err } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}${import.meta.env.BASE_URL}dashboard`,
        skipBrowserRedirect: true,
      },
    });
    if (err || !data?.url) {
      setError(err?.message ?? "Could not start Google sign-in.");
      setGoogleLoading(false);
      return;
    }
    // Escape the iframe: prefer top-window navigation, fall back to a new tab.
    try {
      if (window.top && window.top !== window.self) {
        window.top.location.href = data.url;
      } else {
        window.location.href = data.url;
      }
    } catch {
      window.open(data.url, "_blank", "noopener,noreferrer");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F8FB] flex flex-col">
      {/* Minimal Header */}
      <header className="flex items-center justify-between px-8 py-6 bg-white border-b border-[#D8DDE8]">
        <Logo />
        <HeilsaLanguageDropdown selected={language} onSelect={setLanguage} variant="pill" />
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-[440px]">
          {/* Hero Tagline */}
          <div className="mb-12 text-center relative">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#3ECFB2]/20 to-transparent"></div>
            </div>

            <div className="absolute -top-4 left-1/4 text-[#3ECFB2] opacity-60 animate-pulse">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="absolute -top-2 right-1/4 text-[#8B7CF8] opacity-60 animate-pulse" style={{ animationDelay: "0.5s" }}>
              <Sparkles className="w-4 h-4" />
            </div>

            <div className="relative mb-8 flex justify-center">
              <h2 className="leading-tight font-medium mb-2 bg-gradient-to-r from-[#3ECFB2] via-[#5CA8E8] to-[#8B7CF8] bg-clip-text text-transparent animate-gradient whitespace-nowrap text-[48px]">
                Smarter health in one place.
              </h2>
              <div className="absolute inset-0 bg-gradient-to-r from-[#3ECFB2] via-[#5CA8E8] to-[#8B7CF8] opacity-10 blur-2xl -z-10"></div>
            </div>

            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-[#3ECFB2] rounded-full self-center"></div>
              <div className="w-2 h-2 rounded-full bg-[#3ECFB2] flex-shrink-0"></div>
              <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-[#8B7CF8] rounded-full self-center"></div>
            </div>

            <p className="text-base text-[#5D6880] max-w-sm mx-auto">
              {mode === "login"
                ? "Welcome back to your health dashboard"
                : "Start your wellness journey today"}
            </p>
          </div>

          {/* Pill Tabs */}
          <div className="inline-flex items-center gap-1 p-1 bg-[#EDF0F5] rounded-[999px] mb-8">
            <button
              onClick={() => { setMode("login"); setError(""); setInfo(""); }}
              className={cn(
                "px-6 py-2.5 rounded-[999px] text-sm font-medium transition-all whitespace-nowrap",
                mode === "login"
                  ? "bg-[#3ECFB2] text-white shadow-sm"
                  : "text-[#5D6880] hover:text-[#1E2A45]"
              )}
            >
              Log in
            </button>
            <button
              onClick={() => { setMode("signup"); setError(""); setInfo(""); }}
              className={cn(
                "px-6 py-2.5 rounded-[999px] text-sm font-medium transition-all whitespace-nowrap",
                mode === "signup"
                  ? "bg-[#3ECFB2] text-white shadow-sm"
                  : "text-[#5D6880] hover:text-[#1E2A45]"
              )}
            >
              Sign up
            </button>
          </div>

          {/* Form Card */}
          <div className="relative">
            <div className="absolute -inset-[1px] bg-gradient-to-r from-[#3ECFB2] via-[#5CA8E8] to-[#8B7CF8] rounded-[16px] opacity-20 blur-sm"></div>

            <div className="relative bg-white rounded-[16px] border border-[#D8DDE8] shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_12px_rgba(0,0,0,0.04)] p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                {mode === "signup" && (
                  <div className="grid grid-cols-2 gap-4">
                    <HeilsaAuthInput
                      label="First name"
                      placeholder="John"
                      autoComplete="given-name"
                      leftIcon={<UserIcon className="w-full h-full" />}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <HeilsaAuthInput
                      label="Last name"
                      placeholder="Doe"
                      autoComplete="family-name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                )}

                <HeilsaAuthInput
                  label="Email address"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  leftIcon={<Mail className="w-full h-full" />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <HeilsaAuthInput
                  label="Password"
                  type="password"
                  required
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  placeholder="Enter your password"
                  leftIcon={<Lock className="w-full h-full" />}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={error || undefined}
                />

                {info && (
                  <p className="text-xs text-[#0F9E82] bg-[#D0F5EE] border border-[#3ECFB2]/20 rounded-md px-3 py-2">
                    {info}
                  </p>
                )}

                {mode === "login" && (
                  <div className="flex justify-end -mt-2">
                    <button
                      type="button"
                      onClick={() => navigate("/forgot-password")}
                      className="text-sm text-[#0F9E82] hover:text-[#3ECFB2] transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                <div className="pt-2">
                  <HeilsaButton
                    type="submit"
                    variant="teal"
                    className="w-full h-12 shadow-[0_4px_12px_rgba(62,207,178,0.2)]"
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
                </div>

                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#EDF0F5]"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 bg-white text-sm text-[#9BA5B8]">or</span>
                  </div>
                </div>

                <HeilsaGoogleButton
                  type="button"
                  className="h-12"
                  loading={googleLoading}
                  onClick={handleGoogle}
                />
              </form>
            </div>
          </div>

          {/* Switch Mode */}
          <div className="text-center mt-8">
            <span className="text-sm text-[#5D6880]">
              {mode === "login" ? "New to Heilsa? " : "Already have an account? "}
            </span>
            <button
              type="button"
              onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); setInfo(""); }}
              className="text-sm text-[#0F9E82] hover:text-[#3ECFB2] font-medium transition-colors"
            >
              {mode === "login" ? "Create an account" : "Sign in"}
            </button>
          </div>

          {/* Footer */}
          <div className="mt-12 text-center">
            <div className="inline-block px-6 py-3 rounded-[12px] bg-gradient-to-r from-[#D0F5EE] via-[#DCEFFE] to-[#EAE8FF] border border-[#3ECFB2]/10">
              <p className="text-xs text-[#1E2A45] leading-relaxed">
                By continuing, you agree to Heilsa's<br />
                <a href="#" className="text-[#0F9E82] hover:text-[#3ECFB2] transition-colors font-medium">Terms of Service</a>
                {" "}and{" "}
                <a href="#" className="text-[#0F9E82] hover:text-[#3ECFB2] transition-colors font-medium">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-1 bg-gradient-to-r from-[#3ECFB2] via-[#5CA8E8] to-[#8B7CF8] shadow-[0_-2px_8px_rgba(62,207,178,0.3)]"></div>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }
        .animate-gradient { animation: gradient 3s ease infinite; }
      `}</style>
    </div>
  );
};
