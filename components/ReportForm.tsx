
import React, { useState } from 'react';

interface ReportFormProps {
  onSubmit: () => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ onSubmit }) => {
  const [attackType, setAttackType] = useState('');
  const [criticality, setCriticality] = useState('');
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attackType || !criticality || !summary.trim()) {
      setError('Все поля обязательны для заполнения.');
      return;
    }
    setError('');
    console.log({ attackType, criticality, summary });
    onSubmit();
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-200 mb-4">Отчет по инциденту</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="attackType" className="block text-sm font-medium text-slate-300 mb-1">Тип атаки</label>
          <select
            id="attackType"
            value={attackType}
            onChange={(e) => setAttackType(e.target.value)}
            className="w-full bg-slate-900 border border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Выберите...</option>
            <option value="Phishing">Фишинг</option>
            <option value="Brute Force">Брутфорс</option>
            <option value="Malware">Вредоносное ПО</option>
            <option value="Data Exfiltration">Эксфильтрация данных</option>
          </select>
        </div>
        <div>
          <label htmlFor="criticality" className="block text-sm font-medium text-slate-300 mb-1">Критичность</label>
          <select
            id="criticality"
            value={criticality}
            onChange={(e) => setCriticality(e.target.value)}
            className="w-full bg-slate-900 border border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Выберите...</option>
            <option value="Low">Низкая</option>
            <option value="Medium">Средняя</option>
            <option value="High">Высокая</option>
            <option value="Critical">Критическая</option>
          </select>
        </div>
        <div>
          <label htmlFor="summary" className="block text-sm font-medium text-slate-300 mb-1">Краткое изложение результатов</label>
          <textarea
            id="summary"
            rows={5}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full bg-slate-900 border border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Опишите инцидент, предпринятые действия и рекомендации."
          />
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-500 transition-colors"
          >
            Отправить и закрыть инцидент
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportForm;
