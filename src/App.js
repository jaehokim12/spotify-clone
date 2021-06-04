import './App.css';
import React, { useState, useEffect } from 'react';
import Login from './Login';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import Player from './Player';
import { useDataLayerValue } from './DataLayer';

const spotify = new SpotifyWebApi();

function App() {
  const [token, setToken] = useState(null);
  const [{}, dispatch] = useDataLayerValue();
  // Run code based on a given condition
  useEffect(() => {
    const hash = getTokenFromUrl();
    console.log('hash:', hash);
    window.location.hash = '';
    const _token = hash.access_token;

    if (_token) {
      setToken(_token);

      spotify.setAccessToken(_token);
      spotify.getMe().then((user) => {
        console.log('a', user);
      });
    }

    console.log('i have a token', _token);
  }, []);

  return (
    <div className="App">{token ? <h1>i am logged in</h1> : <Login />}</div>
  );
}

export default App;
