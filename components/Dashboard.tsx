import React from 'react';
import { Incident } from '../types';
import IncidentCard from './IncidentCard';

interface DashboardProps {
  incidents: Incident[];
  onSelectIncident: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ incidents, onSelectIncident }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-100 mb-6">Панель управления инцидентами</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {incidents.map(incident => (
          <IncidentCard key={incident.id} incident={incident} onSelect={onSelectIncident} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
