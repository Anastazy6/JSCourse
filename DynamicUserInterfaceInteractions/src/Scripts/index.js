import '../Styles/styles.scss';

import { getChildren } from "../Scripts/util/helpers";

document.addEventListener('DOMContentLoaded', () => {
  const dropdownItems = Array.from(
    document.getElementsByClassName('dropdown')
  );

  dropdownItems.forEach(dropdown => {
    dropdown.onclick = (e) => handleDropdownClick(e);
  });


  function handleDropdownClick (e) {
    dropdownItems.forEach(dropdown => {
      if (!(getChildren(dropdown).includes(e.target))) {
        dropdown.classList.remove('clicked'); // "Unclick" other dropdown menus
      } else {
        dropdown.classList.toggle('clicked');
      }
    });
  }
});


