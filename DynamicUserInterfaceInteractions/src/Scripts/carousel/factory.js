const carouselFactory = function (wrapper, frameSize) {
  const frame     = wrapper.firstElementChild;
  const container = frame  .firstElementChild;

  let current = 0;

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


  function _applySlide () {
    let offset = current * frameSize.width * -1;

    container.style.left = offset + 'px';
  }

  return {
    container : container,
    count     : count,
    current   : () => current,
    jump      : jump,
    slideLeft : slideLeft,
    slideRight: slideRight,
  }
}

export default carouselFactory;