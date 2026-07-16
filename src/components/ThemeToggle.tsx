"use client";

import { useState, useRef, useEffect } from "react";
import { THEMES, THEME_CONFIG, type Theme } from "@/lib/constants";

export default function ThemeToggle({
  theme,
  onChange,
}: {
  theme: Theme;
  onChange: (t: Theme) => void;
}) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        open &&
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const select = (t: Theme) => {
    onChange(t);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        ref={btnRef}
        className="cursor-pointer rounded-xl border px-3 py-2 text-lg leading-none transition-colors"
        style={{
          background: "var(--surface)",
          borderColor: "var(--border)",
          color: "var(--text)",
        }}
        onClick={() => setOpen(!open)}
        title="Changer le thème"
      >
        {THEME_CONFIG[theme].icon}
      </button>

      {open && (
        <div
          ref={panelRef}
          className="absolute right-0 top-full z-50 mt-2 flex gap-1 rounded-xl border p-1.5 shadow-lg"
          style={{
            background: "var(--surface)",
            borderColor: "var(--border)",
          }}
        >
          {THEMES.map((t) => (
            <button
              key={t}
              className={`cursor-pointer rounded-lg px-3 py-2 text-lg leading-none transition-colors ${
                t === theme ? "ring-2 ring-offset-1" : ""
              }`}
              style={{
                background: t === theme ? "var(--metric-bg)" : "transparent",
                color: "var(--text)",
              }}
              onClick={() => select(t)}
              title={THEME_CONFIG[t].label}
            >
              {THEME_CONFIG[t].icon}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
