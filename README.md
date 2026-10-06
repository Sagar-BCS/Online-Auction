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

This project relies on Firebase for user authentication and the real-time database. To set this up, follow these exact steps to create a free Firebase project and connect it to your local code.

#### A. Create the Project & Get Keys

1. Go to the [Firebase Console](https://console.firebase.google.com/) and click **Add Project** (or **Create a project**).
2. Name your project (e.g., "Online-Auction-Firebase"), turn off Google Analytics (optional), and click **Create Project**.
3. Once the project is ready, click **Continue**.
4. On your project overview page, click the **+ Add app** icon, then click the **Web icon (`</>`)** to add Firebase to your web app.

5. Give your app a nickname (e.g., "Auction Backend") and click **Register app**.
6. Firebase will show you a block of code containing a `firebaseConfig` object. You will need these keys for the `.env` file.

#### B. Setup the Environment File

7. In the root directory of this downloaded code, copy the `.env.example` file and rename the new file to `.env`:
   ```bash
   cp .env.example .env
   ```
8. Open the `.env` file and paste the values you got from step 6. It should look like this:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSyA...
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project
   VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456...
   VITE_FIREBASE_MEASUREMENT_ID=G-ABCDEFG
   ```

#### C. Enable Authentication (Signups & Logins)

9. On the left sidebar of the Firebase Console, go to **Security** > **Authentication**.
10. Click the **Get Started** button.
11. Go to the **Sign-in method** tab.
12. Click on **Email/Password**.
13. Toggle the first switch to **Enable** and click **Save**.

#### D. Enable Firestore (Database)

14. On the left sidebar, go to **Databases & Storage** > **Firestore Database**.
15. Click **Create database**.
16. When asked about security rules, select **Start in test mode** (this allows you to easily develop locally without strict rules).
17. Choose a location (the default is fine) and click **Enable**.

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
