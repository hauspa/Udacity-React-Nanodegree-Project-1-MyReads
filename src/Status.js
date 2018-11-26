import React, {Component} from 'react'
import PropTypes from 'react-proptypes'

class Status extends Component {

  state = {

  }

  componentDidMount = () => {
    console.log("Status: " + this.props.shelfInfo);
  }

  handleChange = () => {
    // change state to reflect what user setState

    // send to parent component to update the BooksAPI DB 
  }


  render(){
    return (
      <div className="book-shelf-changer">
        <select value={this.props.shelfInfo} onChange={this.handleChange}>
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
  shelfInfo: PropTypes.string.isRequired
}

export default Status
