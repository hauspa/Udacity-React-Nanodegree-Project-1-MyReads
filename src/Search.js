import React, {Component} from 'react'
import PropTypes from 'react-proptypes'
import { DebounceInput } from 'react-debounce-input';

class Search extends Component {

  state = {
    searchTerm: ""
  }

  handleSearch = (event) => {
    let targetValue = event.target.value; // using event in setState causes bug because it's asynchronous -> gotta save as separate property

    // set so that the search bar shows the current search characters
    this.setState((prevState) => ({
      searchTerm: targetValue
    }));

    // send searchTerm to parent component
    this.props.onSearching(targetValue);
  }

  render(){
    return (
      <DebounceInput
        minLength={2}
        debounceTimeout={200}
        onChange={this.handleSearch}
        value={this.state.searchTerm}
        placeholder='Search by title or author'
      />
    );
  }
}

Search.propTypes = {
  onSearching: PropTypes.func.isRequired
}

export default Search
