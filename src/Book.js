import React, {Component} from 'react'
import PropTypes from 'react-proptypes'

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

  render(){
    let book = this.props.book;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{this.displayAuthors(book.authors)}</div>
        </div>
      </li>
    );
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired
}

export default Book
