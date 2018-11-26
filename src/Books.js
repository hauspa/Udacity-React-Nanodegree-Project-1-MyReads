import React, {Component} from 'react'
import PropTypes from 'react-proptypes'
import Book from './Book'

class Books extends Component {

  handleStatusUpdate = () => {
    // send up to parent component
    this.props.onUpdatingStatus();
  }

  render(){
    return (
      <ol className="books-grid">
        {this.props.books.map(book => (
          <Book book={book} key={book.id} onUpdatingStatus={this.handleStatusUpdate} />
        ))}
      </ol>
    );
  }
}

Books.propTypes = {
  books: PropTypes.array.isRequired,
  onUpdatingStatus: PropTypes.func.isRequired
}

export default Books
