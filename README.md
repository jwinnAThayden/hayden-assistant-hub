# Hayden Assistant Hub Mobile

Expo React Native development environment for a mobile version of the Hayden Assistant Hub on Android and iPhone.

## Stack

- React Native with Expo
- TypeScript
- Firebase SDK installed and ready for configuration
- Azure backend support through an API base URL
- GitHub-ready source structure

## Run Locally

```powershell
npm install
npm run typecheck
npm run start
```

Use Expo Go to scan the QR code for Android or iPhone preview. For iOS simulator builds, use macOS with Xcode installed.

## Platform Commands

```powershell
npm run android
npm run ios
npm run web
```

## Internet-Safe Access

Do not expose `expo start`, Metro, LAN mode, or tunnel mode as a long-running internet service. Those are development-only entry points.

For broad access from any internet-connected device, build a static web version and publish the generated `dist/` folder to a static HTTPS host:

```powershell
npm run build:web
```

The generated files in `dist/` can be served by a static hosting platform, CDN, or internal web host. Keep `.env.local` private; only `EXPO_PUBLIC_*` values are bundled into the web app, so do not put secrets in them. If the app needs private data or write actions, place that logic behind authenticated Firebase or Azure backend services rather than in the static app.

For installed mobile apps that do not depend on a dev server, use EAS builds and distribute through an internal Android/iOS channel instead of Expo Go.

### Deploy To Hayden Web Server

The existing web server can host the static export safely as long as it serves the deployed directory over HTTPS and does not proxy to `expo start` or Metro.

Use the SSH/SCP deployment helper after confirming the web root or application subdirectory on `hbccloudweb1.haydenbeverage.com`:

```powershell
npm run deploy:web -- -RemotePath /var/www/assistant-hub
```

The script connects as `www-data@hbccloudweb1.haydenbeverage.com`, runs `npm run typecheck`, runs `npm run build:web`, copies `dist/` to the remote path, and applies static-file permissions. Replace `/var/www/assistant-hub` with the actual directory configured in the web server.

For a dedicated path such as `https://hbccloudweb1.haydenbeverage.com/assistant-hub/`, configure the web server root or alias to the same remote path. If the app is served from a subpath and links or assets fail to load, switch to a dedicated hostname or configure the Expo web base path before building.

### Deploy To GitHub Pages

GitHub Pages is configured for the company subdomain `assistants.haydenbeverage.com`. Use the GitHub Pages build command instead of the generic web build:

```powershell
npm run build:github-pages
```

The build emits `dist/CNAME` and prepares the app for the domain root instead of the repository subpath. The DNS record should be:

```text
assistants.haydenbeverage.com CNAME jwinnathayden.github.io
```

The repository includes a GitHub Actions workflow that publishes `dist/` when `main` is pushed. In GitHub, open **Settings > Pages**, set the custom domain to `assistants.haydenbeverage.com`, set the source to **GitHub Actions**, and enable **Enforce HTTPS** after GitHub provisions the certificate. The public mobile URL will be:

```text
https://assistants.haydenbeverage.com/
```

## Backend Configuration

Copy `.env.example` to `.env.local` and choose one backend provider.

For Firebase:

```text
EXPO_PUBLIC_BACKEND_PROVIDER=firebase
EXPO_PUBLIC_FIREBASE_API_KEY=...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=...
EXPO_PUBLIC_FIREBASE_PROJECT_ID=...
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=...
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
EXPO_PUBLIC_FIREBASE_APP_ID=...
```

For Azure backend services:

```text
EXPO_PUBLIC_BACKEND_PROVIDER=azure
EXPO_PUBLIC_AZURE_API_BASE_URL=https://your-api.example.com
```

Assistant destinations are controlled in [src/config/assistantLinks.ts](C:/Users/jwinn/OneDrive%20-%20Hayden%20Beverage/Documents/ps1/AgentTools/src/config/assistantLinks.ts:1). That file stores the default SharePoint and Jira targets used by the app, including the `HaydenAgentsLaunchSite/Shared Documents/Copilot Studio Agents` pattern for Microsoft agents.

If assistant destinations change, update that control file for the repo defaults and use the exported `EXPO_PUBLIC_*` variables for environment-specific overrides. The app supports `EXPO_PUBLIC_SHAREPOINT_AGENT_ROOT_URL`, `EXPO_PUBLIC_MYASSISTANT_URL`, `EXPO_PUBLIC_MYBENEFITS_URL`, `EXPO_PUBLIC_MYSUPPORT_URL`, and `EXPO_PUBLIC_INDUSTRY_NEWS_URL`.

For GitHub Pages builds, set those values as GitHub repository variables so `https://assistants.haydenbeverage.com/` can follow new target paths without another code change.

## GitHub Source Control

This project is ready to be pushed to GitHub from the workspace repository:

```powershell
git status
git add .
git commit -m "Add mobile Assistant Hub Expo app"
git remote add origin https://github.com/<org>/<repo>.git
git push -u origin main
```

Skip the `git remote add` command if the repository already has an origin.
