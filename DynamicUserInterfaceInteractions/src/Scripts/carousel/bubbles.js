const BubblesFactory = function (carousel) {
  const slidesCount = carousel.count();

  function createContainer () {
    const container = document.createElement('div');
    container.classList.add('bubbles');

    _createBubbles(container, slidesCount);

    return container;
  }


  function _createBubbles (container, slidesCount) {
    for (let i = 0; i < slidesCount; i++) {
      container.append(_createBubble());
    }
  }


  function _createBubble () {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');

    return bubble;
  }

  return createContainer();
};

export default BubblesFactory;