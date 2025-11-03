
import React from 'react';

interface EmailViewerProps {
  emailBody: string;
}

const EmailViewer: React.FC<EmailViewerProps> = ({ emailBody }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-200 mb-4">Тело письма</h3>
      <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 font-mono text-sm text-slate-300 whitespace-pre-wrap">
        {emailBody}
      </div>
    </div>
  );
};

export default EmailViewer;
