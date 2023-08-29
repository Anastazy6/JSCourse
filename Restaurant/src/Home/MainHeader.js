function MainHeader() {
  const header = document.createElement('h1');

  header.classList.add('main-header');
  header.textContent = "Stardew & Moonshine";

  return header;
}

export default MainHeader;