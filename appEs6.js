
//UI elements
const UIform = document.querySelector('#book-form')
const UItitle = document.querySelector('#title');
const UIauthor = document.querySelector('#author');
const UIibn = document.querySelector('#ibn');
const UItdBody = document.querySelector('#book-list')
const UIcontainer = document.querySelector('.container');
 //create a div to display errror and sucess messages
 let div = document.createElement('div');


class Book{
  constructor(title, author, ibn){
      this.title = title;
      this.author = author;
      this.ibn = ibn;
  }
}


loadEvents();

function loadEvents(){

  UIform.addEventListener('submit', checkValues);
  window.addEventListener('load', displayStoredBooks);
  UItdBody.addEventListener('click', deleteBook);
}


function checkValues(e){
  if (UItitle.value === "" || UItitle.value === " " || UIauthor.value === "" || UIauthor.value === " " || UIibn.value === "" || UIibn.value === " "){
    
    setInterval(displayMessage("error"),2000);
    setInterval(resetValues,2000);
    
  }else{
    let book = new Book(UItitle.value, UIauthor.value, UIibn.value);
    addBook(book);
    storeBook(book);
    setInterval(displayMessage("success"),2000)
    setInterval(resetValues,2000);
  
}
e.preventDefault();
}


//feature that add new book to UI and save the in local storage
function addBook(element){

  //Create newElements

  let tdRow = document.createElement('tr');
  let tdTitle = document.createElement('td');
  let tdAuthor = document.createElement('td');
  let tdIbn = document.createElement('td');
  let tdDelete = document.createElement('td');

  //create delete cross

  const deleteCross = document.createElement('a');
  deleteCross.classList = 'delete-cross';
  deleteCross.innerText = 'X';
  deleteCross.style.color = 'red';
  deleteCross.style.cursor = 'pointer';


  //set book values to UI elemnts

  tdTitle.appendChild(document.createTextNode(element.title));
  tdAuthor.appendChild(document.createTextNode(element.author));
  tdIbn.appendChild(document.createTextNode(element.ibn));
  tdDelete.appendChild(deleteCross);

  //append all td to the new table Row

  tdRow.append(tdTitle, tdAuthor, tdIbn, tdDelete);

  //append new row to td body

  UItdBody.appendChild(tdRow);
  

}
//function to save book in the local storage

function storeBook(item){
  let bookList;
  if(localStorage.getItem('books') === null){
      bookList = [];
  }else{
    bookList = JSON.parse(localStorage.getItem('books'));

   
  }

  bookList.push(item);
  localStorage.setItem('books', JSON.stringify(bookList));
}

//create a function that display books saved in the local storage in the UI when pega is loaded

function displayStoredBooks(e){

   if(localStorage.getItem('books') !== null){

    let books = JSON.parse(localStorage.getItem('books'));
     
    books.forEach(function(book){
      addBook(book);
    })

   }
    
     
  

  e.preventDefault();
}

//create a function to delete element s form UI and localStorage

function deleteBook(e){

  if(e.target.classList.contains('delete-cross')){
    e.target.parentElement.parentElement.remove();

    let books = JSON.parse(localStorage.getItem('books'));

    books.forEach(function(element){

      if(element.title === e.target.parentElement.parentElement.firstChild.innerText){
        let index = books.indexOf(element);
        console.log(index);

        books.splice(index, 1);

        localStorage.setItem('books', JSON.stringify(books))
        if(books.length < 1){
          localStorage.clear();
        }
        
      }

    })
    
  }

  e.preventDefault();
}

//Create a function to reset values

function resetValues(){
  UItitle.value = "";
  UIauthor.value = "";
  UIibn.value = "";
}

//function to display an error or success message 

function displayMessage(state){
  UIcontainer.insertBefore(div, UIform);
  div.classList = state;
  div.innerText = "Book correctly added";

  setTimeout(function(){
    div.style.display = 'none';

  },2000)
}