# Quiz Maker

A full-stack web application for creating, managing, and taking quizzes with built-in anti-cheat monitoring.

## Project Structure

```
quiz-maker/
├── quiz-maker-fe/     # React frontend application
├── quiz-maker-be/     # Node.js/Express backend API
└── README.md
```

## Tech Stack

### Frontend
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI)
- **Routing**: React Router v7
- **State Management**: React Query (TanStack Query)
- **Styling**: Emotion + Styled Components

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite (better-sqlite3)
- **Testing**: Jest + Supertest
- **Authentication**: Simple Bearer Token

## Getting Started

### Prerequisites
- **Node.js 20+** (required for both frontend and backend)
- npm or yarn

### Installation

#### Backend Setup

1. Navigate to the backend directory:
```bash
cd quiz-maker-be
```

2. Install dependencies:
```bash
yarn install
```

3. Environment variables are already configured in `.env`:
```
PORT=4000
API_TOKEN=dev-token
```

4. (Optional) Seed initial data:
```bash
yarn seed
```

#### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd quiz-maker-fe
```

2. Install dependencies:
```bash
yarn install
```

3. Environment variables are already configured in `.env`:
```
VITE_API_URL=http://localhost:4000
VITE_AUTH_TOKEN=dev-token
```

### Running Locally

**Terminal 1 - Start Backend:**
```bash
cd quiz-maker-be
yarn dev
# Server runs on http://localhost:4000
```

**Terminal 2 - Start Frontend:**
```bash
cd quiz-maker-fe
yarn dev
# App runs on http://localhost:5173
```

### Building for Production

**Backend:**
```bash
cd quiz-maker-be
yarn build  # TypeScript compilation
yarn start      # Start production server
```

**Frontend:**
```bash
cd quiz-maker-fe
yarn build   # Creates dist/ folder
yarn preview # Preview production build
```

## Testing

### Backend Tests
```bash
cd quiz-maker-be

# Run all tests
yarn test

# Watch mode
yarn test:watch

# Coverage report
yarn test:coverage
```

## Architecture Decisions

### Database Choice: SQLite (better-sqlite3)
- **Why**: Lightweight, file-based, zero configuration, suitable for a learning/practice application
- **Trade-off**: Not ideal for large-scale concurrent users. For production with many simultaneous users, consider PostgreSQL or MySQL

### Authentication: Bearer Token
- **Why**: Simple to implement and sufficient for a practice application
- **Trade-off**: Not secure for production. For production, implement OAuth 2.0 or JWT with proper token rotation

### Frontend Framework: React with TypeScript
- **Why**: Type safety, component reusability, large ecosystem, proven patterns
- **Trade-off**: Larger bundle size compared to lighter frameworks like Preact or Svelte

### State Management: React Query + Local State
- **Why**: React Query handles server state (caching, synchronization), local React state for UI state
- **Trade-off**: Avoids over-engineering with global state management for simple data flows

### UI Library: Material-UI
- **Why**: Comprehensive component library, accessibility support, professional appearance
- **Trade-off**: Larger bundle size. For minimal apps, consider Tailwind CSS

## Anti-Cheat Implementation

The application includes monitoring of suspicious activities during quiz attempts to help maintain academic integrity.

### What Gets Logged

The anti-cheat system tracks two types of events:

1. **Tab Switches (Blur Events)**
   - Recorded when a student switches away from the quiz tab
   - Event type: `"blur"` when leaving, `"focus"` when returning
   - Uses the browser's `visibilitychange` event
   - Helps detect if students are looking at other resources during the quiz

2. **Paste Operations**
   - Recorded when content is pasted into the quiz
   - Event type: `"paste"`
   - Potentially indicates use of external resources or copying answers
   - Triggers on any paste action in the quiz interface

### How It Works

- The `useAntiCheat` hook (frontend) monitors user actions during the quiz attempt
- Each event is timestamped with an ISO 8601 timestamp
- Events are collected in an array throughout the quiz attempt
- On quiz completion, a summary is generated containing:
  - `tabSwitches`: Count of times student left the quiz tab
  - `pasteCount`: Count of paste operations detected
  - `events`: Full event history with exact timestamps for each action

### Where It's Used

**Frontend:**
- `src/hooks/useAntiCheat.ts` - React hook for monitoring and collecting events
- `src/pages/QuizPage.tsx` - Integrated into the quiz-taking interface
- `src/pages/ResultsPage.tsx` - Anti-cheat summary displayed with quiz results

**Backend:**
- Anti-cheat data is received and stored with the quiz submission
- Instructors can review the summary to identify suspicious patterns

### Data Structure

Each anti-cheat event has the following structure:
```typescript
{
  type: "blur" | "focus" | "paste",
  timestamp: "2026-03-25T14:30:45.123Z"
}
```

The summary sent to the backend:
```typescript
{
  tabSwitches: number,      // Number of tab switches detected
  pasteCount: number,       // Number of paste operations
  events: AntiCheatEvent[]  // Full event history with timestamps
}
```

### Privacy & Ethical Use

- Anti-cheat data is collected client-side during quiz attempts
- Data is sent to the backend with the quiz submission results
- Instructors can use this data to identify suspicious patterns
- **Recommended use**: Combined with instructor judgment, not as the sole determination of dishonesty
- Students should be informed that this monitoring is in place before attempting quizzes

## Scripts Reference

### Backend
- `yarn start` - Start production server
- `yarn dev` - Start development server with auto-reload (nodemon)
- `yarn seed` - Populate database with sample data
- `yarn test` - Run Jest test suite
- `yarn test:watch` - Run tests in watch mode
- `yarn test:coverage` - Generate coverage report

### Frontend
- `yarn dev` - Start Vite development server
- `yarn build` - Build for production
- `yarn lint` - Run ESLint
- `yarn preview` - Preview production build locally

## Development Workflow

1. Make changes in either `quiz-maker-fe` or `quiz-maker-be`
2. Changes are automatically reloaded in dev mode (`yarn dev`)
3. Run tests before committing: `yarn test`
4. Build locally to check for errors: `yarn build`

## Troubleshooting

**Backend won't start**
- Ensure Node.js 20+ is installed: `node --version`
- Ensure port 4000 is available
- Check that `.env` file exists with `PORT=4000`
- Delete `database.db` if corrupted and run `yarn seed` to reinitialize

**Frontend can't connect to API**
- Verify backend is running on `localhost:4000`
- Check `VITE_API_URL` in `.env` matches backend URL
- Check `VITE_AUTH_TOKEN` in `.env` matches `API_TOKEN` in backend

**Port conflicts**
- Backend default: 4000 (configure in `.env`)
- Frontend default: 5173 (Vite auto-selects if unavailable)

## License

This project is provided as-is for educational purposes.
