import config from '../config'

const EventApiServices = {
  getAllEvents() {
    const authToken = localStorage.getItem('authToken');

    return fetch(`${config.API_ENDPOINT}/events`, {
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

export default EventApiServices;