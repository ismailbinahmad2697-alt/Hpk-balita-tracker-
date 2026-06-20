import React, { useState } from "react";
import { Calendar, Weight, Ruler, Plus } from "lucide-react";
import FormInput from "../components/FormInput";
import { evaluateGrowthStatus, STATUS_STYLE } from "../lib/growthLogic";
import { monthsBetween } from "../lib/dateUtils";

export default function LogPage({ profile, logs, onAddLog }) {
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    weight: "",
    height: "",
    nutrition: "ASI Eksklusif",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [justSaved, setJustSaved] = useState(false);

  function validate() {
    const e = {};
    if (!form.date) e.date = "Tanggal wajib diisi";
    if (!form.weight || Number(form.weight) <= 0) e.weight = "Berat badan tidak valid";
    if (Number(form.weight) > 30) e.weight = "Periksa kembali, nilai terlalu besar";
    if (!form.height || Number(form.height) <= 0) e.height = "Tinggi badan tidak valid";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;

    await onAddLog({
      date: form.date,
      weight: Number(form.weight),
      height: Number(form.height),
      nutrition: form.nutrition,
      notes: form.notes,
    });

    setJustSaved(true);
    setForm((f) => ({ ...f, weight: "", height: "", notes: "" }));
    setTimeout(() => setJustSaved(false), 2500);
  }

  const ageAtDate = monthsBetween(profile.birthDate, form.date);
  const livePreview =
    form.weight && !isNaN(Number(form.weight))
      ? evaluateGrowthStatus(Number(form.weight), ageAtDate, profile.gender)
      : null;

  return (
    <div className="space-y-5">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-6 space-y-4">
        <h3 className="font-semibold text-stone-800 text-sm mb-1">Tambah Log Harian</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            label="Tanggal"
            type="date"
            icon={Calendar}
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            error={errors.date}
          />
          <FormInput
            label="Berat Badan"
            type="number"
            step="0.01"
            icon={Weight}
            suffix="kg"
            placeholder="cth. 6.20"
            value={form.weight}
            onChange={(e) => setForm({ ...form, weight: e.target.value })}
            error={errors.weight}
          />
        </div>

        <FormInput
          label="Tinggi Badan"
          type="number"
          step="0.1"
          icon={Ruler}
          suffix="cm"
          placeholder="cth. 62.5"
          value={form.height}
          onChange={(e) => setForm({ ...form, height: e.target.value })}
          error={errors.height}
        />

        <label className="block">
          <span className="text-sm font-medium text-stone-700 mb-1.5 block">Jenis Asupan Nutrisi</span>
          <select
            value={form.nutrition}
            onChange={(e) => setForm({ ...form, nutrition: e.target.value })}
            className="w-full rounded-xl border border-stone-200 bg-white py-2.5 px-3.5 text-sm text-stone-800
              focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400"
          >
            <option>ASI Eksklusif</option>
            <option>ASI + Sufor</option>
            <option>Sufor</option>
            <option>MPASI Awal (6 bulan+)</option>
            <option>MPASI Lengkap</option>
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-stone-700 mb-1.5 block">Catatan Kesehatan (opsional)</span>
          <textarea
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="cth. Demam ringan, alergi, kondisi tidur, dll."
            rows={3}
            className="w-full rounded-xl border border-stone-200 bg-white py-2.5 px-3.5 text-sm text-stone-800
              placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 resize-none"
          />
        </label>

        {livePreview && (
          <div className={`text-xs rounded-xl border px-3.5 py-2.5 ${STATUS_STYLE[livePreview.status]}`}>
            Estimasi status pada usia {ageAtDate} bulan: <strong>{livePreview.label}</strong>
          </div>
        )}

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700
            text-white text-sm font-medium py-3 round
