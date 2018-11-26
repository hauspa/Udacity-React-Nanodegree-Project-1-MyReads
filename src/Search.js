import React, {Component} from 'react'
import PropTypes from 'react-proptypes'

class Search extends Component {

  state = {
    searchTerm: ""
  }

  handleSearch = (event) => {
    let targetValue = event.target.value; // using event in setState causes bug because it's asynchronous

    // set so that the search bar shows the current search characters
    this.setState((prevState) => ({
      searchTerm: targetValue
    }));

    // only search if the user is typing/typed
    if (targetValue.length > 0) {
      this.props.onSearching(targetValue);
    }
  }

  render(){
    return (
      <input type="text" placeholder="Search by title or author" onChange={this.handleSearch} value={this.state.searchTerm} />
    );
  }
}

export default Search
