class Router {
  constructor(routes) {
    this.routes = routes;
    this._loadInitialRoutes();
  }

  loadRoute(...urlSegments) {
    const matchedRoute = this._matchUrlToRoute(urlSegments);
    const url = `/${urlSegments.join("/")}`;
    history.pushState({}, "thisworks", url);
    const routerOutElm = document.querySelectorAll("[data-router]")[0];
    routerOutElm.innerHTML = matchedRoute.template;
  }
  _loadInitialRoutes() {
    const pathNameSplit = window.location.pathname.split("/");
    const pathSegs = pathNameSplit.length > 1 ? pathNameSplit.slice(1) : "";
    this.loadRoute(...pathSegs);
  }

  _matchUrlToRoute(urlSegments) {
    const matchedRoute = this.routes.find((route) => {
      const routePathSegs = route.path.split("/").slice(1);

      if (routePathSegs.length !== urlSegments.length) {
        return false;
      }
      return routePathSegs.every(
        (routePathSeg, i) => routePathSeg === urlSegments[i]
      );
    });
    return matchedRoute;
  }
}
