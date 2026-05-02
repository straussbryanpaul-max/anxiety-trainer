# Anxiety Trainer — Daily Resistance Check

A daily journaling web app for tracking your anxiety resistance training, based on the **Anxiety Trainer** framework.

## Features

- 📋 Daily checklist with all 4 Pillars, Daily Reps, 4th Response Check, and Training Notes
- 📅 Calendar date selector to go back and review previous entries
- 💾 Auto-saves to browser localStorage as you type
- 📱 Responsive design for mobile and desktop

## Local Development

```bash
npm install
npm start
```

## Deploy to Vercel

1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) and import the repo
3. Vercel auto-detects Create React App — just click **Deploy**

No environment variables needed.

## Notes

- Data is stored in the browser's `localStorage` — it stays on the device/browser where entries are made
- If you want cross-device sync in the future, the `storage.js` file can be swapped out for a backend API
