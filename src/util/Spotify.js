//empty variable for obtaining the user's accessToken
let accessToken = '';
//constant variables for ID and URI
const clientID = '164c8290f1624c27ac34cf0b1aad7939';
const URI = 'Http:/localhost:3000/';

const Spotify = {
  getAccessToken() {
    if(accessToken) {
      return accessToken;
    } else if(window.location.href.match(/access_token=([^&]*)/)) {
      accessToken = window.location.href.match(/access_token=([^&]*)/);
      let expiration = window.location.href.match(/expires_in=([^&]*)/);
      window.setTimeout(() => accessToken = '', expiration * 1000);
      window.history.pushState('Access Token', null, '/');
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${URI}`;
    }
  },

  search(term) {
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if(jsonResponse.track) {
        return jsonResponse.track.map(track => {
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

  savePlaylist(name, uriArray) {
    const accessToken = this.getAccessToken();
    const headers = {'Authorization': `Bearer ${accessToken}`}
    const user_id = fetch('https://api.spotify.com/v1/me', {headers: headers}).then( response => {
      return response.json();
    }).then(jsonResponse => {
      return jsonResponse.user.id;
    });

    if(name && uriArray) {
      let playlistID = fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization': accessToken,
        },
        body: name
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        return jsonResponse.playlist.id;
      });
      playlistID = fetch(`https://api.spotify.com/v1/users/${user_id}/playlists/${playlistID}/tracks`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization': accessToken,
        },
        body: uriArray
      }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        return jsonResponse.playlist.id;
      });
    }
  }
}

export default Spotify;
