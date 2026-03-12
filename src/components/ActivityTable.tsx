'use client';

interface Activity {
  id: number;
  description: string;
  type: string;
  timestamp: string;
  userId: number;
}

interface ActivityTableProps {
  activities: Activity[];
}

const typeBadgeClasses: Record<string, string> = {
  order: 'bg-blue-100 text-blue-700',
  signup: 'bg-green-100 text-green-700',
  payment: 'bg-purple-100 text-purple-700',
};

const typeLabels: Record<string, string> = {
  order: 'Order',
  signup: 'Signup',
  payment: 'Payment',
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function ActivityTable({ activities }: ActivityTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-800">Recent Activity</h2>
          <p className="text-xs text-slate-400 mt-0.5">Latest {activities.length} events</p>
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
          Live
          <span className="ml-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
        </span>
      </div>

      {activities.length === 0 ? (
        <div className="px-6 py-12 text-center">
          <p className="text-slate-400 text-sm">No activities found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">User ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {activities.map((activity, index) => (
                <tr
                  key={activity.id}
                  className={`hover:bg-slate-50 transition-colors ${
                    index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          activity.type === 'order'
                            ? 'bg-blue-400'
                            : activity.type === 'signup'
                            ? 'bg-green-400'
                            : 'bg-purple-400'
                        }`}
                      />
                      <span className="text-sm text-slate-700">{activity.description}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        typeBadgeClasses[activity.type] || 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {typeLabels[activity.type] || activity.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-500">#{activity.userId}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-500">{formatDate(activity.timestamp)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
