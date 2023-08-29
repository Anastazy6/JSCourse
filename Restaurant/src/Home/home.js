import MainHeader from "./MainHeader";

function Home() {
  const home     = document.createElement('div');
  const fragment = document.createDocumentFragment();

  fragment.appendChild(MainHeader());
  home.appendChild(fragment);

  return home;
}

export default Home;