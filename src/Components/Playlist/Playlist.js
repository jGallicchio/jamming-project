//import react
import React from 'react';
//import css
import './Playlist.css';
//import components
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <input onChange={this.handleNameChange} defaultValue={ 'New Playlist' }/>
        <TrackList onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} tracks={this.props.tracks}/>
        <a onClick={this.props.onSave} className="Playlist-save">SAVE TO SPOTIFY</a>
        <a onClick={this.props.onReset} className="Playlist-save">RESET</a>
      </div>
    )
  };
}

export default Playlist;
