import { useState, useEffect, useRef, useMemo } from "react";
import { ChevronDown, Search } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
// Import component-specific translations
import { phoneInputEn } from "./translations.en";
import { phoneInputHe } from "./translations.he";

// ============================================
// Country Data
// ============================================

export interface CountryData {
  code: string;
  dialCode: string;
  flag: string;
  name: string; // Default fallback name (English)
}

/**
 * Countries list with default English names
 * Translated names come from the component's translation files
 */
export const countries: CountryData[] = [
  { code: "AE", dialCode: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "AR", dialCode: "+54", flag: "🇦🇷", name: "Argentina" },
  { code: "AT", dialCode: "+43", flag: "🇦🇹", name: "Austria" },
  { code: "AU", dialCode: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "BE", dialCode: "+32", flag: "🇧🇪", name: "Belgium" },
  { code: "BR", dialCode: "+55", flag: "🇧🇷", name: "Brazil" },
  { code: "CA", dialCode: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "CH", dialCode: "+41", flag: "🇨🇭", name: "Switzerland" },
  { code: "CL", dialCode: "+56", flag: "🇨🇱", name: "Chile" },
  { code: "CN", dialCode: "+86", flag: "🇨🇳", name: "China" },
  { code: "CO", dialCode: "+57", flag: "🇨🇴", name: "Colombia" },
  { code: "CZ", dialCode: "+420", flag: "🇨🇿", name: "Czech Republic" },
  { code: "DE", dialCode: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "DK", dialCode: "+45", flag: "🇩🇰", name: "Denmark" },
  { code: "EG", dialCode: "+20", flag: "🇪🇬", name: "Egypt" },
  { code: "ES", dialCode: "+34", flag: "🇪🇸", name: "Spain" },
  { code: "FI", dialCode: "+358", flag: "🇫🇮", name: "Finland" },
  { code: "FR", dialCode: "+33", flag: "🇫🇷", name: "France" },
  { code: "GB", dialCode: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "GR", dialCode: "+30", flag: "🇬🇷", name: "Greece" },
  { code: "HK", dialCode: "+852", flag: "🇭🇰", name: "Hong Kong" },
  { code: "HU", dialCode: "+36", flag: "🇭🇺", name: "Hungary" },
  { code: "ID", dialCode: "+62", flag: "🇮🇩", name: "Indonesia" },
  { code: "IE", dialCode: "+353", flag: "🇮🇪", name: "Ireland" },
  { code: "IL", dialCode: "+972", flag: "🇮🇱", name: "Israel" },
  { code: "IN", dialCode: "+91", flag: "🇮🇳", name: "India" },
  { code: "IT", dialCode: "+39", flag: "🇮🇹", name: "Italy" },
  { code: "JP", dialCode: "+81", flag: "🇯🇵", name: "Japan" },
  { code: "KR", dialCode: "+82", flag: "🇰🇷", name: "South Korea" },
  { code: "MX", dialCode: "+52", flag: "🇲🇽", name: "Mexico" },
  { code: "MY", dialCode: "+60", flag: "🇲🇾", name: "Malaysia" },
  { code: "NL", dialCode: "+31", flag: "🇳🇱", name: "Netherlands" },
  { code: "NO", dialCode: "+47", flag: "🇳🇴", name: "Norway" },
  { code: "NZ", dialCode: "+64", flag: "🇳🇿", name: "New Zealand" },
  { code: "PE", dialCode: "+51", flag: "🇵🇪", name: "Peru" },
  { code: "PH", dialCode: "+63", flag: "🇵🇭", name: "Philippines" },
  { code: "PL", dialCode: "+48", flag: "🇵🇱", name: "Poland" },
  { code: "PT", dialCode: "+351", flag: "🇵🇹", name: "Portugal" },
  { code: "RO", dialCode: "+40", flag: "🇷🇴", name: "Romania" },
  { code: "RU", dialCode: "+7", flag: "🇷🇺", name: "Russia" },
  { code: "SA", dialCode: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "SE", dialCode: "+46", flag: "🇸🇪", name: "Sweden" },
  { code: "SG", dialCode: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "TH", dialCode: "+66", flag: "🇹🇭", name: "Thailand" },
  { code: "TR", dialCode: "+90", flag: "🇹🇷", name: "Turkey" },
  { code: "TW", dialCode: "+886", flag: "🇹🇼", name: "Taiwan" },
  { code: "UA", dialCode: "+380", flag: "🇺🇦", name: "Ukraine" },
  { code: "US", dialCode: "+1", flag: "🇺🇸", name: "United States" },
  { code: "VN", dialCode: "+84", flag: "🇻🇳", name: "Vietnam" },
  { code: "ZA", dialCode: "+27", flag: "🇿🇦", name: "South Africa" },
];

/**
 * Get translations based on language
 */
function getTranslations(language: string) {
  switch (language) {
    case "he":
      return phoneInputHe;
    default:
      return phoneInputEn;
  }
}

// ============================================
// PhoneInput Component
// ============================================

interface CountryWithTranslatedName extends CountryData {
  displayName: string;
}

export interface PhoneInputProps {
  value: string;
  onChange: (fullNumber: string, countryCode: string, localNumber: string, dialCode: string) => void;
  defaultCountry?: string;
  placeholder?: string;
  error?: string;
  label?: string;
  required?: boolean;
  className?: string;
}

/**
 * Detects the user's country based on browser timezone.
 * NOTE: Uses system TIMEZONE, NOT IP address. VPN does not affect this.
 */
export function getUserCountryCode(): string {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    const timezoneToCountry: Record<string, string> = {
      "America/New_York": "US", "America/Chicago": "US", "America/Denver": "US",
      "America/Los_Angeles": "US", "America/Phoenix": "US", "America/Anchorage": "US",
      "America/Honolulu": "US", "America/Toronto": "CA", "America/Vancouver": "CA",
      "America/Sao_Paulo": "BR", "America/Rio_Branco": "BR", "America/Manaus": "BR",
      "America/Belem": "BR", "America/Fortaleza": "BR", "America/Recife": "BR",
      "America/Bahia": "BR", "America/Buenos_Aires": "AR", "America/Argentina/Buenos_Aires": "AR",
      "America/Mexico_City": "MX", "America/Cancun": "MX", "America/Tijuana": "MX",
      "America/Santiago": "CL", "America/Lima": "PE", "America/Bogota": "CO",
      "Europe/London": "GB", "Europe/Paris": "FR", "Europe/Berlin": "DE",
      "Europe/Rome": "IT", "Europe/Madrid": "ES", "Europe/Lisbon": "PT",
      "Europe/Amsterdam": "NL", "Europe/Brussels": "BE", "Europe/Zurich": "CH",
      "Europe/Vienna": "AT", "Europe/Stockholm": "SE", "Europe/Oslo": "NO",
      "Europe/Copenhagen": "DK", "Europe/Helsinki": "FI", "Europe/Dublin": "IE",
      "Europe/Warsaw": "PL", "Europe/Prague": "CZ", "Europe/Budapest": "HU",
      "Europe/Bucharest": "RO", "Europe/Athens": "GR", "Europe/Kiev": "UA",
      "Europe/Moscow": "RU", "Europe/Istanbul": "TR",
      "Asia/Jerusalem": "IL", "Asia/Tel_Aviv": "IL", "Asia/Dubai": "AE", "Asia/Riyadh": "SA",
      "Asia/Tokyo": "JP", "Asia/Shanghai": "CN", "Asia/Hong_Kong": "HK",
      "Asia/Singapore": "SG", "Asia/Seoul": "KR", "Asia/Taipei": "TW",
      "Asia/Bangkok": "TH", "Asia/Kuala_Lumpur": "MY", "Asia/Manila": "PH",
      "Asia/Jakarta": "ID", "Asia/Ho_Chi_Minh": "VN", "Asia/Kolkata": "IN", "Asia/Mumbai": "IN",
      "Australia/Sydney": "AU", "Australia/Melbourne": "AU", "Australia/Brisbane": "AU",
      "Australia/Perth": "AU", "Pacific/Auckland": "NZ",
      "Africa/Cairo": "EG", "Africa/Johannesburg": "ZA",
    };

    const countryCode = timezoneToCountry[timezone];
    if (countryCode && countries.find(c => c.code === countryCode)) {
      return countryCode;
    }
    return "US";
  } catch {
    return "US";
  }
}

/**
 * PhoneInput - Phone number input with country selector
 * Uses component-specific translation files for country names
 * Properly handles RTL layouts
 */
export function PhoneInput({
  value,
  onChange,
  defaultCountry = "US",
  placeholder,
  error,
  label,
  required = false,
  className = "",
}: PhoneInputProps) {
  const { language, isRTL } = useLanguage();
  const t = getTranslations(language);
  
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [localNumber, setLocalNumber] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Get countries with translated names, sorted by display name
  const countriesWithNames: CountryWithTranslatedName[] = useMemo(() => {
    return countries
      .map(country => ({
        ...country,
        displayName: t.countries[country.code as keyof typeof t.countries] || country.name,
      }))
      .sort((a, b) => a.displayName.localeCompare(b.displayName, language));
  }, [language, t.countries]);

  const [selectedCountry, setSelectedCountry] = useState<CountryWithTranslatedName>(() => {
    const found = countriesWithNames.find(c => c.code === defaultCountry);
    return found || countriesWithNames.find(c => c.code === "US")!;
  });

  // Update selected country name when language changes
  useEffect(() => {
    const updated = countriesWithNames.find(c => c.code === selectedCountry.code);
    if (updated) setSelectedCountry(updated);
  }, [language, countriesWithNames]);

  useEffect(() => {
    if (value && value.startsWith(selectedCountry.dialCode)) {
      setLocalNumber(value.slice(selectedCountry.dialCode.length));
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) searchInputRef.current.focus();
  }, [isOpen]);

  const filteredCountries = useMemo(() => {
    if (!searchQuery) return countriesWithNames;
    const query = searchQuery.toLowerCase();
    return countriesWithNames.filter(country => 
      country.displayName.toLowerCase().includes(query) ||
      country.name.toLowerCase().includes(query) ||
      country.dialCode.includes(query) ||
      country.code.toLowerCase().includes(query)
    );
  }, [countriesWithNames, searchQuery]);

  const cleanPhoneNumber = (phone: string): string => {
    let cleaned = phone.replace(/[^\d]/g, "");
    if (cleaned.startsWith("0")) cleaned = cleaned.slice(1);
    return cleaned;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const displayValue = e.target.value.replace(/[^\d\s-]/g, "");
    setLocalNumber(displayValue);
    const cleaned = cleanPhoneNumber(displayValue);
    onChange(selectedCountry.dialCode + cleaned, selectedCountry.code, cleaned, selectedCountry.dialCode);
  };

  const handleCountrySelect = (country: CountryWithTranslatedName) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setSearchQuery("");
    const cleaned = cleanPhoneNumber(localNumber);
    onChange(country.dialCode + cleaned, country.code, cleaned, country.dialCode);
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-text-dark mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      {/* 
        RTL FIX: Use dir="ltr" on the container to ensure phone input always flows LTR
        Phone numbers are international and should always be displayed LTR
      */}
      <div className="flex" dir="ltr">
        {/* Country Selector - Always on LEFT (phone numbers are LTR) */}
        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center gap-2 px-3 py-3 border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors rounded-l-xl border-r-0 ${
              error ? "border-red-500" : ""
            }`}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
          >
            <span className="text-xl">{selectedCountry.flag}</span>
            <span className="text-sm font-medium text-text-dark">{selectedCountry.dialCode}</span>
            <ChevronDown 
              size={16} 
              className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} 
            />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
              <div className="p-2 border-b border-gray-100">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="w-full py-2 pl-9 pr-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                    dir={isRTL ? "rtl" : "ltr"}
                  />
                </div>
              </div>

              <div className="max-h-60 overflow-y-auto">
                {filteredCountries.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-gray-500 text-center">
                    {t.noResults}
                  </div>
                ) : (
                  filteredCountries.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => handleCountrySelect(country)}
                      className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors text-left ${
                        selectedCountry.code === country.code ? "bg-primary/5" : ""
                      }`}
                    >
                      <span className="text-xl">{country.flag}</span>
                      <span className="flex-1 text-sm text-text-dark">{country.displayName}</span>
                      <span className="text-sm text-gray-500">{country.dialCode}</span>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Phone Number Input - Always on RIGHT (phone numbers are LTR) */}
        <input
          type="tel"
          value={localNumber}
          onChange={handlePhoneChange}
          placeholder={placeholder || t.phonePlaceholder}
          className={`flex-1 px-4 py-3 border rounded-r-xl focus:outline-none focus:ring-2 focus:ring-primary/50 ${
            error ? "border-red-500" : "border-gray-200"
          }`}
          dir="ltr"
        />
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

// Utility functions
export const formatPhoneForWhatsApp = (phone: string): string => phone.replace(/[^\d]/g, "");
export const formatPhoneForDisplay = (dialCode: string, localNumber: string): string => `${dialCode}-${localNumber}`;
export const validatePhoneNumber = (localNumber: string): boolean => localNumber.replace(/[^\d]/g, "").length >= 7;
