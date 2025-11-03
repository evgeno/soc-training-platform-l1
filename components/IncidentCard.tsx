
import React, { useState, useRef, useEffect } from 'react';
import { Incident, IncidentStatus } from '../types';
import { DIFFICULTY_COLORS, STATUS_COLORS } from '../constants';
import { ClockIcon, ChevronDownIcon, PlayIcon } from './icons';

interface IncidentCardProps {
  incident: Incident;
  onTakeIncident: (id: string) => void;
}

const IncidentCard: React.FC<IncidentCardProps> = ({ incident, onTakeIncident }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const difficultyColor = DIFFICULTY_COLORS[incident.difficulty];
  const statusColor = STATUS_COLORS[incident.status];
  
  const timeAgo = new Intl.RelativeTimeFormat('ru', { numeric: 'auto' });
  const daysAgo = Math.round((incident.createdAt - Date.now()) / (1000 * 60 * 60 * 24));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg shadow-lg p-4 flex flex-col justify-between hover:border-blue-500 transition-colors duration-200 h-full">
      <div>
        <div className="flex justify-between items-start">
          <p className="text-sm font-bold text-blue-400">{incident.id}</p>
          <div className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${difficultyColor}`}>
            {incident.difficulty}
          </div>
        </div>
        <h3 className="font-semibold text-lg text-slate-100 mt-2 truncate">{incident.title}</h3>
      </div>
      <div className="mt-4">
        <div className="flex justify-between items-center text-sm text-slate-400">
          <span>Статус</span>
          <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${statusColor}`}>
            {incident.status}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm text-slate-400 mt-2">
            <div className="flex items-center gap-1.5">
                <ClockIcon className="w-4 h-4" />
                <span>Создан</span>
            </div>
            <span>{timeAgo.format(daysAgo, 'day')}</span>
        </div>
      </div>
      <div className="relative mt-4" ref={menuRef}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          disabled={incident.status !== IncidentStatus.New}
          className="w-full flex justify-center items-center gap-2 bg-slate-700/80 text-slate-200 px-4 py-2 rounded-md hover:bg-slate-600/80 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed transition-colors"
        >
          Действия <ChevronDownIcon className="w-4 h-4" />
        </button>
        {menuOpen && incident.status === IncidentStatus.New && (
          <div className="absolute bottom-full mb-2 w-full bg-slate-800 border border-slate-600 rounded-md shadow-xl z-10">
            <button
              onClick={() => {
                onTakeIncident(incident.id);
                setMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-slate-700 flex items-center gap-2"
            >
              <PlayIcon className="w-4 h-4 text-green-400"/> Взять в работу
            </button>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-full text-left px-4 py-2 hover:bg-slate-700"
            >
              Отмена
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncidentCard;
