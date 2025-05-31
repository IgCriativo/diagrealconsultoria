
import React from 'react';
import { DISCLAIMER_TEXT } from '../constants';
import { AlertTriangleIcon } from './icons';

const DisclaimerBox: React.FC = () => {
  return (
    <div className="bg-amber-800 bg-opacity-30 border-l-4 border-amber-500 p-4 mt-6 mb-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertTriangleIcon className="h-5 w-5 text-amber-400" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-amber-200">{DISCLAIMER_TEXT}</p>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerBox;
