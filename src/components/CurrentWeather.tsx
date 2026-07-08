"use client";

import { WMO_CODES } from "@/lib/constants";
import type { CurrentWeather as CurrentWeatherType } from "@/lib/weather";

function weatherIcon(code: number) {
  if (code === 0) return "☀️";
  if (code <= 2) return "⛅";
  if (code === 3) return "☁️";
  if (code >= 45 && code <= 48) return "🌫";
  if (code >= 51 && code <= 57) return "🌦";
  if (code >= 61 && code <= 67) return "🌧";
  if (code >= 71 && code <= 77) return "❄️";
  if (code >= 80 && code <= 86) return "🌦";
  if (code >= 95) return "⛈";
  return "🌤";
}

export default function CurrentWeather({
  data,
  name,
}: {
  data: CurrentWeatherType;
  name: string;
}) {
  const wc = data.weather_code ?? 0;
  const Metric = ({
    label,
    value,
  }: {
    label: string;
    value: string;
  }) => (
    <div
      className="rounded-xl p-3.5 text-center"
      style={{ background: "var(--metric-bg)" }}
    >
      <div
        className="text-xs font-semibold uppercase tracking-wide"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </div>
      <div className="mt-1 text-2xl font-bold">{value}</div>
    </div>
  );

  return (
    <div
      className="mb-6 grid gap-4 rounded-2xl border p-6"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
        background: "linear-gradient(135deg, var(--grad-start), var(--grad-end))",
        borderColor: "var(--border)",
      }}
    >
      <div
        className="col-span-full mb-1 text-xl font-semibold"
        style={{ color: "var(--text)" }}
      >
        {weatherIcon(wc)} {name}
      </div>
      <Metric label="Température" value={`${data.temperature_2m.toFixed(1)}°C`} />
      <Metric label="Ressenti" value={`${data.apparent_temperature.toFixed(1)}°C`} />
      <Metric label="Humidité" value={`${data.relative_humidity_2m}%`} />
      <Metric label="Vent" value={`${data.wind_speed_10m.toFixed(1)} km/h`} />
      <Metric label="Précipitations" value={`${data.precipitation ?? 0} mm`} />
      <Metric label="Pression" value={`${data.pressure_msl.toFixed(0)} hPa`} />
      <div
        className="col-span-full rounded-xl px-4 py-2 text-center text-lg"
        style={{ background: "var(--badge-bg)" }}
      >
        {WMO_CODES[wc] ?? `Code ${wc}`}
      </div>
    </div>
  );
}
