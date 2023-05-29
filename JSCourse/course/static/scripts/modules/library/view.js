const View = (function() {
  const library       = document.getElementById('library-container')
  
  const addBookBtn    = document.getElementById('add-button' );
  
  const formContainer = document.getElementById('library-form-container')  ;
  const form          = document.getElementById('library-form');
  const close         = document.getElementById('form-close'  );

  const title         = document.getElementById('form-title' );
  const author        = document.getElementById('form-author');
  const pages         = document.getElementById('form-pages' );

  
  function clearForm() {
    title .value = '';
    author.value = '';
    pages .value = '';
  }

  function clearLibrary() {
    library.innerHTML = '';
  }

  function getBookData() {
    return {
      title : title .value,
      author: author.value,
      pages : parseInt(pages.value)
    }
  }

  function show(element) {
    element.style.display = "block";
  }

  function hide(element) {
    element.style.display = "none";
  }


  return {
    addBookBtn    : addBookBtn,
    clearForm     : clearForm,
    clearLibrary  : clearLibrary,
    close         : close,
    form          : form,
    formContainer : formContainer,
    getBookData   : getBookData,
    hide          : hide,
    library       : library,
    show          : show
  }
})()

export default View;