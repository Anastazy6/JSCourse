import { getChildren } from "./util/helpers";

const FRAME_WIDTH  = 535; // px
const FRAME_HEIGHT = 420; // px

export function activateCarousels () {
  const wrappers  = Array.from(document.getElementsByClassName('carousel-wrapper'));

  wrappers.forEach(wrapper => {
    const frame    = wrapper .firstElementChild;
    const carousel = frame   .firstElementChild;
    
    addCarouselNavigation(wrapper, carousel);
    populateCounters(carousel);

    styleSlides(carousel);
  });


}

function countItems (carousel) {
  return carousel.children.length;
}


function getMaxOffset (carousel) {
  return parseInt(getComputedStyle(carousel).width) - FRAME_WIDTH;
}


function populateCounters (carousel) {
  const itemsCount = countItems(carousel);
  let index = 1;
  
  getChildren(carousel).forEach(slide => {
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

  button.innerText = type;
  button.onclick = () => handleCarouselNavigationClick(carousel, type);

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
  const position  = parseInt(getComputedStyle(carousel).left);
  let newPosition = position + FRAME_WIDTH;
  
  if (newPosition > 0) {
    newPosition = 0;
  }

  carousel.style.left = newPosition + 'px';
}


function slideRight (carousel) {
  const position = parseInt(getComputedStyle(carousel).left);
  const maxOffset = getMaxOffset(carousel);

  let newPosition = position - FRAME_WIDTH;

  if (newPosition < (maxOffset * -1)) {
    newPosition = (maxOffset * -1);
  }

  carousel.style.left = newPosition + 'px';
}


function styleSlides (carousel) {
  const slides = getChildren(carousel);

  slides.forEach(slide => {
    const img = getChildren(slide)[1];
    
    img.style.maxHeight = FRAME_HEIGHT + 'px';
    img.style.maxWidth  = FRAME_WIDTH  + 'px';
    
    addImagePadding(img);
  })
}


function addImagePadding (img) {
  const imgStyles = getComputedStyle(img);
  const imgWidth  = parseInt(imgStyles.width);
  const imgHeight = parseInt(imgStyles.height);

  let paddingX, paddingY = 0;
  
  if (imgWidth < FRAME_WIDTH) {
    paddingX = (FRAME_WIDTH - imgWidth) / 2;
  }

  if (imgHeight < FRAME_HEIGHT) {
    paddingY = (FRAME_HEIGHT - imgHeight) / 2;
  }

  img.style.padding = `${paddingY}px ${paddingX}px`;  
}

