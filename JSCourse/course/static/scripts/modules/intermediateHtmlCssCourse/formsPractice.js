const FormsPractice = (function() {
  function run() {
    console.log("Forms practice module loaded!");
  }

  return {
    run: run
  }
})()

const App = () => {
  FormsPractice.run();
}

export default App;