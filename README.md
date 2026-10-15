# MoodFlix 🎬

A responsive entertainment discovery website built with Next.js App Router, TypeScript, Tailwind CSS, React hooks, and the TVmaze API.

## Requirements

- Node.js 20.9 or newer
- VS Code (recommended)
- Internet connection for live API results

## Run on your Mac

1. Extract the ZIP file.
2. Open the `moodflix` folder in VS Code.
3. Open **Terminal → New Terminal**.
4. Install dependencies:

   ```bash
   npm install
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open http://localhost:3000 in your browser.

Stop the server with `Control + C`.

## Features

- Live show data from the public TVmaze API (no API key required)
- Search by show name
- Mood filters: All, Comedy, Drama, Science-Fiction, Romance
- Favorites saved in localStorage
- Loading, empty, and error states
- Responsive grid layout
- Reusable TypeScript components

## Project structure

```text
moodflix/
├── public/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── SearchBar.tsx
│   │   ├── MoodFilters.tsx
│   │   ├── ShowCard.tsx
│   │   └── ShowGrid.tsx
│   ├── hooks/
│   │   └── useShows.ts
│   └── types/
│       └── show.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## API used

- Browse: `https://api.tvmaze.com/shows?page=0`
- Search: `https://api.tvmaze.com/search/shows?q=office`

TVmaze data and image availability depend on the API. Some shows may not have poster images.

## GitHub upload

Create a new empty repository on GitHub. Then, in the project terminal:

```bash
git init
git add .
git commit -m "Build MoodFlix entertainment website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/moodflix.git
git push -u origin main
```



## Deploy online

Push to GitHub, sign in to Vercel, import the repository, and deploy with the default Next.js settings. The live API needs an internet connection.
