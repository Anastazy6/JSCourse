import React from "react";

const footerItems = [
  {
    text: 'Clear local storage',
    onClick: (() => localStorage.clear())},
  {
    text: 'Delete all projects',
    onClick: (() => localStorage.removeItem('projects'))
  },
  {
    text: "Reset projects' counter",
    onCLick: (() => localStorage.setItem('projectId', 0))
  }
]

function Footer() {
  const items = footerItems.map((item, id) => (
    <div key={id} onClick={item.onClick}>
      {item.text}
    </div>)
  );

  return (
    <footer>
      {items}
    </footer>
  );
}

export default Footer;