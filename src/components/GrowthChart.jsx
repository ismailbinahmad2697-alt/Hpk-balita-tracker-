import React, { useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { WHO_WEIGHT_BOYS, WHO_WEIGHT_GIRLS } from "../lib/growthReference";
import { monthsBetween } from "../lib/dateUtils";

export default function GrowthChart({ logs, gender, birthDate }) {
  const table = gender === "boy" ? WHO_WEIGHT_BOYS : WHO_WEIGHT_GIRLS;

  const chartData = useMemo(() => {
    return table.map((ref) => {
      const point = { month: ref.month, P3: ref.p3, Median: ref.p50, P97: ref.p97 };
      const matchingLog = logs.find(
        (l) => Math.round(monthsBetween(birthDate, l.date)) === ref.month
      );
      if (matchingLog) point["Berat Anak"] = matchingLog.weight;
      return point;
    });
  }, [logs, table, birthDate]);

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-stone-800 text-sm">Grafik Berat Badan menurut Usia</h3>
          <p className="text-xs text-stone-500 mt-0.5">Rujukan kurva WHO (P3 – Median – P97)</p>
        </div>
        <TrendingUp className="w-4 h-4 text-emerald-500" />
      </div>
      <div className="h-64 sm:h-80 -ml-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EDE8DD" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "#78716C" }}
              label={{ value: "Usia (bulan)", position: "insideBottom", offset: -3, fontSize: 11, fill: "#A8A29E" }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#78716C" }}
              label={{ value: "Berat (kg)", angle: -90, position: "insideLeft", fontSize: 11, fill: "#A8A29E" }}
            />
            <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #EDE8DD", fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Line type="monotone" dataKey="P97" stroke="#FCA5A5" strokeDasharray="4 3" dot={false} strokeWidth={1.5} />
            <Line type="monotone" dataKey="Median" stroke="#D6D3D1" strokeDasharray="4 3" dot={false} strokeWidth={1.5} />
            <Line type="monotone" dataKey="P3" stroke="#FCA5A5" strokeDasharray="4 3" dot={false} strokeWidth={1.5} />
            <Line
              type="monotone"
              dataKey="Berat Anak"
              stroke="#059669"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "#059669" }}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
            }
