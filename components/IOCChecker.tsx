
import React, { useState } from 'react';
import { IOC } from '../types';

interface IOCCheckerProps {
  iocs: IOC[];
}

interface CheckResult {
  value: string;
  isMalicious: boolean;
  found: boolean;
}

const IOCChecker: React.FC<IOCCheckerProps> = ({ iocs }) => {
  const [inputValue, setInputValue] = useState('');
  const [results, setResults] = useState<CheckResult[]>([]);

  const handleCheck = () => {
    if (!inputValue.trim()) return;
    const valueToCheck = inputValue.trim();
    const foundIoc = iocs.find(ioc => ioc.value === valueToCheck);
    
    const newResult: CheckResult = {
      value: valueToCheck,
      isMalicious: foundIoc?.malicious ?? false,
      found: !!foundIoc,
    };
    
    setResults(prev => [newResult, ...prev]);
    setInputValue('');
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-200 mb-4">Проверка индикаторов компрометации</h3>
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
          placeholder="Введите IP, домен, хэш и т.д."
          className="flex-grow bg-slate-900 border border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleCheck}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition-colors"
        >
          Проверить
        </button>
      </div>
      <div className="mt-6">
        <h4 className="font-semibold text-slate-300">Результаты:</h4>
        <ul className="mt-2 space-y-2">
          {results.map((result, index) => (
            <li key={index} className="bg-slate-700/50 p-3 rounded-md flex justify-between items-center">
              <span className="font-mono text-slate-200">{result.value}</span>
              {result.found ? (
                result.isMalicious ? (
                  <span className="px-2 py-1 text-xs font-bold text-red-300 bg-red-500/20 rounded-full">ВРЕДОНОСНЫЙ</span>
                ) : (
                  <span className="px-2 py-1 text-xs font-bold text-green-300 bg-green-500/20 rounded-full">БЕЗВРЕДНЫЙ</span>
                )
              ) : (
                <span className="px-2 py-1 text-xs font-bold text-slate-400 bg-slate-500/20 rounded-full">НЕ НАЙДЕНО</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IOCChecker;
