import Util from "../../../Utilities/util.js";

const Cover = (function() {
  function create(book, handlers) {
    const cover = document.createElement('article');
    cover.classList.add('book-cover');
  
    Object.keys(book).forEach(part => {
      cover.append(createBookPart(book, `${part}`))
    });
  
    cover.append(createButton('read'  , handlers.read,   book));
    cover.append(createButton('delete', handlers.delete, book));
  
    return cover;
  }
  
  
  function createBookPart(book, partName) {
    const part  = document.createElement('div');
    
    const label = Util.capitalize(`${partName}`);
    const value = book[`${partName}`];
  
    part.append(createPartCell('label', label));
    part.append(createPartCell('value', value));
  
    part.classList.add('book-data', `book-${partName}`);
  
    return part
  }
  
  
  function createPartCell(type, value) {
    const cell = document.createElement('div');
  
    let textContent = Util.capitalize(`${value}`);
    if (type === 'label') textContent += ':';     // Only add ':' for the label;
  
    cell.classList.add(`book-data-${type}`);
    cell.innerText = textContent;
    return cell;
  }
  
  
  function assertProperButtonType(type) {
    const buttonTypes = ['delete', 'read'];
  
    if (!(buttonTypes.includes(type))) {
      throw `Invalid button type: ${type}.`;
    }
  }
  
  
  const buttonStyle = (type, book) => {
    assertProperButtonType(type);
  
    if (type === 'delete') return 'danger';
  
    return book.read ? 'warning' : 'success';
  }
  
  
  const buttonText = (type, book) => {
    assertProperButtonType(type);
  
    if (type === 'delete') return 'Delete';
  
    return book.read ? 'Unread' : 'Read';
  }
  
  
  function createButton(type, handler, book) {
    const button = document.createElement('button');
  
    const style = buttonStyle(type, book);
    const text  = buttonText (type, book);
  
    button.classList.add(
      'btn',
      `btn-outline-${style}`,
      `book-${type}-btn`
    )
  
    button.innerText      = text;
    button.dataset.bookId = book.id;
    button.onclick        = handler
  
    return button;
  }


  return {
    create: create
  }
})()




export default Cover;