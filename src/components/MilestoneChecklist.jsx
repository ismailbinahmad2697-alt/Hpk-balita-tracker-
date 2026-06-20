import React, { useMemo } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { MILESTONES, CATEGORY_COLOR } from "../data/milestones";

export default function MilestoneChecklist({ ageMonth, checked, onToggle }) {
  const grouped = useMemo(() => {
    const groups = {};
    MILESTONES.forEach((m) => {
      const key = m.ageMonth;
      if (!groups[key]) groups[key] = [];
      groups[key].push(m);
    });
    return Object.entries(groups).sort((a, b) => Number(a[0]) - Number(b[0]));
  }, []);

  return (
    <div className="space-y-5">
      {grouped.map(([month, items]) => {
        const isCurrentRange = Number(month) <= ageMonth && ageMonth < Number(month) + 3;
        return (
          <div key={month}>
            <div className="flex items-center gap-2 mb-2.5">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full
                ${isCurrentRange ? "bg-emerald-600 text-white" : "bg-stone-100 text-stone-500"}`}>
                {month} bulan
              </span>
              {isCurrentRange && <span className="text-xs text-emerald-600 font-medium">Usia saat ini</span>}
            </div>
            <div className="space-y-2">
              {items.map((m) => {
                const isChecked = !!checked[m.id];
                return (
                  <button
                    key={m.id}
                    onClick={() => onToggle(m.id)}
                    className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-colors
                      ${isChecked ? "bg-emerald-50 border-emerald-200" : "bg-white border-stone-200 hover:border-stone-300"}`}
                  >
                    {isChecked ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="w-5 h-5 text-stone-300 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${isChecked ? "text-emerald-900" : "text-stone-700"}`}>{m.text}</p>
                      <span className={`inline-block mt-1.5 text-[10px] font-medium px-2 py-0.5 rounded-full border ${CATEGORY_COLOR[m.category]}`}>
                        {m.category}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
