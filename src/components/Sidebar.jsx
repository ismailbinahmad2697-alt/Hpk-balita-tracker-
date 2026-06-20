import React from "react";
import { Home, ClipboardList, CheckCircle2, TrendingUp, X } from "lucide-react";

export default function Sidebar({ active, onNavigate, isOpen, onClose }) {
  const items = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "log", label: "Log Harian", icon: ClipboardList },
    { id: "milestone", label: "Milestone", icon: CheckCircle2 },
    { id: "grafik", label: "Grafik Pertumbuhan", icon: TrendingUp },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-white border-r border-stone-200 z-40
          transform transition-transform duration-200 md:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-5 flex items-center justify-between md:hidden">
          <span className="font-semibold text-stone-800">Menu</span>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-stone-100">
            <X className="w-4 h-4 text-stone-500" />
          </button>
        </div>
        <nav className="px-3 pt-2 md:pt-5 space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); onClose(); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors
                  ${isActive ? "bg-emerald-50 text-emerald-800" : "text-stone-600 hover:bg-stone-50"}`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-emerald-600" : "text-stone-400"}`} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="absolute bottom-5 left-3 right-3 px-3.5 py-3 rounded-xl bg-amber-50 border border-amber-100">
          <p className="text-xs text-amber-800 leading-relaxed">
            Aplikasi ini membantu pencatatan, bukan pengganti pemeriksaan tenaga kesehatan.
          </p>
        </div>
      </aside>
    </>
  );
}
