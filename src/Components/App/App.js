import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistName: 'My Playlist',
      playlistTracks: []
    };
    //bind this to functions to work properly when passed to other components
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  //adds track to playlistTracks array
  addTrack(track) {
    if(this.state.playlistTracks.find(savedTrack =>
      savedTrack.id === track.id)) {
        const newPlaylist = this.state.playlistTracks.push(track);
        this.setState({playlistTracks: newPlaylist});
    }
  }
  //removes track from playlistTracks array
  removeTrack(track) {
    for(let i = 0; i < this.state.playlistTracks.length; i++) {
      if(this.state.playlistTracks[i].id === track.id) {
        const newPlaylist = this.state.playlistTracks.splice(i, 1);
        this.setState({playlistTracks: newPlaylist});
      }
    }
  }
  //updates the playlist name real time
  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }
  //saves the playlist to the user's account
  savePlaylist() {
    let trackURIs = [];
    if(this.state.playlistTracks) {
      trackURIs = this.state.playlistTracks.map(track => {
        return track.uri;
      });
    }
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({
      playlistName: 'New Playlist',
      playlistTracks: []
    })
  }

  search(term) {
    const results = Spotify.search(term);
    this.setState({searchResults: results});
  }

  render() {
    return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={this.search}/>
        <div className="App-playlist">
          <SearchResults onAdd={this.addTrack} isRemoval={false} searchResults={this.state.searchResults} />
          <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} isRemoval={true} name={this.state.playlistName} tracks={this.state.playlistTracks}/>
        </div>
      </div>
    </div>
    );
  }
}

export default App;
