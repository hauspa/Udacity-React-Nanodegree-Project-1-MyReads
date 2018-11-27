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
    // using BooksAPI to search for books
    BooksAPI.search(searchTerm)
      .then((response) => {
        this.setState((prevState) => ({
          searchResults: response
        }));
        console.log(response);
      });
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
