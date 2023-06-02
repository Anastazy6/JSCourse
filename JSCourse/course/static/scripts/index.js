import routes    from "./routes.js";
import PathUtils from "./Utilities/pathUtils.js";

document.addEventListener('DOMContentLoaded', function() {
  main()
})

const main = () => {
  const modulePath = PathUtils.getModulePath(routes);
  if   (modulePath)  loadModule(modulePath);
}

const loadModule = (modulePath) => {
  import(modulePath)
  .then(module => module.default())
}