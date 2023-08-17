const Dashboard = (function() {
  const sidePanel       = document.getElementById("dashboard-side-panel");
  const sidePanelSwitch = document.getElementById("side-panel-switch");
  
  function run() {
    console.log("Dashboard script loaded!");
    sidePanelSwitch.addEventListener("click", toggleSidePanel);
  }

  function toggleSidePanel() {
    sidePanel      .classList.toggle("mobile-hidden");
    sidePanelSwitch.classList.toggle("sidepanel-visible");
  }

  return {
    run: run
  }
})()

const App = () => {
  Dashboard.run();
}

export default App;