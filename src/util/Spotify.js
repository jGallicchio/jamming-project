//empty variable for obtaining the user's accessToken
let accessToken = '';
//constant variables for ID and URI
const clientID = '164c8290f1624c27ac34cf0b1aad7939';
const URI = 'http://localhost:3000/';

const Spotify = {
  getAccessToken() {
    if(accessToken) {
      return accessToken;
    } else if(window.location.href.match(/access_token=/g)) {
      accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
      let expiration = window.location.href.match(/expires_in=([^&]*)/)[1];
      window.setTimeout(() => accessToken = '', expiration * 10000);
      window.history.pushState('Access Token', null, '/');
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${URI}`;
    }
  },

  search(term) {
    this.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if(jsonResponse.tracks) {
        return jsonResponse.tracks.items.map(track => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
          }
        })
      }
    })
  },

  async getUserID() {
    this.getAccessToken();
    const headers = { 'Authorization': `Bearer ${accessToken}` }
    try {
      const response = await fetch('https://api.spotify.com/v1/me', {headers: headers});
      if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse.id;
      }
    }
    catch(error) {
      console.log(error);
    }
  },

  async getPlaylistID(name, user_id) {
    this.getAccessToken();
    try {
      const response = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({name: name})
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse.id);
        return jsonResponse.id;
      }
    }
    catch(error) {
      console.log(error);
    }
  },

  postPlaylist(user_id, playlistID, uriArray) {
    fetch(`https://api.spotify.com/v1/users/${user_id}/playlists/${playlistID}/tracks`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({uris: uriArray})
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      console.log(jsonResponse);
      return jsonResponse.id;
    });
  },

  savePlaylist(name, uriArray) {
    if(name && uriArray) {
      Spotify.getUserID().then(user_id => {
        Spotify.getPlaylistID(name, user_id).then(playlist_id => {
          Spotify.postPlaylist(user_id, playlist_id, uriArray);
        });
      });
    }
  }
}

export default Spotify;
