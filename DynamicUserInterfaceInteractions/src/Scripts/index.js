import '../Styles/styles.scss';

import { activateDropdownMenus } from '../Scripts/dropdown';
import { activateCarousels     } from '../Scripts/carousel';

document.addEventListener('DOMContentLoaded', () => {
  activateDropdownMenus();
  activateCarousels();
});


