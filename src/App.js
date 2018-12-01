import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BooksUI from './BooksUI'
import SearchUI from './SearchUI'
import {Route} from 'react-router-dom'


class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount(){
    this.getBooks();
  }

  getBooks = () => {
    console.log("Starting fetching the API...");
    BooksAPI.getAll()
      .then((booksFromAPI) => {
        console.log(booksFromAPI);
        this.setState((prevState) => ({
          books: booksFromAPI
        }))
      })
      .then(() => console.log("Done fetching from API!"));
  }

  updateStatus = (updateData) => {
    let booksArray = this.state.books;
    let {bookID, newShelf} = updateData;
    let bookIndex = booksArray.findIndex(book => book.id === bookID);
    booksArray[bookIndex].shelf = newShelf;

    // Add new book or update shelf for existing book or delete book with no shelf
    // check whether book exists or adding new book
    if (true) {

    }

    // if (newShelf !== "none") {
    //   let bookObj = {id:bookID};
    //   BooksAPI.update(bookObj, newShelf)
    //   // .then((response) => console.log(response))
    //   .then(() => {
    //     // update in state
    //     this.setState((prevState) => ({
    //       books: booksArray
    //     }));
    //   });
    // }
    // // Delete book with no more shelf
    // else {
    //   let filteredArray = this.state.books.filter(book => book.shelf !== "none");
    //   // delete in state
    //   this.setState((prevState) => ({
    //     books: filteredArray
    //     }, () => {
    //       console.log(this.state.books);
    //       console.log("Deleted the book without shelf!");
    //   }));
    // }
  }

  updateShelf = (updateData) => {
    // create separate books array, in which I can update the shelf of book
    // let {bookID, newShelf} = updateData;
    let {book, newShelf} = updateData;
    // let bookObj = {id:bookID};
    let bookObj = {id:book.id}; // only sending ID instead of entire object will be slightly faster in working with remote DB
    BooksAPI.update(bookObj, newShelf)
    .then((response) => {
      // update state
      this.getBooks();
      // this.setState((prevState) => ({
      //   books: booksArray
      // }));
    });

  }


  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BooksUI books={this.state.books} onUpdatingStatus={this.updateShelf} />
        )} />
        <Route path="/search" render={() => (
          <SearchUI books={this.state.books} onUpdatingStatus={this.updateShelf} />
        )} />
      </div>
    )
  }
}

export default BooksApp
