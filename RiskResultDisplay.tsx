
import React from 'react';
import { ModuleAssessmentResult, MaturityLevel } from '../types';
import { AlertTriangleIcon, CheckCircleIcon, InfoIcon } from './icons';

interface ModuleAssessmentCardProps {
  assessment: ModuleAssessmentResult;
}

const ModuleAssessmentCard: React.FC<ModuleAssessmentCardProps> = ({ assessment }) => {
  const getMaturityStyling = () => {
    switch (assessment.maturityLevel) {
      case MaturityLevel.STRENGTH_AREA:
        return {
          bgColor: 'bg-green-800 bg-opacity-40',
          borderColor: 'border-green-500',
          textColor: 'text-green-300',
          icon: <CheckCircleIcon className="h-6 w-6 sm:h-8 sm:w-8 text-green-400" />,
          label: "Área de Força"
        };
      case MaturityLevel.ATTENTION_POINT:
        return {
          bgColor: 'bg-yellow-800 bg-opacity-40',
          borderColor: 'border-yellow-500',
          textColor: 'text-yellow-300',
          icon: <InfoIcon className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400" />,
          label: "Ponto de Atenção"
        };
      case MaturityLevel.URGENT_ANALYSIS_NEEDED:
        return {
          bgColor: 'bg-red-800 bg-opacity-40',
          borderColor: 'border-red-500',
          textColor: 'text-red-300',
          icon: <AlertTriangleIcon className="h-6 w-6 sm:h-8 sm:w-8 text-red-400" />,
          label: "Requer Análise Urgente"
        };
      default: // MaturityLevel.ERROR or any other
         return {
          bgColor: 'bg-gray-700 bg-opacity-40',
          borderColor: 'border-gray-500',
          textColor: 'text-gray-300',
          icon: <AlertTriangleIcon className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />,
          label: "Erro na Avaliação"
        };
    }
  };

  const { bgColor, borderColor, textColor, icon, label } = getMaturityStyling();
  const scorePercentage = assessment.maxScore > 0 ? (assessment.score / assessment.maxScore) * 100 : 0;

  return (
    <div className={`p-4 sm:p-6 rounded-lg shadow-md border-l-4 ${bgColor} ${borderColor} my-4`}>
      <div className="flex items-center mb-2 sm:mb-3">
        {icon}
        <div className="ml-3">
            <h4 className={`text-lg sm:text-xl font-bold ${textColor}`}>{label}</h4>
            <p className="text-xs sm:text-sm text-brand-text-light opacity-70 -mt-1">Módulo: <span className="font-semibold text-brand-text-light opacity-90">{assessment.module}</span></p>
        </div>
      </div>
       <div className="w-full bg-brand-bg-medium rounded-full h-1.5 mb-2">
          <div 
            className={`h-1.5 rounded-full ${
                assessment.maturityLevel === MaturityLevel.STRENGTH_AREA ? 'bg-green-500' : 
                assessment.maturityLevel === MaturityLevel.ATTENTION_POINT ? 'bg-yellow-500' : 
                assessment.maturityLevel === MaturityLevel.URGENT_ANALYSIS_NEEDED ? 'bg-red-500' : 'bg-gray-500'
            }`} 
            style={{ width: `${scorePercentage}%` }}
            role="progressbar"
            aria-valuenow={scorePercentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Pontuação do módulo ${assessment.module}: ${scorePercentage.toFixed(0)}%`}
            ></div>
        </div>
      <p className={`${textColor} text-sm sm:text-md`}>{assessment.feedback}</p>
    </div>
  );
};

export default ModuleAssessmentCard;
