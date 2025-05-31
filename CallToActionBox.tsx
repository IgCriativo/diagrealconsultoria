
import React from 'react';
import { CALL_TO_ACTION_TEXT_HEADER, CALL_TO_ACTION_TEXT_BODY, REAL_CONSULTORIA_INFO } from '../constants';
import { MailIcon, WhatsAppIcon } from './icons';

interface CallToActionBoxProps {
  onScheduleConsultation?: () => void; 
  showMainButton?: boolean; // To control visibility of a generic "Schedule" button if needed
  mainButtonText?: string;
}

const CallToActionBox: React.FC<CallToActionBoxProps> = ({ 
  onScheduleConsultation, 
  showMainButton = false, 
  mainButtonText = "Agendar Consulta Gratuita" 
}) => {
  const primaryPhone = REAL_CONSULTORIA_INFO.phones.find(p => p.name === "Pedro Paulo") || REAL_CONSULTORIA_INFO.phones[0];

  return (
    <div className="bg-brand-bg-light text-brand-text-light p-6 rounded-lg shadow-lg my-8 border border-brand-primary">
      <h3 className="text-2xl font-semibold mb-3 text-brand-accent">{CALL_TO_ACTION_TEXT_HEADER}</h3>
      <p className="mb-6 opacity-90">{CALL_TO_ACTION_TEXT_BODY}</p>
      <div className="flex flex-col sm:flex-row sm:justify-center space-y-3 sm:space-y-0 sm:space-x-4">
        {showMainButton && onScheduleConsultation ? (
             <button
                onClick={onScheduleConsultation}
                className="bg-brand-accent hover:bg-yellow-500 text-brand-text-dark font-bold py-3 px-6 rounded-lg transition-colors duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
            >
                {mainButtonText}
            </button>
        ) : (
            <>
                 <a
                    href={`https://wa.me/${primaryPhone.number.replace(/\D/g, '')}?text=${encodeURIComponent("Olá, Real Consultoria! Vi o Diagnóstico 360° e gostaria de agendar uma conversa sobre os resultados e próximos passos.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
                    aria-label="Agendar via WhatsApp"
                >
                    <WhatsAppIcon className="w-5 h-5 mr-2"/> Agendar via WhatsApp
                </a>
                <a
                    href={`mailto:${REAL_CONSULTORIA_INFO.email}?subject=${encodeURIComponent("Diagnóstico 360° - Solicitação de Conversa")}&body=${encodeURIComponent("Olá Real Consultoria,\n\nRealizei o Diagnóstico 360° e gostaria de conversar sobre os resultados e como podemos trabalhar juntos para otimizar minha empresa.\n\n[Por favor, informe o melhor horário para contato ou algumas opções de disponibilidade.]\n\nAtenciosamente,\n[Seu Nome]\n[Sua Empresa/Telefone]")}`}
                    className="bg-brand-accent hover:bg-yellow-500 text-brand-text-dark font-bold py-3 px-6 rounded-lg transition-colors duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
                    aria-label="Enviar E-mail para agendamento"
                >
                    <MailIcon className="w-5 h-5 mr-2"/> Agendar por E-mail
                </a>
            </>
        )}
      </div>
    </div>
  );
};

export default CallToActionBox;
