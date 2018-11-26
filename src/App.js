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
          ...prevState,
          books: booksFromAPI
        }))
      })
      .then(() => console.log("Done fetching from API!"));
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

    // update in BooksAPI too?
    let bookObj = {id:bookID}
    BooksAPI.update(bookObj, newShelf)
      .then((response) => console.log(response));
    // after updating call getBooks again? so that everything is unidirectional?



    // if the new status is NONE, then delete?? Not showing anyways, but maybe still delete in state!


    console.log("UPDATED SHELF");
  }


  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BooksUI books={this.state.books} onUpdatingStatus={this.updateShelf} />
        )} />
        <Route path="/search" render={() => (
          <SearchUI books={this.state.books} />
        )} />
      </div>
    )
  }
}

export default BooksApp
