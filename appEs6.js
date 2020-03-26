
//UI elements
const UIform = document.querySelector('#book-form')
const UItitle = document.querySelector('#title');
const UIauthor = document.querySelector('#author');
const UIibn = document.querySelector('#ibn');
const UItdBody = document.querySelector('#book-list')
const UIcontainer = document.querySelector('.container');


class Book{
  constructor(title, author, ibn){
      this.title = title;
      this.author = author;
      this.ibn = ibn;
  }
}

loadEvents();


function loadEvents(){

  UIform.addEventListener('submit', BookList);

}

//create a div to display errror and sucess messages
let div = document.createElement('div');

//Struttura funzione principale

/* localStorage.clear(); */

function BookList(e){

  if(UItitle.value === "" || UItitle.value === " " || UIauthor.value === "" || UIauthor.value === " " || UIibn.value === "" || UIibn.value === " "){
    console.log('errror check insert values');
    
  }else{
    let newBook = new Book(UItitle.value, UIauthor.value, UIibn.value);
    let ListBook = JSON.parse(localStorage.getItem('books'));
    if(localStorage.getItem('books') === null){
      console.log('add this new book');
      addBookToUi(newBook);
      addBookToStorage(newBook, ListBook);
    } else{

       ListBook.forEach(function(element){

          if(element.title == newBook.title && element.author == newBook.author && element.ibn === newBook.ibn){
            console.log('ciao');
            
          }else{
            addBookToUi(newBook);
            addBookToStorage(newBook, ListBook);
            
          }

       })
       
       
        

    } 
  }

  e.preventDefault();
}

function addBookToUi(book){

  let newRow = document.createElement('tr');
  newRow.classList = 'book-row';
  let newTitle = document.createElement('td');
  let newAuthor = document.createElement('td');
  let newIbn = document.createElement('td');
  let newDelete = document.createElement('td');


  //create delete cross 
  let deleteCross = document.createElement('a');
  deleteCross.innerText = 'X';
  deleteCross.classList = 'delete-cross';
  deleteCross.style.color = 'red';
  deleteCross.style.cursor = 'pointer';

  //Attach text nodes
  newTitle.appendChild(document.createTextNode(book.title));
  newAuthor.appendChild(document.createTextNode(book.author));
  newIbn.appendChild(document.createTextNode(book.ibn));
  newDelete.appendChild(deleteCross);

  //append td to newRow
  newRow.append(newTitle, newAuthor, newIbn,newDelete);

  //append Elements to table

  UItdBody.appendChild(newRow);
  
}

function addBookToStorage(book, storedBook){

  if(storedBook === null){
    storedBook = [];
  }

  storedBook.push(book);

  localStorage.setItem('books', JSON.stringify(storedBook));

}