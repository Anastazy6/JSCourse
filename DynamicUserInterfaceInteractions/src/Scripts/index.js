import '../Styles/styles.scss';

import { activateDropdownMenus } from '../Scripts/dropdown/dropdown';
import { activateCarousels     } from '../Scripts/carousel/carousel';

document.addEventListener('DOMContentLoaded', () => {
  activateDropdownMenus();
  activateCarousels();
});


