import { useAuth } from "../../lib/auth-context";
import { HeilsaButton } from "../components/heilsa/HeilsaButton";
import { Logo } from "../components/heilsa/Logo";

export const Dashboard = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-[#F6F8FB] flex flex-col">
      <header className="flex items-center justify-between px-8 py-6 bg-white border-b border-[#D8DDE8]">
        <Logo />
        <HeilsaButton variant="primary" onClick={() => signOut()}>
          Sign out
        </HeilsaButton>
      </header>

      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-[640px] text-center">
          <h1 className="text-[40px] leading-tight font-medium mb-4 bg-gradient-to-r from-[#3ECFB2] via-[#5CA8E8] to-[#8B7CF8] bg-clip-text text-transparent">
            Welcome to Heilsa
          </h1>
          <p className="text-base text-[#5D6880] mb-8">
            You're signed in as <span className="font-medium text-[#1E2A45]">{user?.email}</span>
          </p>

          <div className="bg-white rounded-[16px] border border-[#D8DDE8] shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_12px_rgba(0,0,0,0.04)] p-8 text-left">
            <h2 className="text-lg font-medium text-[#1E2A45] mb-3">Account</h2>
            <dl className="grid grid-cols-[140px_1fr] gap-y-2 text-sm">
              <dt className="text-[#5D6880]">User ID</dt>
              <dd className="text-[#1E2A45] font-mono text-xs break-all">{user?.id}</dd>
              <dt className="text-[#5D6880]">Email</dt>
              <dd className="text-[#1E2A45]">{user?.email}</dd>
              <dt className="text-[#5D6880]">Provider</dt>
              <dd className="text-[#1E2A45]">{user?.app_metadata?.provider ?? "email"}</dd>
              <dt className="text-[#5D6880]">Email verified</dt>
              <dd className="text-[#1E2A45]">{user?.email_confirmed_at ? "Yes" : "No"}</dd>
            </dl>
          </div>
        </div>
      </div>

      <div className="h-1 bg-gradient-to-r from-[#3ECFB2] via-[#5CA8E8] to-[#8B7CF8] shadow-[0_-2px_8px_rgba(62,207,178,0.3)]"></div>
    </div>
  );
};
