
import { ModuleType, Question, RealConsultoriaContact, MaturityLevel } from './types';

export const API_KEY = process.env.API_KEY || "";

export const DIAGNOSTIC_MODULES: ModuleType[] = [
  ModuleType.STRATEGY_MANAGEMENT,
  ModuleType.OPERATIONAL_EFFICIENCY,
  ModuleType.LEGAL_HEALTH_COMPLIANCE,
  ModuleType.RISK_MANAGEMENT_CONTROLS,
  ModuleType.CONFLICT_RESOLUTION_MEDIATION,
];

export const MODULE_QUESTIONS: Record<ModuleType, Question[]> = {
  [ModuleType.STRATEGY_MANAGEMENT]: [
    {
      id: 'sm1', module: ModuleType.STRATEGY_MANAGEMENT, text: "Sua empresa possui um planejamento estratégico formalizado e revisado periodicamente?", answerType: 'MultipleChoice',
      options: [
        { text: "Sim, completo e atualizado", score: 3 },
        { text: "Parcialmente, precisa de melhorias", score: 2 },
        { text: "Não, operamos reativamente", score: 1 },
        { text: "Não sei", score: 0 }
      ]
    },
    {
      id: 'sm2', module: ModuleType.STRATEGY_MANAGEMENT, text: "Os objetivos de curto, médio e longo prazo da empresa são claros e comunicados para toda a equipe relevante?", answerType: 'MultipleChoice',
      options: [
        { text: "Sim, totalmente", score: 3 },
        { text: "Em grande parte", score: 2 },
        { text: "Pouco claros ou mal comunicados", score: 1 },
        { text: "Não sei", score: 0 }
      ]
    },
    {
      id: 'sm3', module: ModuleType.STRATEGY_MANAGEMENT, text: "A tomada de decisão na sua empresa é baseada em dados e análises consistentes?", answerType: 'MultipleChoice',
      options: [
        { text: "Sempre ou quase sempre", score: 3 },
        { text: "Frequentemente", score: 2 },
        { text: "Ocasionalmente", score: 1 },
        { text: "Raramente ou nunca", score: 0 }
      ]
    },
    {
      id: 'sm4', module: ModuleType.STRATEGY_MANAGEMENT, text: "Com que frequência sua empresa analisa o cenário de mercado (concorrentes, tendências, riscos) para ajustar suas estratégias?", answerType: 'MultipleChoice',
      options: [
        { text: "Constantemente", score: 3 },
        { text: "Periodicamente (ex: trimestral/semestralmente)", score: 2 },
        { text: "Raramente", score: 1 },
        { text: "Nunca", score: 0 }
      ]
    },
  ],
  [ModuleType.OPERATIONAL_EFFICIENCY]: [
    {
      id: 'oe1', module: ModuleType.OPERATIONAL_EFFICIENCY, text: "Sua empresa possui processos claramente definidos e monitorados para as principais operações (ex: vendas, produção, entrega de serviços)?", answerType: 'MultipleChoice',
      options: [
        { text: "Sim, consistentemente documentados e monitorados", score: 3 },
        { text: "Em parte, mas com falhas ou desatualizados", score: 2 },
        { text: "Não, são pouco definidos ou informais", score: 1 },
        { text: "Não sei", score: 0 }
      ]
    },
    {
      id: 'oe2', module: ModuleType.OPERATIONAL_EFFICIENCY, text: "Existem indicadores chave de desempenho (KPIs) para medir a eficiência dos seus processos operacionais?", answerType: 'MultipleChoice',
      options: [
        { text: "Sim, e são acompanhados regularmente para tomada de decisão", score: 3 },
        { text: "Alguns, mas não de forma sistemática ou para todas as áreas chave", score: 2 },
        { text: "Não utilizamos KPIs para processos de forma estruturada", score: 1 },
        { text: "Não sei", score: 0 }
      ]
    },
    {
      id: 'oe3', module: ModuleType.OPERATIONAL_EFFICIENCY, text: "Sua empresa utiliza alguma metodologia ou ferramenta para identificar e eliminar gargalos ou desperdícios nos processos?", answerType: 'MultipleChoice',
      options: [
        { text: "Sim, ativamente e com resultados visíveis", score: 3 },
        { text: "Ocasionalmente ou de forma pontual", score: 2 },
        { text: "Não, desconhecemos ou não aplicamos", score: 1 },
        { text: "Não sei", score: 0 }
      ]
    },
    {
      id: 'oe4', module: ModuleType.OPERATIONAL_EFFICIENCY, text: "Como você avalia a integração e comunicação entre diferentes áreas/departamentos da sua empresa na execução dos processos?", answerType: 'MultipleChoice',
      options: [
        { text: "Excelente, muito integrada e fluida", score: 3 },
        { text: "Boa, mas com espaço para melhoria e alguns silos", score: 2 },
        { text: "Regular, com falhas frequentes de comunicação/colaboração", score: 1 },
        { text: "Ruim, áreas trabalham de forma isolada", score: 0 }
      ]
    },
  ],
  [ModuleType.LEGAL_HEALTH_COMPLIANCE]: [
    {
      id: 'lhc1', module: ModuleType.LEGAL_HEALTH_COMPLIANCE, text: "Os contratos chave da sua empresa (clientes, fornecedores, parceiros) são revisados por um profissional jurídico antes da assinatura?", answerType: 'MultipleChoice',
      options: [
        { text: "Sempre, sem exceção", score: 3 },
        { text: "Na maioria das vezes, para os mais críticos", score: 2 },
        { text: "Raramente ou apenas quando há problemas", score: 1 },
        { text: "Nunca", score: 0 }
      ]
    },
    {
      id: 'lhc2', module: ModuleType.LEGAL_HEALTH_COMPLIANCE, text: "Sua empresa possui políticas e práticas para garantir a conformidade com a LGPD (Lei Geral de Proteção de Dados)?", answerType: 'MultipleChoice',
      options: [
        { text: "Sim, implementadas, comunicadas e monitoradas", score: 3 },
        { text: "Em processo de implementação ou parcialmente implementadas", score: 2 },
        { text: "Pouco ou nada foi feito a respeito", score: 1 },
        { text: "Não se aplica / Não sei", score: 0 }
      ]
    },
    {
      id: 'lhc3', module: ModuleType.LEGAL_HEALTH_COMPLIANCE, text: "As obrigações trabalhistas e tributárias básicas da sua empresa estão sendo cumpridas e acompanhadas regularmente?", answerType: 'MultipleChoice',
      options: [
        { text: "Sim, rigorosamente e com assessoria especializada", score: 3 },
        { text: "Acreditamos que sim, mas sem verificação formal externa", score: 2 },
        { text: "Temos algumas pendências ou dúvidas frequentes", score: 1 },
        { text: "Não sei / Situação crítica", score: 0 }
      ]
    },
    {
      id: 'lhc4', module: ModuleType.LEGAL_HEALTH_COMPLIANCE, text: "Existe um processo para identificar e mitigar riscos legais antes que se tornem litígios?", answerType: 'MultipleChoice',
      options: [
        { text: "Sim, proativamente com análise de cenários", score: 3 },
        { text: "Tentamos, mas de forma mais reativa a problemas iminentes", score: 2 },
        { text: "Não, geralmente lidamos com problemas quando surgem", score: 1 },
        { text: "Não sei", score: 0 }
      ]
    },
  ],
  [ModuleType.RISK_MANAGEMENT_CONTROLS]: [
    {
      id: 'rmc1', module: ModuleType.RISK_MANAGEMENT_CONTROLS, text: "Sua empresa realiza uma identificação formal dos principais riscos (operacionais, financeiros, legais, estratégicos) que podem afetar o negócio?", answerType: 'MultipleChoice',
      options: [
        { text: "Sim, periodicamente e de forma documentada", score: 3 },
        { text: "Ocasionalmente ou informalmente", score: 2 },
        { text: "Não realizamos essa identificação de forma estruturada", score: 1 },
        { text: "Não sei", score: 0 }
      ]
    },
    {
      id: 'rmc2', module: ModuleType.RISK_MANAGEMENT_CONTROLS, text: "Existem controles internos implementados para mitigar os riscos mais significativos identificados?", answerType: 'MultipleChoice',
      options: [
        { text: "Sim, para a maioria dos riscos chave, e são eficazes", score: 3 },
        { text: "Para alguns riscos, ou os controles são parciais/ineficazes", score: 2 },
        { text: "Poucos ou nenhuns controles formais implementados", score: 1 },
        { text: "Não sei", score: 0 }
      ]
    },
    {
      id: 'rmc3', module: ModuleType.RISK_MANAGEMENT_CONTROLS, text: "Há clareza sobre quem são os responsáveis por gerenciar cada risco identificado na empresa?", answerType: 'MultipleChoice',
      options: [
        { text: "Sim, responsabilidades bem definidas e comunicadas", score: 3 },
        { text: "Parcialmente, algumas áreas cinzentas", score: 2 },
        { text: "Não há clareza ou as responsabilidades são difusas", score: 1 },
        { text: "Não sei", score: 0 }
      ]
    },
     {
      id: 'rmc4', module: ModuleType.RISK_MANAGEMENT_CONTROLS, text: "Os controles internos são revisados e testados quanto à sua eficácia periodicamente?", answerType: 'MultipleChoice',
      options: [
        { text: "Sim, regularmente, com ajustes quando necessário", score: 3 },
        { text: "Ocasionalmente, ou apenas quando ocorrem falhas", score: 2 },
        { text: "Nunca são formalmente revisados ou testados", score: 1 },
        { text: "Não sei", score: 0 }
      ]
    },
  ],
  [ModuleType.CONFLICT_RESOLUTION_MEDIATION]: [
    {
      id: 'crm1', module: ModuleType.CONFLICT_RESOLUTION_MEDIATION, text: "Sua empresa possui mecanismos ou canais definidos para lidar com conflitos internos (entre colaboradores ou equipes)?", answerType: 'MultipleChoice',
      options: [
        { text: "Sim, eficazes, conhecidos e utilizados", score: 3 },
        { text: "Existem, mas pouco utilizados ou percebidos como ineficazes", score: 2 },
        { text: "Não, conflitos são resolvidos informalmente ou ignorados", score: 1 },
        { text: "Não sei", score: 0 }
      ]
    },
    {
      id: 'crm2', module: ModuleType.CONFLICT_RESOLUTION_MEDIATION, text: "Ao enfrentar disputas com terceiros (clientes, fornecedores), sua empresa prioriza a negociação ou mediação antes de recorrer a vias litigiosas?", answerType: 'MultipleChoice',
      options: [
        { text: "Sempre que possível, como primeira opção", score: 3 },
        { text: "Às vezes, dependendo da situação", score: 2 },
        { text: "Raramente, preferimos a via judicial ou outras formas mais diretas", score: 1 },
        { text: "Não tivemos disputas significativas / Não sei", score: 0 }
      ]
    },
    {
      id: 'crm3', module: ModuleType.CONFLICT_RESOLUTION_MEDIATION, text: "Os gestores da sua empresa receberam algum treinamento ou orientação sobre técnicas de negociação e resolução de conflitos?", answerType: 'MultipleChoice',
      options: [
        { text: "Sim, e demonstram aplicar esse conhecimento", score: 3 },
        { text: "Alguns receberam, mas sem prática consistente ou aprofundamento", score: 2 },
        { text: "Não, não houve treinamento específico", score: 1 },
        { text: "Não sei", score: 0 }
      ]
    },
    {
      id: 'crm4', module: ModuleType.CONFLICT_RESOLUTION_MEDIATION, text: "Como você avalia a capacidade da sua empresa em preservar relacionamentos importantes mesmo após a ocorrência de um conflito ou divergência?", answerType: 'MultipleChoice',
      options: [
        { text: "Muito boa, conseguimos manter e até fortalecer laços", score: 3 },
        { text: "Boa, na maioria dos casos os relacionamentos são preservados", score: 2 },
        { text: "Regular, alguns relacionamentos importantes são afetados negativamente", score: 1 },
        { text: "Ruim, conflitos costumam gerar rupturas e perdas", score: 0 }
      ]
    },
  ]
};

export const MAX_SCORE_PER_MODULE = Object.values(MODULE_QUESTIONS).reduce((acc, questions) => {
    const moduleKey = questions[0].module;
    acc[moduleKey] = questions.reduce((sum, q) => sum + Math.max(...q.options.map(opt => opt.score)), 0);
    return acc;
}, {} as Record<ModuleType, number>);


export function getMaturityLevelAndFeedback(module: ModuleType, currentScore: number): { maturityLevel: MaturityLevel, feedback: string } {
  const maxScore = MAX_SCORE_PER_MODULE[module];
  const percentage = maxScore > 0 ? (currentScore / maxScore) * 100 : 0;

  let maturityLevel: MaturityLevel;
  let feedback: string = "";

  if (percentage >= 75) {
    maturityLevel = MaturityLevel.STRENGTH_AREA;
  } else if (percentage >= 40) {
    maturityLevel = MaturityLevel.ATTENTION_POINT;
  } else {
    maturityLevel = MaturityLevel.URGENT_ANALYSIS_NEEDED;
  }

  // Generic feedback based on module and maturity level
  switch (module) {
    case ModuleType.STRATEGY_MANAGEMENT:
      if (maturityLevel === MaturityLevel.STRENGTH_AREA) feedback = "Excelente! Sua gestão estratégica parece bem estruturada, um pilar fundamental para o crescimento e adaptação ao mercado.";
      else if (maturityLevel === MaturityLevel.ATTENTION_POINT) feedback = "Há boas práticas em sua gestão estratégica, mas refinar o planejamento e o alinhamento de objetivos pode destravar um potencial ainda maior.";
      else feedback = "A ausência de uma estratégia clara e processos de gestão bem definidos pode estar limitando seu potencial. É crucial revisar esta área para direcionar melhor seus esforços.";
      break;
    case ModuleType.OPERATIONAL_EFFICIENCY:
      if (maturityLevel === MaturityLevel.STRENGTH_AREA) feedback = "Parabéns! Seus processos operacionais demonstram eficiência, o que é vital para a produtividade e satisfação do cliente.";
      else if (maturityLevel === MaturityLevel.ATTENTION_POINT) feedback = "Seus processos funcionam, mas há oportunidades para otimizar fluxos, reduzir custos e melhorar a integração entre áreas.";
      else feedback = "Processos pouco definidos ou ineficientes podem gerar desperdícios e gargalos. Uma análise aprofundada pode revelar economias e melhorias significativas.";
      break;
    case ModuleType.LEGAL_HEALTH_COMPLIANCE:
      if (maturityLevel === MaturityLevel.STRENGTH_AREA) feedback = "Ótimo! Sua empresa demonstra um bom nível de saúde jurídica e conformidade, minimizando riscos e construindo uma base sólida.";
      else if (maturityLevel === MaturityLevel.ATTENTION_POINT) feedback = "Alguns aspectos da sua gestão jurídica e compliance estão cobertos, mas é importante revisar contratos e políticas para evitar surpresas desagradáveis.";
      else feedback = "Atenção! Negligenciar a saúde jurídica e a conformidade pode expor sua empresa a riscos significativos. É fundamental buscar orientação para regularizar pendências.";
      break;
    case ModuleType.RISK_MANAGEMENT_CONTROLS:
      if (maturityLevel === MaturityLevel.STRENGTH_AREA) feedback = "Muito bom! Sua empresa parece ter uma abordagem proativa na gestão de riscos e implementação de controles, protegendo seus ativos e reputação.";
      else if (maturityLevel === MaturityLevel.ATTENTION_POINT) feedback = "Você identifica alguns riscos, mas a formalização e o fortalecimento dos controles internos podem aumentar a segurança do seu negócio.";
      else feedback = "A falta de identificação e controle de riscos pode deixar sua empresa vulnerável. Uma análise estruturada de riscos é um passo importante para a sustentabilidade.";
      break;
    case ModuleType.CONFLICT_RESOLUTION_MEDIATION:
      if (maturityLevel === MaturityLevel.STRENGTH_AREA) feedback = "Excelente! Sua empresa demonstra habilidade em gerenciar e resolver conflitos de forma construtiva, preservando relacionamentos valiosos.";
      else if (maturityLevel === MaturityLevel.ATTENTION_POINT) feedback = "Sua empresa lida com conflitos, mas aprimorar as estratégias de negociação e mediação pode trazer soluções mais rápidas e eficazes.";
      else feedback = "Conflitos mal gerenciados podem gerar custos e desgastes. Desenvolver habilidades de mediação e negociação pode ser um diferencial competitivo.";
      break;
    default:
      maturityLevel = MaturityLevel.ERROR;
      feedback = "Não foi possível determinar o feedback para este módulo.";
  }
  return { maturityLevel, feedback };
}


export const DISCLAIMER_TEXT = "IMPORTANTE: Este Diagnóstico 360° oferece uma análise simplificada e automatizada, baseada em respostas subjetivas a cenários comuns, e não substitui uma auditoria ou consultoria profissional detalhada. Os resultados são gerados para fins informativos e de auto-reflexão, não constituindo um parecer técnico ou jurídico formal. A Real Consultoria não se responsabiliza por quaisquer decisões tomadas com base exclusiva nas informações aqui apresentadas. Para uma avaliação completa e personalizada dos seus desafios e oportunidades, procure aconselhamento especializado com nossa equipe.";

export const CALL_TO_ACTION_TEXT_HEADER = "Seu diagnóstico revelou pontos que merecem atenção ou áreas onde sua empresa pode evoluir?";
export const CALL_TO_ACTION_TEXT_BODY = "A Real Consultoria é especialista em transformar desafios complexos em soluções estratégicas e resultados reais. Lembre-se, nosso compromisso é com o seu sucesso: você só investe se alcançarmos os resultados que sua empresa precisa. Agende uma conversa sem compromisso com nossos consultores multidisciplinares e descubra como podemos auxiliar sua empresa a otimizar processos, garantir conformidade legal, e alcançar novos patamares de crescimento com segurança e estratégia. Seu desafio é nossa prioridade!";

export const REAL_CONSULTORIA_INFO: RealConsultoriaContact = {
  address: "Rua São Benedito, 569 - Sala 01, Centro - Caraguatatuba/SP, CEP 11660-100",
  phones: [
    { name: "Pedro Paulo", number: "+5511974517180" },
    { name: "João Pedro", number: "+5512996351708" },
  ],
  email: "REALCONSULTORIA.E.J@GMAIL.COM",
};

export const REAL_CONSULTORIA_BRAND_NAME = "REAL Consultoria Empresarial & Jurídica";

export const REAL_CONSULTORIA_WELCOME = {
  title: "Diagnóstico 360° de Maturidade Empresarial e Jurídica",
  subtitle: "Descubra os pontos fortes e as áreas de melhoria do seu negócio com nossa ferramenta de auto-diagnóstico simplificado e interativo.",
  introduction: `Bem-vindo(a) ao Diagnóstico 360° da ${REAL_CONSULTORIA_BRAND_NAME}. Esta ferramenta foi desenhada para ajudar gestores como você a obter insights preliminares sobre a maturidade da sua empresa em áreas chave.`,
  ctaButton: "Iniciar Diagnóstico Gratuito"
};
