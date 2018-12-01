import React, {Component} from 'react'
import PropTypes from 'react-proptypes'
import {Link} from 'react-router-dom'
import Books from './Books'
import Search from './Search'
import * as BooksAPI from './BooksAPI'

class SearchUI extends Component {

  state = {
    searchResults: []
  }

  searchBooks = (searchTerm) => {
    // using BooksAPI to search for books. Only search if the user is typing/typed
    if (searchTerm.length > 0) {
      BooksAPI.search(searchTerm)
      .then((response) => {        
        let books = this.checkForStatus(response);
        this.setState((prevState) => ({
          searchResults: books
        }));
        console.log(books);
      });
    }
    else{
      // empty search bar => set state to zero results
      this.setState((prevState) => ({
        searchResults: []
      }));
    }
  }

  checkForStatus = (books) => {
    let stateBooks = this.props.books;
    for (let book of books) {
      // if search results include books already in state, then change status of that search result to other than "none"
      for (var i = 0; i < stateBooks.length; i++) {
        if (stateBooks[i].id === book.id) {
          console.log("Found book match to state: " + book.title);
          book.shelf = stateBooks[i].shelf;
        }
      }
    }
    return books;
  }

  render(){
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/"><button className="close-search">Close</button></Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <Search onSearching={this.searchBooks} />
          </div>
        </div>
        <div className="search-books-results">
          {this.state.searchResults.length > 0 ?
            <Books books={this.state.searchResults} onUpdatingStatus={this.props.onUpdatingStatus} />
            :
            <div>No Search</div>
          }
        </div>
      </div>
    );
  }
}

SearchUI.propTypes = {
  books: PropTypes.array,
  onUpdatingStatus: PropTypes.func.isRequired
}

export default SearchUI
