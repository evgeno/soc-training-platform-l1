
import { Incident, Difficulty, IncidentStatus, LogLevel } from './types';

export const INCIDENTS_DATA: Incident[] = [
  {
    id: 'INC-001',
    title: 'Фишинговая атака',
    difficulty: Difficulty.Low,
    status: IncidentStatus.New,
    createdAt: Date.now() - 86400000 * 2,
    logs: [
      { id: 1, timestamp: '2023-10-27 09:15:23', type: 'Email', source: 'mail.gateway.com', level: LogLevel.Info, message: 'Получено письмо от marketing@secure-bank.com' },
      { id: 2, timestamp: '2023-10-27 09:16:01', type: 'Proxy', source: 'proxy-01', level: LogLevel.Info, message: 'Пользователь john.doe перешел по URL http://malicious-domain.com/login' },
      { id: 3, timestamp: '2023-10-27 09:16:05', type: 'DNS', source: 'dns-server-01', level: LogLevel.Warning, message: 'DNS-запрос для malicious-domain.com разрешен в 123.45.67.89' },
      { id: 4, timestamp: '2023-10-27 09:17:30', type: 'Endpoint', source: 'john-doe-pc', level: LogLevel.Error, message: 'Файл suspicious.exe загружен в C:\\Users\\john.doe\\Downloads', isAnomaly: true },
      { id: 5, timestamp: '2023-10-27 09:18:00', type: 'Antivirus', source: 'john-doe-pc', level: LogLevel.Critical, message: 'Обнаружено вредоносное ПО: Trojan.GenericKD.3140555 в suspicious.exe' },
    ],
    iocs: [
      { type: 'domain', value: 'malicious-domain.com', malicious: true },
      { type: 'hash', value: 'a1b2c3d4e5f6...', malicious: true },
      { type: 'ip', value: '123.45.67.89', malicious: true },
      { type: 'domain', value: 'google.com', malicious: false },
    ],
    playbook: [
      { id: 1, text: 'Идентифицировать фишинговое письмо', completed: false },
      { id: 2, text: 'Проанализировать заголовки письма', completed: false },
      { id: 3, text: 'Проверить ссылки и вложения на вредоносное содержимое', completed: false },
      { id: 4, text: 'Заблокировать вредоносный домен/IP', completed: false },
      { id: 5, text: 'Изолировать затронутую машину', completed: false },
    ],
    mitreTactics: ['T1566', 'T1204', 'T1059'],
    emailBody: `От: marketing@secure-bank.com\nТема: Срочно: Оповещение безопасности вашего аккаунта\n\nУважаемый клиент,\n\nМы обнаружили необычную активность в вашем аккаунте. В целях безопасности, пожалуйста, немедленно подтвердите свои учетные данные, перейдя по ссылке: http://malicious-domain.com/login\n\nС уважением,\nКоманда Secure Bank`,
  },
  {
    id: 'INC-002',
    title: 'Атака методом перебора',
    difficulty: Difficulty.Medium,
    status: IncidentStatus.New,
    createdAt: Date.now() - 86400000,
    logs: [
        { id: 1, timestamp: '2023-10-28 14:00:00', type: 'Authentication', source: 'sshd', level: LogLevel.Warning, message: 'Неверный пароль для root с 198.51.100.10, порт 22' },
        { id: 2, timestamp: '2023-10-28 14:00:01', type: 'Authentication', source: 'sshd', level: LogLevel.Warning, message: 'Неверный пароль для root с 198.51.100.10, порт 22' },
        { id: 3, timestamp: '2023-10-28 14:00:02', type: 'Firewall', source: 'fw-01', level: LogLevel.Info, message: 'Попытка соединения с 198.51.100.10' },
        { id: 4, timestamp: '2023-10-28 14:00:03', type: 'Authentication', source: 'sshd', level: LogLevel.Warning, message: 'Неверный пароль для root с 198.51.100.10, порт 22', isAnomaly: true },
        { id: 5, timestamp: '2023-10-28 14:00:04', type: 'Authentication', source: 'sshd', level: LogLevel.Critical, message: 'Принят пароль для root с 198.51.100.10, порт 22', isAnomaly: true },
    ],
    iocs: [
        { type: 'ip', value: '198.51.100.10', malicious: true },
        { type: 'signature', value: 'brute-force-tool', malicious: true },
    ],
    playbook: [
        { id: 1, text: 'Определить IP-адрес источника атаки', completed: false },
        { id: 2, text: 'Проверить успешные входы с этого IP', completed: false },
        { id: 3, text: 'Заблокировать вредоносный IP на файрволе', completed: false },
        { id: 4, text: 'Сбросить учетные данные скомпрометированного аккаунта', completed: false },
        { id: 5, text: 'Пересмотреть политики паролей', completed: false },
    ],
    mitreTactics: ['T1110'],
  },
  {
    id: 'INC-003',
    title: 'Подозрительная активность PowerShell',
    difficulty: Difficulty.High,
    status: IncidentStatus.New,
    createdAt: Date.now() - 3600000 * 5,
    logs: [
        { id: 1, timestamp: '2023-10-28 18:30:00', type: 'Windows Event', source: 'workstation-12', level: LogLevel.Info, message: 'Запущен процесс PowerShell' },
        { id: 2, timestamp: '2023-10-28 18:30:15', type: 'Process Monitoring', source: 'workstation-12', level: LogLevel.Warning, message: 'powershell.exe выполнен с параметром -EncodedCommand', isAnomaly: true },
        { id: 3, timestamp: '2023-10-28 18:30:20', type: 'Network', source: 'workstation-12', level: LogLevel.Error, message: 'Исходящее соединение на 203.0.113.55, порт 4444', isAnomaly: true },
        { id: 4, timestamp: '2023-10-28 18:31:00', type: 'Windows Event', source: 'workstation-12', level: LogLevel.Critical, message: 'Создана новая служба: "TempService" с путем к подозрительному файлу' },
    ],
    iocs: [
        { type: 'script', value: 'powershell -enc JABjAGw...', malicious: true },
        { type: 'ip', value: '203.0.113.55', malicious: true },
        { type: 'pattern', value: 'unusual port 4444', malicious: true },
    ],
    playbook: [
        { id: 1, text: 'Изолировать затронутую машину', completed: false },
        { id: 2, text: 'Декодировать команду PowerShell', completed: false },
        { id: 3, text: 'Анализировать сетевой трафик на C2-коммуникации', completed: false },
        { id: 4, text: 'Идентифицировать механизмы персистентности', completed: false },
        { id: 5, text: 'Провести анализ оперативной памяти', completed: false },
    ],
    mitreTactics: ['T1059.001', 'T1547', 'T1071'],
  },
  {
    id: 'INC-004',
    title: 'Эксфильтрация данных',
    difficulty: Difficulty.Medium,
    status: IncidentStatus.New,
    createdAt: Date.now() - 3600000 * 10,
    logs: [],
    iocs: [],
    playbook: [],
    mitreTactics: [],
  },
  {
    id: 'INC-005',
    title: 'Индикаторы шифровальщика',
    difficulty: Difficulty.High,
    status: IncidentStatus.New,
    createdAt: Date.now() - 3600000 * 12,
    logs: [],
    iocs: [],
    playbook: [],
    mitreTactics: [],
  },
  {
    id: 'INC-006',
    title: 'Боковое перемещение',
    difficulty: Difficulty.High,
    status: IncidentStatus.New,
    createdAt: Date.now() - 3600000 * 24,
    logs: [],
    iocs: [],
    playbook: [],
    mitreTactics: [],
  },
  {
    id: 'INC-007',
    title: 'DDoS-атака',
    difficulty: Difficulty.Low,
    status: IncidentStatus.New,
    createdAt: Date.now() - 3600000 * 30,
    logs: [],
    iocs: [],
    playbook: [],
    mitreTactics: [],
  },
];


export const DIFFICULTY_COLORS: { [key in Difficulty]: string } = {
  [Difficulty.Low]: 'bg-green-500/20 text-green-400 border-green-500/30',
  [Difficulty.Medium]: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  [Difficulty.High]: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export const STATUS_COLORS: { [key in IncidentStatus]: string } = {
  [IncidentStatus.New]: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  [IncidentStatus.InProgress]: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  [IncidentStatus.OnReview]: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  [IncidentStatus.Resolved]: 'bg-green-500/20 text-green-400 border-green-500/30',
};

export const LOG_LEVEL_COLORS: { [key in LogLevel]: string } = {
    [LogLevel.Info]: 'text-blue-400',
    [LogLevel.Warning]: 'text-yellow-400',
    [LogLevel.Error]: 'text-orange-400',
    [LogLevel.Critical]: 'text-red-500',
}

export const MITRE_TACTICS_DATA = {
  "Первоначальный доступ": ["T1566", "T1189", "T1190"],
  "Выполнение": ["T1059", "T1204", "T1053"],
  "Закрепление": ["T1547", "T1136", "T1543"],
  "Повышение привилегий": ["T1068", "T1548"],
  "Обход защиты": ["T1027", "T1562"],
  "Доступ к учетным данным": ["T1003", "T1110"],
  "Обнаружение": ["T1082", "T1057"],
  "Боковое перемещение": ["T1570", "T1021"],
  "Сбор": ["T1119", "T1560"],
  "Управление и контроль": ["T1071", "T1090"],
  "Эксфильтрация": ["T1041", "T1048"],
  "Воздействие": ["T1486", "T1490"],
};
