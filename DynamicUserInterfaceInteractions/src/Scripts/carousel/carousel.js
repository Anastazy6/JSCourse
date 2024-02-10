import { getChildren } from "../util/helpers";

import { FRAME_WIDTH, FRAME_HEIGHT } from "./constants";
import carouselFactory from "./factory";



export function activateCarousels () {
  const wrappers  = Array.from(document.getElementsByClassName('carousel-wrapper'));

  wrappers.forEach(wrapper => {
    const carousel = carouselFactory(wrapper);


    resetCarouselInterval(carousel);
    addCarouselNavigation(wrapper, carousel);
    populateCounters     (carousel);
    createBubbles        (wrapper, carousel);
    styleSlides          (carousel);
  });
}


function createBubbles (wrapper, carousel) {
  const bubbles = document.createElement('div');
  bubbles.classList.add('bubbles')

  Array.from(carousel.container.children).forEach(_slide => {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubbles.append(bubble);
  });

  wrapper.append(bubbles);
} 


function resetCarouselInterval (carousel) {
  if (carousel.interval) clearInterval(carousel.interval);

  carousel.interval = setInterval(() => slideRight(carousel), 5000);
}



function getMaxOffset (container) {
  return parseInt(getComputedStyle(container).width) - FRAME_WIDTH;
}


function populateCounters (carousel) {
  const itemsCount = carousel.count();
  let index = 1;
  
  getChildren(carousel.container).forEach(slide => {
    const counter = slide.firstElementChild;
    counter.innerText = generateCounter(index, itemsCount);
    index++;
  });
}

function generateCounter (itemIndex, itemsCount) {
  return `${itemIndex} / ${itemsCount}`;
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
      slideLeft(carousel);
      break;
    }
    case 'Next': {
      slideRight(carousel);
      break;
    }
    default: {
      throw new TypeError(`Invalid carousel navigation type: ${type}.`);
    }
  }
}


function slideLeft (carousel) {
  
  carousel.offset = carousel.offset + FRAME_WIDTH;
  
  if (carousel.offset > 0) {
    carousel.offset = 0;
  }

  carousel.container.style.left = carousel.offset + 'px';
}


function slideRight (carousel) {
  const maxOffset = getMaxOffset(carousel.container);

  carousel.offset = carousel.offset - FRAME_WIDTH;

  if (carousel.offset < (maxOffset * -1)) {
    carousel.offset = (maxOffset * -1);
  }

  carousel.container.style.left = carousel.offset + 'px';
}


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


