// event  displaybook
import UI from './modules/userInterphase.js';
import Book from './modules/books.js';
import store from './modules/store.js';
import { DateTime } from './modules/luxon.js';

document.addEventListener('DOMContentLoaded', UI.displayBook);
document.querySelector('#booksform').addEventListener('submit', (e) => {
  e.preventDefault();
  const author = document.querySelector('#author').value;
  const title = document.querySelector('#book').value;

  // instatiate a book
  const book = new Book(title, author);
  // add book to list
  UI.addBookToList(book);
  store.addBook(book);
  // clearfields
  UI.clearFields();
});

// remove an item from book list
document.querySelector('#book-list').addEventListener('click', (e) => {
  UI.deleteBook(e.target);
  store.removeBook(e.target.previousElementSibling.textContent);
});
const timer = document.getElementById('nav-time');
setInterval(() => {
  timer.innerHTML = DateTime.now().toLocaleString(
    DateTime.DATETIME_FULL_WITH_SECONDS,
  );
}, 1000);
