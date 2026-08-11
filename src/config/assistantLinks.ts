export type AssistantLinkKey = 'myassistant' | 'mybenefits' | 'mysupport' | 'industry-news';

type AssistantLinkConfig = {
  envVar?: string;
  fallbackUrl: string;
  source: 'sharepoint-share-link' | 'static';
  notes?: string;
};

// Central control file for assistant destinations.
// Update fallbackUrl values here when SharePoint pages move again.
//
// The SharePoint values below are per-file "Copy Link" sharing URLs
// (:u:/r/...?d=<docid>&csf=1&web=1&e=<token>), not document-library deep
// links. Those are the only links that open a specific agent directly
// instead of landing on the shared library/home page.
export const assistantLinks: Record<AssistantLinkKey, AssistantLinkConfig> = {
  myassistant: {
    envVar: process.env.EXPO_PUBLIC_MYASSISTANT_URL,
    fallbackUrl: 'https://haydenbeverage.sharepoint.com/:u:/r/Shared%20Documents/Copilot%20Studio%20Agents/myAssistant_crbdf_myAssistant.agent?d=w9e8d9398a99746e4bfedd19f8acf7696&csf=1&web=1&e=JHxArO',
    source: 'sharepoint-share-link',
    notes: 'Confirmed via SharePoint "Copy Link" on HaydenAgentsLaunchSite on August 11, 2026.',
  },
  mybenefits: {
    envVar: process.env.EXPO_PUBLIC_MYBENEFITS_URL,
    fallbackUrl: 'https://haydenbeverage.sharepoint.com/:u:/r/Shared%20Documents/Copilot%20Studio%20Agents/myBenefits_crbdf_employeeBenefitsAssistant.agent?d=wb8408949da0745a1a1936806c52ff785&csf=1&web=1&e=arHYGT',
    source: 'sharepoint-share-link',
    notes: 'Confirmed via SharePoint "Copy Link" on HaydenAgentsLaunchSite on August 11, 2026.',
  },
  mysupport: {
    envVar: process.env.EXPO_PUBLIC_MYSUPPORT_URL,
    fallbackUrl: 'https://haydennation.atlassian.net/servicedesk/customer/portal/13',
    source: 'static',
  },
  'industry-news': {
    envVar: process.env.EXPO_PUBLIC_INDUSTRY_NEWS_URL,
    fallbackUrl: 'https://haydenbeverage.sharepoint.com/:u:/r/Shared%20Documents/Copilot%20Studio%20Agents/myIndustry_crbdf_sharePointSiteAssistant.agent?d=w5994d1825ac14992acc372dcb6316f69&csf=1&web=1&e=kL9jHT',
    source: 'sharepoint-share-link',
    notes: 'Confirmed via SharePoint "Copy Link" on HaydenAgentsLaunchSite on August 11, 2026.',
  },
};

export function getAssistantLink(key: AssistantLinkKey) {
  const config = assistantLinks[key];
  return config.envVar?.trim() || config.fallbackUrl;
}
