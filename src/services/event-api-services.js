import config from '../config'

const EventApiServices = {
  getAllEvents() {
    return fetch(`${config.API_ENDPOINT}/events`, {
      headers: {
        'content-type': 'application/json',
        //   authorization: `bearer ${TokenService.getAuthToken()}`,
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