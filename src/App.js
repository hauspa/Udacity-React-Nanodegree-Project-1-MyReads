import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BooksUI from './BooksUI'


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
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


  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
            <BooksUI books={this.state.books} shelves={this.state.shelves} />
        )}
      </div>
    )
  }
}

export default BooksApp
