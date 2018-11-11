/* https://safe-wave-93302.herokuapp.com */

import React, { Component } from 'react';

import './App.css';

import queryString from 'query-string';

import logo from './spotify.png'


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
      }
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
      <div style={{...defaultStyle, marginBottom: '30px'}}>
        <img />
        <input type='text' onChange={(e) => this.props.onTextChange(e.target.value.trim())}/>
        Filter
      </div>  
    );
  }
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist;
    return (
      <div style={{...defaultStyle, width: '25%', display: 'inline-block'}}>
        <img src={playlist.imageUrl} style={{ width: '90px', height: '80px' }} alt='some img'/>
        <h3>{playlist.name}</h3>
        <ul>
          { playlist.songs.map((song) => {
              return <li>{ song.name } </li>;
            }) 
          }
        </ul>
      </div>
    );
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      serverData: {},
      filterString: ''
    };
  }

  componentDidMount() {
    const parsed = queryString.parse(window.location.search);
    const accessToken = parsed.access_token;

    if(!accessToken) return;

    // API FOR USER NAME
    fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    })
    .then((response) => {
        return response.json()
    })
    .then((data) => {
      this.setState({
          user: {
            name: data.display_name
          }
      });
    })
    .catch((err) => {
      console.log(err);
    });


    // API FOR USER's PLAYLISTS
    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    })
    .then((response) => {
        return response.json()
    })
    .then((data) => {
      data.items = [
        {  
          name: 'My favourites',
          image: {
            url: logo
          }       
        },
        {
          name: 'Some other playlist',
          image: {
            url: logo
          }
        },
        {
          name: 'Michael Jackson',
          image: {
            url: logo
          }
        },
        {
          name: 'Anne marie',
          image: {
            url: logo
          }
        },
        {
          name: 'The best playlist ever',
          image: {
            url: logo
          }
        },
      ]
      this.setState({
        playlists: data.items.map((item) => {
          return {
            name: item.name, 
            imageUrl: item.image.url,
            songs: []};
          })
      });
    })
    .catch((err) => {
      console.log(err);
    });

  }  

  render() {
    
    let playlistsToRender = 
      this.state.user &&
      this.state.playlists 
        ? this.state.playlists.filter((playlist) => {
            return playlist.name.toLowerCase().includes(this.state.filterString.toLowerCase()); 
          })
        : [];

    return (
      <div className='App'>
        {this.state.user ? 
          <div>
           <h1 style={{...defaultStyle, fontSize: '54px'}}>
           {
            this.state.user.name}'s Playlists  
           </h1>
            <PlaylistCounter playlists= {playlistsToRender} />
            <HoursCounter playlists= {playlistsToRender} />
            <Filter onTextChange={(text) => this.setState({ filterString: text })}/>
            {          
                playlistsToRender.map((playlist) => {
                  return <Playlist playlist={playlist}/>;
                })        
            }
           </div> : <button onClick={() => window.location='http://localhost:8888/login'} style={{ padding: '20px', fontSize: '50px', marginTop: '20px', cursor: 'pointer' }}>Sign in with Spotify</button>
        }
      </div>
    );
  }
}

export default App;
