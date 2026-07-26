# Hayden Assistant Hub Mobile To-Do

## Immediate

- [ ] Preview the mobile app on Android with Expo Go.
- [ ] Preview the mobile app on iPhone with Expo Go.
- [ ] Restart Expo when needed with `npm run start`.
- [ ] Choose the backend direction: Firebase or Azure.
- [x] Copy `.env.example` to `.env.local`.
- [ ] Fill in the selected backend environment values.

## Branding

- [ ] Replace the default Expo app icon in `assets/`.
- [ ] Replace Android adaptive icon assets.
- [ ] Add a Hayden Assistant Hub splash image and color.
- [ ] Add assistant logos to the mobile card UI.
- [ ] Validate text sizing and spacing on Android and iPhone screens.

## Authentication

- [ ] Keep current browser-based Microsoft and Atlassian links for the first working version.
- [ ] Decide whether native Microsoft Entra sign-in is required later.
- [ ] If native sign-in is required, evaluate Expo AuthSession or MSAL-compatible flow.

## Source Control

- [ ] Review `git status` and confirm unrelated parent repository changes should stay untouched.
- [ ] Commit the mobile app scaffold.
- [ ] Add a GitHub remote if the repository does not already have one.
- [ ] Push the project to GitHub.

## Build And Distribution

- [x] Install EAS CLI when ready: `npm install -g eas-cli`.
- [ ] Run `eas login`.
- [ ] Run `eas build:configure`.
- [ ] Create an Android build with `eas build --platform android`.
- [ ] Create an iOS build with `eas build --platform ios`.
- [ ] Decide Android distribution path: internal APK/AAB, managed Google Play, or MDM.
- [ ] Decide iPhone distribution path: TestFlight, Apple Business Manager, or MDM.

## Web Hosting

- [x] Add a production static web build command: `npm run build:web`.
- [x] Build static web assets into `dist/`.
- [x] Choose a static HTTPS host for internet access: `hbccloudweb1.haydenbeverage.com`.
- [x] Add SSH/SCP deployment helper for `www-data@hbccloudweb1.haydenbeverage.com`.
- [x] Confirm the remote web root or application subdirectory: `/var/www/myAssistant/mobile`.
- [x] Publish `dist/` to the selected static host.
- [ ] Keep Metro, LAN mode, and tunnel mode limited to development only.
- [x] Add GitHub Pages build support for public mobile access.
- [ ] Enable GitHub Pages source: GitHub Actions.
- [ ] Verify GitHub Pages URL on mobile.

## Telemetry And Support

- [ ] Add usage analytics after the backend is selected.
- [ ] Add crash reporting.
- [ ] Add a Contact IT action.
- [ ] Add an optional feedback or feature request form.

## Validation

- [ ] Run `npm run typecheck` before commits.
- [ ] Verify all assistant links open correctly from Android.
- [ ] Verify all assistant links open correctly from iPhone.
- [ ] Confirm backend configuration messaging is accurate for Firebase.
- [ ] Confirm backend configuration messaging is accurate for Azure.
