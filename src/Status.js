import React, {Component} from 'react'
import PropTypes from 'react-proptypes'

class Status extends Component {

  state = {
    shelf: ""
  }

  showSelected = () => {
    // since better not set state to props, gonna leave state empty at first and only use state once user changes original shelf

    // user has changed the shelf => use state
    if(this.state.shelf.length > 0){
      return this.state.shelf;
    }
    else{
      let book = this.props.book;
      return book.hasOwnProperty("shelf") ? book.shelf : "none"; // search results have no shelf and having no such property would cause bug
    }
  }

  handleChange = (event) => {
    let targetValue = event.target.value; // gotta save as property first, otherwise bug/crash because of asynch

    // change state to reflect what user setState
    this.setState((prevState) => ({
      shelf: targetValue
    }));

    // send to parent component to update the BooksAPI DB
    // let updateData = {bookID:this.props.bookID, newShelf:targetValue};
    let updateData = {book: this.props.book, newShelf: targetValue};
    this.props.onUpdatingStatus(updateData);
  }


  render(){
    return (
      <div className="book-shelf-changer">
        <select value={this.showSelected()} onChange={this.handleChange}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

Status.propTypes = {
  shelfInfo: PropTypes.string,
  bookID: PropTypes.string,
  book: PropTypes.object.isRequired,
  onUpdatingStatus: PropTypes.func.isRequired
}

export default Status
