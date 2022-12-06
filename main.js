/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-trailing-spaces */
/* eslint-disable lines-between-class-members */
// event  displaybook
import UI from './modules/userInterphase.js'
import Book from './modules/books.js'
import store from './modules/store.js'

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
