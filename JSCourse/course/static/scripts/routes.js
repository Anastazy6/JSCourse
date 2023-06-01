const simplePattern = pattern => new RegExp(`^/${pattern}$`);

const root = "./modules";
const app  = path => `${root}/${path}/${path}.js`;

const routes = [
  {
    route : simplePattern("library"),
    module: app("library")
  }, {
    route : simplePattern("tictactoe"),
    module: app("tictactoe")
  }


]

export default routes;