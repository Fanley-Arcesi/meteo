"use client";

import { THEMES, THEME_CONFIG, type Theme } from "@/lib/constants";

export default function ThemeToggle({
  theme,
  onChange,
}: {
  theme: Theme;
  onChange: (t: Theme) => void;
}) {
  const idx = THEMES.indexOf(theme);
  const next = THEMES[(idx + 1) % THEMES.length];

  return (
    <button
      className="cursor-pointer rounded-xl border px-3 py-2 text-lg leading-none transition-colors"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
        color: "var(--text)",
      }}
      onClick={() => onChange(next)}
      title={THEME_CONFIG[next].label}
    >
      {THEME_CONFIG[theme].icon}
    </button>
  );
}
