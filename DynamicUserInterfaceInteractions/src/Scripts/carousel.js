import { getChildren } from "./util/helpers";

const FRAME_WIDTH  = 535; // px
const FRAME_HEIGHT = 420; // px

export function activateCarousels () {
  const wrappers  = Array.from(document.getElementsByClassName('carousel-wrapper'));

  wrappers.forEach(wrapper => {
    const frame    = wrapper .firstElementChild;
    const carousel = {
      container: frame.firstElementChild,
      offset   : 0
    }
    
    addCarouselNavigation(wrapper, carousel);
    populateCounters(carousel.container);

    styleSlides(carousel.container);
  });


}

function countItems (container) {
  return container.children.length;
}


function getMaxOffset (container) {
  return parseInt(getComputedStyle(container).width) - FRAME_WIDTH;
}


function populateCounters (container) {
  const itemsCount = countItems(container);
  let index = 1;
  
  getChildren(container).forEach(slide => {
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
  
  carousel.offset = carousel.offset + FRAME_WIDTH;
  
  if (carousel.offset > 0) {
    carousel.offset = 0;
  }

  carousel.container.style.left = carousel.offset + 'px';
}


function slideRight (carousel) {
  //const position = parseInt(getComputedStyle(container).left);
  const maxOffset = getMaxOffset(carousel.container);

  carousel.offset = carousel.offset - FRAME_WIDTH;

  if (carousel.offset < (maxOffset * -1)) {
    carousel.offset = (maxOffset * -1);
  }

  carousel.container.style.left = carousel.offset + 'px';
}


function styleSlides (container) {
  const slides = getChildren(container);

  slides.forEach(slide => {
    const img = getChildren(slide)[1];
    
  //  img.style.maxHeight = FRAME_HEIGHT + 'px';
  //  img.style.maxWidth  = FRAME_WIDTH  + 'px';
    
    addImagePadding(img);
  })
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

