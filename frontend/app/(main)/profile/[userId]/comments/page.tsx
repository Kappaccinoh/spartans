'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Avatar from 'boring-avatars';

// Mock data - replace with API call
const mockComments = {
  '1': [
    {
      id: 1,
      author: "Coach Mike",
      date: "2024-01-15",
      content: "Excellent progress in throwing accuracy. Keep working on those hammer throws.",
      type: "coach"
    },
    {
      id: 2,
      author: "Team Lead Sarah",
      date: "2024-01-10",
      content: "Great leadership shown during the last tournament. Your field awareness has improved significantly.",
      type: "team"
    },
    {
      id: 3,
      author: "Coach David",
      date: "2024-01-05",
      content: "Good defensive positioning during practice. Work on maintaining that intensity throughout the game.",
      type: "coach"
    },
    {
      id: 4,
      author: "Team Captain John",
      date: "2024-01-01",
      content: "Solid contribution to our zone defense strategy. Your communication helps the team stay organized.",
      type: "team"
    }
  ]
};

export default function CommentsPage() {
  const params = useParams();
  const userId = params.userId as string;
  const [showAddComment, setShowAddComment] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'coach', 'team'

  const comments = mockComments[userId] || [];
  const filteredComments = comments.filter(comment => 
    filter === 'all' || comment.type === filter
  );

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    // Add comment logic here
    setNewComment('');
    setShowAddComment(false);
  };

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
            <h1 className="text-2xl font-bold text-white">Comments History</h1>
            <button 
              onClick={() => setShowAddComment(true)}
              className="btn-primary px-4 py-2"
            >
              Add Comment
            </button>
          </div>

          {/* Filter */}
          <div className="mt-6 flex gap-4">
            {['all', 'coach', 'team'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === type
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/50'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Add Comment Form */}
        {showAddComment && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 p-6 mb-8"
          >
            <form onSubmit={handleSubmitComment}>
              <h2 className="text-xl font-bold text-white mb-4">Add New Comment</h2>
              <div className="mb-4">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write your comment..."
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                  rows={4}
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowAddComment(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-6 py-2"
                >
                  Post Comment
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Comments List */}
        <div className="space-y-6">
          {filteredComments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-4">
                    <Avatar
                      size={40}
                      name={comment.author}
                      variant="beam"
                      colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                    />
                  </div>
                  <div>
                    <div className="text-white font-medium">{comment.author}</div>
                    <div className="text-sm text-gray-400">{comment.date}</div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  comment.type === 'coach' 
                    ? 'bg-blue-500/20 text-blue-300'
                    : 'bg-purple-500/20 text-purple-300'
                }`}>
                  {comment.type === 'coach' ? 'Coach' : 'Team'}
                </span>
              </div>
              <p className="text-gray-300 leading-relaxed">{comment.content}</p>
            </motion.div>
          ))}
        </div>

        {filteredComments.length === 0 && (
          <div className="text-center text-gray-400 mt-8">
            No comments found for the selected filter.
          </div>
        )}
      </div>
    </div>
  );
}