import { getChildren } from "../util/helpers";
import BubblesFactory from "./bubbles";

import { FRAME_WIDTH, FRAME_HEIGHT } from "./constants";
import CarouselFactory from "./factory";


const defaultFrame = {
  width : FRAME_WIDTH,
  height: FRAME_HEIGHT
}

export function activateCarousels () {
  const wrappers  = Array.from(document.getElementsByClassName('carousel-wrapper'));

  wrappers.forEach(wrapper => {
    const carousel = CarouselFactory(wrapper, defaultFrame);
    const bubbles  = BubblesFactory(carousel);

    wrapper.append(bubbles);
    carousel.plugInBubbles(bubbles);

    carousel.populateCounters();
    resetCarouselInterval(carousel);
    addCarouselNavigation(wrapper, carousel);
    styleSlides          (carousel);
  });
}



function resetCarouselInterval (carousel) {
  if (carousel.interval) clearInterval(carousel.interval);

  carousel.interval = setInterval(() => carousel.slideRight(), 5000);
}


function addCarouselNavigation (wrapper, carousel) {
  const navitems = ['Prev', 'Next'];

  navitems.forEach(type => {
    wrapper.append(
      createCarouselNavItem(carousel, type)
    );
  });
}


function createCarouselNavItem (carousel, type) {
  const button = document.createElement('button')

  button.classList.add(
    'carousel-nav', 
    `nav-${type}`
  );


  button.onclick = () => {
    resetCarouselInterval(carousel);
    handleCarouselNavigationClick(carousel, type);
  }

  button.innerText = type;

  return button;
}





function handleCarouselNavigationClick (carousel, type) {
  switch (type) {
    case 'Prev': {
      carousel.slideLeft();
      break;
    }
    case 'Next': {
      carousel.slideRight();
      break;
    }
    default: {
      throw new TypeError(`Invalid carousel navigation type: ${type}.`);
    }
  }
}


// function slideLeft (carousel) {
  
//   carousel.offset = carousel.offset + FRAME_WIDTH;
  
//   if (carousel.offset > 0) {
//     carousel.offset = 0;
//   }

//   carousel.container.style.left = carousel.offset + 'px';
// }


// function slideRight (carousel) {
//   const maxOffset = getMaxOffset(carousel.container);

//   carousel.offset = carousel.offset - FRAME_WIDTH;

//   if (carousel.offset < (maxOffset * -1)) {
//     carousel.offset = (maxOffset * -1);
//   }

//   carousel.container.style.left = carousel.offset + 'px';
// }


function styleSlides (carousel) {
  const slides = getChildren(carousel.container);

  slides.forEach(slide => {
    const img = getChildren(slide)[1];
    addImagePadding(img);
  });
}


function addImagePadding (img) {
  const imgStyles = getComputedStyle(img);
  const imgWidth  = parseInt(imgStyles.width);
  const imgHeight = parseInt(imgStyles.height);

  let paddingX, paddingY = 0;
  
  console.log(imgWidth, imgHeight);

  if (imgWidth < FRAME_WIDTH) {
    paddingX = (FRAME_WIDTH - imgWidth) / 2;
  }

  if (imgHeight < FRAME_HEIGHT) {
    paddingY = (FRAME_HEIGHT - imgHeight) / 2;
  }

  img.style.padding = `${paddingY}px ${paddingX}px`;  
}


