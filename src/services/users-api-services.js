import config from '../config'

const UsersApiServices = {
  userLogin({ email, password }) {
    return fetch(`${config.API_ENDPOINT}/users/login`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(err => Promise.reject(err))
          : res.json()
      )
      .then(data => {
        const { token: authToken, user } = data;

        localStorage.setItem('authToken', authToken);
        localStorage.setItem('user', JSON.stringify(user));
        return { authToken, user };
      });
  },
  userLogout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');

    fetch(`${config.API_ENDPOINT}/users/logout`, {
      method: 'POST',
      credentials: 'include',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Logout failed');
        }
        window.location.href = '/authentication/login';
      })
      .catch(error => {
        console.error('Error during logout:', error);
      });
  },
  getAllUsers() {
    const authToken = localStorage.getItem('authToken');

    return fetch(`${config.API_ENDPOINT}/users`, {
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((e) => {
          Promise.reject(e);
        });
      } else return res.json();
    });
  }
}

export default UsersApiServices;