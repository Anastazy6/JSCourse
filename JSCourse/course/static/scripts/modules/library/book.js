import Util from "../../util/util.js";

function createBook(book, handlers) {
  const cover = document.createElement('article');
  cover.classList.add('book-cover');

  Object.keys(book).forEach(part => {
    cover.append(createBookPart(book, `${part}`))
  });

  cover.append(createDeleteBtn(book.id, handlers.delete));

  return cover;
}

function createBookPart(book, partName) {
  const part  = document.createElement('div');
  part.classList.add('book-data', `book-${partName}`);

  const label = Util.capitalize(`${partName}`);
  const value = book[`${partName}`];
  
  part.innerText = `${label}: ${value}`;

  return part
}

function createDeleteBtn(bookId, handleDelete) {
  const button = document.createElement('button');
  
  button.classList.add('btn', 'btn-outline-danger');
  button.innerHTML = 'Delete';
  button.dataset.bookId = bookId;

  button.onclick = handleDelete;

  return button;
}

export default createBook;