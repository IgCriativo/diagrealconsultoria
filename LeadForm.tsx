
import React, { useState } from 'react';
import { UserDetails } from '../types';

interface LeadFormProps {
  onSubmit: (details: UserDetails) => void;
  onSkip?: () => void;
  isLoading?: boolean;
}

const LeadForm: React.FC<LeadFormProps> = ({ onSubmit, onSkip, isLoading = false }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
        alert("Por favor, insira um endereço de e-mail válido.");
        return;
      }
      onSubmit({ name: name.trim(), email: email.trim() });
    } else {
      alert("Por favor, preencha seu nome e e-mail.");
    }
  };

  return (
    <div className="p-6 bg-brand-bg-light rounded-lg shadow-xl max-w-md mx-auto my-8 border border-brand-primary">
      <h2 className="text-xl font-semibold text-brand-accent mb-2">Receber Relatório Detalhado do Diagnóstico</h2>
      <p className="text-sm text-brand-text-light opacity-80 mb-4">
        Para receber o "Relatório Detalhado de Diagnóstico 360° de Maturidade Empresarial e Jurídica" por e-mail, com todos os feedbacks, considerações e próximos passos, por favor, informe seu nome e e-mail.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-brand-text-light opacity-90">Nome Completo:</label>
          <input
            type="text"
            id="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-brand-bg-medium border border-brand-secondary rounded-md shadow-sm focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm text-brand-text-light placeholder-brand-text-light placeholder-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-brand-text-light opacity-90">Seu Melhor E-mail:</label>
          <input
            type="email"
            id="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-brand-bg-medium border border-brand-secondary rounded-md shadow-sm focus:outline-none focus:ring-brand-accent focus:border-brand-accent sm:text-sm text-brand-text-light placeholder-brand-text-light placeholder-opacity-50"
          />
        </div>
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3 pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand-accent hover:bg-yellow-500 text-brand-text-dark font-bold py-2.5 px-4 rounded-lg transition-colors disabled:opacity-60"
            >
            {isLoading ? 'Gerando...' : 'Gerar e Enviar Relatório'}
            </button>
            {onSkip && (
                 <button
                    type="button"
                    onClick={onSkip}
                    disabled={isLoading}
                    className="w-full bg-brand-secondary hover:opacity-80 text-brand-text-light font-medium py-2.5 px-4 rounded-lg transition-colors disabled:opacity-60"
                >
                    Pular e Ver Resumo Online
                </button>
            )}
        </div>
      </form>
    </div>
  );
};

export default LeadForm;
