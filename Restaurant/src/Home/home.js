import MainHeader from "./MainHeader";
import Contents   from "./contents";

function Home() {
  const home     = document.createElement('div');
  const fragment = document.createDocumentFragment();

  fragment.appendChild(MainHeader());

  Contents.map(item => {
    const article = document.createElement('article');
    const title   = document.createElement('h2');
    const text    = document.createElement('p');

    title.textContent = item.title;
    text .innerHTML   = item.text;

    article.appendChild(title);
    article.appendChild(text);

    fragment.appendChild(article);
  })


  home.appendChild(fragment);

  return home;
}

export default Home;