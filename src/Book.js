import React, {Component} from 'react'
import PropTypes from 'react-proptypes'
import Status from './Status'

class Book extends Component {

  displayAuthors = (authors) => {
    let authorsText = "";
    for (let index in authors) {
      if (index > 0) {
        authorsText = `${authorsText}, ${authors[index]}`;
      }
      else{
        authorsText = authors[index];
      }
    }
    return authorsText;
  }

  showStyle = () => {
    let book = this.props.book;
    let obj = {width: 128, height: 193};

    if (book.hasOwnProperty("imageLinks") && book.imageLinks.hasOwnProperty("thumbnail") && book.imageLinks.thumbnail !== "") {
      obj.backgroundImage = `url(${book.imageLinks.thumbnail})`;
    }
    else{
      obj.backgroundImage = "none";
    }
    return obj;
  }


  render(){
    let book = this.props.book;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={this.showStyle()}></div>
            {/* <Status shelfInfo={book.hasOwnProperty("shelf") ? book.shelf : "none"} bookID={book.id} onUpdatingStatus={this.props.onUpdatingStatus} /> */}
            <Status book={book} onUpdatingStatus={this.props.onUpdatingStatus} />
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{this.displayAuthors(book.authors)}</div>
        </div>
      </li>
    );
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onUpdatingStatus: PropTypes.func.isRequired
}

export default Book
