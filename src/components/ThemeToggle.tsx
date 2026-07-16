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
          className="absolute right-0 top-full z-50 mt-2 grid w-56 grid-cols-4 gap-2 rounded-xl border p-3 shadow-2xl"
          style={{
            background: "var(--panel-bg)",
            borderColor: "var(--border)",
          }}
        >
          {THEMES.map((t) => (
            <button
              key={t}
              className="flex cursor-pointer flex-col items-center gap-0.5 rounded-lg border px-1 py-2 text-sm transition-colors hover:opacity-80"
              style={{
                background: t === theme ? "var(--metric-bg)" : "transparent",
                borderColor: t === theme ? "var(--primary)" : "var(--border)",
                color: "var(--text)",
              }}
              onClick={() => select(t)}
              title={THEME_CONFIG[t].label}
            >
              <span className="text-lg">{THEME_CONFIG[t].icon}</span>
              <span
                className="text-center text-[0.55rem] leading-tight"
                style={{
                  color: t === theme ? "var(--primary)" : "var(--text-muted)",
                  fontWeight: t === theme ? 600 : 400,
                }}
              >
                {THEME_CONFIG[t].label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
