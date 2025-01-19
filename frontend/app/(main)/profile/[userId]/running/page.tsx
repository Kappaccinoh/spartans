'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Mock data - replace with API call
const mockRunningHistory = {
  '1': [
    { id: 1, date: '2024-01-15', type: '40m', time: '4.8s' },
    { id: 2, date: '2024-01-15', type: '100m', time: '12.1s' },
    { id: 3, date: '2024-01-15', type: '400m', time: '58.2s' },
    { id: 4, date: '2023-12-20', type: '40m', time: '4.9s' },
    { id: 5, date: '2023-12-20', type: '100m', time: '12.3s' },
    { id: 6, date: '2023-12-20', type: '400m', time: '58.5s' },
  ]
};

export default function RunningHistory() {
  const params = useParams();
  const userId = params.userId as string;
  const runningHistory = mockRunningHistory[userId] || [];

  const groupedByDate = runningHistory.reduce((acc, run) => {
    if (!acc[run.date]) {
      acc[run.date] = [];
    }
    acc[run.date].push(run);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Navigation */}
        <div className="mb-8">
          <Link 
            href={`/profile?id=${userId}`}
            className="text-gray-400 hover:text-white transition-colors inline-flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Profile
          </Link>
        </div>

        {/* Header */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 p-6 mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Running Times History</h1>
            <button className="btn-primary px-4 py-2">
              Log New Time
            </button>
          </div>
        </div>

        {/* History List */}
        <div className="space-y-6">
          {Object.entries(groupedByDate).map(([date, runs]) => (
            <motion.div
              key={date}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-700 bg-gray-800/50">
                <h2 className="text-lg font-semibold text-white">{date}</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(runs as any[]).map((run) => (
                    <div
                      key={run.id}
                      className="bg-gray-700/50 rounded-lg p-4"
                    >
                      <div className="text-sm text-gray-400 mb-1">{run.type}</div>
                      <div className="text-2xl font-bold text-white">{run.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
