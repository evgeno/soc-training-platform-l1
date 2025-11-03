import React, { useState } from 'react';
import { Incident, IncidentStatus } from '../types';
import InvestigationHeader from './InvestigationHeader';
import InvestigationSidebar from './InvestigationSidebar';
import LogViewer from './LogViewer';
import IOCChecker from './IOCChecker';
import Playbooks from './Playbooks';
import MitreMatrix from './MitreMatrix';
import ReportForm from './ReportForm';
import EmailViewer from './EmailViewer';

type ActiveTab = 'logs' | 'ioc' | 'playbooks' | 'mitre' | 'email' | 'report';

interface InvestigationViewProps {
  incident: Incident;
  onReturnToDashboard: () => void;
  updateIncident: (id: string, updates: Partial<Incident>) => void;
}

const InvestigationView: React.FC<InvestigationViewProps> = ({ incident, onReturnToDashboard, updateIncident }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('logs');

  const handleReportSuccess = () => {
    updateIncident(incident.id, { status: IncidentStatus.Resolved });
    onReturnToDashboard();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'logs':
        return <LogViewer logs={incident.logs} />;
      case 'ioc':
        return <IOCChecker iocs={incident.iocs} />;
      case 'playbooks':
        return <Playbooks 
                    incidentId={incident.id} 
                    initialSteps={incident.playbook} 
                    updateIncident={updateIncident}
                />;
      case 'mitre':
        return <MitreMatrix relevantTactics={incident.mitreTactics} />;
      case 'email':
        return incident.emailBody ? <EmailViewer emailBody={incident.emailBody} /> : <div className="p-4 bg-slate-800 rounded-lg">Нет данных о письме для этого инцидента.</div>;
      case 'report':
        return <ReportForm 
                    incident={incident}
                    onSubmitSuccess={handleReportSuccess}
                />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      <InvestigationHeader 
        incident={incident} 
        onReturnToDashboard={onReturnToDashboard} 
        updateIncident={updateIncident}
      />
      <div className="flex-grow flex gap-6 mt-6 overflow-y-auto">
        <InvestigationSidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            hasEmail={!!incident.emailBody}
        />
        <div className="flex-grow bg-slate-800/50 border border-slate-700 rounded-lg p-4 overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default InvestigationView;