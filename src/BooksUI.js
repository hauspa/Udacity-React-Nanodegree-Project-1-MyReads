import React, {Component} from 'react'
import PropTypes from 'react-proptypes'
import BookShelf from './BookShelf'
import {Link} from 'react-router-dom'


class BooksUI extends Component {

  render(){
    // set the shelf for looping through
    let shelves = [{long:"Currently Reading", short:"currentlyReading"}, {long:"Want to Read", short:"wantToRead"}, {long:"Read", short:"read"}];

    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div>
              {shelves.map((shelfObj) => {
                let books = this.props.books.filter(book => book.shelf === shelfObj.short);
                return books.length > 0 ? <BookShelf key={shelfObj.short} books={books} header={shelfObj.long} onUpdatingStatus={this.props.onUpdatingStatus} /> : ""
              })}
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search"><button>Add a book</button></Link>
        </div>
      </div>
    );
  }
}


BooksUI.propTypes = {
  books: PropTypes.array.isRequired,
  onUpdatingStatus: PropTypes.func.isRequired
}

export default BooksUI
