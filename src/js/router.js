/* eslint-disable no-console */

class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  navigateTo(path) {
    window.location.hash = path;
  }

  parseRoute(hash) {
    const cleanHash = hash.replace(/^#/, '') || '/';

    for (const routePath in this.routes) {
      const routeRegex = new RegExp('^' + routePath.replace(/:\w+/g, '([^/]+)') + '$');
      const match = cleanHash.match(routeRegex);

      if (match) {
        const params = {};
        const paramNames = routePath.match(/:\w+/g);

        if (paramNames) {
          paramNames.forEach((paramName, index) => {
            params[paramName.substring(1)] = match[index + 1];
          });
        }

        return { handler: this.routes[routePath], params };
      }
    }

    return null;
  }

  handleRoute() {
    const hash = window.location.hash;
    const route = this.parseRoute(hash);

    if (route) {
      this.currentRoute = route;
      route.handler(route.params);
    } else {
      console.warn(`No route found for ${hash}, defaulting to home`);
      this.navigateTo('/');
    }
  }

  init() {
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('load', () => this.handleRoute());
  }
}

export const router = new Router();
