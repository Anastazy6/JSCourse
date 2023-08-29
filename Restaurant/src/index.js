import Navbar from "./Shared/navbar";

document.addEventListener('DOMContentLoaded', () => {
  const content = document.getElementById('content');
  
  content.appendChild(Navbar());
  
  console.log("If this logs, then webpack works");
});
