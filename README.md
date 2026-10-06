# Online Auction

A modern, real-time online auction platform rebuilt with **React (Vite)**, **Material UI**, and **Firebase v10**.

## Features
- **Real-time Bidding**: Watch bids update in real-time.
- **Custom Bidding Options**: Place quick bids (+10, +100, etc.) or use a percentage slider.
- **Image URLs**: Create auctions simply by pasting an image link.
- **Authentication**: Secure email/password login and registration.
- **Modern UI**: Fully responsive Material UI design with Dark Mode out-of-the-box.
- **Countdown Timers**: Precise auction expiration timers.

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Sagar-BCS/Online-Auction.git
cd Online-Auction
```

### 2. Install dependencies
```bash
npm install
```

### 3. Firebase Configuration
This project uses Firebase for Authentication and Firestore (Database). For security, the Firebase config keys are hidden using environment variables. 

You must create your own Firebase project and add the keys:
1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Enable **Authentication** (Email/Password).
3. Enable **Firestore Database** (Start in test mode).
4. Register a Web App in the console to get your config keys.
5. In the root directory of this project, copy the `.env.example` file and rename it to `.env`:
   ```bash
   cp .env.example .env
   ```
6. Open the newly created `.env` file and paste your Firebase keys:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
   VITE_FIREBASE_PROJECT_ID=your_project_id_here
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
   VITE_FIREBASE_APP_ID=your_app_id_here
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id_here
   ```

### 4. Run the Development Server
Once the `.env` file is saved, you can start the app!
```bash
npm run dev
```
Open your browser to the local URL provided by Vite (usually `http://localhost:5173`).

---

## Tech Stack
- **Frontend Framework**: [React](https://react.dev/) via [Vite](https://vitejs.dev/)
- **UI Component Library**: [Material UI (MUI)](https://mui.com/)
- **Backend as a Service**: [Firebase v10](https://firebase.google.com/)
- **Routing**: React Router v7
- **Timers**: React Countdown
