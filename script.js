const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return this.title + " by " + this.author + ", " + this.pages + " pages, " + read;
    }
}

function addBook(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}

function showBooks() {
    myLibrary.forEach(book => {
        console.log(book);
    });
}

addBook("Harry Potter", "Rowling", 1000, "read");
addBook("Naruto", "Kishimoto", 350, "not read");
showBooks();
addBook("To Kill A Mockingbird", "Lee", 500, "read");

showBooks();