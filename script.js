const myLibrary = [];
const libraryTable = document.querySelector("table");

const dialog = document.querySelector("dialog");
const showFormButton = document.querySelector(".show-form");
showFormButton.addEventListener("click", () => {
    dialog.showModal();
});

const submitFormButton = document.querySelector(".submit-form");
submitFormButton.addEventListener("click", () => {
    
    const form = querySelector("form");
    const formData = new FormData(form);

    const title = formData.get("title");
    const author = formData.get("author");
    const pages = formData.get("pages")
    const read = formData.has("read") ? "Read" : "Not Read";
    addBook(title, author, pages, read); 
});

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read; 
}

Book.prototype.info = function() {
    return [this.title, this.author, this.pages, this.read];
}

function addBook(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}

function clearBooks() {
    const booksInfo = document.querySelectorAll(".book-info");
    booksInfo.forEach(bookInfo => {
        bookInfo.remove();
    });
}

function showBooks() {
    myLibrary.forEach(book => {
        const newRow = document.createElement("tr");
        newRow.classList.add("book-info");
        libraryTable.appendChild(newRow);
        
        book.info().forEach(field => {
            const newCell = document.createElement("td");
            newCell.textContent = field;
            newRow.appendChild(newCell);
        });
    });
}

addBook("Harry Potter", "Rowling", 1000, "Yes");
addBook("Naruto", "Kishimoto", 350, "No");
showBooks();
addBook("To Kill A Mockingbird", "Lee", 500, "Yes");
showBooks();