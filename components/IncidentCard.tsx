import React from 'react';
import { Incident } from '../types';
import { DIFFICULTY_COLORS, STATUS_COLORS } from '../constants';

interface IncidentCardProps {
  incident: Incident;
  onSelect: (id: string) => void;
}

const IncidentCard: React.FC<IncidentCardProps> = ({ incident, onSelect }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 flex flex-col justify-between hover:bg-slate-800/80 hover:border-blue-500/50 transition-all duration-200">
      <div>
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-slate-100">{incident.title}</h3>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${DIFFICULTY_COLORS[incident.difficulty]}`}>
            {incident.difficulty}
          </span>
        </div>
        <p className="text-sm text-slate-400 font-mono">{incident.id}</p>
        <p className="text-xs text-slate-500 mt-1">
          {new Date(incident.createdAt).toLocaleString('ru-RU')}
        </p>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${STATUS_COLORS[incident.status]}`}>
            {incident.status}
        </span>
        <button
          onClick={() => onSelect(incident.id)}
          className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm font-semibold hover:bg-blue-500 transition-colors"
        >
          Расследовать
        </button>
      </div>
    </div>
  );
};

export default IncidentCard;
