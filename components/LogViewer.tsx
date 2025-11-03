
import React, { useState, useMemo } from 'react';
import { LogEntry, LogLevel } from '../types';
import { LOG_LEVEL_COLORS } from '../constants';

interface LogViewerProps {
  logs: LogEntry[];
}

const LogViewer: React.FC<LogViewerProps> = ({ logs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [highlightAnomalies, setHighlightAnomalies] = useState(false);

  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const matchesSearch = searchTerm === '' || log.message.toLowerCase().includes(searchTerm.toLowerCase()) || log.source.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLevel = levelFilter === '' || log.level === levelFilter;
      return matchesSearch && matchesLevel;
    });
  }, [logs, searchTerm, levelFilter]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col sm:flex-row gap-4 mb-4 pb-4 border-b border-slate-700">
        <input
          type="text"
          placeholder="Поиск по логам..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-slate-900 border border-slate-600 rounded-md px-3 py-2 w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          className="bg-slate-900 border border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Все уровни</option>
          <option value={LogLevel.Info}>Инфо</option>
          <option value={LogLevel.Warning}>Предупреждение</option>
          <option value={LogLevel.Error}>Ошибка</option>
          <option value={LogLevel.Critical}>Критический</option>
        </select>
        <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={highlightAnomalies}
            onChange={() => setHighlightAnomalies(!highlightAnomalies)}
            className="form-checkbox bg-slate-900 border-slate-600 text-blue-500 h-5 w-5 rounded focus:ring-blue-500"
          />
          Подсветить аномалии
        </label>
      </div>
      <div className="flex-grow overflow-y-auto">
        <table className="w-full text-sm text-left font-mono">
          <thead className="sticky top-0 bg-slate-800 text-xs text-slate-400 uppercase">
            <tr>
              <th className="px-4 py-2">Время</th>
              <th className="px-4 py-2">Уровень</th>
              <th className="px-4 py-2">Источник</th>
              <th className="px-4 py-2">Сообщение</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {filteredLogs.map(log => (
              <tr 
                key={log.id} 
                className={`${(highlightAnomalies && log.isAnomaly) ? 'bg-red-500/10' : 'hover:bg-slate-700/50'}`}
              >
                <td className="px-4 py-2 text-slate-400 whitespace-nowrap">{log.timestamp}</td>
                <td className={`px-4 py-2 font-semibold ${LOG_LEVEL_COLORS[log.level]}`}>{log.level}</td>
                <td className="px-4 py-2 text-slate-300">{log.source}</td>
                <td className="px-4 py-2 text-slate-200">{log.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogViewer;
