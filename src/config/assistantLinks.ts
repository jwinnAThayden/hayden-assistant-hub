export type AssistantLinkKey = 'myassistant' | 'mybenefits' | 'mysupport' | 'industry-news';

type AssistantLinkConfig = {
  envVar?: string;
  fallbackUrl: string;
  source: 'launch-site-agent-library' | 'static';
  notes?: string;
};

const launchSiteAgentLibraryRoot = process.env.EXPO_PUBLIC_SHAREPOINT_AGENT_ROOT_URL
  ?? 'https://haydenbeverage.sharepoint.com/Shared%20Documents';
const launchSiteAgentLibraryPath = '/Shared%20Documents/Copilot%20Studio%20Agents';

// Verified August 11, 2026 by opening each URL in a fresh browser tab: this
// exact id/parent shape (base library root, no /sites/... prefix, no
// Forms/AllItems.aspx) is what SharePoint's own "Agent Not Supported ->
// Open in SharePoint" redirect produces, and it opens the agent's chat
// panel directly. Other id/parent shapes tried previously (library root
// with the site path, or Forms/AllItems.aspx) silently dropped the query
// string and landed on the plain folder view instead.
function getLaunchSiteAgentUrl(agentFileName: string) {
  const encodedFileName = encodeURIComponent(agentFileName);
  return `${launchSiteAgentLibraryRoot}?id=${launchSiteAgentLibraryPath}/${encodedFileName}&parent=${launchSiteAgentLibraryPath}`;
}

// Central control file for assistant destinations.
// Update fallbackUrl values here when SharePoint pages move again.
export const assistantLinks: Record<AssistantLinkKey, AssistantLinkConfig> = {
  myassistant: {
    envVar: process.env.EXPO_PUBLIC_MYASSISTANT_URL,
    fallbackUrl: getLaunchSiteAgentUrl('myAssistant_crbdf_myAssistant.agent'),
    source: 'launch-site-agent-library',
    notes: 'Confirmed opens the agent chat directly in a fresh tab on August 11, 2026.',
  },
  mybenefits: {
    envVar: process.env.EXPO_PUBLIC_MYBENEFITS_URL,
    fallbackUrl: getLaunchSiteAgentUrl('myBenefits_crbdf_employeeBenefitsAssistant.agent'),
    source: 'launch-site-agent-library',
    notes: 'Confirmed opens the agent chat directly in a fresh tab on August 11, 2026.',
  },
  mysupport: {
    envVar: process.env.EXPO_PUBLIC_MYSUPPORT_URL,
    fallbackUrl: 'https://haydennation.atlassian.net/servicedesk/customer/portal/13',
    source: 'static',
  },
  'industry-news': {
    envVar: process.env.EXPO_PUBLIC_INDUSTRY_NEWS_URL,
    fallbackUrl: getLaunchSiteAgentUrl('myIndustry_crbdf_sharePointSiteAssistant.agent'),
    source: 'launch-site-agent-library',
    notes: 'Confirmed opens the agent chat directly in a fresh tab on August 11, 2026.',
  },
};

export function getAssistantLink(key: AssistantLinkKey) {
  const config = assistantLinks[key];
  return config.envVar?.trim() || config.fallbackUrl;
}
