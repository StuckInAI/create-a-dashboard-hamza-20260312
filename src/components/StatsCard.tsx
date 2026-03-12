'use client';

interface StatsCardProps {
  label: string;
  value: string;
  change: number;
  icon: string;
}

export default function StatsCard({ label, value, change, icon }: StatsCardProps) {
  const isPositive = change >= 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="text-3xl">{icon}</div>
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
            isPositive
              ? 'bg-green-50 text-green-700'
              : 'bg-red-50 text-red-700'
          }`}
        >
          <span>{isPositive ? '▲' : '▼'}</span>
          {Math.abs(change).toFixed(1)}%
        </span>
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-800 mb-1">{value}</p>
        <p className="text-sm text-slate-500">{label}</p>
      </div>
      <div className="mt-4 pt-4 border-t border-slate-50">
        <p className={`text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '+' : ''}{change.toFixed(1)}% from last month
        </p>
      </div>
    </div>
  );
}
