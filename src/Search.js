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

    // send searchTerm to parent component
    this.props.onSearching(targetValue);
  }

  render(){
    return (
      <input type="text" placeholder="Search by title or author" onChange={this.handleSearch} value={this.state.searchTerm} />
    );
  }
}

Search.propTypes = {
  onSearching: PropTypes.func.isRequired
}

export default Search
