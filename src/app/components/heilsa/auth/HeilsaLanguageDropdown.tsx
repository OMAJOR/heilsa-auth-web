import { useState, useRef, useEffect } from "react";
import { cn } from "../../ui/utils";
import { ChevronDown, Globe } from "lucide-react";

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "es", name: "Spanish", nativeName: "Español" },
  { code: "fr", name: "French", nativeName: "Français" },
  { code: "de", name: "German", nativeName: "Deutsch" },
  { code: "ar", name: "Arabic", nativeName: "العربية" },
];

export interface HeilsaLanguageDropdownProps {
  selected?: string;
  onSelect?: (code: string) => void;
  className?: string;
  variant?: "pill" | "compact";
}

export const HeilsaLanguageDropdown = ({
  selected = "en",
  onSelect,
  className,
  variant = "compact",
}: HeilsaLanguageDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLanguage = languages.find((lang) => lang.code === selected) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (code: string) => {
    onSelect?.(code);
    setIsOpen(false);
  };

  if (variant === "pill") {
    return (
      <div ref={dropdownRef} className={cn("relative", className)}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "inline-flex items-center gap-2 px-3 py-1.5 rounded-[var(--r-full)]",
            "bg-white border border-[var(--h-gray-300)]",
            "text-sm text-[var(--h-gray-600)] hover:bg-[var(--h-gray-100)]",
            "transition-colors"
          )}
        >
          <Globe className="w-4 h-4" />
          <span>{selectedLanguage.nativeName}</span>
          <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-[var(--h-gray-300)] rounded-[var(--r-xl)] shadow-[var(--shadow-elevated)] overflow-hidden z-50">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={cn(
                  "w-full px-4 py-2.5 text-left text-sm hover:bg-[var(--h-gray-100)] transition-colors",
                  lang.code === selected && "bg-[var(--h-teal-light)] text-[var(--h-teal-dark)] font-medium"
                )}
              >
                {lang.nativeName}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1.5",
          "text-sm text-[var(--h-gray-600)] hover:text-[var(--h-navy)]",
          "transition-colors"
        )}
      >
        <Globe className="w-4 h-4" />
        <span>{selectedLanguage.code.toUpperCase()}</span>
        <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-[var(--h-gray-300)] rounded-[var(--r-xl)] shadow-[var(--shadow-elevated)] overflow-hidden z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={cn(
                "w-full px-4 py-2.5 text-left text-sm hover:bg-[var(--h-gray-100)] transition-colors",
                lang.code === selected && "bg-[var(--h-teal-light)] text-[var(--h-teal-dark)] font-medium"
              )}
            >
              {lang.nativeName}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
