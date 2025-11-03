
import React, { useState } from 'react';
import { MITRE_TACTICS_DATA } from '../constants';

interface MitreMatrixProps {
  relevantTactics: string[];
}

const MitreMatrix: React.FC<MitreMatrixProps> = ({ relevantTactics }) => {
    const [selectedTactic, setSelectedTactic] = useState<string | null>(null);

    return (
        <div>
            <h3 className="text-lg font-semibold text-slate-200 mb-4">Матрица MITRE ATT&CK</h3>
            <p className="text-sm text-slate-400 mb-4">Релевантные тактики для этого инцидента подсвечены. Нажмите, чтобы увидеть ID техник.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 text-center text-xs">
                {Object.entries(MITRE_TACTICS_DATA).map(([tactic, techniques]) => {
                    const isRelevant = techniques.some(t => relevantTactics.includes(t));
                    return (
                        <div key={tactic}>
                            <div
                                onClick={() => setSelectedTactic(selectedTactic === tactic ? null : tactic)}
                                className={`p-2 font-bold bg-slate-700 text-slate-300 rounded-t-md cursor-pointer ${isRelevant ? 'ring-2 ring-red-500' : ''}`}
                            >
                                {tactic}
                            </div>
                            <div className={`p-2 bg-slate-800 rounded-b-md ${isRelevant ? 'text-red-400' : 'text-slate-400'}`}>
                                {selectedTactic === tactic ? techniques.join(', ') : `${techniques.length} техник`}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MitreMatrix;
