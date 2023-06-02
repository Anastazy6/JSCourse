/**
 *  Namespace for Path utilities.
 */ 
const PathUtils = (function() {

  const getPath  = () => window.location.pathname;
  const getRoute = (path=getPath()) => path.slice(1).split("/");

  const getModulePath = (routes) => {
    const path         = getPath();
    const currentRoute = routes.filter(r => r.route.test(path));

    switch (currentRoute.length) {
      case 0:
        // No module path if the current route is not associated with any of the VanillaJS modules.
        // This may happen if the route uses React, Angular.js or Django template rendering
        return false;
      case 1:
        return currentRoute[0].module;
      default:
        throw `Routing error: current route matches more than one from the predefined ones.`
    }
  }
  

  /**
   *  Redirects to another page WITHIN this web service. The url argument is relative
   *    to the site's root location.
   * 
   * @param {String} url 
   * @returns void
   */
  const redirect = (url) => {
    const origin = window.location.origin;

    window.location.replace(`${origin}${url}`);
  }


  return {
    getPath      : getPath,
    getRoute     : getRoute,
    getModulePath: getModulePath,
    redirect     : redirect,
  }
})()

export default PathUtils;