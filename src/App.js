import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BooksUI from './BooksUI'
import SearchUI from './SearchUI'
import {Route} from 'react-router-dom'


class BooksApp extends React.Component {
  state = {
    books: [],
    shelves: []
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
          ...prevState,
          books: booksFromAPI
        }))
      })
      .then(() => console.log("Done fetching from API!"))
      .then(() => this.sortIntoShelves());
  }

  sortIntoShelves = () => {
    let books = this.state.books;
    let categories = []; // have an array to better sort
    let shelves = [];
    books.forEach((book) => {
      if (!categories.includes(book.shelf)) {
        categories.push(book.shelf); // save in Categories to avoid duplicates
        let shelfObj = { text:book.shelf, books: [book]};
        shelves.push(shelfObj);
      }
      else{ // shelf/category already exists, so just add to last shelf's books array!
        shelves[shelves.length - 1].books.push(book);
      }
    });

    // save in state
    this.setState((prevState) => ({
      ...prevState,
      shelves: shelves
    }));
  }

  updateShelf = (updateData) => {
    // create separate books array, in which I can update the shelf of book
    // QUESTION: might be inefficient, might be better to update ONLY that book in state, but don't know how to do that.
    let booksArray = this.state.books;
    let {bookID, newShelf} = updateData;
    let bookIndex = booksArray.findIndex(book => book.id === bookID);
    booksArray[bookIndex].shelf = newShelf;

    // update in state
    this.setState((prevState) => ({
      ...prevState,
      books: booksArray
    }));

    // sort shelves/hide shelves if empty
    this.sortIntoShelves();

    // update in BooksAPI too?

    // if the new status is NONE, then delete!!!


    console.log("UPDATED SHELF");
  }


  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BooksUI books={this.state.books} shelves={this.state.shelves} onUpdatingStatus={this.updateShelf} />
        )} />
        <Route path="/search" render={() => (
          <SearchUI books={this.state.books} />
        )} />
      </div>
    )
  }
}

export default BooksApp
