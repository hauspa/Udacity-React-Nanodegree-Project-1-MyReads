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

  updateShelf = (updateData) => {
    // create separate books array, in which I can update the shelf of book
    // QUESTION: might be inefficient, might be better to update ONLY that book alone, but don't know how to do that.
    let booksArray = this.state.books;
    let {bookID, newShelf} = updateData;
    let bookIndex = booksArray.findIndex(book => book.id === bookID);
    booksArray[bookIndex].shelf = newShelf;

    // QUESTION: save/update in state or BooksAPI
    if (newShelf !== "none") {
      let bookObj = {id:bookID};
      BooksAPI.update(bookObj, newShelf)
      // .then((response) => console.log(response))
      .then(() => {
        // update in state
        this.setState((prevState) => ({
          books: booksArray
        }));
      });
    }
    // Delete book with no more shelf
    else {
      let filteredArray = this.state.books.filter(book => book.shelf !== "none");
      // delete in state
      this.setState((prevState) => ({
        books: filteredArray
        }, () => {
          console.log(this.state.books);
          console.log("Deleted the book without shelf!");
      }));
    }

  }

  // TODO: if user changes shelf of book in state, but in SearchUI, it will currently add the same book in state twice!

  addToBooks = (newData) => {
    let {bookID, newShelf} = newData;
    let bookObj = {id:bookID};
    // TODO: fix problem with only having bookID here. using placeholder this.state.books[0] atm.
    let newBook = this.state.books[0]; // gotta use entire book object as props in Status Component or call getBooks again!
    BooksAPI.update(bookObj, newShelf)
      .then(() => {
        // update in state
        this.getBooks();
        // this.setState((prevState) => ({
        //   books: [...prevState, newBook]
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
          <SearchUI books={this.state.books} onUpdatingStatus={this.addToBooks} />
        )} />
      </div>
    )
  }
}

export default BooksApp
