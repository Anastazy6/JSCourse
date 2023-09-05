const items = [
  'First item',
  'Second item',
  'Test'
]

function Footer() {
  const footer   = document.createElement("footer");
  const fragment = document.createDocumentFragment();

  items.map(item => {
    const element = document.createElement('div');
    element.innerText = item;
    fragment.appendChild(element);
  })

  footer.appendChild(fragment);

  return footer;
}

export default Footer;