
import React from 'react';
import { Incident } from '../types';
import IncidentCard from './IncidentCard';

interface DashboardProps {
  incidents: Incident[];
  onTakeIncident: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ incidents, onTakeIncident }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-300 mb-4">Очередь инцидентов</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {incidents.map((incident) => (
          <IncidentCard key={incident.id} incident={incident} onTakeIncident={onTakeIncident} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
