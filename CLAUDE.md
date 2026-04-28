# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A web application that displays SpaceX launch information using [The Space Devs Launch Library API](https://ll.thespacedevs.com/2.2.0/). The app is a vanilla JavaScript PWA with service worker caching and localStorage for API response caching.

## Development Commands

```bash
# Start development server
npm start                    # Serves src/ directory on localhost

# Linting
npm run lint                 # Run ESLint
npm run lint:fix            # Auto-fix ESLint issues
npm run eslint              # Lint JS files in src/ and test/
npm run htmlhint            # Lint HTML files

# Testing
npm run pretest             # Run linting before tests
npm test                    # Run Jest tests with coverage
npm run open-coverage-report # Open coverage report in browser
```

## Architecture

### Page Structure

- **index.html** (launches.js): Home page showing upcoming launch, latest launch, and list of past 100 launches
- **launch.html** (launch.js): Detail page for single launch with embedded YouTube video

### Data Flow

The app uses a centralized data module (`data.js`) that handles all API communication and DOM rendering:

1. **API Layer**: `getApiResponse()` - generic fetch wrapper
2. **Cache Layer**: `requestData()` and `requestDataAllLaunches()` - check localStorage before fetching
3. **Rate Limit Handling**: `handleApiLimit()` - detects API limit errors and displays message to user
4. **Rendering**: Print functions (`printHomeLaunch`, `printSingleLaunch`, `printPastLaunchesList`) manipulate DOM directly

### Caching Strategy

- **Service Worker** (`serviceWorker.js`): Caches static assets (HTML, JS, images) in cache named `platzinautas-site-v1`
- **localStorage**: Caches API responses with keys:
  - `'upcoming'` - next SpaceX launch
  - `'latest'` - most recent SpaceX launch  
  - `'allLaunches'` - list of past 100 launches
  - `{launchId}` - individual launch details by UUID

Cache is checked before every API call to reduce request volume and handle API rate limits.

### API Integration

Base URL: `https://ll.thespacedevs.com/2.2.0/launch/`

Key endpoints used:
- `upcoming/?format=json&search=SpaceX&limit=1` - next launch
- `previous/?format=json&search=SpaceX&limit=1` - latest launch
- `previous/?format=json&search=SpaceX&limit=100` - past launches list
- `{launchId}/?format=json` - single launch details

The API has rate limits. When hit, response contains `detail` field with error message which is displayed to the user.

## Testing

Uses Jest with Babel for ES6 module support. Tests mock `fetch` globally. The test suite runs ESLint and htmlhint before executing tests (`pretest` script).

## Code Style

- ES6 modules with `import`/`export`
- No build step - runs directly in browser with native ES modules
- ESLint configured for browser environment with ES2018
- Console statements generate warnings (`no-console: warn`)
