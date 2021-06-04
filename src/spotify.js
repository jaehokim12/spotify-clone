export const authEndpoint = 'https://accounts.spotify.com/authorize';

const redirectUri = 'http://localhost:3000/';

const clientId = '1b00f2ba9eb84d57a688aba08dc1669d';

const scopes = [
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-read-playback-state',
  'user-top-read',
  'user-modify-playback-state',
];

export const getTokenFromUrl = () => {
  return window.location.hash //hash 뒤의 값 ) ex)https://localhost:3000/#access_token=NwAExz...BV3O2Tk&token_type=Bearer&expires_in=3600&state=123
    .substring(1) //2번째 부터쓴다. # 뒤부터사용
    .split('&') //& 기준으로 잘라서 배열에 담음
    .reduce((initial, item) => {
      let parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);

      return initial; //{acessToken: NwAEXz..BV3, token_type:Bearer, expires_in:3600, state:123}
    }, {});
};
export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  '%20'
)}&response_type=token&show_dialog=true`;
//https://accounts.spotify.com/ko/authorize?client_id=1b00f2ba9eb84d57a688aba08dc1669d&redirect_uri=http:%2F%2Flocalhost:3000%2F&scope=user-read-currently-playing%20user-read-recently-played%20user-read-playback-state%20user-top-read%20user-modify-playback-state&response_type=token&show_dialog=true
