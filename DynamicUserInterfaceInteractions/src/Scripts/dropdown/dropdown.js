import { getChildren } from "../util/helpers";



export function activateDropdownMenus () {
  const dropdownItems = Array.from(
    document.getElementsByClassName('dropdown')
  );

  dropdownItems.forEach(dropdown => {
    dropdown.onclick = (e) => handleDropdownClick(e, dropdownItems);
  });
}


function handleDropdownClick (e, dropdownItems) {
  dropdownItems.forEach(dropdown => {
    if (!(getChildren(dropdown).includes(e.target))) {
      dropdown.classList.remove('clicked'); // "Unclick" other dropdown menus
    } else {
      dropdown.classList.toggle('clicked');
    }
  });
}