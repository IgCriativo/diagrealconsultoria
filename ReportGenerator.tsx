
import React from 'react';
import { ModuleAssessmentResult, UserDetails } from '../types';
import { REAL_CONSULTORIA_INFO, DISCLAIMER_TEXT, CALL_TO_ACTION_TEXT_HEADER, CALL_TO_ACTION_TEXT_BODY, REAL_CONSULTORIA_BRAND_NAME } from '../constants';
import ModuleAssessmentCard from './RiskResultDisplay'; // Updated component name and path corrected
import DisclaimerBox from './DisclaimerBox';
import CallToActionBox from './CallToActionBox';

interface DetailedReportDisplayProps {
  assessments: ModuleAssessmentResult[];
  userDetails?: UserDetails;
  onStartNewDiagnosis: () => void;
}

const DetailedReportDisplay: React.FC<DetailedReportDisplayProps> = ({ assessments, userDetails, onStartNewDiagnosis }) => {
  
  const generateReportText = (isHtml: boolean = false): string => {
    const nl = isHtml ? "<br />" : "\n";
    const sectionBreak = `${nl}--------------------------------------${nl}${nl}`;
    const strongOpen = isHtml ? "<strong>" : "**";
    const strongClose = isHtml ? "</strong>" : "**";

    let report = `${strongOpen}Relatório Detalhado de Diagnóstico 360° de Maturidade Empresarial e Jurídica${strongClose}${nl}`;
    report += `Gerado para: ${strongOpen}${userDetails?.name || 'Usuário'}${strongClose}${nl}`;
    report += `Data: ${new Date().toLocaleDateString('pt-BR')}${nl}${nl}`;
    
    report += `Olá ${userDetails?.name || 'Prezado(a) Usuário(a)'},${nl}${nl}`;
    report += `Agradecemos por utilizar o Diagnóstico 360° da ${REAL_CONSULTORIA_BRAND_NAME}.${nl}`;
    report += `Nossa abordagem multidisciplinar visa proporcionar segurança jurídica e estratégica para sua empresa.${nl}${nl}`;
    
    report += `${strongOpen}Resumo dos Resultados do Diagnóstico por Módulo:${strongClose}${nl}${nl}`;

    assessments.forEach(assessment => {
      report += `${strongOpen}Módulo: ${assessment.module}${strongClose}${nl}`;
      report += `Indicador de Atenção: ${assessment.maturityLevel}${nl}`;
      report += `Feedback: ${assessment.feedback}${nl}`;
      report += `Pontuação: ${assessment.score} de ${assessment.maxScore}${nl}`;
      report += sectionBreak;
    });

    report += `${strongOpen}Considerações Gerais e Próximos Passos:${strongClose}${nl}`;
    report += `Este diagnóstico oferece um panorama inicial. Os pontos de atenção identificados são oportunidades para um aprofundamento e desenvolvimento de soluções customizadas. A ${REAL_CONSULTORIA_BRAND_NAME} pode auxiliar sua empresa a: ${nl}`;
    report += `  - Analisar detalhadamente cada área de oportunidade.${nl}`;
    report += `  - Desenvolver e implementar planos de ação estratégicos.${nl}`;
    report += `  - Otimizar processos, fortalecer a conformidade legal e melhorar a gestão de riscos.${nl}`;
    report += `  - Transformar desafios em resultados concretos, alinhados com nosso modelo de êxito.${nl}${nl}`;

    report += `${strongOpen}Disclaimer:${strongClose}${nl}${DISCLAIMER_TEXT}${nl}${nl}`;
    
    report += `${strongOpen}${CALL_TO_ACTION_TEXT_HEADER}${strongClose}${nl}`;
    report += `${CALL_TO_ACTION_TEXT_BODY}${nl}${nl}`;
    
    report += `${strongOpen}Informações de Contato - ${REAL_CONSULTORIA_BRAND_NAME}:${strongClose}${nl}`;
    report += `Endereço: ${REAL_CONSULTORIA_INFO.address}${nl}`;
    REAL_CONSULTORIA_INFO.phones.forEach(p => {
      report += `Telefone (${p.name}): ${p.number}${nl}`;
    });
    report += `E-mail: ${REAL_CONSULTORIA_INFO.email}${nl}${nl}`;
    
    report += `Atenciosamente,${nl}Equipe ${REAL_CONSULTORIA_BRAND_NAME}${nl}`;
    return report;
  };

  const reportTextForMail = generateReportText(false);
  const mailtoSubject = `Seu Diagnóstico 360° Detalhado - ${REAL_CONSULTORIA_BRAND_NAME}`;
  const mailtoLink = `mailto:${userDetails?.email || ''}?subject=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(reportTextForMail)}`;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-brand-accent">Seu Relatório Detalhado do Diagnóstico 360°</h2>
      
      {userDetails && (
        <div className="bg-green-800 bg-opacity-30 p-3 rounded-md border border-green-600 text-center">
          <p className="text-green-300">
            Um e-mail com este relatório detalhado foi preparado para ser enviado para <strong className="text-green-200">{userDetails.email}</strong>.
          </p>
           <a
            href={mailtoLink}
            className="mt-3 inline-block bg-brand-accent hover:bg-yellow-500 text-brand-text-dark font-bold py-2 px-6 rounded-lg transition-colors"
            target="_blank" 
            rel="noopener noreferrer"
          >
            Abrir E-mail com Relatório
          </a>
        </div>
      )}
      {!userDetails && (
         <p className="text-blue-300 bg-blue-800 bg-opacity-30 p-3 rounded-md border border-blue-600">
          Abaixo está o resumo do seu diagnóstico. Para recebê-lo formatado por e-mail, com considerações adicionais, por favor, volte e forneça seus dados.
        </p>
      )}

      <div className="space-y-4 p-4 bg-brand-bg-light rounded-lg shadow-md border border-brand-primary">
        <h3 className="text-lg font-semibold text-brand-accent mb-2">Resultados por Módulo:</h3>
        {assessments.length > 0 ? (
            assessments.map((assessment) => <ModuleAssessmentCard key={assessment.timestamp} assessment={assessment} />)
        ) : (
            <p className="text-brand-text-light opacity-80">Nenhum módulo avaliado ainda.</p>
        )}
      </div>
      
      <DisclaimerBox />
      <CallToActionBox showMainButton={false} /> {/* CTA buttons are already specific */}

      <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
        <button
          onClick={onStartNewDiagnosis}
          className="bg-brand-secondary hover:opacity-80 text-brand-text-light font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Iniciar Novo Diagnóstico
        </button>
      </div>
      
      <details className="mt-6 p-4 border border-brand-secondary rounded bg-brand-bg-medium max-h-96 group">
        <summary className="text-sm font-semibold text-brand-text-light opacity-70 mb-2 cursor-pointer group-open:mb-3">
          Conteúdo para Copiar (texto do e-mail)
        </summary>
        <div className="max-h-80 overflow-y-auto">
          <pre className="whitespace-pre-wrap text-xs text-brand-text-light opacity-90">{reportTextForMail}</pre>
        </div>
      </details>
    </div>
  );
};

export default DetailedReportDisplay;
