//import react
import React from 'react';
//import css
import './TrackList.css';
//import components
import Track from '../Track/Track';

class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {
          this.props.tracks.map(track => {
              return <Track key={track.id} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} track={track} />;
            })
        }
      </div>
    )
  };
}

export default TrackList;
