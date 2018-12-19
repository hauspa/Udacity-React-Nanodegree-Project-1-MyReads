import React, {Component} from 'react'
import PropTypes from 'react-proptypes'
import {Link} from 'react-router-dom'
import Books from './Books'
import Search from './Search'
import * as BooksAPI from './BooksAPI'
import SEARCH_TERMS from './json/search_terms.json'


class SearchUI extends Component {

  state = {
    searchResults: [],
    isIllegitimateSearch: false
  }

  searchBooks = (searchTerm) => {
    // using BooksAPI to search for books. Only search if the user is typing/typed

    // only search if characters in search bar & legitimate search term provided by Udacity API
    if (searchTerm.length > 0) {

      // check whether legitimate search or not. If not, will save that in state & display illegitimate search.
      if(this.isLegitSearchTerm(searchTerm)){
        console.log("Search is legitimate!");
        BooksAPI.search(searchTerm)
        .then((response) => {
          let books = this.checkForStatus(response);
          this.setState((prevState) => ({
            searchResults: books
          }));
          // console.log(books);
        });
      }
      else{
        console.log("Search is NOT legitimate!");
      }
    }
    else{
      // empty search bar => set state to zero results & reset illegimate search bool
      this.setState((prevState) => ({
        searchResults: [],
        isIllegitimateSearch: false
      }));
    }
  }

  isLegitSearchTerm = (searchTerm) => {
    console.log("Checking Legit");
    for (let term of SEARCH_TERMS) {
      if (term.toLowerCase().startsWith(searchTerm.toLowerCase())) {
        console.log("SEARCH: Found Match -> " + term);
        // gotta display on UI that illegitimate search term!
        this.setState((prevState) => ({
          ...prevState,
          isIllegitimateSearch: false
        }));
        return true;
      }
    }
    console.log("No Match Found");
    this.setState((prevState) => ({
      ...prevState,
      isIllegitimateSearch: true
    }));
    return false;
  }

  checkForStatus = (searchResults) => {
    let userBooks = this.props.books;
    for (let book of searchResults) {
      // if search results include books already in state, then change status of that search result to other than "none"
      for (var i = 0; i < userBooks.length; i++) {
        if (userBooks[i].id === book.id) {
          // console.log("Found book match to state: " + book.title);
          book.shelf = userBooks[i].shelf;
        }
      }
    }
    return searchResults;
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
          {this.state.isIllegitimateSearch === true ?
            <div>
              <p>Please search for one of the following search terms provided by Udacity:</p>
              {SEARCH_TERMS.map(term => (
                <li key={term}>{term}</li>
              ))
              }
            </div>
            :
            (
              this.state.searchResults.length > 0 ?
              <Books books={this.state.searchResults} onUpdatingStatus={this.props.onUpdatingStatus} />
              :
              <div>
                <p>"Search, and search results shall be given you. Search, and ye shall find. Search, and search results shall be opened unto you."</p>
                <p> -- Book of Coder 6:14</p>
              </div>
            )
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
