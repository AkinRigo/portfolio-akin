/**
 * Fonte única de conteúdo do portfólio.
 * Para personalizar o site inteiro, edite SOMENTE este arquivo.
 */

export const profile = {
  name: 'Akin Rigo',
  fullName: 'Akin Santos Rigo',
  role: 'Java Back-end Developer',
  handle: 'akin',
  host: 'portfolio',
  location: 'São Paulo, Brasil',
  tags: ['SPRING_BOOT', 'ERP_FISCAL', 'APP_SECURITY'],
  tagline:
    'Construindo sistemas de gestão de ponta a ponta — da modelagem do banco à apuração fiscal em produção.',
  summary: [
    'Desenvolvedor back-end focado em Java 21 e Spring Boot. Meu trabalho hoje é construir e manter sistemas corporativos em produção: um ERP multiempresa, um sistema de RH e uma plataforma de atendimento.',
    'Antes de programar ERP, operei TOTVS e SAP por dentro. Isso mudou a forma como eu projeto: módulos que conversam entre si em vez de telas isoladas, um banco de dados por empresa e nomenclatura de mercado. Um lançamento precisa percorrer estoque, custo, financeiro e fiscal a partir de um documento só.',
    'Fora do horário eu estudo cibersegurança e arquitetura. É de onde vêm as decisões de criptografia dos sistemas que mantenho — algoritmo adequado a cada finalidade, em vez do mesmo mecanismo para tudo.',
  ],
  interests: [
    {
      title: 'APIs REST',
      body: 'Contratos previsíveis, versionamento, tratamento de erro consistente e validação na borda.',
    },
    {
      title: 'Arquitetura de software',
      body: 'Separação por módulo, isolamento multiempresa e fronteiras que mantêm o custo de mudança baixo.',
    },
    {
      title: 'Orientação a objetos',
      body: 'Domínio modelado em objetos com regra dentro, em vez de regra espalhada por controller e tela.',
    },
    {
      title: 'Banco de dados',
      body: 'PostgreSQL, modelagem relacional, migrações versionadas e consultas que não degradam com volume.',
    },
    {
      title: 'Boas práticas',
      body: 'Teste automatizado, branch por entrega, pull request e ambiente de homologação antes da produção.',
    },
    {
      title: 'Segurança aplicada',
      body: 'Argon2id para senha, AES-GCM para dado pessoal, PASETO para sessão e índice cego para busca cifrada.',
    },
  ],
  certifications: [
    { name: 'Fundamentos de Cibersegurança', issuer: 'Google · Coursera', level: 'Introdutório' },
    { name: 'Fundamentos de Cibersegurança', issuer: 'Fortinet', level: 'Introdutório' },
  ],
}

export type Project = {
  id: string
  name: string
  kind: string
  year: string
  status: 'EM PRODUÇÃO' | 'EM DESENVOLVIMENTO'
  summary: string
  highlights: string[]
  stack: string[]
  repo: string
  docs: string
}

export const projects: Project[] = [
  {
    id: 'erp-industrial',
    name: 'ERP Industrial',
    kind: 'Sistema de gestão multiempresa',
    year: '2026',
    status: 'EM DESENVOLVIMENTO',
    summary:
      'ERP completo com 14 módulos integrados, da compra da matéria-prima à apuração do imposto. Arquitetura multiempresa com um banco de dados isolado por cliente.',
    highlights: [
      '14 módulos integrados · 1.720 arquivos',
      'Fiscal: ICMS, IPI, PIS, COFINS, ST, DIFAL e SPED',
      '167 arquivos de teste · 80 migrações versionadas',
    ],
    stack: ['Java 21', 'Spring Boot', 'Spring Data JPA', 'PostgreSQL', 'Flyway', 'PASETO'],
    repo: '#',
    docs: '#',
  },
  {
    id: 'sistema-rh',
    name: 'Sistema de RH',
    kind: 'Gestão de pessoas + PWA',
    year: '2026',
    status: 'EM PRODUÇÃO',
    summary:
      'Sistema de gestão de pessoas com 22 áreas: ponto, férias, folha, avaliação, EPI e saúde ocupacional. Inclui app de ponto instalável, sem passar por loja.',
    highlights: [
      '22 áreas implementadas · 1.668 arquivos',
      'PWA de ponto com hora do servidor e GPS na batida',
      '112 arquivos de teste · em produção com usuários reais',
    ],
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'PWA', 'Service Worker', 'JUnit 5'],
    repo: '#',
    docs: '#',
  },
  {
    id: 'suporte',
    name: 'Plataforma de Suporte',
    kind: 'Atendimento omnichannel',
    year: '2026',
    status: 'EM PRODUÇÃO',
    summary:
      'Central de atendimento que unifica o chat interno e o WhatsApp numa fila só, com histórico que pertence à empresa e não ao aparelho do atendente.',
    highlights: [
      'Chat em tempo real via WebSocket',
      'Integração WhatsApp self-hosted (Evolution API)',
      'Serviço isolado: continua no ar se o ERP cair',
    ],
    stack: ['Java', 'Spring Boot', 'WebSocket', 'Evolution API', 'PostgreSQL'],
    repo: '#',
    docs: '#',
  },
  {
    id: 'painel-operacional',
    name: 'Painel Operacional',
    kind: 'Refatoração de sistema legado',
    year: '2026',
    status: 'EM PRODUÇÃO',
    summary:
      'Sistema legado em Python que eu assumi e refatorei enquanto sustentava a operação diária — sem derrubar o que já estava em uso.',
    highlights: [
      '570 de 610 commits · 146 pull requests',
      '56 correções de defeito · 65 funcionalidades novas',
      '64.648 linhas removidas em refatoração',
    ],
    stack: ['Python', 'SQL', 'Git', 'Pull Request', 'Integração NF-e'],
    repo: '#',
    docs: '#',
  },
]

export type StackGroup = { label: string; items: string[] }

export const stack: StackGroup[] = [
  { label: 'Linguagens', items: ['Java 21', 'Python', 'SQL', 'TypeScript', 'JavaScript'] },
  {
    label: 'Frameworks',
    items: ['Spring Boot', 'Spring Data JPA', 'Spring Security', 'Spring WebSocket'],
  },
  { label: 'Banco de dados', items: ['PostgreSQL', 'SQLite', 'Flyway', 'JPA / Hibernate'] },
  { label: 'Ferramentas', items: ['Git', 'GitHub', 'Docker', 'IntelliJ IDEA', 'nginx', 'Linux / VPS'] },
  { label: 'Testes', items: ['JUnit 5', 'Mockito', 'Testes de integração'] },
  { label: 'Segurança', items: ['Argon2id', 'AES-GCM', 'PASETO', 'TOTP', 'HMAC-SHA256'] },
]

export const metrics = [
  { value: '4', label: 'sistemas entregues' },
  { value: '279', label: 'arquivos de teste' },
  { value: '80', label: 'migrações versionadas' },
  { value: '1.168', label: 'commits registrados' },
]

export type SocialIcon = 'github' | 'linkedin' | 'mail' | 'file'
export type Social = { id: string; label: string; value: string; href: string; icon: SocialIcon }

/** Troque os `href` pelos seus links reais. */
export const socials: Social[] = [
  { id: 'github', label: 'GitHub', value: 'github.com/seu-usuario', href: '#', icon: 'github' },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'linkedin.com/in/seu-perfil',
    href: '#',
    icon: 'linkedin',
  },
  {
    id: 'email',
    label: 'E-mail',
    value: 'seu-email@exemplo.com',
    href: 'mailto:seu-email@exemplo.com',
    icon: 'mail',
  },
  { id: 'resume', label: 'Currículo', value: 'curriculo.pdf', href: '#', icon: 'file' },
]

export const navItems = [
  { id: 'home', label: 'home' },
  { id: 'about', label: 'about' },
  { id: 'projects', label: 'projects' },
  { id: 'stack', label: 'stack' },
  { id: 'contact', label: 'contact' },
]
