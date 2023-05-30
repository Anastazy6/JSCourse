const View = (function() {
  const library    = document.getElementById('library-container');
  const form       = document.getElementById('library-form'     );
  
  const addBookBtn = document.getElementById('add-button'   );
  const closeBtn   = document.getElementById('form-close'   );

  const title      = document.getElementById('form-title'   );
  const author     = document.getElementById('form-author'  );
  const pages      = document.getElementById('form-pages'   );
  const read       = document.getElementById('form-read-box');


  function clearForm() {
    title .value   = '';
    author.value   = '';
    pages .value   = '';
    read  .checked = false;
  }


  function clearLibrary() {
    library.innerHTML = '';
  }


  function getBookData() {
    return {
      title : title .value,
      author: author.value,
      pages : parseInt(pages.value),
      read  : read.checked
    }
  }



  return {
    addBookBtn    : addBookBtn,
    clearForm     : clearForm,
    clearLibrary  : clearLibrary,
    closeBtn      : closeBtn,
    form          : form,
    getBookData   : getBookData,
    library       : library,
  }
})()

export default View;