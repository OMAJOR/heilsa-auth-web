import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeilsaButton } from "../HeilsaButton";
import { Logo } from "../Logo";
import { HeilsaLanguageDropdown } from "./HeilsaLanguageDropdown";
import { Check, AlertCircle, Loader } from "lucide-react";
import { supabase } from "../../../../lib/supabase";

export const VerifyEmailScreen = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"verifying" | "verified" | "error">("verifying");
  const [errorMessage, setErrorMessage] = useState("");
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    let cancelled = false;

    const verify = async () => {
      try {
        // Supabase auto-detects the verification code/hash from the URL when
        // detectSessionInUrl is enabled. Give it a moment then check session.
        await new Promise((r) => setTimeout(r, 400));
        const { data, error } = await supabase.auth.getSession();
        if (cancelled) return;
        if (error) {
          setErrorMessage(error.message);
          setStatus("error");
          return;
        }
        if (data.session) {
          setStatus("verified");
        } else {
          setErrorMessage("No active verification session found.");
          setStatus("error");
        }
      } catch (err) {
        if (cancelled) return;
        setErrorMessage(err instanceof Error ? err.message : "Verification failed.");
        setStatus("error");
      }
    };

    verify();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F8FB] flex flex-col">
      <header className="flex items-center justify-between px-8 py-6 bg-white border-b border-[#D8DDE8]">
        <Logo />
        <HeilsaLanguageDropdown selected={language} onSelect={setLanguage} variant="pill" />
      </header>

      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-[440px]">
          {status === "verifying" ? (
            <div className="text-center">
              <div className="relative mb-8 flex justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#3ECFB2]/10 via-[#5CA8E8]/10 to-[#8B7CF8]/10 flex items-center justify-center border border-[#3ECFB2]/20">
                  <Loader className="w-10 h-10 text-[#3ECFB2] animate-spin" />
                </div>
              </div>

              <h2 className="text-[32px] leading-tight font-medium mb-3 text-[#1E2A45]">
                Verifying Email...
              </h2>

              <p className="text-base text-[#5D6880] max-w-sm mx-auto">
                Please wait while we verify your email address.
              </p>
            </div>
          ) : status === "verified" ? (
            <div className="text-center">
              <div className="relative mb-8 flex justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#3ECFB2] via-[#5CA8E8] to-[#8B7CF8] flex items-center justify-center shadow-lg">
                  <Check className="w-10 h-10 text-white" strokeWidth={3} />
                </div>
              </div>

              <h2 className="text-[32px] leading-tight font-medium mb-3 text-[#1E2A45]">
                Email Verified!
              </h2>

              <p className="text-base text-[#5D6880] max-w-sm mx-auto mb-8">
                Your email has been successfully verified. You can now access all features.
              </p>

              <div className="bg-gradient-to-r from-[#D0F5EE] via-[#DCEFFE] to-[#EAE8FF] rounded-[12px] border border-[#3ECFB2]/10 p-6 mb-8">
                <p className="text-sm text-[#1E2A45] leading-relaxed">
                  Welcome to Heilsa! Start exploring your health dashboard and connect your devices.
                </p>
              </div>

              <HeilsaButton
                variant="teal"
                className="w-full h-12 shadow-[0_4px_12px_rgba(62,207,178,0.2)]"
                onClick={() => navigate("/dashboard")}
              >
                Continue to Dashboard
              </HeilsaButton>
            </div>
          ) : (
            <div className="text-center">
              <div className="relative mb-8 flex justify-center">
                <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center border border-red-200">
                  <AlertCircle className="w-10 h-10 text-red-500" />
                </div>
              </div>

              <h2 className="text-[32px] leading-tight font-medium mb-3 text-[#1E2A45]">
                Verification Failed
              </h2>

              <p className="text-base text-[#5D6880] max-w-sm mx-auto mb-8">
                We couldn't verify your email. {errorMessage || "The link may have expired or is invalid."}
              </p>

              <div className="bg-red-50 rounded-[12px] border border-red-200 p-6 mb-8">
                <p className="text-sm text-red-900 leading-relaxed mb-2">Common issues:</p>
                <ul className="text-sm text-red-800 space-y-1 text-left">
                  <li>• Verification link has expired (24 hours)</li>
                  <li>• Link was already used</li>
                  <li>• Email address was already verified</li>
                </ul>
              </div>

              <div className="space-y-3">
                <HeilsaButton
                  variant="teal"
                  className="w-full h-12 shadow-[0_4px_12px_rgba(62,207,178,0.2)]"
                  onClick={() => navigate("/signin")}
                >
                  Back to Login
                </HeilsaButton>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="h-1 bg-gradient-to-r from-[#3ECFB2] via-[#5CA8E8] to-[#8B7CF8] shadow-[0_-2px_8px_rgba(62,207,178,0.3)]"></div>
    </div>
  );
};
