import React, {Component} from 'react'
import PropTypes from 'react-proptypes'
import Book from './Book'

class Books extends Component {
  render(){
    return (
      <ol className="books-grid">
        {this.props.books.map(book => (
          <Book book={book} key={book.id} />
        ))}
      </ol>
    );
  }
}

Books.propTypes = {
  books: PropTypes.array.isRequired
}

export default Books
