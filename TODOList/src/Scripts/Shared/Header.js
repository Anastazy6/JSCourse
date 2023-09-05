const legalHeaders = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

function Header(level='h1', text) {
  if ( !(legalHeaders.includes(level))) {
    console.error(`${level} is not a valid header level!`);
    return false;
  }

  const header = document.createElement(level);
  header.innerText = text;

  return header;
}

export { Header };