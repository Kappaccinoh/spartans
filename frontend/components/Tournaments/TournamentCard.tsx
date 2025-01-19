"use client";

import React from 'react';
import ProgressBar from './ProgressBar';

interface Tournament {
  id: string;
  name: string;
  date: string;
  location: string;
  minPoints: number;
  description: string;
  registrationDeadline: string;
}

interface TournamentCardProps {
  tournament: Tournament;
  userPoints: number;
}

export default function TournamentCard({ tournament, userPoints }: TournamentCardProps) {
  const isEligible = userPoints >= tournament.minPoints;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{tournament.name}</h3>
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${
              isEligible
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {isEligible ? 'Eligible' : 'Not Eligible'}
          </span>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-2">📅</span>
            <time dateTime={tournament.date}>
              {new Date(tournament.date).toLocaleDateString()}
            </time>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-2">📍</span>
            {tournament.location}
          </div>
        </div>

        <p className="mt-4 text-sm text-gray-600">{tournament.description}</p>

        <div className="mt-4">
          <div className="text-sm font-medium text-gray-700">
            Points Required: {tournament.minPoints}
          </div>
          <div className="mt-2">
            <ProgressBar current={userPoints} target={tournament.minPoints} />
          </div>
        </div>

        <div className="mt-6">
          <button
            disabled={!isEligible}
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${
              isEligible
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {isEligible ? 'Register Now' : 'Need More Points'}
          </button>
        </div>
      </div>
    </div>
  );
}
