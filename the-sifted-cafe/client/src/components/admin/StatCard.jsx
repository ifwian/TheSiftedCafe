function StatCard({ label, value }) {
  return (
    <div className="flex flex-col gap-1 rounded-card bg-white p-6 shadow-soft">
      <span className="text-sm text-dark/60">{label}</span>
      <span className="font-display text-3xl text-dark">{value}</span>
    </div>
  )
}

export default StatCard
