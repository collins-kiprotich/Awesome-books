import store from './store.js';

export default class UI {
  static displayBook() {
    const books = store.getBooks();
    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');
    const div = document.createElement('div');
    div.classList.add('listing');
    div.innerHTML = `
          <div class="book-title">"${book.title}" By </div><div class="author-div">${book.author}</div>
          <button class='delete' id='delete'>Remove</button> 
          `;
    list.appendChild(div);
  }

  static deleteBook(clickTarget) {
    if (clickTarget.classList.contains('delete')) {
      clickTarget.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector('#author').value = '';
    document.querySelector('#book').value = '';
  }
}