"use client";

import { useState } from "react";
import { searchCity, type GeoResult } from "@/lib/weather";

export default function SearchBar({
  onSelect,
}: {
  onSelect: (lat: number, lon: number, name: string) => void;
}) {
  const [query, setQuery] = useState("Marseille");
  const [results, setResults] = useState<GeoResult[]>([]);
  const [showSelect, setShowSelect] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const r = await searchCity(query);
      setResults(r);
      setShowSelect(r.length > 0);
      if (r.length > 0) {
        handleSelect(r[0]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (r: GeoResult) => {
    onSelect(r.latitude, r.longitude, r.name);
  };

  const handleGeolocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => onSelect(pos.coords.latitude, pos.coords.longitude, "Ma position"),
      () => {}
    );
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        <input
          className="flex-1 min-w-[200px] rounded-xl border px-3.5 py-2.5 text-base outline-none transition-colors"
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
          placeholder="Nom de la ville..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          className="cursor-pointer rounded-xl border-none px-5 py-2.5 text-base text-white transition-colors"
          style={{ background: "var(--primary)" }}
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "..." : "Rechercher"}
        </button>
        <button
          className="location-btn cursor-pointer rounded-xl border-none px-5 py-2.5 text-base transition-colors"
          style={{
            background: "var(--surface)",
            color: "var(--text)",
            border: "1px solid var(--border)",
          }}
          onClick={handleGeolocation}
        >
          📍 Ma position
        </button>
      </div>

      {showSelect && results.length > 1 && (
        <select
          className="mb-5 w-full rounded-xl border px-3.5 py-2.5 text-base outline-none"
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
          onChange={(e) => handleSelect(results[Number(e.target.value)])}
        >
          {results.map((r, i) => (
            <option key={i} value={i}>
              {r.name}
              {r.admin1 ? `, ${r.admin1}` : ""}
              {r.country ? `, ${r.country}` : ""}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
