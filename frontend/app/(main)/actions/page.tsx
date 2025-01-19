import React from 'react';
import Timeline from '@/components/ActionsLog/Timeline';
import LogActionForm from '@/components/ActionsLog/LogActionForm';
import { ActionFilters } from '@/components/ActionsLog/ActionFilters';

export default function ActionsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Actions Log</h1>
        <LogActionForm />
      </div>

      <div className="mb-6">
        <ActionFilters />
      </div>

      <div className="bg-white rounded-lg shadow">
        <Timeline />
      </div>
    </div>
  );
}
