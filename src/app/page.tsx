'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import StatsCard from '@/components/StatsCard';
import ActivityTable from '@/components/ActivityTable';
import ChartSection from '@/components/ChartSection';

interface StatItem {
  id: number;
  label: string;
  value: number;
  change: number;
  recordedAt: string;
}

interface ActivityItem {
  id: number;
  description: string;
  type: string;
  timestamp: string;
  userId: number;
}

const statIcons: Record<string, string> = {
  'Total Users': '👥',
  'Revenue': '💰',
  'Orders': '📦',
  'Active Sessions': '🟢',
};

const statFormats: Record<string, (v: number) => string> = {
  'Total Users': (v) => v.toLocaleString(),
  'Revenue': (v) => `$${v.toLocaleString()}`,
  'Orders': (v) => v.toLocaleString(),
  'Active Sessions': (v) => v.toLocaleString(),
};

export default function DashboardPage() {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsRes, activitiesRes] = await Promise.all([
          fetch('/api/stats'),
          fetch('/api/activities'),
        ]);

        if (!statsRes.ok || !activitiesRes.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const statsData = await statsRes.json();
        const activitiesData = await activitiesRes.json();

        setStats(statsData);
        setActivities(activitiesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              Error: {error}
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-slate-500 text-sm">Loading dashboard data...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                  <StatsCard
                    key={stat.id}
                    label={stat.label}
                    value={statFormats[stat.label] ? statFormats[stat.label](stat.value) : stat.value.toString()}
                    change={stat.change}
                    icon={statIcons[stat.label] || '📊'}
                  />
                ))}
              </div>

              {/* Chart Section */}
              <div className="mb-8">
                <ChartSection />
              </div>

              {/* Activity Table */}
              <div>
                <ActivityTable activities={activities} />
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
