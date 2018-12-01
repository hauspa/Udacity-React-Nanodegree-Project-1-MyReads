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

  // adding/updating book in state
  updateState = (updateData) => {
    let stateBooks = this.state.books;
    let {book, newShelf} = updateData;
    let bookIndex = stateBooks.findIndex(stateBook=> stateBook.id === book.id);

    // Add new book or update shelf for existing book or delete book with no shelf
    // check whether book exists or adding new book
    if (bookIndex !== -1) {
      // book exists => update
      console.log("STATE: Book already exists => UPDATE");
      stateBooks[bookIndex].shelf = newShelf;

      // get rid of all books that might have "none" as shelf
      let filteredArray = stateBooks.filter(book => book.shelf !== "none");

      this.setState({
          books: filteredArray
        },() => {
          console.log("Updated book in state!");
      });
    }
    else{
      // book doesn't exist yet => add
      console.log("STATE: Book does not exist yet => ADD");

      // setting shelf for new book entry. 
      book.shelf = newShelf;

      this.setState((prevState) => ({
        books: [...prevState.books, book]
      }));
    }
  }

  updateShelf = (updateData) => {
    // create separate books array, in which I can update the shelf of book
    let {book, newShelf} = updateData;
    let bookObj = {id:book.id}; // only sending ID instead of entire object will be slightly faster in working with remote DB
    BooksAPI.update(bookObj, newShelf)
    .then((response) => {
      // this.getBooks();
      console.log("Updated in BooksAPI");
      // update state
      this.updateState(updateData);
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
