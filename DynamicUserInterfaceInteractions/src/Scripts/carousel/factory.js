import { getChildren } from "../util/helpers";

const CarouselFactory = function (wrapper, frameSize) {
  const frame     = wrapper.firstElementChild;
  const container = frame  .firstElementChild;
  const slides    = getChildren(container);

  let current = 0;
  let bubbles = null;

  function count () {
    return container.children.length;
  }

  function jump (slide) {
    if (slide < 0 || slide >= count()) {
      throw new RangeError(
        `Slide index ${slide} is out of bounds (0 - ${count() - 1}).`
      );
    }

    current = slide;
    _applySlide()
  }


  function plugInBubbles (bubblesContainer) {
    bubbles = getChildren(bubblesContainer);
    _connectBubbles();
    _styleBubbles();
  }


  function _connectBubbles () {
    bubbles.forEach((bubble, index) => {
      bubble.onclick = () => jump(index);
    });
  }


  function slideRight () {
    current = current + 1;
    
    // move back to the first slide
    if (current >= count()) current = 0;
    _applySlide();
  }

  function slideLeft () {
    current = current - 1;

    // move to the last slide
    if (current < 0) current = count() - 1;
    _applySlide();
  }


  function _styleBubbles () {
    bubbles.forEach((bubble, index) => {
      bubble.classList.remove('bubble-active');

      if (index === current) bubble.classList.add('bubble-active');
    });
  }

  function _applySlide () {
    let offset = current * frameSize.width * -1;

    container.style.left = offset + 'px';

    if (bubbles) _styleBubbles();
  }



  function populateCounters () {
    slides.forEach((slide, index) => {
      const counter = slide.firstElementChild;
      counter.innerText = _generateCounter(index);
    });
  }


  function _generateCounter (index) {
    return `${index + 1} / ${count()}`;
  }

  return {
    container       : container,
    count           : count,
    current         : () => current,
    jump            : jump,
    plugInBubbles   : plugInBubbles,
    populateCounters: populateCounters,
    slideLeft       : slideLeft,
    slideRight      : slideRight,
  }
}

export default CarouselFactory;