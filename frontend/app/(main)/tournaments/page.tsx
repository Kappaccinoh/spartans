import React from 'react';
import TournamentCard from '@/components/Tournaments/TournamentCard';
import ProgressBar from '@/components/Tournaments/ProgressBar';

export default function TournamentsPage() {
  // This would be fetched from your API
  const tournaments = [
    {
      id: '1',
      name: 'Regional Championship 2025',
      date: '2025-03-15',
      location: 'Kuala Lumpur',
      minPoints: 100,
      description: 'Annual regional championship tournament',
      registrationDeadline: '2025-02-28',
    },
    // Add more tournaments as needed
  ];

  const userPoints = 75; // This would come from user context/API

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Tournaments</h1>
        <p className="text-gray-600 mt-2">
          Available tournaments and your eligibility status
        </p>
      </div>

      <div className="mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Your Tournament Points</h2>
          <div className="flex items-center space-x-4">
            <div className="text-3xl font-bold text-blue-600">{userPoints}</div>
            <ProgressBar current={userPoints} target={100} />
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tournaments.map((tournament) => (
          <TournamentCard
            key={tournament.id}
            tournament={tournament}
            userPoints={userPoints}
          />
        ))}
      </div>
    </div>
  );
}
