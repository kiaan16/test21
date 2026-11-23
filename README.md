# FoodBridge AI

FoodBridge AI connects food donors, receivers, distributors and food organisations to help surplus food reach communities that can use it.

## Technology
- HTML, CSS and JavaScript
- Firebase Authentication
- Cloud Firestore
- Firebase Storage
- Firebase Hosting

## Project structure
```text
FoodBridge-AI/
├── index.html
├── login.html
├── register.html
├── dashboard.html
├── css/styles.css
├── js/firebase.js
├── js/login.js
├── js/register.js
├── js/dashboard.js
├── assets/images/
├── firestore.rules
├── storage.rules
├── firebase.json
└── README.md
```

## Firebase setup
1. Create a project at https://console.firebase.google.com/.
2. Add a Web App and copy its Firebase configuration.
3. Replace the `YOUR_...` placeholders in `js/firebase.js`.
4. Enable Email/Password in Firebase Authentication.
5. Create a Cloud Firestore database.
6. Enable Firebase Storage.
7. Publish `firestore.rules` and `storage.rules` in the Firebase console.

Firebase web configuration identifies your project; it is not an authorization mechanism. Security Rules protect data. Never put service-account private keys or Admin SDK credentials in browser JavaScript or a public repository.

## Run locally
Use Visual Studio Code with the Live Server extension, open this folder, and start Live Server from `index.html`. JavaScript modules should be served over a local web server rather than opened directly as a file.

## Deploy with Firebase Hosting
Install the Firebase CLI and deploy from this directory:
```bash
npm install -g firebase-tools
firebase login
firebase use --add
firebase deploy
```

## Upload to GitHub
Create a repository named `FoodBridge-AI` and upload the contents of this folder, preserving its structure. Do not upload private keys, passwords or other secrets.

## Account roles
- `donor`: restaurants, hotels and food centres sharing surplus food.
- `receiver`: people looking for available food.
- `distributor`: authorised volunteers or helpers collecting and delivering food.
- `organisation`: NGOs, charitable trusts, orphanages, old-age homes, community kitchens and food banks coordinating support.

New accounts start with `accountStatus: "pending"`. Verification and approval will be implemented before users can publish donations or perform restricted actions.

## Foundation included
Public landing page, role-based account registration, Firebase email/password authentication, user profile creation, login, logout and a role-aware dashboard.

Food listings, organisation verification, distribution, reports, notifications and AI services are subsequent modules. They must be implemented and tested before being treated as available features.

## Security
Keep Firestore and Storage rules restrictive. Do not trust role or account status supplied by the browser for privileged actions. Use trusted server-side checks (such as Firebase Cloud Functions) for approvals and moderation. AI image analysis must not be the sole authority for deciding whether food is safe to eat.
