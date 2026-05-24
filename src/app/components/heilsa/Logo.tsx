const baseUrl = import.meta.env.BASE_URL || "/";
const logoSrc = `${baseUrl}heilsa-logo-mark.png`;

export const Logo = () => (
  <div className="flex items-center gap-3">
    <img
      src={logoSrc}
      alt="Heilsa"
      className="w-14 h-14 rounded-[18px] object-cover shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_12px_rgba(0,0,0,0.04)]"
    />
    <span className="text-2xl font-medium text-[#1E2A45]">Heilsa</span>
  </div>
);
