import React, {Component} from 'react'
import PropTypes from 'react-proptypes'
import Books from './Books'

class BookShelf extends Component {

  displayHeader = () => {
    switch (this.props.shelf.text) {
      case "currentlyReading":
        return "Currently Reading";
        break;
      case "wantToRead":
        return "Want to Read";
      default:
        return "Read";
     }
  }

  render(){
    let {header, books, onUpdatingStatus} = this.props;
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">
          {/*this.displayHeader()*/}
          {header}
        </h2>
        <div className="bookshelf-books">
          <Books books={books} onUpdatingStatus={onUpdatingStatus} />
        </div>
      </div>
    )
  }
}

BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  header: PropTypes.string.isRequired,
  onUpdatingStatus: PropTypes.func.isRequired
}

export default BookShelf
