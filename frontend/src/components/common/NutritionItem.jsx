function NutritionItem({ label, value, unit }) {
  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">

      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="text-xl font-bold mt-2">
        {value ?? "—"}
      </p>

      <p className="text-xs text-slate-600 mt-1">
        {unit}
      </p>

    </div>
  );
}

export default NutritionItem;