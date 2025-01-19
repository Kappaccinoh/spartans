"use client";

import React from 'react';

interface ProfileCardProps {
  name: string;
  image?: string;
  totalPoints: number;
  pointsSpent: number;
  pointsLeft: number;
}

export default function ProfileCard({ name, image, totalPoints, pointsSpent, pointsLeft }: ProfileCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center space-x-4">
        {image && (
          <img
            src={image}
            alt={name}
            className="w-16 h-16 rounded-full"
          />
        )}
        <div>
          <h2 className="text-xl font-semibold">{name}</h2>
          <div className="mt-2 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-500">Total Points</p>
              <p className="text-lg font-semibold">{totalPoints}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Points Spent</p>
              <p className="text-lg font-semibold">{pointsSpent}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Points Left</p>
              <p className="text-lg font-semibold">{pointsLeft}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
