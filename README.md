# EduPath — Student Learning Hub

A modern, responsive student dashboard built with Next.js, React, TypeScript and Tailwind CSS.

## Features
- Responsive sidebar navigation
- Student overview dashboard and progress cards
- Course cards with progress indicators
- Search/filter courses
- Study task checklist with add-task interaction
- Study planner, notes, resources and settings demo pages
- Premium light UI with indigo accents

## Requirements
- Node.js 20.9 or newer
- npm

## Run locally
1. Extract the ZIP file.
2. Open the extracted `edupath-student-portal` folder in VS Code.
3. Open Terminal → New Terminal.
4. Run:

   ```bash
   npm install
   npm run dev
   ```

5. Open http://localhost:3000 in your browser.

## Build for production
```bash
npm run build
npm start
```

## Important
This is a ready-to-run frontend starter project. It uses sample student/course data in the browser and does not include real login, cloud database, file uploads, or payment processing. Notes and task changes are temporary and reset when the page reloads. Before launching for real students, add authentication, a database, validation, and appropriate privacy/security controls.

## Main files
- `app/page.tsx` — home page entry
- `app/layout.tsx` — app metadata and root layout
- `app/globals.css` — global styles and Tailwind
- `components/student-dashboard.tsx` — dashboard UI and interactions
