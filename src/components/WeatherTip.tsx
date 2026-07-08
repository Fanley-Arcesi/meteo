"use client";

import type { DailyWeather } from "@/lib/weather";

export default function WeatherTip({ daily }: { daily: DailyWeather }) {
  const next = 1;
  const rain = daily.precipitation_sum[next];
  const rainProb = daily.precipitation_probability_max[next];
  const wc = daily.weather_code[next];
  const tMax = daily.temperature_2m_max[next];
  const wind = daily.wind_speed_10m_max[next];

  let icon = "✅";
  let text = "Bonne météo demain, profite de ta journée";

  if (wc >= 71 && wc <= 77) {
    icon = "❄️"; text = "Neige prévue demain, prudence sur les routes";
  } else if (wc >= 95) {
    icon = "⛈️"; text = "Orages annoncés demain, reste à l'abri si possible";
  } else if (rain > 5) {
    icon = "☔"; text = "Pluie abondante demain, n'oublie pas ton parapluie";
  } else if (rain > 0) {
    icon = "🌂"; text = "Quelques gouttes demain, prévois un parapluie au cas où";
  } else if (rainProb >= 60) {
    icon = "☂️"; text = "Risque de pluie demain, mieux vaut prendre un parapluie";
  } else if (tMax >= 35) {
    icon = "🥵"; text = "Grosse chaleur demain, reste hydraté et évite le soleil aux heures chaudes";
  } else if (tMax >= 30) {
    icon = "🧴"; text = "Forte chaleur demain, mets de la crème solaire et bois de l'eau";
  } else if (tMax <= 0) {
    icon = "🧣"; text = "Gel prévu demain, couvre-toi bien et attention aux surfaces glissantes";
  } else if (tMax <= 5) {
    icon = "🧥"; text = "Température fraîche demain, prends un manteau";
  } else if (wind >= 60) {
    icon = "🌬️"; text = "Vent violent demain, attention aux objets non fixés";
  } else if (wind >= 40) {
    icon = "💨"; text = "Vent assez fort demain, prudence si tu fais du vélo";
  }

  return (
    <div
      className="mb-5 flex items-center gap-2.5 rounded-xl border px-4 py-3.5 text-base"
      style={{
        background: "linear-gradient(135deg, var(--grad-start), var(--grad-end))",
        borderColor: "var(--primary)",
      }}
    >
      <span className="text-2xl">{icon}</span>
      <span>{text}</span>
    </div>
  );
}
