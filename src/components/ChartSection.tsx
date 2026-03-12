'use client';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { useState } from 'react';

const monthlyData = [
  { month: 'Jan', revenue: 32000, orders: 820, users: 450 },
  { month: 'Feb', revenue: 28500, orders: 740, users: 480 },
  { month: 'Mar', revenue: 35200, orders: 910, users: 520 },
  { month: 'Apr', revenue: 41000, orders: 1050, users: 590 },
  { month: 'May', revenue: 38700, orders: 980, users: 610 },
  { month: 'Jun', revenue: 44300, orders: 1120, users: 680 },
  { month: 'Jul', revenue: 47800, orders: 1200, users: 720 },
  { month: 'Aug', revenue: 43200, orders: 1090, users: 700 },
  { month: 'Sep', revenue: 49100, orders: 1250, users: 760 },
  { month: 'Oct', revenue: 52400, orders: 1320, users: 810 },
  { month: 'Nov', revenue: 55000, orders: 1400, users: 870 },
  { month: 'Dec', revenue: 48250, orders: 1284, users: 920 },
];

type ChartType = 'line' | 'bar';
type MetricKey = 'revenue' | 'orders' | 'users';

const metrics: { key: MetricKey; label: string; color: string }[] = [
  { key: 'revenue', label: 'Revenue ($)', color: '#3b82f6' },
  { key: 'orders', label: 'Orders', color: '#10b981' },
  { key: 'users', label: 'Users', color: '#8b5cf6' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3">
        <p className="text-sm font-semibold text-slate-700 mb-2">{label}</p>
        {payload.map((entry: any) => (
          <div key={entry.dataKey} className="flex items-center gap-2 text-xs text-slate-600">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span>{entry.name}:</span>
            <span className="font-medium">
              {entry.dataKey === 'revenue' ? `$${entry.value.toLocaleString()}` : entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ChartSection() {
  const [chartType, setChartType] = useState<ChartType>('line');
  const [activeMetrics, setActiveMetrics] = useState<MetricKey[]>(['revenue', 'orders']);

  const toggleMetric = (key: MetricKey) => {
    setActiveMetrics((prev) =>
      prev.includes(key)
        ? prev.length > 1 ? prev.filter((m) => m !== key) : prev
        : [...prev, key]
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100">
      <div className="px-6 py-4 border-b border-slate-100">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-slate-800">Performance Overview</h2>
            <p className="text-xs text-slate-400 mt-0.5">Monthly data for the current year</p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Metric toggles */}
            <div className="flex items-center gap-2">
              {metrics.map((m) => (
                <button
                  key={m.key}
                  onClick={() => toggleMetric(m.key)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeMetrics.includes(m.key)
                      ? 'text-white shadow-sm'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                  style={activeMetrics.includes(m.key) ? { backgroundColor: m.color } : {}}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: activeMetrics.includes(m.key) ? 'white' : m.color }}
                  />
                  {m.label}
                </button>
              ))}
            </div>

            {/* Chart type toggle */}
            <div className="flex items-center bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => setChartType('line')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  chartType === 'line' ? 'bg-white text-slate-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Line
              </button>
              <button
                onClick={() => setChartType('bar')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  chartType === 'bar' ? 'bg-white text-slate-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Bar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <ResponsiveContainer width="100%" height={320}>
          {chartType === 'line' ? (
            <LineChart data={monthlyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: '#94a3b8' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#94a3b8' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: '12px', paddingTop: '16px' }}
              />
              {metrics
                .filter((m) => activeMetrics.includes(m.key))
                .map((m) => (
                  <Line
                    key={m.key}
                    type="monotone"
                    dataKey={m.key}
                    name={m.label}
                    stroke={m.color}
                    strokeWidth={2.5}
                    dot={{ fill: m.color, strokeWidth: 0, r: 4 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                ))}
            </LineChart>
          ) : (
            <BarChart data={monthlyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: '#94a3b8' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#94a3b8' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: '12px', paddingTop: '16px' }}
              />
              {metrics
                .filter((m) => activeMetrics.includes(m.key))
                .map((m) => (
                  <Bar
                    key={m.key}
                    dataKey={m.key}
                    name={m.label}
                    fill={m.color}
                    radius={[4, 4, 0, 0]}
                    maxBarSize={40}
                  />
                ))}
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
