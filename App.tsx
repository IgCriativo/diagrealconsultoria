
import React, { useState, useEffect, useCallback } from 'react';
import { UserAnswer, ModuleAssessmentResult, UserDetails, AppView, ModuleType } from './types';
import { API_KEY, REAL_CONSULTORIA_WELCOME, REAL_CONSULTORIA_BRAND_NAME, DIAGNOSTIC_MODULES, MODULE_QUESTIONS, getMaturityLevelAndFeedback, MAX_SCORE_PER_MODULE } from './constants';
// import { getSupplementaryInsight } from './services/geminiService'; // For future AI insights

import Header from './components/Header';
import Footer from './components/Footer';
import Questionnaire from './components/Questionnaire';
import ModuleAssessmentCard from './components/RiskResultDisplay'; // Renamed and path corrected
import LeadForm from './components/LeadForm';
import DetailedReportDisplay from './components/ReportGenerator'; // Renamed
import DisclaimerBox from './components/DisclaimerBox';
import CallToActionBox from './components/CallToActionBox';
import { LoadingSpinner, AlertTriangleIcon, ArrowLeftIcon, CheckCircleIcon } from './components/icons';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(API_KEY ? 'welcome' : 'apiKeyError');
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [allModuleAssessments, setAllModuleAssessments] = useState<ModuleAssessmentResult[]>([]);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false); // For any async ops or transitions
  const [error, setError] = useState<string | null>(null);
  // const [aiInsight, setAiInsight] = useState<string | null>(null); // For future supplementary insight

  useEffect(() => {
    if (!API_KEY) {
      setCurrentView('apiKeyError');
    }
  }, []);

  const resetDiagnostic = () => {
    setCurrentModuleIndex(0);
    setAllModuleAssessments([]);
    // setUserDetails(null); // Keep user details if they want to re-run with same info? Or clear. Let's clear.
    // setUserDetails(null); // Don't clear user details if they click "Start New" from report page, they might want to keep it.
    setError(null);
    // setAiInsight(null);
    setCurrentView('welcome');
  };
  
  const startOrResumeDiagnostic = () => {
    setError(null);
    if(allModuleAssessments.length === DIAGNOSTIC_MODULES.length) { // All modules completed
        setCurrentView('moduleSummary');
    } else {
        setCurrentView('questionnaire');
    }
  }

  const handleQuestionnaireSubmit = useCallback((answers: UserAnswer[]) => {
    if (currentModuleIndex >= DIAGNOSTIC_MODULES.length) return;

    const currentModule = DIAGNOSTIC_MODULES[currentModuleIndex];
    const totalScore = answers.reduce((sum, ans) => sum + ans.answerScore, 0);
    const { maturityLevel, feedback } = getMaturityLevelAndFeedback(currentModule, totalScore);
    
    const newAssessment: ModuleAssessmentResult = {
      module: currentModule,
      score: totalScore,
      maxScore: MAX_SCORE_PER_MODULE[currentModule],
      maturityLevel,
      feedback,
      timestamp: Date.now(),
    };

    setAllModuleAssessments(prev => {
      // Avoid duplicates if user goes back and forth
      const existingIndex = prev.findIndex(a => a.module === currentModule);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = newAssessment;
        return updated;
      }
      return [...prev, newAssessment];
    });

    if (currentModuleIndex < DIAGNOSTIC_MODULES.length - 1) {
      setCurrentModuleIndex(prev => prev + 1);
      setCurrentView('questionnaire'); // Stays on questionnaire for next module
    } else {
      // All modules completed
      setCurrentView('moduleSummary');
      // Optionally fetch AI insight here if implemented
      // fetchAISupplementaryInsight([...allModuleAssessments, newAssessment]);
    }
  }, [currentModuleIndex, allModuleAssessments]);

  // const fetchAISupplementaryInsight = async (assessments: ModuleAssessmentResult[]) => {
  //   setIsLoading(true);
  //   try {
  //     const insight = await getSupplementaryInsight(assessments);
  //     if (insight) setAiInsight(insight.insightText);
  //   } catch (e) {
  //     console.error("Error fetching supplementary AI insight:", e);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };


  const handleLeadFormSubmit = (details: UserDetails) => {
    setUserDetails(details);
    setCurrentView('detailedReport');
  };

  const handleBackNavigation = () => {
    setError(null);
    if (currentView === 'questionnaire') {
      if (currentModuleIndex > 0) {
        setCurrentModuleIndex(prev => prev - 1);
      } else {
        setCurrentView('welcome');
      }
    } else if (currentView === 'moduleSummary') {
      setCurrentView('questionnaire'); // Goes to last question module
    } else if (currentView === 'leadForm') {
      setCurrentView('moduleSummary');
    } else if (currentView === 'detailedReport') {
        // If user details were provided, back from report should go to summary with their details.
        // If they skipped leadform, summary should be shown.
        setCurrentView('moduleSummary');
    } else {
        setCurrentView('welcome');
    }
  };
  

  const renderView = () => {
    switch (currentView) {
      case 'apiKeyError':
        return (
          <div className="text-center p-8 bg-red-900 border-red-700 border rounded-md shadow-lg">
            <AlertTriangleIcon className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-red-200 mb-2">Erro de Configuração</h2>
            <p className="text-red-300">
              A chave da API do Gemini (API_KEY) não foi encontrada nas variáveis de ambiente.
            </p>
            <p className="text-red-300 mt-2">
              Por favor, configure a chave API corretamente se funcionalidades futuras dependerem dela.
              Para o diagnóstico atual, a chave não é estritamente necessária para a lógica principal, mas é uma boa prática tê-la configurada para o ambiente da aplicação.
            </p>
          </div>
        );
      case 'welcome':
        return (
          <div className="text-center p-6 bg-brand-bg-light rounded-lg shadow-xl text-brand-text-light">
            <div className="w-full h-40 bg-brand-secondary rounded-md shadow-md mx-auto mb-6 flex items-center justify-center">
                 <span className="text-brand-accent text-2xl font-bold px-4">{REAL_CONSULTORIA_BRAND_NAME}</span>
            </div>
            <h2 className="text-3xl font-bold text-brand-accent mb-3">{REAL_CONSULTORIA_WELCOME.title}</h2>
            <p className="text-lg text-brand-text-light opacity-90 mb-2">{REAL_CONSULTORIA_WELCOME.subtitle}</p>
            <p className="text-md text-brand-text-light opacity-80 mb-6 px-2">{REAL_CONSULTORIA_WELCOME.introduction}</p>
            <button
              onClick={startOrResumeDiagnostic}
              className="bg-brand-accent hover:bg-yellow-500 text-brand-text-dark font-bold py-3 px-8 rounded-lg transition-colors text-lg transform hover:scale-105"
            >
              {REAL_CONSULTORIA_WELCOME.ctaButton}
            </button>
            <DisclaimerBox />
          </div>
        );
      case 'questionnaire':
        if (currentModuleIndex >= DIAGNOSTIC_MODULES.length) {
            setCurrentView('moduleSummary'); // Should not happen if logic is correct
            return null;
        }
        const currentModuleForQ = DIAGNOSTIC_MODULES[currentModuleIndex];
        const questionsForModule = MODULE_QUESTIONS[currentModuleForQ];
        return (
          <Questionnaire
            moduleType={currentModuleForQ}
            moduleName={currentModuleForQ as string}
            questions={questionsForModule}
            currentModuleIndex={currentModuleIndex}
            totalModules={DIAGNOSTIC_MODULES.length}
            onSubmit={handleQuestionnaireSubmit}
            onBack={handleBackNavigation}
            isLoading={isLoading}
          />
        );
      case 'moduleSummary':
        return (
          <div className="space-y-6">
            <div className="text-center p-4 bg-brand-bg-light rounded-lg shadow-md">
                <CheckCircleIcon className="w-16 h-16 text-green-400 mx-auto mb-3"/>
                <h2 className="text-2xl font-bold text-brand-accent mb-2">Diagnóstico Preliminar Concluído!</h2>
                <p className="text-brand-text-light opacity-90 mb-4">
                    Você completou todos os módulos. Veja abaixo um resumo da maturidade identificada para cada área.
                </p>
                {/* {isLoading && aiInsight === null && <LoadingSpinner className="mx-auto my-3" />}
                {aiInsight && (
                    <div className="my-4 p-3 bg-brand-primary border border-brand-secondary rounded-md">
                        <p className="text-sm text-brand-text-light opacity-85 italic">"{aiInsight}"</p>
                        <p className="text-xs text-brand-accent opacity-70 mt-1">- Insight Adicional (Beta)</p>
                    </div>
                )} */}
            </div>
            {allModuleAssessments.map(assessment => (
              <ModuleAssessmentCard key={assessment.timestamp} assessment={assessment} />
            ))}
            {error && <p className="text-red-300 bg-red-900 p-3 rounded-md">{error}</p>}
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 mt-8">
              <button
                onClick={() => setCurrentView(userDetails ? 'detailedReport' : 'leadForm')}
                className="bg-brand-accent hover:bg-yellow-500 text-brand-text-dark font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Obter Relatório Detalhado por E-mail
              </button>
               <button
                onClick={resetDiagnostic}
                className="bg-brand-secondary hover:opacity-80 text-brand-text-light font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Refazer Diagnóstico
              </button>
            </div>
            <CallToActionBox />
            <DisclaimerBox />
          </div>
        );
      case 'leadForm':
        return <LeadForm onSubmit={handleLeadFormSubmit} onSkip={() => setCurrentView('detailedReport')} isLoading={isLoading} />;
      case 'detailedReport':
        return <DetailedReportDisplay assessments={allModuleAssessments} userDetails={userDetails} onStartNewDiagnosis={resetDiagnostic} />;
      default:
        return <p className="text-brand-text-light">Visualização desconhecida.</p>;
    }
  };
  
  const showBackButtonLogic = () => {
    if (currentView === 'welcome' || currentView === 'apiKeyError') return false;
    if (currentView === 'detailedReport' && !userDetails) return true; // Skipped leadform
    if (currentView === 'detailedReport' && userDetails) return true; // Allow back to summary even if form filled
    return true;
  }
  const showBackButton = showBackButtonLogic();

  const getTitleForView = () => {
    if (currentView === 'welcome' || currentView === 'apiKeyError') return "Diagnóstico 360°";
    if (currentView === 'questionnaire') {
        const moduleName = DIAGNOSTIC_MODULES[currentModuleIndex] || "Módulo";
        return `Módulo: ${moduleName.substring(0,30)}${moduleName.length > 30 ? '...' : ''}`;
    }
    if (currentView === 'moduleSummary') return "Resumo do Diagnóstico";
    if (currentView === 'leadForm') return "Seus Dados para Relatório";
    if (currentView === 'detailedReport') return "Relatório Detalhado";
    return REAL_CONSULTORIA_WELCOME.title;
  }

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg-dark text-brand-text-light selection:bg-brand-accent selection:text-brand-bg-dark">
      <Header title={getTitleForView()} />
      <main className="container mx-auto p-4 sm:p-6 flex-grow w-full">
        {showBackButton && (
            <button 
                onClick={handleBackNavigation}
                className="mb-4 sm:mb-6 inline-flex items-center text-brand-accent hover:text-yellow-500 font-medium transition-colors"
                aria-label="Voltar para a tela anterior"
            >
                <ArrowLeftIcon className="w-5 h-5 mr-2" /> Voltar
            </button>
        )}
        {/* Global loading spinner if not specific to questionnaire submission */}
        {isLoading && currentView !== 'questionnaire' && ( 
          <div className="flex justify-center items-center p-8">
            <LoadingSpinner className="w-12 h-12 text-brand-accent" />
            <p className="ml-3 text-lg text-brand-accent">Carregando...</p>
          </div>
        )}
         {/* Hide view content during global loading (except questionnaire which has its own) */}
        <div className={(isLoading && currentView !== 'questionnaire') ? 'hidden' : ''}>
            {renderView()}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
