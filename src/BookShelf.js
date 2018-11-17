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
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">
          {this.displayHeader()}
        </h2>
        <div className="bookshelf-books">
          <Books books={this.props.shelf.books}  />
        </div>
      </div>
    )
  }
}

BookShelf.propTypes = {
  shelf: PropTypes.object.isRequired
}

export default BookShelf
