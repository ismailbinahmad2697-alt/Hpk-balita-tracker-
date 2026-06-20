import React from "react";
import { Weight, Ruler, CheckCircle2, ClipboardList, Activity } from "lucide-react";
import GrowthChart from "../components/GrowthChart";
import { MILESTONES } from "../data/milestones";
import { evaluateGrowthStatus, STATUS_STYLE } from "../lib/growthLogic";
import { monthsBetween, daysSince } from "../lib/dateUtils";

export default function DashboardPage({ profile, logs, milestoneChecked }) {
  const ageMonth = monthsBetween(profile.birthDate, new Date().toISOString());
  const dayCount = daysSince(profile.birthDate);
  const progressPct = Math.min(100, (dayCount / 1000) * 100);
  const lastLog = logs[logs.length - 1];

  const evalStatus = lastLog
    ? evaluateGrowthStatus(lastLog.weight, monthsBetween(profile.birthDate, lastLog.date), profile.gender)
    : null;

  const milestonesDone = MILESTONES.filter((m) => milestoneChecked[m.id]).length;
  const milestonesExpected = MILESTONES.filter((m) => m.ageMonth <= ageMonth).length;

  return (
    <div className="space-y-5">
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-5 sm:p-6 text-white">
        <div className="flex items-center justify-between mb-1">
          <p className="text-emerald-100 text-xs font-medium">Perjalanan 1000 Hari Pertama Kehidupan</p>
          <span className="text-xs font-semibold bg-white/15 px-2 py-1 rounded-full">{Math.round(progressPct)}%</span>
        </div>
        <p className="text-2xl font-bold mb-3">Hari ke-{dayCount}</p>
        <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
        </div>
        <p className="text-xs text-emerald-100 mt-2.5">
          Usia: {ageMonth} bulan · {1000 - dayCount > 0 ? `${1000 - dayCount} hari lagi menuju 1000 hari` : "Periode 1000 HPK selesai 🎉"}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl border border-stone-200 p-4">
          <div className="flex items-center gap-2 text-stone-500 mb-2">
            <Weight className="w-4 h-4" />
            <span className="text-xs font-medium">Berat Terakhir</span>
          </div>
          <p className="text-xl font-bold text-stone-900">{lastLog ? `${lastLog.weight} kg` : "—"}</p>
          {evalStatus && (
            <span className={`inline-block mt-2 text-[10px] font-medium px-2 py-0.5 rounded-full border ${STATUS_STYLE[evalStatus.status]}`}>
              {evalStatus.label}
            </span>
          )}
        </div>
        <div className="bg-white rounded-2xl border border-stone-200 p-4">
          <div className="flex items-center gap-2 text-stone-500 mb-2">
            <Ruler className="w-4 h-4" />
            <span className="text-xs font-medium">Tinggi Terakhir</span>
          </div>
          <p className="text-xl font-bold text-stone-900">{lastLog ? `${lastLog.height} cm` : "—"}</p>
          <p className="text-[10px] text-stone-400 mt-2">{lastLog ? new Date(lastLog.date).toLocaleDateString("id-ID") : "Belum ada data"}</p>
        </div>
        <div className="bg-white rounded-2xl border border-stone-200 p-4 col-span-2 sm:col-span-1">
          <div className="flex items-center gap-2 text-stone-500 mb-2">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-xs font-medium">Milestone</span>
          </div>
          <p className="text-xl font-bold text-stone-900">{milestonesDone}<span className="text-sm font-normal text-stone-400">/{MILESTONES.length}</span></p>
          <p className="text-[10px] text-stone-400 mt-2">{milestonesExpected} diharapkan untuk usia ini</p>
        </div>
        <div className="bg-white rounded-2xl border border-stone-200 p-4 col-span-2 sm:col-span-1">
          <div className="flex items-center gap-2 text-stone-500 mb-2">
            <ClipboardList className="w-4 h-4" />
            <span className="text-xs font-medium">Total Catatan</span>
          </div>
          <p className="text-xl font-bold text-stone-900">{logs.length}</p>
          <p className="text-[10px] text-stone-400 mt-2">entri log harian tersimpan</p>
        </div>
      </div>

      {logs.length > 0 ? (
        <GrowthChart logs={logs} gender={profile.gender} birthDate={profile.birthDate} />
      ) : (
        <div className="bg-white rounded-2xl border border-dashed border-stone-300 p-8 text-center">
          <Activity className="w-8 h-8 text-stone-300 mx-auto mb-2" />
