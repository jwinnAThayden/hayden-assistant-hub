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