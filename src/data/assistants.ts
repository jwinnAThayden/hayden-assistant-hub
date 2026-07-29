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

const sharePointAgentRoot = 'https://haydenbeverage.sharepoint.com/sites/HaydenAgentsTestSite/Shared%20Documents/Copilot%20Studio%20Agents';
const sharePointAgentParent = '/sites/HaydenAgentsTestSite/Shared%20Documents/Copilot%20Studio%20Agents';

function getSharePointAgentUrl(agentFileName: string) {
  const agentPath = `${sharePointAgentParent}/${encodeURIComponent(agentFileName)}`;

  return `${sharePointAgentRoot}?id=${agentPath}&parent=${sharePointAgentParent}`;
}

export const assistants: Assistant[] = [
  {
    id: 'myassistant',
    name: 'myAssistant',
    label: 'Coordinating assistant',
    description: 'Start here for general help when you are not sure which Hayden assistant to use.',
    platform: 'Microsoft',
    url: getSharePointAgentUrl('myAssistant_crbdf_myAssistant.agent'),
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
    url: getSharePointAgentUrl('myBenefits_crbdf_employeeBenefitsAssistant.agent'),
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
    url: 'https://haydennation.atlassian.net/servicedesk/customer/portal/13',
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
    url: getSharePointAgentUrl('Industry News Assistant_crbdf_sharePointSiteAssistant.agent'),
    helpAreas: [
      'Track industry trends, suppliers, and beverage category news.',
      'Surface relevant updates for Hayden teams and planning.',
      'Find current articles and summaries from trusted sources.',
    ],
  },
];