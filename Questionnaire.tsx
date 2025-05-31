
import React, { useState, useEffect } from 'react';
import { Question, UserAnswer, ModuleType } from '../types';
import { LoadingSpinner } from './icons';

interface QuestionnaireProps {
  moduleType: ModuleType;
  moduleName: string;
  questions: Question[];
  currentModuleIndex: number;
  totalModules: number;
  onSubmit: (answers: UserAnswer[]) => void;
  onBack: () => void; // For going to previous module or welcome
  isLoading: boolean;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({
  moduleType,
  moduleName,
  questions,
  currentModuleIndex,
  totalModules,
  onSubmit,
  onBack,
  isLoading
}) => {
  const [currentAnswers, setCurrentAnswers] = useState<Record<string, { text: string, score: number }>>({});

  useEffect(() => {
    // Reset answers when module changes
    setCurrentAnswers({});
  }, [moduleType]);

  const handleAnswerChange = (questionId: string, answerText: string, answerScore: number) => {
    setCurrentAnswers((prev) => ({ ...prev, [questionId]: { text: answerText, score: answerScore } }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(currentAnswers).length !== questions.length) {
      alert("Por favor, responda todas as perguntas deste módulo.");
      return;
    }
    const userAnswers: UserAnswer[] = questions.map(q => ({
      questionId: q.id,
      questionText: q.text,
      answerText: currentAnswers[q.id].text,
      answerScore: currentAnswers[q.id].score,
      module: q.module,
    }));
    onSubmit(userAnswers);
  };

  const progressPercentage = totalModules > 0 ? ((currentModuleIndex + 1) / totalModules) * 100 : 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-brand-accent">
          Módulo {currentModuleIndex + 1} de {totalModules}: <span className="font-bold">{moduleName}</span>
        </h2>
        <div className="mt-2 w-full bg-brand-bg-medium rounded-full h-2.5">
          <div className="bg-brand-accent h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>

      {questions.map((q, index) => (
        <div key={q.id} className="p-4 bg-brand-bg-light rounded-lg shadow-md border border-brand-primary">
          <p className="text-md font-medium text-brand-text-light mb-3">{index + 1}. {q.text}</p>
          {q.answerType === 'MultipleChoice' && q.options && (
            <div className="space-y-2">
              {q.options.map(option => (
                <label key={option.text} className="flex items-center space-x-2 cursor-pointer text-brand-text-light opacity-90 p-2 rounded hover:bg-brand-bg-medium transition-colors">
                  <input
                    type="radio"
                    name={q.id}
                    value={option.text}
                    onChange={() => handleAnswerChange(q.id, option.text, option.score)}
                    checked={currentAnswers[q.id]?.text === option.text}
                    required
                    className="form-radio h-5 w-5 text-brand-accent bg-brand-bg-medium border-brand-secondary focus:ring-brand-accent"
                    aria-labelledby={`${q.id}_${option.text}_label`}
                  />
                  <span id={`${q.id}_${option.text}_label`}>{option.text}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
      <div className="flex justify-between items-center mt-8">
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          className="bg-brand-secondary hover:opacity-80 text-brand-text-light font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
        >
          {currentModuleIndex === 0 ? "Voltar ao Início" : "Módulo Anterior"}
        </button>
        <button
          type="submit"
          disabled={isLoading || Object.keys(currentAnswers).length !== questions.length}
          className="bg-brand-accent hover:bg-yellow-500 text-brand-text-dark font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? <LoadingSpinner className="w-5 h-5 mr-2 text-brand-text-dark"/> : null}
          {currentModuleIndex + 1 < totalModules ? "Próximo Módulo" : "Ver Resumo do Diagnóstico"}
        </button>
      </div>
    </form>
  );
};

export default Questionnaire;
