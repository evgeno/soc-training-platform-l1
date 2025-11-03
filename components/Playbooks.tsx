
import React, { useState } from 'react';
import { PlaybookStep } from '../types';

interface PlaybooksProps {
  incidentId: string;
  initialSteps: PlaybookStep[];
  updateIncident: (id: string, updates: any) => void;
}

const Playbooks: React.FC<PlaybooksProps> = ({ incidentId, initialSteps, updateIncident }) => {
  const [steps, setSteps] = useState<PlaybookStep[]>(initialSteps);

  const handleToggleStep = (stepId: number) => {
    const newSteps = steps.map(step =>
      step.id === stepId ? { ...step, completed: !step.completed } : step
    );
    setSteps(newSteps);
    updateIncident(incidentId, { playbook: newSteps });
  };
  
  const completionPercentage = steps.length > 0 ? Math.round((steps.filter(s => s.completed).length / steps.length) * 100) : 0;

  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-200 mb-4">Плейбук расследования</h3>
      
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-base font-medium text-blue-400">Прогресс</span>
          <span className="text-sm font-medium text-blue-400">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2.5">
          <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${completionPercentage}%` }}></div>
        </div>
      </div>
      
      <ul className="space-y-3">
        {steps.map(step => (
          <li key={step.id}>
            <label className="flex items-center p-3 bg-slate-700/50 rounded-lg cursor-pointer hover:bg-slate-700 transition-colors">
              <input
                type="checkbox"
                checked={step.completed}
                onChange={() => handleToggleStep(step.id)}
                className="form-checkbox bg-slate-900 border-slate-600 text-blue-500 h-5 w-5 rounded focus:ring-blue-500 mr-4"
              />
              <span className={`text-slate-300 ${step.completed ? 'line-through text-slate-500' : ''}`}>
                {step.text}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playbooks;
