"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchWeather, type ForecastData } from "@/lib/weather";
import { type Theme, THEMES } from "@/lib/constants";
import ThemeToggle from "./ThemeToggle";
import SearchBar from "./SearchBar";
import CurrentWeather from "./CurrentWeather";
import WeatherTip from "./WeatherTip";
import DailyForecast from "./DailyForecast";
import HourlyChart from "./HourlyChart";
import HourlyTable from "./HourlyTable";

export default function WeatherDashboard() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [data, setData] = useState<ForecastData | null>(null);
  const [city, setCity] = useState("Marseille");
  const [lat, setLat] = useState(43.3);
  const [lon, setLon] = useState(5.37);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async (latitude: number, longitude: number) => {
    setLoading(true);
    setError("");
    try {
      const d = await fetchWeather(latitude, longitude);
      setData(d);
    } catch {
      setError("Erreur API météo");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved && THEMES.includes(saved)) {
      setTheme(saved);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    load(lat, lon);
  }, [lat, lon, load]);

  const handleLocation = (latitude: number, longitude: number, name: string) => {
    setLat(latitude);
    setLon(longitude);
    setCity(name);
  };

  const cycleTheme = (t: Theme) => setTheme(t);

  return (
    <div className="container mx-auto max-w-[900px] px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold" style={{ color: "var(--text)" }}>
          🌤 Météo Dashboard
        </h1>
        <ThemeToggle theme={theme} onChange={cycleTheme} />
      </div>

      <SearchBar onSelect={handleLocation} />

      {loading && (
        <div className="py-10 text-center" style={{ color: "var(--text-dim)" }}>
          <div
            className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4"
            style={{
              borderColor: "var(--border)",
              borderTopColor: "var(--primary)",
            }}
          />
          Chargement...
        </div>
      )}

      {error && (
        <div className="py-5 text-center" style={{ color: "var(--error)" }}>
          {error}
        </div>
      )}

      {data && !loading && (
        <>
          <CurrentWeather data={data.current} name={city} />
          <WeatherTip daily={data.daily} />
          <DailyForecast daily={data.daily} />
          <HourlyChart hourly={data.hourly} />
          <HourlyTable hourly={data.hourly} />
        </>
      )}

      <footer
        className="mt-8 text-center text-sm"
        style={{ color: "var(--footer)" }}
      >
        Données via{" "}
        <a
          href="https://open-meteo.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--footer-link)" }}
        >
          Open-Meteo
        </a>
      </footer>
    </div>
  );
}
