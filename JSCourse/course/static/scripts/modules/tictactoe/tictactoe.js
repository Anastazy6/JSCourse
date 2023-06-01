// import Util from "../../util/util";

const TicTacToe = (function() {
  function run() {
    console.log("Kółko i krzyżyk");
  }


  return {
    run: run
  }
})()


/** 
 * Allows dynamically importing the module and running it like this:
 * 
 *   import("path/to/this/module") 
 * 
 *   .then(module => module.default()) 
 * 
 *   .catch([error handling goes here]) // optional line
 */
const App = () => {
  TicTacToe.run()
}

export default App;