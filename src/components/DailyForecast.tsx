"use client";

import type { DailyWeather } from "@/lib/weather";

export default function DailyForecast({ daily }: { daily: DailyWeather }) {
  return (
    <div>
      <h2
        className="mb-3 mt-6 text-lg font-semibold"
        style={{ color: "var(--text)" }}
      >
        📅 Prévisions sur 7 jours
      </h2>
      <div className="mb-6 grid gap-2" style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))"
      }}>
        {daily.time.map((dateStr, i) => {
          const date = new Date(dateStr + "T12:00:00");
          const day = date.toLocaleDateString("fr-FR", {
            weekday: "short",
            day: "numeric",
            month: "short",
          });
          return (
            <div
              key={i}
              className="rounded-xl border px-3 py-2.5 text-center"
              style={{
                background: "var(--surface)",
                borderColor: "var(--border)",
              }}
            >
              <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                {day}
              </div>
              <div className="my-1 text-lg font-semibold">
                {daily.temperature_2m_max[i].toFixed(0)}°{" "}
                <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>
                  {daily.temperature_2m_min[i].toFixed(0)}°
                </span>
              </div>
              <div className="text-xs" style={{ color: "var(--text-dim)" }}>
                💧 {daily.precipitation_sum[i].toFixed(1)} mm
              </div>
              <div className="text-xs" style={{ color: "var(--text-dim)" }}>
                💨 {daily.wind_speed_10m_max[i].toFixed(0)} km/h
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
