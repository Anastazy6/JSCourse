import View       from "./view.js"
import createBook from "./book.js";

const Library = (function() {
  const run = () => {
    View.addBookBtn.onclick = handleAddBook;
    View.close.onclick      = handleCloseForm;
    View.form.onsubmit      = handleSubmit;
  }

  let books = [];
  let currentBookId = 0;


  function setBooks(callback) {
    books = callback;
  }

  const setBookId = () => currentBookId++;

  const bookHandlers = {
    delete: handleDeleteBook
  }

  function addBook(data) {
    return {
        id    : setBookId(),
        title : data.title,
        author: data.author,
        pages : data.pages
    }
  }

  


  function handleAddBook() {
    View.show(View.formContainer);
    View.hide(View.addBookBtn);
  }


  function handleCloseForm() {
    View.clearForm();
    View.hide(View.formContainer);
    View.show(View.addBookBtn);
  }


  function handleDeleteBook(event) {
    event.stopPropagation();
    const bookId = parseInt(event.target.dataset.bookId);

    console.log(`Delete clicked for book #${bookId}.`);
    console.log(books);

    setBooks(books.filter(b => b.id !== bookId));
    console.log(books);
    updateLibrary();
  }


  function handleSubmit(event) {
    event.preventDefault();

    setBooks([
      addBook(View.getBookData()), 
      ...books
    ]);
    updateLibrary();
  }


  function updateLibrary() {
    View.clearLibrary();

    books.map(book => {
      View.library.append(createBook(book, bookHandlers))
    })

    View.clearForm();
  }



  return {
    run: run,
  }
})()

const App = () => {
  Library.run();
}

export default App;