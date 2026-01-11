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
 * Complete list of all countries with ISO 3166-1 alpha-2 codes
 */
export const countries: CountryData[] = [
  // A
  { code: "AD", dialCode: "+376", flag: "🇦🇩", name: "Andorra" },
  { code: "AE", dialCode: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "AF", dialCode: "+93", flag: "🇦🇫", name: "Afghanistan" },
  { code: "AG", dialCode: "+1268", flag: "🇦🇬", name: "Antigua and Barbuda" },
  { code: "AL", dialCode: "+355", flag: "🇦🇱", name: "Albania" },
  { code: "AM", dialCode: "+374", flag: "🇦🇲", name: "Armenia" },
  { code: "AO", dialCode: "+244", flag: "🇦🇴", name: "Angola" },
  { code: "AR", dialCode: "+54", flag: "🇦🇷", name: "Argentina" },
  { code: "AT", dialCode: "+43", flag: "🇦🇹", name: "Austria" },
  { code: "AU", dialCode: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "AZ", dialCode: "+994", flag: "🇦🇿", name: "Azerbaijan" },
  // B
  { code: "BA", dialCode: "+387", flag: "🇧🇦", name: "Bosnia and Herzegovina" },
  { code: "BB", dialCode: "+1246", flag: "🇧🇧", name: "Barbados" },
  { code: "BD", dialCode: "+880", flag: "🇧🇩", name: "Bangladesh" },
  { code: "BE", dialCode: "+32", flag: "🇧🇪", name: "Belgium" },
  { code: "BF", dialCode: "+226", flag: "🇧🇫", name: "Burkina Faso" },
  { code: "BG", dialCode: "+359", flag: "🇧🇬", name: "Bulgaria" },
  { code: "BH", dialCode: "+973", flag: "🇧🇭", name: "Bahrain" },
  { code: "BI", dialCode: "+257", flag: "🇧🇮", name: "Burundi" },
  { code: "BJ", dialCode: "+229", flag: "🇧🇯", name: "Benin" },
  { code: "BN", dialCode: "+673", flag: "🇧🇳", name: "Brunei" },
  { code: "BO", dialCode: "+591", flag: "🇧🇴", name: "Bolivia" },
  { code: "BR", dialCode: "+55", flag: "🇧🇷", name: "Brazil" },
  { code: "BS", dialCode: "+1242", flag: "🇧🇸", name: "Bahamas" },
  { code: "BT", dialCode: "+975", flag: "🇧🇹", name: "Bhutan" },
  { code: "BW", dialCode: "+267", flag: "🇧🇼", name: "Botswana" },
  { code: "BY", dialCode: "+375", flag: "🇧🇾", name: "Belarus" },
  { code: "BZ", dialCode: "+501", flag: "🇧🇿", name: "Belize" },
  // C
  { code: "CA", dialCode: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "CD", dialCode: "+243", flag: "🇨🇩", name: "DR Congo" },
  { code: "CF", dialCode: "+236", flag: "🇨🇫", name: "Central African Republic" },
  { code: "CG", dialCode: "+242", flag: "🇨🇬", name: "Congo" },
  { code: "CH", dialCode: "+41", flag: "🇨🇭", name: "Switzerland" },
  { code: "CI", dialCode: "+225", flag: "🇨🇮", name: "Ivory Coast" },
  { code: "CL", dialCode: "+56", flag: "🇨🇱", name: "Chile" },
  { code: "CM", dialCode: "+237", flag: "🇨🇲", name: "Cameroon" },
  { code: "CN", dialCode: "+86", flag: "🇨🇳", name: "China" },
  { code: "CO", dialCode: "+57", flag: "🇨🇴", name: "Colombia" },
  { code: "CR", dialCode: "+506", flag: "🇨🇷", name: "Costa Rica" },
  { code: "CU", dialCode: "+53", flag: "🇨🇺", name: "Cuba" },
  { code: "CV", dialCode: "+238", flag: "🇨🇻", name: "Cape Verde" },
  { code: "CY", dialCode: "+357", flag: "🇨🇾", name: "Cyprus" },
  { code: "CZ", dialCode: "+420", flag: "🇨🇿", name: "Czech Republic" },
  // D
  { code: "DE", dialCode: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "DJ", dialCode: "+253", flag: "🇩🇯", name: "Djibouti" },
  { code: "DK", dialCode: "+45", flag: "🇩🇰", name: "Denmark" },
  { code: "DM", dialCode: "+1767", flag: "🇩🇲", name: "Dominica" },
  { code: "DO", dialCode: "+1809", flag: "🇩🇴", name: "Dominican Republic" },
  { code: "DZ", dialCode: "+213", flag: "🇩🇿", name: "Algeria" },
  // E
  { code: "EC", dialCode: "+593", flag: "🇪🇨", name: "Ecuador" },
  { code: "EE", dialCode: "+372", flag: "🇪🇪", name: "Estonia" },
  { code: "EG", dialCode: "+20", flag: "🇪🇬", name: "Egypt" },
  { code: "ER", dialCode: "+291", flag: "🇪🇷", name: "Eritrea" },
  { code: "ES", dialCode: "+34", flag: "🇪🇸", name: "Spain" },
  { code: "ET", dialCode: "+251", flag: "🇪🇹", name: "Ethiopia" },
  // F
  { code: "FI", dialCode: "+358", flag: "🇫🇮", name: "Finland" },
  { code: "FJ", dialCode: "+679", flag: "🇫🇯", name: "Fiji" },
  { code: "FR", dialCode: "+33", flag: "🇫🇷", name: "France" },
  // G
  { code: "GA", dialCode: "+241", flag: "🇬🇦", name: "Gabon" },
  { code: "GB", dialCode: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "GD", dialCode: "+1473", flag: "🇬🇩", name: "Grenada" },
  { code: "GE", dialCode: "+995", flag: "🇬🇪", name: "Georgia" },
  { code: "GH", dialCode: "+233", flag: "🇬🇭", name: "Ghana" },
  { code: "GM", dialCode: "+220", flag: "🇬🇲", name: "Gambia" },
  { code: "GN", dialCode: "+224", flag: "🇬🇳", name: "Guinea" },
  { code: "GQ", dialCode: "+240", flag: "🇬🇶", name: "Equatorial Guinea" },
  { code: "GR", dialCode: "+30", flag: "🇬🇷", name: "Greece" },
  { code: "GT", dialCode: "+502", flag: "🇬🇹", name: "Guatemala" },
  { code: "GW", dialCode: "+245", flag: "🇬🇼", name: "Guinea-Bissau" },
  { code: "GY", dialCode: "+592", flag: "🇬🇾", name: "Guyana" },
  // H
  { code: "HK", dialCode: "+852", flag: "🇭🇰", name: "Hong Kong" },
  { code: "HN", dialCode: "+504", flag: "🇭🇳", name: "Honduras" },
  { code: "HR", dialCode: "+385", flag: "🇭🇷", name: "Croatia" },
  { code: "HT", dialCode: "+509", flag: "🇭🇹", name: "Haiti" },
  { code: "HU", dialCode: "+36", flag: "🇭🇺", name: "Hungary" },
  // I
  { code: "ID", dialCode: "+62", flag: "🇮🇩", name: "Indonesia" },
  { code: "IE", dialCode: "+353", flag: "🇮🇪", name: "Ireland" },
  { code: "IL", dialCode: "+972", flag: "🇮🇱", name: "Israel" },
  { code: "IN", dialCode: "+91", flag: "🇮🇳", name: "India" },
  { code: "IQ", dialCode: "+964", flag: "🇮🇶", name: "Iraq" },
  { code: "IR", dialCode: "+98", flag: "🇮🇷", name: "Iran" },
  { code: "IS", dialCode: "+354", flag: "🇮🇸", name: "Iceland" },
  { code: "IT", dialCode: "+39", flag: "🇮🇹", name: "Italy" },
  // J
  { code: "JM", dialCode: "+1876", flag: "🇯🇲", name: "Jamaica" },
  { code: "JO", dialCode: "+962", flag: "🇯🇴", name: "Jordan" },
  { code: "JP", dialCode: "+81", flag: "🇯🇵", name: "Japan" },
  // K
  { code: "KE", dialCode: "+254", flag: "🇰🇪", name: "Kenya" },
  { code: "KG", dialCode: "+996", flag: "🇰🇬", name: "Kyrgyzstan" },
  { code: "KH", dialCode: "+855", flag: "🇰🇭", name: "Cambodia" },
  { code: "KM", dialCode: "+269", flag: "🇰🇲", name: "Comoros" },
  { code: "KN", dialCode: "+1869", flag: "🇰🇳", name: "Saint Kitts and Nevis" },
  { code: "KP", dialCode: "+850", flag: "🇰🇵", name: "North Korea" },
  { code: "KR", dialCode: "+82", flag: "🇰🇷", name: "South Korea" },
  { code: "KW", dialCode: "+965", flag: "🇰🇼", name: "Kuwait" },
  { code: "KZ", dialCode: "+7", flag: "🇰🇿", name: "Kazakhstan" },
  // L
  { code: "LA", dialCode: "+856", flag: "🇱🇦", name: "Laos" },
  { code: "LB", dialCode: "+961", flag: "🇱🇧", name: "Lebanon" },
  { code: "LC", dialCode: "+1758", flag: "🇱🇨", name: "Saint Lucia" },
  { code: "LI", dialCode: "+423", flag: "🇱🇮", name: "Liechtenstein" },
  { code: "LK", dialCode: "+94", flag: "🇱🇰", name: "Sri Lanka" },
  { code: "LR", dialCode: "+231", flag: "🇱🇷", name: "Liberia" },
  { code: "LS", dialCode: "+266", flag: "🇱🇸", name: "Lesotho" },
  { code: "LT", dialCode: "+370", flag: "🇱🇹", name: "Lithuania" },
  { code: "LU", dialCode: "+352", flag: "🇱🇺", name: "Luxembourg" },
  { code: "LV", dialCode: "+371", flag: "🇱🇻", name: "Latvia" },
  { code: "LY", dialCode: "+218", flag: "🇱🇾", name: "Libya" },
  // M
  { code: "MA", dialCode: "+212", flag: "🇲🇦", name: "Morocco" },
  { code: "MC", dialCode: "+377", flag: "🇲🇨", name: "Monaco" },
  { code: "MD", dialCode: "+373", flag: "🇲🇩", name: "Moldova" },
  { code: "ME", dialCode: "+382", flag: "🇲🇪", name: "Montenegro" },
  { code: "MG", dialCode: "+261", flag: "🇲🇬", name: "Madagascar" },
  { code: "MK", dialCode: "+389", flag: "🇲🇰", name: "North Macedonia" },
  { code: "ML", dialCode: "+223", flag: "🇲🇱", name: "Mali" },
  { code: "MM", dialCode: "+95", flag: "🇲🇲", name: "Myanmar" },
  { code: "MN", dialCode: "+976", flag: "🇲🇳", name: "Mongolia" },
  { code: "MO", dialCode: "+853", flag: "🇲🇴", name: "Macau" },
  { code: "MR", dialCode: "+222", flag: "🇲🇷", name: "Mauritania" },
  { code: "MT", dialCode: "+356", flag: "🇲🇹", name: "Malta" },
  { code: "MU", dialCode: "+230", flag: "🇲🇺", name: "Mauritius" },
  { code: "MV", dialCode: "+960", flag: "🇲🇻", name: "Maldives" },
  { code: "MW", dialCode: "+265", flag: "🇲🇼", name: "Malawi" },
  { code: "MX", dialCode: "+52", flag: "🇲🇽", name: "Mexico" },
  { code: "MY", dialCode: "+60", flag: "🇲🇾", name: "Malaysia" },
  { code: "MZ", dialCode: "+258", flag: "🇲🇿", name: "Mozambique" },
  // N
  { code: "NA", dialCode: "+264", flag: "🇳🇦", name: "Namibia" },
  { code: "NE", dialCode: "+227", flag: "🇳🇪", name: "Niger" },
  { code: "NG", dialCode: "+234", flag: "🇳🇬", name: "Nigeria" },
  { code: "NI", dialCode: "+505", flag: "🇳🇮", name: "Nicaragua" },
  { code: "NL", dialCode: "+31", flag: "🇳🇱", name: "Netherlands" },
  { code: "NO", dialCode: "+47", flag: "🇳🇴", name: "Norway" },
  { code: "NP", dialCode: "+977", flag: "🇳🇵", name: "Nepal" },
  { code: "NZ", dialCode: "+64", flag: "🇳🇿", name: "New Zealand" },
  // O
  { code: "OM", dialCode: "+968", flag: "🇴🇲", name: "Oman" },
  // P
  { code: "PA", dialCode: "+507", flag: "🇵🇦", name: "Panama" },
  { code: "PE", dialCode: "+51", flag: "🇵🇪", name: "Peru" },
  { code: "PG", dialCode: "+675", flag: "🇵🇬", name: "Papua New Guinea" },
  { code: "PH", dialCode: "+63", flag: "🇵🇭", name: "Philippines" },
  { code: "PK", dialCode: "+92", flag: "🇵🇰", name: "Pakistan" },
  { code: "PL", dialCode: "+48", flag: "🇵🇱", name: "Poland" },
  { code: "PR", dialCode: "+1787", flag: "🇵🇷", name: "Puerto Rico" },
  { code: "PS", dialCode: "+970", flag: "🇵🇸", name: "Palestine" },
  { code: "PT", dialCode: "+351", flag: "🇵🇹", name: "Portugal" },
  { code: "PY", dialCode: "+595", flag: "🇵🇾", name: "Paraguay" },
  // Q
  { code: "QA", dialCode: "+974", flag: "🇶🇦", name: "Qatar" },
  // R
  { code: "RO", dialCode: "+40", flag: "🇷🇴", name: "Romania" },
  { code: "RS", dialCode: "+381", flag: "🇷🇸", name: "Serbia" },
  { code: "RU", dialCode: "+7", flag: "🇷🇺", name: "Russia" },
  { code: "RW", dialCode: "+250", flag: "🇷🇼", name: "Rwanda" },
  // S
  { code: "SA", dialCode: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "SB", dialCode: "+677", flag: "🇸🇧", name: "Solomon Islands" },
  { code: "SC", dialCode: "+248", flag: "🇸🇨", name: "Seychelles" },
  { code: "SD", dialCode: "+249", flag: "🇸🇩", name: "Sudan" },
  { code: "SE", dialCode: "+46", flag: "🇸🇪", name: "Sweden" },
  { code: "SG", dialCode: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "SI", dialCode: "+386", flag: "🇸🇮", name: "Slovenia" },
  { code: "SK", dialCode: "+421", flag: "🇸🇰", name: "Slovakia" },
  { code: "SL", dialCode: "+232", flag: "🇸🇱", name: "Sierra Leone" },
  { code: "SM", dialCode: "+378", flag: "🇸🇲", name: "San Marino" },
  { code: "SN", dialCode: "+221", flag: "🇸🇳", name: "Senegal" },
  { code: "SO", dialCode: "+252", flag: "🇸🇴", name: "Somalia" },
  { code: "SR", dialCode: "+597", flag: "🇸🇷", name: "Suriname" },
  { code: "SS", dialCode: "+211", flag: "🇸🇸", name: "South Sudan" },
  { code: "SV", dialCode: "+503", flag: "🇸🇻", name: "El Salvador" },
  { code: "SY", dialCode: "+963", flag: "🇸🇾", name: "Syria" },
  { code: "SZ", dialCode: "+268", flag: "🇸🇿", name: "Eswatini" },
  // T
  { code: "TD", dialCode: "+235", flag: "🇹🇩", name: "Chad" },
  { code: "TG", dialCode: "+228", flag: "🇹🇬", name: "Togo" },
  { code: "TH", dialCode: "+66", flag: "🇹🇭", name: "Thailand" },
  { code: "TJ", dialCode: "+992", flag: "🇹🇯", name: "Tajikistan" },
  { code: "TL", dialCode: "+670", flag: "🇹🇱", name: "Timor-Leste" },
  { code: "TM", dialCode: "+993", flag: "🇹🇲", name: "Turkmenistan" },
  { code: "TN", dialCode: "+216", flag: "🇹🇳", name: "Tunisia" },
  { code: "TO", dialCode: "+676", flag: "🇹🇴", name: "Tonga" },
  { code: "TR", dialCode: "+90", flag: "🇹🇷", name: "Turkey" },
  { code: "TT", dialCode: "+1868", flag: "🇹🇹", name: "Trinidad and Tobago" },
  { code: "TW", dialCode: "+886", flag: "🇹🇼", name: "Taiwan" },
  { code: "TZ", dialCode: "+255", flag: "🇹🇿", name: "Tanzania" },
  // U
  { code: "UA", dialCode: "+380", flag: "🇺🇦", name: "Ukraine" },
  { code: "UG", dialCode: "+256", flag: "🇺🇬", name: "Uganda" },
  { code: "US", dialCode: "+1", flag: "🇺🇸", name: "United States" },
  { code: "UY", dialCode: "+598", flag: "🇺🇾", name: "Uruguay" },
  { code: "UZ", dialCode: "+998", flag: "🇺🇿", name: "Uzbekistan" },
  // V
  { code: "VA", dialCode: "+379", flag: "🇻🇦", name: "Vatican City" },
  { code: "VC", dialCode: "+1784", flag: "🇻🇨", name: "Saint Vincent and the Grenadines" },
  { code: "VE", dialCode: "+58", flag: "🇻🇪", name: "Venezuela" },
  { code: "VN", dialCode: "+84", flag: "🇻🇳", name: "Vietnam" },
  { code: "VU", dialCode: "+678", flag: "🇻🇺", name: "Vanuatu" },
  // W
  { code: "WS", dialCode: "+685", flag: "🇼🇸", name: "Samoa" },
  // Y
  { code: "YE", dialCode: "+967", flag: "🇾🇪", name: "Yemen" },
  // Z
  { code: "ZA", dialCode: "+27", flag: "🇿🇦", name: "South Africa" },
  { code: "ZM", dialCode: "+260", flag: "🇿🇲", name: "Zambia" },
  { code: "ZW", dialCode: "+263", flag: "🇿🇼", name: "Zimbabwe" },
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
  const txt = getTranslations(language);
  
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
        displayName: txt.countries[country.code as keyof typeof txt.countries] || country.name,
      }))
      .sort((a, b) => a.displayName.localeCompare(b.displayName, language));
  }, [language, txt.countries]);

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
                    placeholder={txt.searchPlaceholder}
                    className="w-full py-2 pl-9 pr-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                    dir={isRTL ? "rtl" : "ltr"}
                  />
                </div>
              </div>

              <div className="max-h-60 overflow-y-auto">
                {filteredCountries.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-gray-500 text-center">
                    {txt.noResults}
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
          placeholder={placeholder || txt.phonePlaceholder}
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

// Utility functions for phone formatting
export const formatPhoneForWhatsApp = (phone: string): string => phone.replace(/[^\d]/g, "");
export const formatPhoneForDisplay = (dialCode: string, localNumber: string): string => `${dialCode}-${localNumber}`;
// Note: validatePhoneNumber is now in src/utils/validation.ts
