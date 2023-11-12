import React from "react";

const footerItems = [
  'First item',
  'Second item',
  'Test'
]

function Footer() {
  const items = footerItems.map((item, id) => (
    <div key={id}>
      {item}
    </div>)
  );

  return (
    <footer>
      {items}
    </footer>
  );
}

export default Footer;