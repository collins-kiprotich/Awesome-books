/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */
/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable lines-between-class-members */
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class UI {
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
    document.querySelector('#book').value = '';
    document.querySelector('#author').value = '';
  }
}

class store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(author) {
    const books = store.getBooks();
    books.forEach((book, index) => {
      if (book.author === author) {
        books.splice(index, 1);
        localStorage.setItem('books', JSON.stringify(books));
      }
    });
  }
}

// event  displaybook

document.addEventListener('DOMContentLoaded', UI.displayBook);

document.querySelector('#booksform').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('#book').value;
  const author = document.querySelector('#author').value;

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
