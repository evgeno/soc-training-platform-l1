
import React from 'react';
import { SearchIcon, ShieldCheckIcon, DocumentTextIcon, ChartBarIcon, MailIcon, PencilAltIcon } from './icons';

type ActiveTab = 'logs' | 'ioc' | 'playbooks' | 'mitre' | 'email' | 'report';

interface InvestigationSidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  hasEmail: boolean;
}

const navItems = [
  { id: 'logs', text: 'Логи и события', icon: <SearchIcon className="w-5 h-5" /> },
  { id: 'ioc', text: 'Проверка IOC', icon: <ShieldCheckIcon className="w-5 h-5" /> },
  { id: 'playbooks', text: 'Плейбуки', icon: <DocumentTextIcon className="w-5 h-5" /> },
  { id: 'mitre', text: 'MITRE ATT&CK', icon: <ChartBarIcon className="w-5 h-5" /> },
  { id: 'email', text: 'Тело письма', icon: <MailIcon className="w-5 h-5" /> },
  { id: 'report', text: 'Составить отчет', icon: <PencilAltIcon className="w-5 h-5" /> },
];

const InvestigationSidebar: React.FC<InvestigationSidebarProps> = ({ activeTab, setActiveTab, hasEmail }) => {
  return (
    <nav className="w-64 bg-slate-800/50 border border-slate-700 rounded-lg p-4 flex-shrink-0">
      <ul className="space-y-2">
        {navItems.map((item) => {
          if (item.id === 'email' && !hasEmail) {
            return null;
          }
          const isActive = activeTab === item.id;
          return (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id as ActiveTab)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-500/20 text-blue-300'
                    : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
                }`}
              >
                {item.icon}
                {item.text}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default InvestigationSidebar;
