
import axios from 'axios';

const TOKEN_KEY = 'jwt-token';

class AuthService {
  async login(username, password) {
    const response = await axios.post('/api/auth/login', { username, password });

    if (!response.data.token) {
      throw new Error('Nombre de usuario o contraseña incorrectos.');
    }

    const token = response.data.token;
    localStorage.setItem(TOKEN_KEY, token);
    return token;
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
  }

  isLoggedIn() {
    return !!localStorage.getItem(TOKEN_KEY);
  }

  getAuthorizationHeader() {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return { Authorization: `Bearer ${token}` };
    } else {
      return {};
    }
  }
}

export default new AuthService();