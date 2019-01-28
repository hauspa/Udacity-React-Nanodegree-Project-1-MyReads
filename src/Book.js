import React, {Component} from 'react'
import PropTypes from 'react-proptypes'
import Status from './Status'

class Book extends Component {

  // to show multiple authors properly
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

  // for cases when there is no thumbnail
  showStyle = () => {
    let book = this.props.book;
    let obj = {width: 128, height: 193};

    book.hasOwnProperty("imageLinks")
      ? obj.backgroundImage = `url(${book.imageLinks.thumbnail})`
      : obj.backgroundImage = `url(${'https://dummyimage.com/128x193/2e7c31/fff.png&text=Cover+Missing'})`

    return obj;
  }


  render(){
    let book = this.props.book;
    console.log('Book: ', book)

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={this.showStyle()}></div>
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
