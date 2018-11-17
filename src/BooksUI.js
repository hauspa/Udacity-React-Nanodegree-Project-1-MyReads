import React, {Component} from 'react'
import PropTypes from 'react-proptypes'
import BookShelf from './BookShelf'


class BooksUI extends Component {

  render(){

    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div>
              {this.props.shelves.map( shelf => (
                <BookShelf key={shelf.text} shelf={shelf} />
              ))}
            </div>
          </div>
        </div>
        <div className="open-search">
          <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
        </div>
      </div>
    );
  }
}


BooksUI.propTypes = {
  shelves: PropTypes.array.isRequired
}

export default BooksUI
