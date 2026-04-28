# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Single Page Application (SPA) that displays SpaceX launch information using [The Space Devs Launch Library API](https://ll.thespacedevs.com/2.2.0/). The app is built with vanilla JavaScript using hash-based routing, with service worker caching and localStorage for API response caching. No frameworks, no build step.

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

### SPA Structure

The app is a Single Page Application with hash-based routing:

- **index.html**: Single HTML entry point with `<div id="app">` container
- **js/app.js**: Application entry point - initializes router, registers service worker, sets up global event listeners
- **js/router.js**: Hash-based router (`#/`, `#/launch/:id`) - listens to `hashchange` events and routes to components
- **js/components/HomePage.js**: Home view component - renders upcoming/latest launches and past launches list
- **js/components/LaunchPage.js**: Launch detail view component - renders single launch with YouTube video
- **js/data.js**: Shared data layer - handles API calls, caching, and DOM rendering functions
- **css/styles.css**: Consolidated styles (previously inline in both HTML files)

### Routing

Hash-based routing for client-side navigation without server configuration:

- `#/` or `#/home` → HomePage component (upcoming, latest, past launches)
- `#/launch/:id` → LaunchPage component (single launch detail)

Navigation is instant without page reloads. Deep linking works: `http://localhost:3000/#/launch/{id}` directly loads launch detail.

### Component System

Each component exports a `render()` function that:

1. Injects HTML structure into `#app` container using template literals
2. Calls data.js functions to fetch and render API data
3. Sets up component-specific event listeners

Components are stateless - they re-render completely on each route change.

### Data Flow

The app uses a centralized data module (`data.js`) that handles all API communication and DOM rendering:

1. **API Layer**: `getApiResponse()` - generic fetch wrapper
2. **Cache Layer**: `requestData()` and `requestDataAllLaunches()` - check localStorage before fetching
3. **Rate Limit Handling**: `handleApiLimit()` - detects API limit errors and displays message to user
4. **Rendering**: Print functions (`printHomeLaunch`, `printSingleLaunch`, `printPastLaunchesList`) manipulate DOM directly using querySelector

### Caching Strategy

Two-tier caching for optimal performance:

- **Service Worker** (`serviceWorker.js`): Caches static assets (HTML, JS, CSS, images) in cache named `platzinautas-site-v2`
  - Single HTML entry point (`index.html`)
  - All JS modules (`app.js`, `router.js`, `data.js`, components)
  - CSS and images
  - Activate event cleans up old cache versions
- **localStorage**: Caches API responses with keys:
  - `'upcoming'` - next SpaceX launch
  - `'latest'` - most recent SpaceX launch  
  - `'allLaunches'` - list of past 100 launches
  - `{launchId}` - individual launch details by UUID

Cache is checked before every API call to reduce request volume and handle API rate limits. Clear cache link in footer resets localStorage.

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
- Hash-based routing for SPA navigation
- Component-based architecture without frameworks
- Template literals for HTML rendering
- ESLint configured for browser environment with ES2018
- Console statements generate warnings (`no-console: warn`)

## Key Benefits of SPA Architecture

- **Zero page reloads**: Instant client-side navigation
- **No code duplication**: Single HTML file, shared header/footer
- **Better UX**: Smooth transitions without flash/flicker
- **Optimized caching**: Service worker caches entire app upfront
- **Deep linking**: Direct URLs to any launch (`#/launch/id`)
- **Maintains simplicity**: No frameworks, no build step, vanilla JS only
