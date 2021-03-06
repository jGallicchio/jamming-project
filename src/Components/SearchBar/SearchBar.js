//imports react
import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {term: ''};
    //this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this)
  }

  /*search() {
    return this.props.onSearch(this.state.term);
  }*/

  handleTermChange(event) {
    if(event.target.value) {
      this.props.onSearch(event.target.value);
      this.setState({term: event.target.value});
    } else {
      this.props.onReset();
    }
  }

  render() {
    return (
      <div className="SearchBar">
        <input onChange={this.handleTermChange} placeholder="Enter A Song Title" />
        {/*<a onClick={this.search}>Search</a>*/}
      </div>
    )};
}

export default SearchBar;
