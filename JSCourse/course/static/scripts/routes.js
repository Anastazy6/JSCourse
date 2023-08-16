const simplePattern = pattern => new RegExp(`^/${pattern}$`);

const root     = "./modules";
const app      = path => `${root}/${path}/${path}.js`;

// Location for JS modules for the Intermediate HTML CSS course
//   These are not designed to require Js, thus I keep them in a single directory
const practice = path => `${root}/intermediateHtmlCssCourse/${path}.js`;

/**
 * route:  site's url address past the domain name  
 * 
 * module: relative path to the file containing the script from the directory 
 *         the routes.js file is in
 */
const routes = [
  {
    route : simplePattern("library"),
    module: app("library")
  }, {
    route : simplePattern("tictactoe"),
    module: app("tictactoe")
  }, {
    route : simplePattern("forms-practice"),
    module: practice("formsPractice")
  }, {
    route : simplePattern("admin-dashboard"),
    module: practice("adminDashboard")
  }
]

export default routes;