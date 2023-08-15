import Cover     from "./components/cover.js";
import ViewUtils from "../../Utilities/viewUtils.js";
import View      from "./view.js"
import Util      from "../../Utilities/util.js";


const Library = (function() {
  const run = () => {
    View.addBookBtn.onclick   = handleAddBook;
    View.closeBtn  .onclick   = handleCloseForm;
    View.form      .onsubmit  = handleSubmit;
    View.pages     .onkeydown = handleNumericInput;
  }


  class Book {
    constructor(data) {
      this.id       = data.id || setBookId(),
      this.title    = data.title,
      this.author   = data.author,
      this.language = data.language,
      this.pages    = data.pages,
      this.read     = data.read
    }
  }


  const bookHandlers = {
    delete: handleDeleteBook,
    read  : handleRead
  }


  let books = [];
  let currentBookId = 0;
  
  // Prefix increment so that the IDs start from 1 and are equal to
  //   all the books that have been added so far (including deleted books)
  const setBookId = () => ++currentBookId;
  
  const getBookBtnId = event => parseInt(event.target.dataset.bookId);

  
  function setBooks(callback) {
    books = callback;
  }


  function handleAddBook() {
    ViewUtils.show(View.form, 'grid');
    ViewUtils.hide(View.addBookBtn);
  }


  function handleCloseForm() {
    View.clearForm();
    ViewUtils.hide(View.form);
    ViewUtils.show(View.addBookBtn);
  }


  function handleDeleteBook(event) {
    event.stopPropagation();
    
    setBooks(books.filter(b => b.id !== getBookBtnId(event)));
    updateLibrary();
  }


  function handleNumericInput(event) {
    const keyCode = event.keyCode || event.which;

    if (!(Util.isKeyNumeric(keyCode))) event.preventDefault();
  }


  function handleRead(event) {
    event.stopPropagation();
    
    setBooks(books.map(b => {
      if (b.id !== getBookBtnId(event)) return b;

      return new Book({
        ...b,
        read: !b.read
      });
    }))

    updateLibrary();
  }


  function handleSubmit(event) {
    event.preventDefault();

    setBooks([
      new Book(View.getBookData()), 
      ...books
    ]);
    updateLibrary();
  }


  function updateLibrary() {
    const fragment = document.createDocumentFragment();

    books.map(book => {
      fragment.append(Cover.create(book, bookHandlers));
    })

    View.clearLibrary();
    View.clearForm();
    View.library.append(fragment);
  }



  return {
    run: run,
  }
})()






/** 
 * Allows dynamically importing the module and running it like this:
 * 
 *   import("path/to/this/module") 
 * 
 *   .then(module => module.default()) 
 * 
 *   .catch([error handling goes here]) // optional line
 */
const App = () => {
  Library.run();
}

export default App;