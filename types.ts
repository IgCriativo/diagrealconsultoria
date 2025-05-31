
export enum ModuleType {
  STRATEGY_MANAGEMENT = "Estratégia e Gestão de Negócios",
  OPERATIONAL_EFFICIENCY = "Eficiência Operacional e Processos",
  LEGAL_HEALTH_COMPLIANCE = "Saúde Jurídica e Compliance",
  RISK_MANAGEMENT_CONTROLS = "Gestão de Riscos e Controles Internos",
  CONFLICT_RESOLUTION_MEDIATION = "Mediação e Resolução de Conflitos",
}

export interface Question {
  id: string;
  text: string;
  answerType: 'MultipleChoice'; // Simplified for this diagnostic tool
  options: Array<{ text: string, score: number }>; // Each option has text and a score
  module: ModuleType;
}

export interface UserAnswer {
  questionId: string;
  questionText: string;
  answerText: string;
  answerScore: number;
  module: ModuleType;
}

export enum MaturityLevel {
  STRENGTH_AREA = "Área de Força", // Verde
  ATTENTION_POINT = "Ponto de Atenção", // Amarelo
  URGENT_ANALYSIS_NEEDED = "Requer Análise Urgente", // Vermelho
  ERROR = "Erro na Avaliação" // Cinza
}

export interface ModuleAssessmentResult {
  module: ModuleType;
  maturityLevel: MaturityLevel;
  feedback: string;
  score: number;
  maxScore: number;
  timestamp: number;
}

export interface UserDetails {
  name: string;
  email:string;
}

export type AppView =
  | 'welcome'
  | 'questionnaire' // Will iterate through modules
  | 'moduleSummary' // Shows summary of all completed modules before lead form
  | 'leadForm'
  | 'detailedReport'
  | 'apiKeyError';

export interface RealConsultoriaContact {
  address: string;
  phones: { name: string, number: string }[];
  email: string;
}
