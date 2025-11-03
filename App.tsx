
import React, { useState, useEffect, useCallback } from 'react';
import { Incident, View, IncidentStatus } from './types';
import { INCIDENTS_DATA } from './constants';
import Dashboard from './components/Dashboard';
import InvestigationView from './components/InvestigationView';
import { LockClosedIcon } from './components/icons';

const App: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [view, setView] = useState<View>('dashboard');
  const [activeIncidentId, setActiveIncidentId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedIncidents = localStorage.getItem('soc-incidents');
      if (savedIncidents) {
        setIncidents(JSON.parse(savedIncidents));
      } else {
        setIncidents(INCIDENTS_DATA);
      }
    } catch (error) {
      console.error("Failed to load incidents from localStorage", error);
      setIncidents(INCIDENTS_DATA);
    }
  }, []);

  useEffect(() => {
    if(incidents.length > 0) {
        try {
            localStorage.setItem('soc-incidents', JSON.stringify(incidents));
        } catch (error) {
            console.error("Failed to save incidents to localStorage", error);
        }
    }
  }, [incidents]);
  
  const updateIncident = useCallback((id: string, updates: Partial<Incident>) => {
    setIncidents(prev => 
      prev.map(inc => inc.id === id ? { ...inc, ...updates } : inc)
    );
  }, []);

  const handleTakeIncident = useCallback((id: string) => {
    updateIncident(id, { 
        status: IncidentStatus.InProgress, 
        timer: 20 * 60, // 20 minutes in seconds
        isPaused: false,
    });
    setActiveIncidentId(id);
    setView('investigation');
  }, [updateIncident]);

  const handleReturnToDashboard = useCallback(() => {
    const activeIncident = incidents.find(inc => inc.id === activeIncidentId);
    if (activeIncident && activeIncident.status === IncidentStatus.InProgress) {
        updateIncident(activeIncidentId!, { status: IncidentStatus.OnReview });
    }
    setActiveIncidentId(null);
    setView('dashboard');
  }, [activeIncidentId, incidents, updateIncident]);

  const activeIncident = incidents.find(inc => inc.id === activeIncidentId);

  return (
    <div className="min-h-screen bg-slate-900 font-sans p-4 sm:p-6 lg:p-8">
      <header className="flex justify-between items-center mb-6 pb-4 border-b border-slate-700">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
                <LockClosedIcon className="w-6 h-6 text-blue-400" />
            </div>
            <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
            Платформа для обучения SOC-аналитиков
            </h1>
        </div>
      </header>
      <main>
        {view === 'dashboard' ? (
          <Dashboard incidents={incidents} onTakeIncident={handleTakeIncident} />
        ) : activeIncident ? (
          <InvestigationView 
            incident={activeIncident}
            onReturnToDashboard={handleReturnToDashboard} 
            updateIncident={updateIncident}
            />
        ) : (
          <div>Ошибка: Не выбран активный инцидент.</div>
        )}
      </main>
    </div>
  );
};

export default App;
