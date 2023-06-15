"use strict";

import routes    from "./routes.js";
import PathUtils from "./Utilities/pathUtils.js";
import Sidebar   from "./Utilities/sidebar.js";

document.addEventListener('DOMContentLoaded', function() {
  main()
})

const main = () => {
  const modulePath = PathUtils.getModulePath(routes);
  if   (modulePath)  loadModule(modulePath);
  Sidebar.render();
}

const loadModule = (modulePath) => {
  import(modulePath)
  .then(module => module.default())
}