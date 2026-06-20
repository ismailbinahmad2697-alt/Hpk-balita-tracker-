import React from "react";
import { AlertCircle } from "lucide-react";

export default function FormInput({
  label, type = "text", value, onChange, placeholder,
  icon: Icon, suffix, error, ...rest
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-stone-700 mb-1.5 block">{label}</span>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full rounded-xl border bg-white py-2.5 text-sm text-stone-800 placeholder-stone-400
            focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-shadow
            ${Icon ? "pl-9" : "pl-3.5"} ${suffix ? "pr-12" : "pr-3.5"}
            ${error ? "border-rose-300" : "border-stone-200"}`}
          {...rest}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400">
            {suffix}
          </span>
        )}
      </div>
      {error && (
        <span className="text-xs text-rose-600 mt-1 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> {error}
        </span>
      )}
    </label>
  );
}
