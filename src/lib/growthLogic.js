import { WHO_WEIGHT_BOYS, WHO_WEIGHT_GIRLS } from "./growthReference";

function findNearestReference(table, ageMonth) {
  return table.reduce((closest, row) => {
    if (!closest) return row;
    return Math.abs(row.month - ageMonth) < Math.abs(closest.month - ageMonth)
      ? row
      : closest;
  }, null);
}

export function evaluateGrowthStatus(weightKg, ageMonth, gender) {
  const table = gender === "boy" ? WHO_WEIGHT_BOYS : WHO_WEIGHT_GIRLS;
  const ref = findNearestReference(table, ageMonth);
  if (!ref) return { status: "unknown", label: "Data tidak tersedia", ref };

  if (weightKg < ref.p3) {
    return {
      status: "low",
      label: "Di bawah garis P3 — sebaiknya konsultasi tenaga kesehatan",
      ref,
    };
  }
  if (weightKg > ref.p97) {
    return {
      status: "high",
      label: "Di atas garis P97 — sebaiknya konsultasi tenaga kesehatan",
      ref,
    };
  }
  if (weightKg < ref.p50) {
    return { status: "normal-low", label: "Normal (di bawah median)", ref };
  }
  return { status: "normal-high", label: "Normal (di atas median)", ref };
}

export const STATUS_STYLE = {
  low: "text-rose-700 bg-rose-50 border-rose-200",
  high: "text-rose-700 bg-rose-50 border-rose-200",
  "normal-low": "text-emerald-700 bg-emerald-50 border-emerald-200",
  "normal-high": "text-emerald-700 bg-emerald-50 border-emerald-200",
  unknown: "text-stone-600 bg-stone-50 border-stone-200",
};
