export type AssistantLinkKey = 'myassistant' | 'mybenefits' | 'mysupport' | 'industry-news';

type AssistantLinkConfig = {
  envVar?: string;
  fallbackUrl: string;
  source: 'launch-site-agent-library' | 'static';
  notes?: string;
};

const launchSiteRoot = process.env.EXPO_PUBLIC_SHAREPOINT_AGENT_ROOT_URL
  ?? 'https://haydenbeverage.sharepoint.com/sites/HaydenAgentsLaunchSite';
const launchSiteAgentLibraryPath = '/sites/HaydenAgentsLaunchSite/Shared%20Documents/Copilot%20Studio%20Agents';
const launchSiteAgentLibraryUrl = `${launchSiteRoot}/Shared%20Documents/Copilot%20Studio%20Agents`;

function getLaunchSiteAgentUrl(agentFileName: string) {
  const encodedFileName = encodeURIComponent(agentFileName);
  return `${launchSiteAgentLibraryUrl}?id=${launchSiteAgentLibraryPath}/${encodedFileName}&parent=${launchSiteAgentLibraryPath}`;
}

// Central control file for assistant destinations.
// Update fallbackUrl values here when SharePoint pages move again.
export const assistantLinks: Record<AssistantLinkKey, AssistantLinkConfig> = {
  myassistant: {
    envVar: process.env.EXPO_PUBLIC_MYASSISTANT_URL,
    fallbackUrl: getLaunchSiteAgentUrl('myAssistant_crbdf_myAssistant.agent'),
    source: 'launch-site-agent-library',
    notes: 'Confirmed under HaydenAgentsLaunchSite Copilot Studio Agents on August 9, 2026.',
  },
  mybenefits: {
    envVar: process.env.EXPO_PUBLIC_MYBENEFITS_URL,
    fallbackUrl: getLaunchSiteAgentUrl('myBenefits_crbdf_employeeBenefitsAssistant.agent'),
    source: 'launch-site-agent-library',
    notes: 'Confirmed under HaydenAgentsLaunchSite Copilot Studio Agents on August 9, 2026.',
  },
  mysupport: {
    envVar: process.env.EXPO_PUBLIC_MYSUPPORT_URL,
    fallbackUrl: 'https://haydennation.atlassian.net/servicedesk/customer/portal/13',
    source: 'static',
  },
  'industry-news': {
    envVar: process.env.EXPO_PUBLIC_INDUSTRY_NEWS_URL,
    fallbackUrl: getLaunchSiteAgentUrl('Industry News Assistant_crbdf_sharePointSiteAssistant.agent'),
    source: 'launch-site-agent-library',
    notes: 'Confirmed under HaydenAgentsLaunchSite Copilot Studio Agents on August 9, 2026.',
  },
};

export function getAssistantLink(key: AssistantLinkKey) {
  const config = assistantLinks[key];
  return config.envVar?.trim() || config.fallbackUrl;
}
