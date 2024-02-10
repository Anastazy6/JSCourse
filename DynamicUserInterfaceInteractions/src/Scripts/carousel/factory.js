const carouselFactory = function (wrapper) {
  const frame     = wrapper.firstElementChild;
  const container = frame.firstElementChild;

  return {
    container: container,
    offset   : 0,
    current  : 1,
    count    : () => container.children.length
  }
}

export default carouselFactory;