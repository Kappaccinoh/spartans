import React from 'react';

interface Action {
  id: string;
  type: 'training' | 'run' | 'self-initiated';
  description: string;
  points: number;
  date: string;
  player: {
    id: string;
    name: string;
    image?: string;
  };
}

export default function Timeline() {
  // This would be fetched from your API
  const actions: Action[] = [
    {
      id: '1',
      type: 'training',
      description: 'Attended team training session',
      points: 10,
      date: '2025-01-19',
      player: {
        id: '1',
        name: 'John Doe',
      },
    },
    // Add more mock data as needed
  ];

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {actions.map((action, actionIdx) => (
          <li key={action.id}>
            <div className="relative pb-8">
              {actionIdx !== actions.length - 1 ? (
                <span
                  className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span className={`
                    h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white
                    ${action.type === 'training' ? 'bg-blue-500' :
                      action.type === 'run' ? 'bg-green-500' : 'bg-purple-500'}
                  `}>
                    {/* Add icons based on action type */}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm text-gray-500">
                      {action.description}
                      <span className="font-medium text-gray-900"> by {action.player.name}</span>
                    </p>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    <div className="text-green-600 font-semibold">+{action.points} points</div>
                    <time dateTime={action.date}>{action.date}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
