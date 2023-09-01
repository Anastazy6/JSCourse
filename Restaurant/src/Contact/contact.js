function Contact() {
  const contact  = document.createElement('div');
  const fragment = document.createDocumentFragment();

  const test = document.createElement('h1');
  test.innerText = "Contact page loaded!";

  fragment.appendChild(test);
  contact .appendChild(fragment);

  return contact;
}

export default Contact;