import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeilsaButton } from "../HeilsaButton";
import { Logo } from "../Logo";
import { HeilsaAuthInput } from "./HeilsaAuthInput";
import { HeilsaLanguageDropdown } from "./HeilsaLanguageDropdown";
import { Mail, ArrowLeft, Sparkles } from "lucide-react";
import { supabase } from "../../../../lib/supabase";

export const ForgotPasswordScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [language, setLanguage] = useState("en");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}${import.meta.env.BASE_URL}reset-password`,
    });
    setLoading(false);
    if (err) {
      setError(err.message);
    } else {
      setSent(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F8FB] flex flex-col">
      <header className="flex items-center justify-between px-8 py-6 bg-white border-b border-[#D8DDE8]">
        <Logo />
        <HeilsaLanguageDropdown selected={language} onSelect={setLanguage} variant="pill" />
      </header>

      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-[440px]">
          <button
            onClick={() => navigate("/signin")}
            className="flex items-center gap-2 text-sm text-[#0F9E82] hover:text-[#3ECFB2] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to login
          </button>

          {!sent ? (
            <>
              <div className="mb-8 text-center">
                <div className="relative mb-8 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#3ECFB2]/10 via-[#5CA8E8]/10 to-[#8B7CF8]/10 flex items-center justify-center border border-[#3ECFB2]/20">
                    <Mail className="w-8 h-8 text-[#3ECFB2]" />
                  </div>
                </div>

                <h2 className="text-[32px] leading-tight font-medium mb-3 text-[#1E2A45]">
                  Forgot Password?
                </h2>

                <p className="text-base text-[#5D6880] max-w-sm mx-auto">
                  No worries! Enter your email and we'll send you reset instructions.
                </p>
              </div>

              <div className="relative bg-white rounded-[16px] border border-[#D8DDE8] shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_12px_rgba(0,0,0,0.04)] p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <HeilsaAuthInput
                    label="Email address"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    leftIcon={<Mail className="w-full h-full" />}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={error || undefined}
                  />

                  <div className="pt-2">
                    <HeilsaButton
                      type="submit"
                      variant="teal"
                      className="w-full h-12 shadow-[0_4px_12px_rgba(62,207,178,0.2)]"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send Reset Link"}
                    </HeilsaButton>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="relative mb-8 flex justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#3ECFB2] via-[#5CA8E8] to-[#8B7CF8] flex items-center justify-center shadow-lg">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
              </div>

              <h2 className="text-[32px] leading-tight font-medium mb-3 text-[#1E2A45]">
                Check Your Email
              </h2>

              <p className="text-base text-[#5D6880] max-w-sm mx-auto mb-8">
                We've sent password reset instructions to <span className="font-medium text-[#1E2A45]">{email}</span>.
              </p>

              <div className="bg-gradient-to-r from-[#D0F5EE] via-[#DCEFFE] to-[#EAE8FF] rounded-[12px] border border-[#3ECFB2]/10 p-6 mb-8">
                <p className="text-sm text-[#1E2A45] leading-relaxed">
                  Didn't receive the email? Check your spam folder or{" "}
                  <button
                    onClick={() => setSent(false)}
                    className="text-[#0F9E82] hover:text-[#3ECFB2] font-medium transition-colors"
                  >
                    try again
                  </button>
                </p>
              </div>

              <HeilsaButton
                variant="primary"
                className="w-full h-12"
                onClick={() => navigate("/signin")}
              >
                Back to Login
              </HeilsaButton>
            </div>
          )}
        </div>
      </div>

      <div className="h-1 bg-gradient-to-r from-[#3ECFB2] via-[#5CA8E8] to-[#8B7CF8] shadow-[0_-2px_8px_rgba(62,207,178,0.3)]"></div>
    </div>
  );
};
