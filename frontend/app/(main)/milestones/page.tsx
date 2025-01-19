import React from 'react';
import MilestoneCard from '@/components/Milestones/MilestoneCard';
import AddMilestoneForm from '@/components/Milestones/AddMilestoneForm';

export default function MilestonesPage() {
  // This would be fetched from your API
  const milestones = [
    {
      id: '1',
      title: 'Run 10km',
      description: 'Complete a cumulative distance of 10km',
      currentProgress: 7.5,
      target: 10,
      unit: 'km',
      category: 'running',
    },
    {
      id: '2',
      title: 'Training Sessions',
      description: 'Attend 10 training sessions',
      currentProgress: 8,
      target: 10,
      unit: 'sessions',
      category: 'training',
    },
    // Add more milestones as needed
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Milestones</h1>
          <p className="text-gray-600 mt-2">Track your progress and achievements</p>
        </div>
        <AddMilestoneForm />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {milestones.map((milestone) => (
          <MilestoneCard
            key={milestone.id}
            milestone={milestone}
          />
        ))}
      </div>
    </div>
  );
}
