import React from 'react';

export function ActionFilters() {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Player Name
          </label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Search by name..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Action Type
          </label>
          <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option value="">All Types</option>
            <option value="training">Training Session</option>
            <option value="run">Running</option>
            <option value="self-initiated">Self-Initiated</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date Range
          </label>
          <input
            type="date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
