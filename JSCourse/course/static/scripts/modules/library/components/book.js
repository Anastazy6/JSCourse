import Util from "../../../util/util.js";

function createBook(book, handlers) {
  const cover = document.createElement('article');
  cover.classList.add('book-cover');

  Object.keys(book).forEach(part => {
    cover.append(createBookPart(book, `${part}`))
  });

  cover.append(createReadBtn  (book, handlers.read  ));
  cover.append(createDeleteBtn(book, handlers.delete));

  return cover;
}


function createBookPart(book, partName) {
  const part  = document.createElement('div');
  
  const label = Util.capitalize(`${partName}`);
  const value = book[`${partName}`];

  part.classList.add('book-data', `book-${partName}`);
  part.innerText = `${label}: ${value}`;

  return part
}


function createDeleteBtn(book, handleDelete) {
  const button = document.createElement('button');
  
  button.classList.add('btn', 'btn-outline-danger', 'book-delete-btn');
  button.innerText      = 'Delete';
  button.dataset.bookId = book.id;

  button.onclick = handleDelete;

  return button;
}

// TODO: Consider refactoring, as most of the code looks like createDeleteBtn.
function createReadBtn(book, handleRead) {
  const button = document.createElement('button');

  let style, text;
  if (book.read) {
    style = 'warning';
    text = 'Unread';
  } else {
    style = 'success'
    text = 'Read';
  }
    
  button.classList.add('btn', `btn-outline-${style}`, 'book-read-btn');
  button.innerText      = text;
  button.dataset.bookID = book.id;

  button.onclick = handleRead;

  return button;
}



export default createBook;