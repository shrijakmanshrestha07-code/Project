# MoodFlix 🎬

A responsive entertainment discovery website built with Next.js App Router, TypeScript, Tailwind CSS, React hooks, and the TVmaze API.

## Requirements

- Node.js 20.9 or newer
- VS Code (recommended)
- Internet connection for live API results


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



