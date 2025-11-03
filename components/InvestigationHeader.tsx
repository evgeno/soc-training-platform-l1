
import React, { useCallback } from 'react';
import { Incident } from '../types';
import { useTimer } from '../hooks/useTimer';
import { ArrowLeftIcon, PauseIcon, PlayIcon } from './icons';

interface InvestigationHeaderProps {
    incident: Incident;
    onReturnToDashboard: () => void;
    updateIncident: (id: string, updates: Partial<Incident>) => void;
}

const InvestigationHeader: React.FC<InvestigationHeaderProps> = ({ incident, onReturnToDashboard, updateIncident }) => {
  
  const handleTick = useCallback((seconds: number) => {
    updateIncident(incident.id, { timer: seconds });
  }, [incident.id, updateIncident]);
  
  const { time, isPaused, togglePause } = useTimer(incident.timer || 0, incident.isPaused || false, handleTick);

  const handleTogglePause = () => {
    togglePause();
    updateIncident(incident.id, { isPaused: !isPaused });
  };
  
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <div className="text-sm text-slate-400 mb-1 flex items-center">
            <button onClick={onReturnToDashboard} className="flex items-center gap-1 hover:text-blue-400">
                <ArrowLeftIcon className="w-4 h-4"/>
                Панель управления
            </button>
            <span className="mx-2">/</span>
            <span>Расследование</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-100">
          {incident.title} <span className="text-slate-500 font-mono">({incident.id})</span>
        </h2>
      </div>
      <div className="flex items-center gap-4 bg-slate-800/80 border border-slate-700 rounded-lg p-3">
        <div className="font-mono text-3xl text-red-400 tracking-wider">
          {time}
        </div>
        <button 
          onClick={handleTogglePause} 
          className="p-2 bg-slate-700 rounded-full hover:bg-slate-600 transition-colors"
        >
          {isPaused ? <PlayIcon className="w-5 h-5 text-green-400"/> : <PauseIcon className="w-5 h-5 text-yellow-400"/>}
        </button>
      </div>
    </div>
  );
};

export default InvestigationHeader;
