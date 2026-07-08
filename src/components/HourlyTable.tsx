"use client";

import type { HourlyWeather } from "@/lib/weather";

export default function HourlyTable({
  hourly,
}: {
  hourly: HourlyWeather;
}) {
  const hours = Math.min(48, hourly.time.length);

  return (
    <details
      className="mb-6 rounded-xl border overflow-hidden"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      <summary
        className="cursor-pointer px-4 py-3 font-semibold select-none"
        style={{ color: "var(--text-muted)" }}
      >
        📊 Voir le tableau horaire complet
      </summary>
      <div
        className="overflow-auto"
        style={{ maxHeight: 400 }}
      >
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th
                className="sticky top-0 whitespace-nowrap px-2.5 py-2 text-left"
                style={{ background: "var(--th-bg)", color: "var(--text-muted)" }}
              >
                Heure
              </th>
              <th
                className="sticky top-0 whitespace-nowrap px-2.5 py-2 text-left"
                style={{ background: "var(--th-bg)", color: "var(--text-muted)" }}
              >
                Température
              </th>
              <th
                className="sticky top-0 whitespace-nowrap px-2.5 py-2 text-left"
                style={{ background: "var(--th-bg)", color: "var(--text-muted)" }}
              >
                Ressenti
              </th>
              <th
                className="sticky top-0 whitespace-nowrap px-2.5 py-2 text-left"
                style={{ background: "var(--th-bg)", color: "var(--text-muted)" }}
              >
                Pluie (mm)
              </th>
              <th
                className="sticky top-0 whitespace-nowrap px-2.5 py-2 text-left"
                style={{ background: "var(--th-bg)", color: "var(--text-muted)" }}
              >
                Risque (%)
              </th>
              <th
                className="sticky top-0 whitespace-nowrap px-2.5 py-2 text-left"
                style={{ background: "var(--th-bg)", color: "var(--text-muted)" }}
              >
                Vent (km/h)
              </th>
              <th
                className="sticky top-0 whitespace-nowrap px-2.5 py-2 text-left"
                style={{ background: "var(--th-bg)", color: "var(--text-muted)" }}
              >
                Humidité (%)
              </th>
              <th
                className="sticky top-0 whitespace-nowrap px-2.5 py-2 text-left"
                style={{ background: "var(--th-bg)", color: "var(--text-muted)" }}
              >
                UV
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: hours }, (_, i) => {
              const date = new Date(hourly.time[i] + "Z");
              const timeStr =
                date.toLocaleDateString("fr-FR", { weekday: "short" }) +
                " " +
                date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
              return (
                <tr key={i}>
                  <td className="whitespace-nowrap border-t px-2.5 py-1.5" style={{ borderColor: "var(--border)" }}>
                    {timeStr}
                  </td>
                  <td className="whitespace-nowrap border-t px-2.5 py-1.5" style={{ borderColor: "var(--border)" }}>
                    {hourly.temperature_2m[i].toFixed(1)}°C
                  </td>
                  <td className="whitespace-nowrap border-t px-2.5 py-1.5" style={{ borderColor: "var(--border)" }}>
                    {hourly.apparent_temperature[i].toFixed(1)}°C
                  </td>
                  <td className="whitespace-nowrap border-t px-2.5 py-1.5" style={{ borderColor: "var(--border)" }}>
                    {(hourly.precipitation[i] ?? 0).toFixed(1)}
                  </td>
                  <td className="whitespace-nowrap border-t px-2.5 py-1.5" style={{ borderColor: "var(--border)" }}>
                    {hourly.precipitation_probability[i]}%
                  </td>
                  <td className="whitespace-nowrap border-t px-2.5 py-1.5" style={{ borderColor: "var(--border)" }}>
                    {hourly.wind_speed_10m[i].toFixed(1)}
                  </td>
                  <td className="whitespace-nowrap border-t px-2.5 py-1.5" style={{ borderColor: "var(--border)" }}>
                    {hourly.relative_humidity_2m[i]}%
                  </td>
                  <td className="whitespace-nowrap border-t px-2.5 py-1.5" style={{ borderColor: "var(--border)" }}>
                    {hourly.uv_index[i].toFixed(1)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </details>
  );
}
