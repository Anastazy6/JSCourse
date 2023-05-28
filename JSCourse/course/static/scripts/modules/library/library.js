import View  from "./view.js"

const Library = (function() {
  const run = () => {
    View.addBookBtn.onclick = handleAddBook;
    View.close.onclick      = handleCloseForm;
    View.form.onsubmit      = handleSubmit;
  }

  let books = [];

  function addBook(data) {
    return {
        title : data.title,
        author: data.author,
        pages : data.pages
    }
  }

  function createBook(book) {
    const cover = document.createElement('article');

    const title  = document.createElement('div');
    const author = document.createElement('div');
    const pages  = document.createElement('div');

    cover.classList.add('book-cover');

    title .classList.add('book-title' );
    author.classList.add('book-author');
    pages .classList.add('book-pages' );

    title .innerText = `Title: ${book.title}`;
    author.innerText = `Author: ${book.author}`;
    pages .innerText = `Pages: ${book.pages}`;

    cover.append(title);
    cover.append(author);
    cover.append(pages);

    return cover;
  }

  function handleAddBook() {
    View.show(View.form)
  }

  function handleCloseForm() {
    View.hide(form);
    View.clearForm();
  }

  function handleSubmit(event) {
    event.preventDefault();

    books = [
      ...books,
      addBook(View.getBookData()) 
    ];
    updateLibrary();
  }


  function updateLibrary() {
    View.clearLibrary();

    View.library.append(books.map(book => createBook(book)))
  }




  return {
    run: run,
  }
})()

const App = () => {
  Library.run();
}

export default App;