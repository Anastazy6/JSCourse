import React from "react";

const footerItems = [
  {
    text: 'Log projects',
    onClick: (() => console.log(JSON.parse(localStorage.getItem('projects'))))
  },
  {
    text: 'Log tasks',
    onClick: (() => console.log(JSON.parse(localStorage.getItem('tasks'))))
  },
  {
    text: 'Clear local storage',
    onClick: (() => localStorage.clear())},
  
]

function Footer() {
  const items = footerItems.map((item, id) => (
    <button
      key={id}
      onClick={item.onClick}
      className="btn btn-outline-lleuad"
    >
      {item.text}
    </button>)
  );

  return (
    <footer>
      {items}
    </footer>
  );
}

export default Footer;