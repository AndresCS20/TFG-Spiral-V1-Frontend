import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth/';

class AuthService {

  
  login(user) {
    return axios
      .post(API_URL + 'signin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {

    const avatar = `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${user.username}&radius=50&backgroundColor=059ff2,71cf62,d84be5,d9915b,f6d594,fcbc34,c0aede,d1d4f9,b6e3f4&backgroundType=solid,gradientLinear`;
    
    const svg = avatar.toString();

    return axios.post(API_URL + 'signup', {
      fullname: user.fullname,
      username: user.username,
      email: user.email,
      password: user.password,
      profile_pic: svg
    });
  }
}

export default new AuthService();
