import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeilsaButton } from "../HeilsaButton";
import { Logo } from "../Logo";
import { HeilsaAuthInput } from "./HeilsaAuthInput";
import { HeilsaLanguageDropdown } from "./HeilsaLanguageDropdown";
import { Lock, Check } from "lucide-react";
import { supabase } from "../../../../lib/supabase";

export const ResetPasswordScreen = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [language, setLanguage] = useState("en");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const { error: err } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (err) {
      setError(err.message);
    } else {
      setSuccess(true);
      setTimeout(() => navigate("/signin"), 2000);
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
          {!success ? (
            <>
              <div className="mb-8 text-center">
                <div className="relative mb-8 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#3ECFB2]/10 via-[#5CA8E8]/10 to-[#8B7CF8]/10 flex items-center justify-center border border-[#3ECFB2]/20">
                    <Lock className="w-8 h-8 text-[#3ECFB2]" />
                  </div>
                </div>

                <h2 className="text-[32px] leading-tight font-medium mb-3 text-[#1E2A45]">
                  Reset Password
                </h2>

                <p className="text-base text-[#5D6880] max-w-sm mx-auto">
                  Choose a strong password to secure your account.
                </p>
              </div>

              <div className="relative bg-white rounded-[16px] border border-[#D8DDE8] shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_12px_rgba(0,0,0,0.04)] p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <HeilsaAuthInput
                    label="New password"
                    type="password"
                    required
                    autoComplete="new-password"
                    placeholder="Enter new password"
                    leftIcon={<Lock className="w-full h-full" />}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <HeilsaAuthInput
                    label="Confirm password"
                    type="password"
                    required
                    autoComplete="new-password"
                    placeholder="Confirm new password"
                    leftIcon={<Lock className="w-full h-full" />}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    error={error || undefined}
                  />

                  <div className="bg-[#F6F8FB] rounded-[12px] p-4 space-y-2">
                    <p className="text-xs font-medium text-[#1E2A45] mb-2">Password must contain:</p>
                    <div className="flex items-center gap-2 text-xs text-[#5D6880]">
                      <div className="w-4 h-4 rounded-full bg-[#3ECFB2]/10 flex items-center justify-center">
                        <Check className="w-3 h-3 text-[#3ECFB2]" />
                      </div>
                      At least 8 characters
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#5D6880]">
                      <div className="w-4 h-4 rounded-full bg-[#3ECFB2]/10 flex items-center justify-center">
                        <Check className="w-3 h-3 text-[#3ECFB2]" />
                      </div>
                      One uppercase letter
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#5D6880]">
                      <div className="w-4 h-4 rounded-full bg-[#3ECFB2]/10 flex items-center justify-center">
                        <Check className="w-3 h-3 text-[#3ECFB2]" />
                      </div>
                      One number or special character
                    </div>
                  </div>

                  <div className="pt-2">
                    <HeilsaButton
                      type="submit"
                      variant="teal"
                      className="w-full h-12 shadow-[0_4px_12px_rgba(62,207,178,0.2)]"
                      disabled={loading}
                    >
                      {loading ? "Resetting Password..." : "Reset Password"}
                    </HeilsaButton>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="relative mb-8 flex justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#3ECFB2] via-[#5CA8E8] to-[#8B7CF8] flex items-center justify-center shadow-lg animate-pulse">
                  <Check className="w-10 h-10 text-white" strokeWidth={3} />
                </div>
              </div>

              <h2 className="text-[32px] leading-tight font-medium mb-3 text-[#1E2A45]">
                Password Reset!
              </h2>

              <p className="text-base text-[#5D6880] max-w-sm mx-auto mb-8">
                Your password has been successfully reset. Redirecting you to login...
              </p>

              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#3ECFB2] animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-[#5CA8E8] animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 rounded-full bg-[#8B7CF8] animate-pulse" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="h-1 bg-gradient-to-r from-[#3ECFB2] via-[#5CA8E8] to-[#8B7CF8] shadow-[0_-2px_8px_rgba(62,207,178,0.3)]"></div>
    </div>
  );
};
