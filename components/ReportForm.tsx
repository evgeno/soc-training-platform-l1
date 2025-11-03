import React, { useState } from 'react';
import { Incident } from '../types';
import { RECOMMENDATIONS_OPTIONS } from '../constants';

interface ReportFormProps {
  incident: Incident;
  onSubmitSuccess: () => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ incident, onSubmitSuccess }) => {
  const [attackerIp, setAttackerIp] = useState('');
  const [attackerDomain, setAttackerDomain] = useState('');
  const [victim, setVictim] = useState('');
  const [selectedRecommendations, setSelectedRecommendations] = useState<Set<string>>(new Set());
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string>('');

  const handleRecommendationToggle = (rec: string) => {
    const newSet = new Set(selectedRecommendations);
    if (newSet.has(rec)) {
      newSet.delete(rec);
    } else {
      newSet.add(rec);
    }
    setSelectedRecommendations(newSet);
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    const { solution } = incident;
    
    if (solution.attackerIp && attackerIp.trim() !== solution.attackerIp) {
      newErrors.attackerIp = 'Неверный IP злоумышленника.';
    }
    if (solution.attackerDomain && attackerDomain.trim() !== solution.attackerDomain) {
      newErrors.attackerDomain = 'Неверный домен злоумышленника.';
    }
    if (solution.victim && victim.trim() !== solution.victim) {
      newErrors.victim = 'Неверный идентификатор жертвы.';
    }

    const solutionRecs = new Set(solution.recommendations);
    if (selectedRecommendations.size !== solutionRecs.size || ![...selectedRecommendations].every(rec => solutionRecs.has(rec))) {
      newErrors.recommendations = 'Выбран неверный набор рекомендаций.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError('');
    if (validate()) {
      alert('Отчет верен! Инцидент будет закрыт.');
      onSubmitSuccess();
    } else {
      setGeneralError('Отчет содержит ошибки. Пожалуйста, проверьте введенные данные и попробуйте снова.');
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-200 mb-2">Итоговый отчет по инциденту</h3>
      <p className="text-sm text-slate-400 mb-4">
        Заполните поля ниже, чтобы подтвердить результаты расследования. Верный отчет закроет инцидент.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="attackerIp" className="block text-sm font-medium text-slate-300 mb-1">IP-адрес злоумышленника</label>
          <input
            id="attackerIp"
            type="text"
            value={attackerIp}
            onChange={(e) => setAttackerIp(e.target.value)}
            disabled={!incident.solution.attackerIp}
            placeholder={incident.solution.attackerIp ? "Введите IP..." : "Неприменимо"}
            className={`w-full bg-slate-900 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.attackerIp ? 'border-red-500' : 'border-slate-600'}`}
          />
          {errors.attackerIp && <p className="text-red-400 text-xs mt-1">{errors.attackerIp}</p>}
        </div>
        <div>
          <label htmlFor="attackerDomain" className="block text-sm font-medium text-slate-300 mb-1">Домен злоумышленника</label>
          <input
            id="attackerDomain"
            type="text"
            value={attackerDomain}
            onChange={(e) => setAttackerDomain(e.target.value)}
            disabled={!incident.solution.attackerDomain}
            placeholder={incident.solution.attackerDomain ? "Введите домен..." : "Неприменимо"}
            className={`w-full bg-slate-900 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.attackerDomain ? 'border-red-500' : 'border-slate-600'}`}
          />
          {errors.attackerDomain && <p className="text-red-400 text-xs mt-1">{errors.attackerDomain}</p>}
        </div>
        <div>
          <label htmlFor="victim" className="block text-sm font-medium text-slate-300 mb-1">Идентификатор жертвы (имя хоста, учетная запись)</label>
          <input
            id="victim"
            type="text"
            value={victim}
            onChange={(e) => setVictim(e.target.value)}
            disabled={!incident.solution.victim}
            placeholder={incident.solution.victim ? "Введите идентификатор..." : "Неприменимо"}
            className={`w-full bg-slate-900 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.victim ? 'border-red-500' : 'border-slate-600'}`}
          />
          {errors.victim && <p className="text-red-400 text-xs mt-1">{errors.victim}</p>}
        </div>
        <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Рекомендации по реагированию</label>
            <div className="space-y-2">
                {RECOMMENDATIONS_OPTIONS.map(rec => (
                    <label key={rec} className="flex items-center gap-3 p-2 bg-slate-800 rounded-md">
                        <input
                            type="checkbox"
                            checked={selectedRecommendations.has(rec)}
                            onChange={() => handleRecommendationToggle(rec)}
                            className="form-checkbox bg-slate-900 border-slate-600 text-blue-500 h-5 w-5 rounded focus:ring-blue-500"
                        />
                        <span className="text-slate-300">{rec}</span>
                    </label>
                ))}
            </div>
            {errors.recommendations && <p className="text-red-400 text-xs mt-1">{errors.recommendations}</p>}
        </div>
        
        {generalError && <p className="text-red-400 text-sm bg-red-500/10 p-3 rounded-md">{generalError}</p>}
        
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-green-600 text-white font-bold px-6 py-2 rounded-md hover:bg-green-500 transition-colors"
          >
            Отправить отчет и закрыть инцидент
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportForm;