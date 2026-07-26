import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';

type BackendProvider = 'firebase' | 'azure' | 'none';

const provider = (process.env.EXPO_PUBLIC_BACKEND_PROVIDER ?? 'none').toLowerCase() as BackendProvider;

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const hasFirebaseConfig = Boolean(firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId && firebaseConfig.appId);

export const firebaseApp: FirebaseApp | null = provider === 'firebase' && hasFirebaseConfig
  ? initializeApp(firebaseConfig)
  : null;

export const backendSettings = {
  provider,
  azureBaseUrl: process.env.EXPO_PUBLIC_AZURE_API_BASE_URL ?? '',
  firebaseReady: Boolean(firebaseApp),
  summary: getBackendSummary(provider),
};

function getBackendSummary(selectedProvider: BackendProvider) {
  if (selectedProvider === 'firebase') {
    return hasFirebaseConfig
      ? 'Firebase is configured for mobile backend services.'
      : 'Firebase support is installed. Add EXPO_PUBLIC_FIREBASE_* values to enable it.';
  }

  if (selectedProvider === 'azure') {
    return process.env.EXPO_PUBLIC_AZURE_API_BASE_URL
      ? 'Azure backend services are configured through the API base URL.'
      : 'Azure backend support is ready. Add EXPO_PUBLIC_AZURE_API_BASE_URL to connect it.';
  }

  return 'Backend provider is not selected yet. Configure Firebase or Azure in the Expo environment file.';
}