# MediTrack 🏥

**MediTrack** is a modern, privacy-first **Progressive Web App (PWA)** designed to help users manage their health, medication schedules, and medical records with ease. Built with a focus on user experience and gamification, it turns health management into an engaging daily habit.

![MediTrack Banner](public/vite.svg)

## ✨ Key Features

### 💊 Medication Management
- **Smart Reminders**: Never miss a dose with timely notifications.
- **Inventory Tracking**: Auto-decrements pill counts and warns when stock is low.
- **Interaction Warnings**: Alerts you about potential drug interactions (simulated logic).
- **Autocomplete**: Easy search for common medications.

### 🎮 Gamification & Motivation
- **Daily Challenges**: Complete health-related tasks to earn XP.
- **Achievements**: Unlock badges (e.g., "Week Warrior", "Perfect Day") for consistent adherence.
- **Streaks**: Visualize your progress and stay motivated.

### 📊 Health Analytics
- **Vitals Tracking**: Log Weight, Blood Pressure, Heart Rate, and Temperature.
- **Visual Trends**: Interactive charts powered by Recharts to spot trends over time.
- **Symptom Logging**: Track how you feel with severity ratings.

### 🛡️ Privacy & Security
- **Local-First Architecture**: All data lives in your browser's `localStorage`. No remote servers, no data leaks.
- **Medical ID**: Dedicated emergency view for first responders.
- **Data Export**: Backup your data to JSON or export reports to CSV.

### 📱 PWA Support
- **Installable**: Add to your home screen on iOS and Android.
- **Offline Capable**: Works perfectly without an internet connection.

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS + Lucide Icons
- **Charts**: Recharts
- **Date Handling**: date-fns
- **Routing**: React Router DOM
- **State Management**: React Context + LocalStorage Custom Hooks

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/mediTrack.git
    cd mediTrack
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open your browser at `http://localhost:5173`.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
