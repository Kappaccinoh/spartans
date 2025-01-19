'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { DayPicker } from 'react-day-picker';
import { format, isToday, isYesterday, addDays } from 'date-fns';
import 'react-day-picker/dist/style.css';

import Avatar from 'boring-avatars';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Line, ComposedChart, Tooltip as RechartsTooltip } from 'recharts';
import HeatMap from '@uiw/react-heat-map';
import Tooltip from '@uiw/react-tooltip';

// Helper function to convert time string to seconds
const timeToSeconds = (time) => {
  const [minutes, seconds] = time.split(':').map(Number);
  return minutes * 60 + seconds;
};

// Helper function to convert seconds to time string
const secondsToTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

// Mock data for demonstration
const mockPlayers = [
  {
    id: '1',
    name: 'Alex Wong',
    position: 'Handler',
    joinedYear: 2022,
    rank: 1,
    points: 1250,
    attendanceStats: {
      totalSessions: 48,
      attendedSessions: 44,
      attendanceRate: '92%',
      streak: 5,
      longestStreak: 12
    },
    attendanceActivity: [
      // January 2025
      { date: '2025/01/19', type: 'Training' },
      { date: '2025/01/15', type: 'Game' },
      { date: '2025/01/12', type: 'Training' },
      { date: '2025/01/05', type: 'Training' },
      // December 2024
      { date: '2024/12/29', type: 'Training' },
      { date: '2024/12/22', type: 'Training' },
      { date: '2024/12/15', type: 'Game' },
      { date: '2024/12/08', type: 'Training' },
      { date: '2024/12/01', type: 'Training' },
      // November 2024
      { date: '2024/11/24', type: 'Training' },
      { date: '2024/11/17', type: 'Training' },
      { date: '2024/11/15', type: 'Game' },
      { date: '2024/11/10', type: 'Training' },
      { date: '2024/11/03', type: 'Training' },
      // October 2024
      { date: '2024/10/27', type: 'Training' },
      { date: '2024/10/20', type: 'Training' },
      { date: '2024/10/15', type: 'Game' },
      { date: '2024/10/13', type: 'Training' },
      { date: '2024/10/06', type: 'Training' },
      // September 2024
      { date: '2024/09/29', type: 'Training' },
      { date: '2024/09/22', type: 'Training' },
      { date: '2024/09/15', type: 'Game' },
      { date: '2024/09/08', type: 'Training' },
      { date: '2024/09/01', type: 'Training' },
      // August 2024
      { date: '2024/08/25', type: 'Training' },
      { date: '2024/08/18', type: 'Training' },
      { date: '2024/08/15', type: 'Game' },
      { date: '2024/08/11', type: 'Training' },
      { date: '2024/08/04', type: 'Training' },
      // July 2024
      { date: '2024/07/28', type: 'Training' },
      { date: '2024/07/21', type: 'Training' },
      { date: '2024/07/15', type: 'Game' },
      { date: '2024/07/14', type: 'Training' },
      { date: '2024/07/07', type: 'Training' },
      // June 2024
      { date: '2024/06/30', type: 'Training' },
      { date: '2024/06/23', type: 'Training' },
      { date: '2024/06/15', type: 'Game' },
      { date: '2024/06/16', type: 'Training' },
      { date: '2024/06/09', type: 'Training' },
      { date: '2024/06/02', type: 'Training' },
      // May 2024
      { date: '2024/05/26', type: 'Training' },
      { date: '2024/05/19', type: 'Training' },
      { date: '2024/05/15', type: 'Game' },
      { date: '2024/05/12', type: 'Training' },
      { date: '2024/05/05', type: 'Training' },
      // April 2024
      { date: '2024/04/28', type: 'Training' },
      { date: '2024/04/21', type: 'Training' },
      { date: '2024/04/15', type: 'Game' },
      { date: '2024/04/14', type: 'Training' },
      { date: '2024/04/07', type: 'Training' },
      // March 2024
      { date: '2024/03/31', type: 'Training' },
      { date: '2024/03/24', type: 'Training' },
      { date: '2024/03/15', type: 'Game' },
      { date: '2024/03/17', type: 'Training' },
      { date: '2024/03/10', type: 'Training' },
      { date: '2024/03/03', type: 'Training' },
      // February 2024
      { date: '2024/02/25', type: 'Training' },
      { date: '2024/02/18', type: 'Training' },
      { date: '2024/02/15', type: 'Game' },
      { date: '2024/02/11', type: 'Training' },
      { date: '2024/02/04', type: 'Training' },
      // January 2024
      { date: '2024/01/28', type: 'Training' },
      { date: '2024/01/21', type: 'Training' },
      { date: '2024/01/15', type: 'Game' },
      { date: '2024/01/14', type: 'Training' },
      { date: '2024/01/07', type: 'Training' },
      // December 2023
      { date: '2023/12/31', type: 'Training' },
      { date: '2023/12/24', type: 'Training' },
      { date: '2023/12/15', type: 'Game' },
      { date: '2023/12/17', type: 'Training' },
      { date: '2023/12/10', type: 'Training' },
      { date: '2023/12/03', type: 'Training' },
      // November 2023
      { date: '2023/11/26', type: 'Training' },
      { date: '2023/11/19', type: 'Training' },
      { date: '2023/11/15', type: 'Game' },
      { date: '2023/11/12', type: 'Training' },
      { date: '2023/11/05', type: 'Training' },
      // October 2023
      { date: '2023/10/29', type: 'Training' },
      { date: '2023/10/22', type: 'Training' },
      { date: '2023/10/15', type: 'Game' },
      { date: '2023/10/15', type: 'Training' },
      { date: '2023/10/08', type: 'Training' },
      { date: '2023/10/01', type: 'Training' },
      // September 2023
      { date: '2023/09/24', type: 'Training' },
      { date: '2023/09/17', type: 'Training' },
      { date: '2023/09/15', type: 'Game' },
      { date: '2023/09/10', type: 'Training' },
      { date: '2023/09/03', type: 'Training' },
      // August 2023
      { date: '2023/08/27', type: 'Training' },
      { date: '2023/08/20', type: 'Training' },
      { date: '2023/08/15', type: 'Game' },
      { date: '2023/08/13', type: 'Training' },
      { date: '2023/08/06', type: 'Training' },
      // July 2023
      { date: '2023/07/30', type: 'Training' },
      { date: '2023/07/23', type: 'Training' },
      { date: '2023/07/15', type: 'Game' },
      { date: '2023/07/16', type: 'Training' },
      { date: '2023/07/09', type: 'Training' },
      { date: '2023/07/02', type: 'Training' },
      // June 2023
      { date: '2023/06/25', type: 'Training' },
      { date: '2023/06/18', type: 'Training' },
      { date: '2023/06/15', type: 'Game' },
      { date: '2023/06/11', type: 'Training' },
      { date: '2023/06/04', type: 'Training' },
      // May 2023
      { date: '2023/05/28', type: 'Training' },
      { date: '2023/05/21', type: 'Training' },
      { date: '2023/05/15', type: 'Game' },
      { date: '2023/05/14', type: 'Training' },
      { date: '2023/05/07', type: 'Training' },
      // April 2023
      { date: '2023/04/30', type: 'Training' },
      { date: '2023/04/23', type: 'Training' },
      { date: '2023/04/15', type: 'Game' },
      { date: '2023/04/16', type: 'Training' },
      { date: '2023/04/09', type: 'Training' },
      { date: '2023/04/02', type: 'Training' },
      // March 2023
      { date: '2023/03/26', type: 'Training' },
      { date: '2023/03/19', type: 'Training' },
      { date: '2023/03/15', type: 'Game' },
      { date: '2023/03/12', type: 'Training' },
      { date: '2023/03/05', type: 'Training' },
      // February 2023
      { date: '2023/02/26', type: 'Training' },
      { date: '2023/02/19', type: 'Training' },
      { date: '2023/02/15', type: 'Game' },
      { date: '2023/02/12', type: 'Training' },
      { date: '2023/02/05', type: 'Training' }
    ],
    runningActivity: [
      { date: '2024/01/19', time: '4:15', trend: 255 },
      { date: '2024/01/18', time: '4:18', trend: 258 },
      { date: '2024/01/15', time: '4:20', trend: 260 },
      { date: '2024/01/10', time: '4:25', trend: 265 },
      { date: '2024/01/08', time: '4:22', trend: 262 },
      { date: '2024/01/05', time: '4:28', trend: 268 },
      { date: '2024/01/01', time: '4:30', trend: 270 },
    ].map(entry => ({
      ...entry,
      seconds: timeToSeconds(entry.time)
    })),
    runningStats: {
      base1km: '4:30',
      latest1km: '4:15',
      pb1km: '4:10',
    },
    imageUrl: '/players/alex.jpg'
  },
  {
    id: '2',
    name: 'Sarah Lee',
    position: 'Cutter',
    joinedYear: 2021,
    rank: 2,
    points: 1180,
    attendanceStats: {
      totalSessions: 48,
      attendedSessions: 44,
      attendanceRate: '92%',
      streak: 5,
      longestStreak: 12
    },
    attendanceActivity: [
      // January 2025
      { date: '2025/01/19', type: 'Training' },
      { date: '2025/01/17', type: 'Game' },
      { date: '2025/01/15', type: 'Training' },
      { date: '2025/01/12', type: 'Training' },
      { date: '2025/01/10', type: 'Training' },
      { date: '2025/01/08', type: 'Game' },
      { date: '2025/01/05', type: 'Training' },
      // Add more dates...
    ],
    runningActivity: [
      { date: '2024/01/19', time: '4:30', trend: 270 },
      { date: '2024/01/18', time: '4:32', trend: 272 },
      { date: '2024/01/15', time: '4:35', trend: 275 },
      { date: '2024/01/10', time: '4:40', trend: 280 },
      { date: '2024/01/08', time: '4:38', trend: 278 },
      { date: '2024/01/05', time: '4:42', trend: 282 },
      { date: '2024/01/01', time: '4:45', trend: 285 },
    ].map(entry => ({
      ...entry,
      seconds: timeToSeconds(entry.time)
    })),
    runningStats: {
      base1km: '4:45',
      latest1km: '4:30',
      pb1km: '4:20',
    },
    imageUrl: '/players/sarah.jpg'
  },
  {
    id: '3',
    name: 'Ben Chen',
    position: 'Handler',
    joinedYear: 2023,
    rank: 3,
    points: 980,
    attendanceStats: {
      totalSessions: 48,
      attendedSessions: 44,
      attendanceRate: '92%',
      streak: 5,
      longestStreak: 12
    },
    attendanceActivity: [
      // January 2025
      { date: '2025/01/19', type: 'Training' },
      { date: '2025/01/17', type: 'Game' },
      { date: '2025/01/15', type: 'Training' },
      { date: '2025/01/12', type: 'Training' },
      { date: '2025/01/10', type: 'Training' },
      { date: '2025/01/08', type: 'Game' },
      { date: '2025/01/05', type: 'Training' },
      // Add more dates...
    ],
    runningActivity: [
      { date: '2024/01/19', time: '4:45', trend: 285 },
      { date: '2024/01/18', time: '4:48', trend: 288 },
      { date: '2024/01/15', time: '4:50', trend: 290 },
      { date: '2024/01/10', time: '4:55', trend: 295 },
      { date: '2024/01/08', time: '4:52', trend: 292 },
      { date: '2024/01/05', time: '4:58', trend: 298 },
      { date: '2024/01/01', time: '5:00', trend: 300 },
    ].map(entry => ({
      ...entry,
      seconds: timeToSeconds(entry.time)
    })),
    runningStats: {
      base1km: '5:00',
      latest1km: '4:45',
      pb1km: '4:30',
    },
    imageUrl: '/players/ben.jpg'
  },
  // Add more mock players...
].sort((a, b) => a.name.localeCompare(b.name));

const ProfilePage = () => {
  const searchParams = useSearchParams();
  const selectedId = searchParams.get('id') || mockPlayers[0].id;
  const [searchQuery, setSearchQuery] = useState('');
  const [timePeriod, setTimePeriod] = useState('1y');
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showUndo, setShowUndo] = useState(false);
  const [lastAttendance, setLastAttendance] = useState<{ date: Date; type: string } | null>(null);

  // Function to format date for display
  const formatDate = (date: Date) => {
    if (isToday(date)) {
      return 'Today';
    }
    if (isYesterday(date)) {
      return 'Yesterday';
    }
    return format(date, 'EEEE, MMMM d');
  };

  // Quick date options
  const quickDates = [
    { label: 'Today', date: new Date() },
    { label: 'Yesterday', date: addDays(new Date(), -1) },
    { label: '2 Days Ago', date: addDays(new Date(), -2) },
  ];

  // Function to handle attendance marking
  const handleMarkAttendance = (type: 'Training' | 'Game') => {
    setLastAttendance({ date: selectedDate, type });
    setShowUndo(true);
    setShowAttendanceModal(false);

    setTimeout(() => {
      setShowUndo(false);
      setLastAttendance(null);
    }, 10000);
  };

  // Function to handle undo
  const handleUndo = () => {
    if (lastAttendance) {
      setShowUndo(false);
      setLastAttendance(null);
    }
  };

  const filteredPlayers = mockPlayers.filter(player =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedPlayer = mockPlayers.find(player => player.id === selectedId);

  // Calculate start date based on selected time period
  const getStartDate = () => {
    const now = new Date();
    switch (timePeriod) {
      case '3m':
        return new Date(now.setMonth(now.getMonth() - 3));
      case '6m':
        return new Date(now.setMonth(now.getMonth() - 6));
      case '1y':
        return new Date(now.setFullYear(now.getFullYear() - 1));
      default:
        return new Date(now.setMonth(now.getMonth() - 3));
    }
  };

  return (
    <div className="flex-1 flex">
      {/* Left Sidebar */}
      <div className="w-80 bg-gray-800/50 border-r border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <input
            type="text"
            placeholder="Search players..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <div className="flex-1">
          {filteredPlayers.map((player) => (
            <Link 
              key={player.id}
              href={`/profile?id=${player.id}`}
              className={`block px-4 py-3 border-b border-gray-700/50 transition-colors ${
                selectedId === player.id ? 'bg-blue-500/10 border-blue-500/50' : 'hover:bg-gray-700/50'
              }`}
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                  <Avatar
                    size={32}
                    name={player.name}
                    variant="beam"
                    colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                  />
                </div>
                <div>
                  <div className="text-white font-medium">{player.name}</div>
                  <div className="text-sm text-gray-400">{player.position}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      {selectedPlayer && (
        <div className="flex-1">
          <div className="p-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={selectedPlayer.id}
              className="max-w-7xl mx-auto"
            >
              {/* Profile Header */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 p-3 mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <Avatar
                      size={64}
                      name={selectedPlayer.name}
                      variant="beam"
                      colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <h1 className="text-xl font-bold text-white">{selectedPlayer.name}</h1>
                          <span className="text-gray-400">•</span>
                          <p className="text-gray-400">{selectedPlayer.position}</p>
                          <span className="text-gray-400">•</span>
                          <p className="text-gray-400">Joined {selectedPlayer.joinedYear}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-xl font-bold text-white">#{selectedPlayer.rank}</div>
                        <div className="text-blue-400 font-medium">{selectedPlayer.points} pts</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Grid Layout */}
              <div className="grid grid-cols-12 gap-4">
                {/* Left Column - Running Stats */}
                <div className="col-span-8">
                  {/* Running Times Section */}
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 p-4 mb-4">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-bold text-white">Running Stats</h2>
                      <Link 
                        href={`/profile/${selectedPlayer.id}/running`}
                        className="btn-primary px-3 py-1.5 text-sm inline-flex items-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Log Time
                      </Link>
                    </div>

                    {/* Running Times Display */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="bg-gray-700/30 rounded-lg p-3">
                        <div className="text-sm text-gray-400">Base 1km</div>
                        <div className="text-xl font-bold text-white">{selectedPlayer.runningStats.base1km}</div>
                      </div>
                      <div className="bg-gray-700/30 rounded-lg p-3">
                        <div className="text-sm text-gray-400">Latest 1km</div>
                        <div className="text-xl font-bold text-white">{selectedPlayer.runningStats.latest1km}</div>
                      </div>
                      <div className="bg-gray-700/30 rounded-lg p-3">
                        <div className="text-sm text-gray-400">1km PB</div>
                        <div className="text-xl font-bold text-white">{selectedPlayer.runningStats.pb1km}</div>
                      </div>
                    </div>

                    {/* Running Progress Chart */}
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart
                          data={selectedPlayer.runningActivity}
                          margin={{ top: 5, right: 20, left: 20, bottom: 20 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis 
                            dataKey="date" 
                            stroke="#9CA3AF"
                            tick={{ fill: '#9CA3AF' }}
                            tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                          />
                          <YAxis 
                            stroke="#9CA3AF"
                            tick={{ fill: '#9CA3AF' }}
                            domain={['dataMin - 10', 'dataMax + 10']}
                            tickFormatter={(value) => secondsToTime(value)}
                          />
                          <RechartsTooltip
                            contentStyle={{
                              backgroundColor: '#1F2937',
                              border: '1px solid #374151',
                              borderRadius: '0.5rem',
                            }}
                            labelStyle={{ color: '#9CA3AF' }}
                            itemStyle={{ color: '#E5E7EB' }}
                            formatter={(value) => secondsToTime(value)}
                            labelFormatter={(label) => new Date(label).toLocaleDateString()}
                          />
                          <Bar 
                            dataKey="seconds" 
                            fill="rgba(59, 130, 246, 0.6)"
                            radius={[4, 4, 0, 0]}
                          />
                          <Line
                            type="monotone"
                            dataKey="trend"
                            stroke="#10B981"
                            strokeWidth={2}
                            dot={false}
                          />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Attendance Section with Heatmap */}
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-4">
                        <h2 className="text-lg font-bold text-white">Attendance</h2>
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-green-500/60 mr-1"></div>
                            <span>Training</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-purple-500/60 mr-1"></div>
                            <span>Game</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setShowAttendanceModal(true)}
                          className="btn-primary px-3 py-1.5 text-sm inline-flex items-center"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Mark Attendance
                        </button>
                      </div>
                    </div>

                    {/* Attendance Stats Grid */}
                    <div className="grid grid-cols-4 gap-3 mb-4">
                      <div className="bg-gray-700/30 rounded-lg p-3">
                        <div className="text-sm text-gray-400">Rate</div>
                        <div className="text-xl font-bold text-white">{selectedPlayer.attendanceStats.attendanceRate}</div>
                      </div>
                      <div className="bg-gray-700/30 rounded-lg p-3">
                        <div className="text-sm text-gray-400">Total</div>
                        <div className="text-xl font-bold text-white">{selectedPlayer.attendanceStats.totalSessions}</div>
                      </div>
                      <div className="bg-gray-700/30 rounded-lg p-3">
                        <div className="text-sm text-gray-400">Streak</div>
                        <div className="text-xl font-bold text-white">{selectedPlayer.attendanceStats.streak}</div>
                      </div>
                      <div className="bg-gray-700/30 rounded-lg p-3">
                        <div className="text-sm text-gray-400">Best</div>
                        <div className="text-xl font-bold text-white">{selectedPlayer.attendanceStats.longestStreak}</div>
                      </div>
                    </div>

                    {/* Heatmap */}
                    <div className="w-full">
                      <HeatMap
                        value={selectedPlayer.attendanceActivity.map(item => ({
                          date: item.date,
                          count: item.type === 'Training' ? 1 : 2,
                        }))}
                        width="100%"
                        height={120}
                        style={{ 
                          color: '#fff',
                          width: '100%',
                          maxWidth: '100%',
                        }}
                        startDate={getStartDate()}
                        endDate={new Date('2025-01-19')}
                        rectSize={10}
                        rectProps={{
                          rx: 2,
                        }}
                        space={3}
                        legendCellSize={0}
                        rectRender={(props, data) => {
                          const type = selectedPlayer.attendanceActivity.find(
                            item => item.date === data?.date
                          )?.type;

                          if (!data || !type) return <rect {...props} fill="#1f2937" />;
                          
                          return (
                            <Tooltip
                              key={props.key}
                              placement="top"
                              content={`${new Date(data.date).toLocaleDateString()}\n${type}`}
                            >
                              <rect 
                                {...props} 
                                fill={type === 'Training' ? 'rgba(34, 197, 94, 0.6)' : 'rgba(168, 85, 247, 0.6)'}
                              />
                            </Tooltip>
                          );
                        }}
                      />
                    </div>
                    <div className="flex gap-2 justify-end pr-5">
                      {['3m', '6m', '1y'].map((period) => (
                        <button
                          key={period}
                          onClick={() => setTimePeriod(period)}
                          className={`px-2 py-1 rounded text-xs transition-colors ${
                            timePeriod === period
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/50'
                              : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          {period.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Comments */}
                <div className="col-span-4">
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 h-full">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-bold text-white">Comments</h2>
                      <Link
                        className="btn-primary px-3 py-1.5 text-sm inline-flex items-center"
                        href={`/profile/${selectedId}/comments`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Comment
                      </Link>
                    </div>
                    <div className="space-y-3">
                      {[
                        {
                          id: '1',
                          author: 'Coach Mike',
                          date: '2025/01/19',
                          content: 'Great improvement in your cutting technique!',
                          type: 'positive'
                        },
                        {
                          id: '2',
                          author: 'Team Captain',
                          date: '2025/01/15',
                          content: 'Need to work on defensive positioning.',
                          type: 'constructive'
                        },
                        {
                          id: '3',
                          author: 'Coach Sarah',
                          date: '2025/01/12',
                          content: 'Excellent leadership during today\'s drills.',
                          type: 'positive'
                        }
                      ].map((comment) => (
                        <motion.div
                          key={comment.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="bg-gray-700/30 rounded-lg p-3"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center">
                              <div className="w-5 h-5 rounded-full overflow-hidden mr-2">
                                <Avatar
                                  size={20}
                                  name={comment.author}
                                  variant="beam"
                                  colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                                />
                              </div>
                              <div>
                                <span className="font-medium text-white">{comment.author}</span>
                                <span className="mx-2 text-gray-400">•</span>
                                <span className="text-sm text-gray-400">{comment.date}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-300">{comment.content}</p>
                        </motion.div>
                      ))}
                    </div>
                    <div className="mt-6 flex justify-center">
                      <Link
                        href={`/profile/${selectedId}/comments`}
                        className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                      >
                        View all comments
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
      {/* Attendance Modal */}
      {showAttendanceModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-bold text-white">Mark Attendance</h3>
              <button
                onClick={() => setShowAttendanceModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Date Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-400 mb-3">
                Select Date
              </label>
              
              {/* Quick Date Selection */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {quickDates.map((option) => (
                  <button
                    key={option.label}
                    onClick={() => {
                      setSelectedDate(option.date);
                      setShowDatePicker(false);
                    }}
                    className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                      isToday(selectedDate) && option.label === 'Today' ||
                      isYesterday(selectedDate) && option.label === 'Yesterday' ||
                      format(selectedDate, 'yyyy-MM-dd') === format(option.date, 'yyyy-MM-dd')
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/50'
                        : 'bg-gray-700/50 text-gray-300 border border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              {/* Custom Date Selection */}
              <button
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white hover:border-gray-500 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDate(selectedDate)}
                </span>
                <svg className={`w-5 h-5 text-gray-400 transition-transform ${showDatePicker ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Date Picker Popover */}
              {showDatePicker && (
                <div className="mt-2 p-3 bg-gray-700 border border-gray-600 rounded-lg">
                  <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      if (date) {
                        setSelectedDate(date);
                        setShowDatePicker(false);
                      }
                    }}
                    modifiers={{
                      today: new Date(),
                    }}
                    modifiersStyles={{
                      today: {
                        fontWeight: 'bold',
                        border: '2px solid #60A5FA',
                      },
                    }}
                    styles={{
                      caption: { color: '#E5E7EB' },
                      head_cell: { color: '#9CA3AF' },
                      cell: { color: '#E5E7EB' },
                      day_selected: {
                        backgroundColor: '#2563EB',
                        color: 'white',
                      },
                      day_today: {
                        color: '#60A5FA',
                      },
                    }}
                  />
                </div>
              )}
            </div>

            {/* Session Type Selection */}
            <div className="space-y-4">
              <button
                onClick={() => handleMarkAttendance('Training')}
                className="w-full bg-green-500/20 hover:bg-green-500/30 text-green-300 border border-green-500/50 rounded-lg p-4 flex items-center gap-3 transition-colors group"
              >
                <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
                <div className="flex-1 text-left">
                  <div className="font-medium">Training Session</div>
                  <div className="text-sm text-green-300/70">Regular weekly training</div>
                </div>
                <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={() => handleMarkAttendance('Game')}
                className="w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/50 rounded-lg p-4 flex items-center gap-3 transition-colors group"
              >
                <div className="w-3 h-3 rounded-full bg-purple-500/60"></div>
                <div className="flex-1 text-left">
                  <div className="font-medium">Game Session</div>
                  <div className="text-sm text-purple-300/70">Tournament or friendly match</div>
                </div>
                <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="mt-6 text-sm text-gray-400">
              Marking attendance for <span className="text-white font-medium">{selectedPlayer?.name}</span>
            </div>
          </div>
        </div>
      )}

      {/* Undo Toast */}
      {showUndo && lastAttendance && (
        <div className="fixed bottom-4 right-4 bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4 flex items-center gap-4 animate-fade-in">
          <div className="flex-1">
            <div className="text-sm text-gray-300">
              Marked {lastAttendance.type.toLowerCase()} attendance for {formatDate(lastAttendance.date)}
            </div>
          </div>
          <button
            onClick={handleUndo}
            className="text-blue-400 hover:text-blue-300 text-sm font-medium"
          >
            Undo
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
