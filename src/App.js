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

  updateShelf = () => {
    // update in state AND BooksAPI?
    // just look for book by ID and update
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
