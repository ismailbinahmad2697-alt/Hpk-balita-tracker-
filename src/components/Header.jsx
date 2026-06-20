import React from "react";
import { Baby, Menu } from "lucide-react";

export default function Header({ childName, dayCount, onMenuClick }) {
  return (
    <header className="sticky top-0 z-20 bg-[#FBF7F0]/90 backdrop-blur border-b border-stone-200">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3.5">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 -ml-2 rounded-lg hover:bg-stone-100 text-stone-600"
            aria-label="Buka menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center shrink-0">
              <Baby className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-stone-900 leading-tight">1000 Hari HPK</h1>
              <p className="text-xs text-stone-500 leading-tight">{childName || "Belum ada nama"}</p>
            </div>
          </div>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-xs text-stone-500">Hari ke-</p>
          <p className="text-sm font-bold text-emerald-700">{dayCount} <span className="font-normal text-stone-400">/ 1000</span></p>
        </div>
      </div>
    </header>
  );
}
