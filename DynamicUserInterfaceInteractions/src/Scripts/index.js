import '../Styles/styles.scss';

document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');

  const test = document.createElement('h3');
  test.innerText = 'JavaScript loaded successfully!';

  body.append(test);
});