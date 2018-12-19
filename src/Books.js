import React from 'react'
import PropTypes from 'react-proptypes'
import Book from './Book'

const Books = props => (
  <ol className="books-grid">
    {props.books.map(book => (
      <Book book={book} key={book.id} onUpdatingStatus={props.onUpdatingStatus} />
    ))}
  </ol>
);

Books.propTypes = {
  books: PropTypes.array.isRequired,
  onUpdatingStatus: PropTypes.func.isRequired
}

export default Books
