import React, { useState } from "react";
import { Baby } from "lucide-react";
import FormInput from "../components/FormInput";

export default function SetupProfilePage({ onSave }) {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("girl");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !birthDate) {
      setError("Nama dan tanggal lahir wajib diisi");
      return;
    }
    onSave({ name, birthDate, gender });
  }

  return (
    <div className="min-h-screen bg-[#FBF7F0] flex items-center justify-center p-5">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white rounded-2xl border border-stone-200 p-6 space-y-4">
        <div className="flex flex-col items-center text-center mb-2">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center mb-3">
            <Baby className="w-6 h-6 text-white" />
          </div>
          <h1 className="font-semibold text-stone-900">Mulai Pantau Si Kecil</h1>
          <p className="text-xs text-stone-500 mt-1">Isi data dasar dulu, satu kali saja</p>
        </div>

        <FormInput label="Nama Anak" value={name} onChange={(e) => setName(e.target.value)} placeholder="cth. Hana" />
        <FormInput label="Tanggal Lahir" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />

        <label className="block">
          <span className="text-sm font-medium text-stone-700 mb-1.5 block">Jenis Kelamin</span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setGender("girl")}
              className={`py-2.5 rounded-xl text-sm font-medium border ${gender === "girl" ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-stone-600 border-stone-200"}`}
            >
              Perempuan
            </button>
            <button
              type="button"
              onClick={() => setGender("boy")}
              className={`py-2.5 rounded-xl text-sm font-medium border ${gender === "boy" ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-stone-600 border-stone-200"}`}
            >
              Laki-laki
            </button>
          </div>
        </label>

        {error && <p className="text-xs text-rose-600">{error}</p>}

        <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium py-3 rounded-xl">
          Mulai Pantau
        </button>
      </form>
    </div>
  );
            }
