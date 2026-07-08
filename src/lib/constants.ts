export const WMO_CODES: Record<number, string> = {
  0: "☀️ Ciel dégagé", 1: "🌤 Partiellement nuageux", 2: "⛅ Nuageux",
  3: "☁️ Couvert", 45: "🌫 Brouillard", 48: "🌫 Brouillard givrant",
  51: "🌦 Bruine légère", 53: "🌦 Bruine modérée", 55: "🌦 Bruine dense",
  56: "🌧 Bruine verglaçante légère", 57: "🌧 Bruine verglaçante dense",
  61: "🌧 Pluie légère", 63: "🌧 Pluie modérée", 65: "🌧 Pluie forte",
  66: "🌨 Pluie verglaçante légère", 67: "🌨 Pluie verglaçante forte",
  71: "❄️ Neige légère", 73: "❄️ Neige modérée", 75: "❄️ Neige forte",
  77: "🧊 Grésil", 80: "🌦 Averses légères", 81: "🌦 Averses modérées",
  82: "🌦 Averses violentes", 85: "❄️ Averses de neige légères",
  86: "❄️ Averses de neige fortes", 95: "⛈ Orage",
  96: "⛈ Orage avec grêle légère", 99: "⛈ Orage avec grêle forte",
};

export const THEMES = ["dark", "light", "rainbow", "pink"] as const;
export type Theme = (typeof THEMES)[number];

export const THEME_CONFIG: Record<Theme, { icon: string; label: string }> = {
  dark: { icon: "🌙", label: "Mode sombre" },
  light: { icon: "☀️", label: "Mode clair" },
  rainbow: { icon: "🌈", label: "Arc-en-ciel" },
  pink: { icon: "🌸", label: "Mode rose" },
};
