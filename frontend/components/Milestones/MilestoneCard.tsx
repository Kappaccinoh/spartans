import React from 'react';

interface Milestone {
  id: string;
  title: string;
  description: string;
  currentProgress: number;
  target: number;
  unit: string;
  category: string;
}

interface MilestoneCardProps {
  milestone: Milestone;
}

export default function MilestoneCard({ milestone }: MilestoneCardProps) {
  const percentage = (milestone.currentProgress / milestone.target) * 100;
  const isCompleted = percentage >= 100;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{milestone.title}</h3>
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${
              isCompleted
                ? 'bg-green-100 text-green-800'
                : 'bg-blue-100 text-blue-800'
            }`}
          >
            {isCompleted ? 'Completed' : 'In Progress'}
          </span>
        </div>

        <p className="mt-2 text-sm text-gray-600">{milestone.description}</p>

        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>
              {milestone.currentProgress} {milestone.unit}
            </span>
            <span>
              {milestone.target} {milestone.unit}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full transition-all duration-300 ${
                isCompleted ? 'bg-green-600' : 'bg-blue-600'
              }`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
        </div>

        {isCompleted && (
          <div className="mt-4 flex items-center text-green-600">
            <span className="mr-2">🏆</span>
            <span className="text-sm font-medium">Milestone Achieved!</span>
          </div>
        )}
      </div>
    </div>
  );
}
