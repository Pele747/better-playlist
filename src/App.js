/* https://safe-wave-93302.herokuapp.com/ */

import React, { Component } from 'react';

import './App.css';

let defaultStyle = {
  color: '#fff'
};

let fakeServerData = {
  user: {
    name: 'Pela747',
    playlists: [
      {
        name: 'My favourites',
        songs: [{name: 'Beat it', duration: 1345}, {name: 'Canelloni Makaroni', duration: 1236 }, { name: 'Rosa helikopter', duration: 70000 }]
      },
      {
        name: 'Discover Weekly',
        songs: [{name: 'Beat it', duration: 1345}, {name: 'Canelloni Makaroni', duration: 1236 }, { name: 'Rosa helikopter', duration: 70000 }]
      },
      {
        name: 'Another playlist - the best!',
        songs: [{name: 'Beat it', duration: 1345}, {name: 'Canelloni Makaroni', duration: 1236 }, { name: 'Rosa helikopter', duration: 70000 }]
      },
      {
        name: 'Playlist - yeah!',
        songs: [{name: 'Beat it', duration: 1345}, {name: 'Canelloni Makaroni', duration: 1236 }, { name: 'Rosa helikopter', duration: 70000 }]
      },
    ]
  }
};

class PlaylistCounter extends Component {
  render() {
    return (
      <div style={{...defaultStyle, width: '40%', display: 'inline-block' }}>
        <h2>{this.props.playlists.length} playlists</h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs);
    }, []);
    console.log(allSongs);
    let totalDuration = allSongs.reduce((sum, eachSong) => {
        return sum + eachSong.duration;
    }, 0);

    return (
      <div style={{...defaultStyle, width: '40%', display: 'inline-block' }}>
        <h2>{Math.floor(totalDuration / 60)} hours</h2>
      </div>
    );
  }
}


class Filter extends Component {
  render() {
    return (
      <div style={defaultStyle}>
        <img />
        <input type='text' />
        Filter
      </div>  
    );
  }
}

class Playlist extends Component {
  render() {
    return (
      <div style={{...defaultStyle, width: '25%', display: 'inline-block'}}>
        <img />
        <h3>Playlist Name</h3>
        <ul>
          <li>
            Song 1
          </li>
          <li>
            Song 2
          </li>
          <li>
            Song 3
          </li>
          </ul>
      </div>
    );
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {serverData: {}}
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        serverData: fakeServerData
      });
    }, 1000);
    
  }

  render() {
    return (
      <div className='App'>
        {this.state.serverData.user ? 
          <div>
           <h1 style={{...defaultStyle, fontSize: '54px'}}>
           {
            this.state.serverData.user.name}'s Playlists  
           </h1>
          
            <PlaylistCounter playlists= {this.state.serverData.user && 
              this.state.serverData.user.playlists} />
            <HoursCounter playlists= {this.state.serverData.user && 
              this.state.serverData.user.playlists} />
            <Filter />
            <Playlist />
            <Playlist />
            <Playlist />
            <Playlist />
           </div> : <h1 style={{...defaultStyle}}>Loading...</h1>
        }
      </div>
    );
  }
}

export default App;
