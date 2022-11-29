/*eslint-disable */
class Book {
    constructor (title,author) {
        this.title= title;
        this.author = author;
    }
}
/*eslint-disable */

/*eslint-disable */
class UI {
    
    static displayBook() {
        const books = store.getBooks();
    

        books.forEach((book) => UI.addBookToList(book));
    }
    static addBookToList(book){
        const list = document.querySelector('#book-list');
        const div = document.createElement('div');
        div.innerHTML = `
        <div>${book.title}</div>
        <div>${book.author}</div>
        <button class='delete' id='delete'>Remove</button> 
        `;
        list.appendChild(div);
        console.log(book.title);
        console.log(book.author);
    }
   

    static deleteBook(clickTarget){
        if(clickTarget.classList.contains('delete')){
            clickTarget.parentElement.remove();
        }
    }
    static clearFields(){
        document.querySelector('#book').value ='';
        document.querySelector('#author').value ='';
    }
}
/*eslint-disable */

/*eslint-disable */
class store {
     static getBooks() {
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book) {
        const books = store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books))
    }

    static removeBook(author) {
        const books = store.getBooks();
        books.forEach((book,index) => {
            if (book.author === author ){
                books.splice(index,1)
                localStorage.setItem('books',JSON.stringify(books))
            }
        })
    }
}
/*eslint-disable */

// event  displaybook

document.addEventListener('DOMContentLoaded',UI.displayBook);

document.querySelector('#booksform').addEventListener('submit',(e) =>{
    e.preventDefault();
    const title = document.querySelector('#book').value;
    const author = document.querySelector('#author').value;
    console.log( document.querySelector('#author').value)

    // instatiate a book
    const book = new Book(title,author);
    // add book to list
    console.log(book)
    UI.addBookToList(book);

    store.addBook(book);
    //clearfields 
    UI.clearFields();
})

//remove an item
document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);

    store.removeBook(e.target.previousElementSibling.textContent)
})
