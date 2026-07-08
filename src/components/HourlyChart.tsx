"use client";

import { useEffect, useRef } from "react";
import {
  Chart,
  LineController,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
  Legend,
  BarController,
} from "chart.js";
import type { HourlyWeather } from "@/lib/weather";

Chart.register(
  LineController,
  BarController,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
  Legend
);

function cssVar(name: string) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

export default function HourlyChart({
  hourly,
}: {
  hourly: HourlyWeather;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const hours = Math.min(48, hourly.time.length);
    const labels: string[] = [];
    const temps: number[] = [];
    const feels: number[] = [];
    const rain: number[] = [];

    for (let i = 0; i < hours; i++) {
      const date = new Date(hourly.time[i] + "Z");
      labels.push(
        date.toLocaleDateString("fr-FR", { weekday: "short" }) +
          " " +
          date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
      );
      temps.push(hourly.temperature_2m[i]);
      feels.push(hourly.apparent_temperature[i]);
      rain.push(hourly.precipitation_probability[i]);
    }

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Température",
            data: temps,
            borderColor: "#f59e0b",
            backgroundColor: "rgba(245,158,11,.1)",
            fill: true,
            tension: 0.3,
            pointRadius: 2,
            yAxisID: "y",
          },
          {
            label: "Ressenti",
            data: feels,
            borderColor: "#ef4444",
            borderDash: [5, 5],
            tension: 0.3,
            pointRadius: 2,
            yAxisID: "y",
          },
          {
            label: "Risque pluie",
            data: rain,
            type: "bar" as const,
            backgroundColor: "rgba(59,130,246,.25)",
            borderColor: "rgba(59,130,246,.5)",
            borderWidth: 1,
            borderRadius: 2,
            yAxisID: "y1",
            order: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: {
            labels: { color: cssVar("--chart-legend"), boxWidth: 12, padding: 12 },
          },
        },
        scales: {
          x: {
            ticks: { color: cssVar("--chart-tick"), maxTicksLimit: 12, font: { size: 10 } },
            grid: { color: cssVar("--chart-grid") },
          },
          y: {
            position: "left",
            title: { display: true, text: "°C", color: cssVar("--chart-title") },
            ticks: { color: cssVar("--chart-tick") },
            grid: { color: cssVar("--chart-grid") },
          },
          y1: {
            position: "right",
            title: { display: true, text: "%", color: cssVar("--chart-title") },
            min: 0,
            max: 100,
            ticks: { color: cssVar("--chart-tick") },
            grid: { display: false },
          },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, [hourly]);

  return (
    <div>
      <h2
        className="mb-3 mt-6 text-lg font-semibold"
        style={{ color: "var(--text)" }}
      >
        ⏳ Température & risque pluie (48h)
      </h2>
      <div
        className="mb-6 rounded-xl border p-4"
        style={{
          background: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        <canvas ref={canvasRef} style={{ width: "100%", maxHeight: 300 }} />
      </div>
    </div>
  );
}
