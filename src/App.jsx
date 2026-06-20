import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import GrowthChart from "./components/GrowthChart";
import MilestoneChecklist from "./components/MilestoneChecklist";
import DashboardPage from "./pages/DashboardPage";
import LogPage from "./pages/LogPage";
import SetupProfilePage from "./pages/SetupProfilePage";
import { useAuth } from "./hooks/useAuth";
import { useChildData } from "./hooks/useChildData";
import { daysSince, monthsBetween } from "./lib/dateUtils";

const PAGE_TITLE = {
  dashboard: "Dashboard",
  log: "Log Harian",
  milestone: "Milestone",
  grafik: "Grafik Pertumbuhan",
};

export default function App() {
  const { user, loading: authLoading } = useAuth();
  const {
    profile, logs, milestoneChecked, loading: dataLoading,
    saveProfile, addLog, toggleMilestone,
  } = useChildData(user?.uid);

  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (authLoading || dataLoading) {
    return (
      <div className="min-h-screen bg-[#FBF7F0] flex items-center justify-center">
        <p className="text-sm text-stone-400">Memuat...</p>
      </div>
    );
  }

  if (!profile.birthDate) {
    return <SetupProfilePage onSave={saveProfile} />;
  }

  const dayCount = daysSince(profile.birthDate);
  const ageMonth = monthsBetween(profile.birthDate, new Date().toISOString());

  return (
    <div className="min-h-screen bg-[#FBF7F0] flex">
      <Sidebar active={page} onNavigate={setPage} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 min-w-0 flex flex-col">
        <Header childName={profile.name} dayCount={dayCount} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 max-w-3xl w-full mx-auto">
          <div className="mb-5 flex items-center gap-1.5 text-xs text-stone-400">
            <span>1000 Hari HPK</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-stone-600 font-medium">{PAGE_TITLE[page]}</span>
          </div>

          {page === "dashboard" && (
            <DashboardPage profile={profile} logs={logs} milestoneChecked={milestoneChecked} />
          )}
          {page === "log" && (
            <LogPage profile={profile} logs={logs} onAddLog={addLog} />
          )}
          {page === "milestone" && (
            <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-6">
              <h3 className="font-semibold text-stone-800 text-sm mb-1">Milestone Tracker</h3>
              <p className="text-xs text-stone-500 mb-5">
                Berdasarkan rujukan umum IDAI/WHO. Bukan alat diagnosis — gunakan Buku KIA/KPSP untuk skrining resmi.
              </p>
              <MilestoneChecklist
                ageMonth={ageMonth}
                checked={milestoneChecked}
                onToggle={(id) => toggleMilestone(id, milestoneChecked[id])}
              />
            </div>
          )}
          {page === "grafik" && (
            <GrowthChart logs={logs} gender={profile.gender} birthDate={profile.birthDate} />
          )}
        </main>
      </div>
    </div>
  );
          }
