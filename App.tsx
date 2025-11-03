import React, { useState, useEffect } from 'react';
import { Incident, View } from './types';
import { INCIDENTS_DATA } from './constants';
import Dashboard from './components/Dashboard';
import InvestigationView from './components/InvestigationView';

const App: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>(() => {
    // Load from localStorage or use initial data
    try {
      const savedIncidents = localStorage.getItem('incidents');
      return savedIncidents ? JSON.parse(savedIncidents) : INCIDENTS_DATA.map(inc => ({
        ...inc,
        timer: inc.difficulty === 'Низкая' ? 1800 : inc.difficulty === 'Средняя' ? 3600 : 5400, // 30, 60, 90 mins
        isPaused: true,
      }));
    } catch (error) {
      console.error("Failed to parse incidents from localStorage", error);
      return INCIDENTS_DATA; // fallback
    }
  });

  const [view, setView] = useState<View>('dashboard');
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null);

  useEffect(() => {
    // Save to localStorage whenever incidents change
    try {
      localStorage.setItem('incidents', JSON.stringify(incidents));
    } catch (error) {
      console.error("Failed to save incidents to localStorage", error);
    }
  }, [incidents]);

  const handleSelectIncident = (id: string) => {
    setSelectedIncidentId(id);
    setView('investigation');
  };

  const handleReturnToDashboard = () => {
    setSelectedIncidentId(null);
    setView('dashboard');
  };

  const updateIncident = (id: string, updates: Partial<Incident>) => {
    setIncidents(prevIncidents =>
      prevIncidents.map(inc =>
        inc.id === id ? { ...inc, ...updates } : inc
      )
    );
  };
  
  const selectedIncident = incidents.find(inc => inc.id === selectedIncidentId);

  return (
    <div className="bg-slate-900 text-slate-200 min-h-screen font-sans">
      <header className="bg-slate-800/50 border-b border-slate-700 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-400">SOC Analyst Simulator</h1>
        </div>
      </header>
      <main className="container mx-auto p-6">
        {view === 'dashboard' ? (
          <Dashboard incidents={incidents} onSelectIncident={handleSelectIncident} />
        ) : selectedIncident ? (
          <InvestigationView 
            incident={selectedIncident} 
            onReturnToDashboard={handleReturnToDashboard}
            updateIncident={updateIncident}
          />
        ) : (
          <div>
            <p>Инцидент не найден. Возврат на панель управления...</p>
            {setTimeout(handleReturnToDashboard, 2000)}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
