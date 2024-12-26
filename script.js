const myLibrary = [];
const libraryBody = document.querySelector("tbody");

const dialog = document.querySelector("dialog");
const showDialogButton = document.querySelector(".show-dialog");
showDialogButton.addEventListener("click", () => {
    dialog.showModal();
});

const addBookButton = document.querySelector(".add-book");
addBookButton.addEventListener("click", (event) => {
    const form = document.querySelector("form");

    if (form.checkValidity()) {
        event.preventDefault();
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const pages = document.getElementById("pages").value;
        const read = document.getElementById("read").checked ? "Yes" : "No";
        addBook(title, author, pages, read);
        
        dialog.close(); 
        document.querySelector("form").reset();
    }
});

const closeDialogButton = document.querySelector(".close-dialog");
closeDialogButton.addEventListener("click", (event) => {
    event.preventDefault();
    dialog.close();
    document.querySelector("form").reset();
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

Book.prototype.changeRead = function() {
    if (this.read == "No") {
        this.read = "Yes"
        return this.read;
    }
    
    this.read = "No";
    return this.read;
}

function addBook(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    addBookDisplay(newBook);
    
}

function addBookDisplay(newBook) {
    newRow = addRow();
    
    addRowInfo(newBook, newRow);
    
    addChangeReadButton(newRow);
    
    addRemoveBookButton(newRow);
}

function addRow() {
    const newRow = document.createElement("tr");
    newRow.classList.add("book-info");
    newRow.setAttribute("data-index", myLibrary.length - 1);
    libraryBody.appendChild(newRow);
    return newRow;
}

function addRowInfo(book, row) {
    bookInfo = book.info();
    for (let i = 0; i < 4; i++) {
        const newCell = document.createElement("td");
        if (i == 0) newCell.classList.add("title-info");
        if (i == 1) newCell.classList.add("author-info");
        if (i == 2) newCell.classList.add("pages-info");
        if (i == 3) newCell.classList.add("read-info");
        newCell.textContent = bookInfo[i];
        row.appendChild(newCell);
    }
}

function addChangeReadButton(row) {
    const newCell = document.createElement("td");
    const changeReadButton = document.createElement("button");
    changeReadButton.classList.add("change-read");
    changeReadButton.setAttribute("data-index", myLibrary.length - 1);
    changeReadButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Update read</title><path d="M20,3H5A2,2 0 0,0 3,5V11H7V9L11,12L7,15V13H3V19A2,2 0 0,0 5,21H20A2,2 0 0,0 22,19V5A2,2 0 0,0 20,3M17,17H13V15H17V17M20,13H13V11H20V13M20,9H13V7H20V9M3,13H0V11H3V13Z" /></svg>`;
    changeReadButton.addEventListener("click", (event) => {
        changeReadStatus(event.currentTarget.dataset.index);
    });
    newCell.appendChild(changeReadButton);
    row.appendChild(newCell);
}

function changeReadStatus(index) {
    index = parseInt(index);
    row = document.querySelector(`tr[data-index="${index}"]`).querySelector(".read-info");
    row.textContent = myLibrary[index].changeRead();
}

function addRemoveBookButton(row) {
    const newCell = document.createElement("td");
    const removeBookButton = document.createElement("button");
    removeBookButton.classList.add("remove-book")
    removeBookButton.setAttribute("data-index", myLibrary.length - 1);
    removeBookButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Remove book</title><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>`;
    removeBookButton.addEventListener("click", (event) => {
        removeBook(event.currentTarget.dataset.index);
    });
    newCell.appendChild(removeBookButton);
    row.appendChild(newCell);
}

function removeBook(index) {
    index = parseInt(index);
    myLibrary.splice(index, 1);
    document.querySelector(`tr[data-index="${index}"]`).remove();
    for (let i = index + 1; i <= myLibrary.length; i++) {
        const currentRow = document.querySelector(`tr[data-index="${i}"]`);
        const currentRemoveBookButton = currentRow.querySelector(".remove-book");
        const currentChangeReadButton = currentRow.querySelector(".change-read");
        currentRow.setAttribute("data-index", i - 1);
        currentRemoveBookButton.setAttribute("data-index", i - 1);
        currentChangeReadButton.setAttribute("data-index", i - 1);
    }
}
