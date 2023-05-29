import routes from "./routes.js";
import Util   from "./util/util.js";

document.addEventListener('DOMContentLoaded', function() {
  main()
})

const main = () => {
  const modulePath = Util.Path.getModulePath(routes);
  if   (modulePath)  loadModule(modulePath);
}

const loadModule = (modulePath) => {
  import(modulePath)
  .then(module => module.default())
}