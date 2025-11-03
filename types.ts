export enum Difficulty {
  Low = 'Низкая',
  Medium = 'Средняя',
  High = 'Высокая',
}

export enum IncidentStatus {
  New = 'Новый',
  InProgress = 'В работе',
  OnReview = 'На проверке',
  Resolved = 'Решен',
}

export enum LogLevel {
  Info = 'Инфо',
  Warning = 'Предупреждение',
  Error = 'Ошибка',
  Critical = 'Критический',
}

export interface LogEntry {
  id: number;
  timestamp: string;
  type: string;
  source: string;
  level: LogLevel;
  message: string;
  isAnomaly?: boolean;
}

export interface IOC {
  type: 'domain' | 'ip' | 'hash' | 'url' | 'signature' | 'script' | 'pattern';
  value: string;
  malicious: boolean;
}

export interface PlaybookStep {
  id: number;
  text: string;
  completed: boolean;
}

export interface IncidentSolution {
  attackerIp?: string;
  attackerDomain?: string;
  victim?: string;
  recommendations: string[];
}

export interface Incident {
  id: string;
  title: string;
  difficulty: Difficulty;
  status: IncidentStatus;
  createdAt: number;
  timer?: number; // seconds remaining
  isPaused?: boolean;
  logs: LogEntry[];
  iocs: IOC[];
  playbook: PlaybookStep[];
  mitreTactics: string[];
  emailBody?: string;
  solution: IncidentSolution;
}

export type View = 'dashboard' | 'investigation';