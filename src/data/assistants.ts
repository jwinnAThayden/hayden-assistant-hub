import { getAssistantLink } from '../config/assistantLinks';

export type Assistant = {
  id: string;
  name: string;
  label: string;
  description: string;
  platform: 'Microsoft' | 'Atlassian';
  url: string;
  helpAreas: string[];
  featured?: boolean;
};

export const assistants: Assistant[] = [
  {
    id: 'myassistant',
    name: 'myAssistant',
    label: 'Coordinating assistant',
    description: 'Start here for general help when you are not sure which Hayden assistant to use.',
    platform: 'Microsoft',
    url: getAssistantLink('myassistant'),
    helpAreas: [
      'Ask a broad question and get routed toward the right assistant.',
      'Use one starting point for benefits, support, news, and future tools.',
      'Open the Microsoft-authenticated Hayden assistant experience.',
    ],
    featured: true,
  },
  {
    id: 'mybenefits',
    name: 'myBenefits',
    label: 'Benefits assistant',
    description: 'Use this assistant for benefits, enrollment, coverage, and HR resource guidance.',
    platform: 'Microsoft',
    url: getAssistantLink('mybenefits'),
    helpAreas: [
      'Plan details, coverage questions, and where to start.',
      'Open enrollment timing, decisions, and next steps.',
      'Links and guidance for HR materials and support.',
    ],
  },
  {
    id: 'mysupport',
    name: 'mySupport',
    label: 'IT support assistant',
    description: 'Start here for everyday technology help, ticket updates, and fast routing to the right support team.',
    platform: 'Atlassian',
    url: getAssistantLink('mysupport'),
    helpAreas: [
      'Reset passwords, unlock accounts, and get access help.',
      'Request software, hardware, and permission changes.',
      'Report email, network, printer, and workstation issues.',
    ],
  },
  {
    id: 'industry-news',
    name: 'myIndustry',
    label: 'Industry news assistant',
    description: 'Use this assistant for beverage industry updates, market news, and relevant headlines.',
    platform: 'Microsoft',
    url: getAssistantLink('industry-news'),
    helpAreas: [
      'Track industry trends, suppliers, and beverage category news.',
      'Surface relevant updates for Hayden teams and planning.',
      'Find current articles and summaries from trusted sources.',
    ],
  },
];
