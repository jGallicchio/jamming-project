//import react
import React from 'react';
//import css
import './SearchResults.css';
//import components
import TrackList from '../TrackList/TrackList';

class SearchResults extends React.Component {
  render() {
    return(
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList onAdd={this.props.onAdd} isRemoval={this.props.isRemoval} tracks={this.props.searchResults}/>
      </div>
    );
  };
}

export default SearchResults;
