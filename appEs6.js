
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
