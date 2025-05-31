
import React from 'react';
import { REAL_CONSULTORIA_INFO, REAL_CONSULTORIA_BRAND_NAME } from '../constants';
import { MailIcon, WhatsAppIcon } from './icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-brand-text-light py-8 px-4 mt-12 border-t border-brand-primary">
      <div className="container mx-auto text-center">
        <h3 className="text-xl font-semibold mb-4 text-brand-accent">{REAL_CONSULTORIA_BRAND_NAME}</h3>
        <p className="mb-2 opacity-80">{REAL_CONSULTORIA_INFO.address}</p>
        <div className="mb-4">
          <p className="opacity-90">Entre em Contato:</p>
          {REAL_CONSULTORIA_INFO.phones.map(phone => (
            <a key={phone.number} href={`https://wa.me/${phone.number.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center mx-2 my-1 hover:text-brand-accent transition-colors text-brand-text-light opacity-90">
              <WhatsAppIcon className="w-4 h-4 mr-1 text-green-500"/> {phone.name}: {phone.number}
            </a>
          ))}
          <a href={`mailto:${REAL_CONSULTORIA_INFO.email}`} className="inline-flex items-center mx-2 my-1 hover:text-brand-accent transition-colors text-brand-text-light opacity-90">
            <MailIcon className="w-4 h-4 mr-1"/> {REAL_CONSULTORIA_INFO.email}
          </a>
        </div>
        <p className="text-sm opacity-70">&copy; {new Date().getFullYear()} {REAL_CONSULTORIA_BRAND_NAME}. Todos os direitos reservados.</p>
        <p className="text-xs mt-2 opacity-60">Diagnóstico simplificado para fins informativos e de auto-reflexão.</p>
      </div>
    </footer>
  );
};

export default Footer;
