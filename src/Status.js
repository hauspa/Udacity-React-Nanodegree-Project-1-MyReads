import React, {Component} from 'react'
import PropTypes from 'react-proptypes'

class Status extends Component {

  state = {
    shelf: ""
  }

  componentDidMount = () => {
    console.log("Status: " + this.props.shelfInfo);

  }

  showSelected = () => {
    // since better not set state to props, gonna leave state empty at first and only use state once user changes original shelf

    // user has changed the shelf => use state
    if(this.state.shelf.length > 0){
      return this.state.shelf;
    }
    //user has not changed shelf => use props
    else{
      return this.props.shelfInfo;
    }
  }

  handleChange = (event) => {
    let targetValue = event.target.value; // gotta save as property first, otherwise bug/crash because of asynch

    // change state to reflect what user setState
    this.setState((prevState) => ({
      shelf: targetValue
    }));

    // send to parent component to update the BooksAPI DB
    let updateData = {bookID:this.props.bookID, newShelf:targetValue};
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
  shelfInfo: PropTypes.string.isRequired,
  bookID: PropTypes.string.isRequired,
  onUpdatingStatus: PropTypes.func.isRequired
}

export default Status
