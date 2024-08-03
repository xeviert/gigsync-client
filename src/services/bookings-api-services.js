import config from '../config'

const BookingsApiServices = {
  getAllBookings() {
    const authToken = localStorage.getItem('authToken');

    return fetch(`${config.API_ENDPOINT}/bookings`, {
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
  },
  createBooking({ event_id, artist_id, status }) {
    debugger
    const authToken = localStorage.getItem('authToken');

    return fetch(`${config.API_ENDPOINT}/bookings`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({ event_id, artist_id, status }),
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((e) => {
          Promise.reject(e);
        });
      } else return res.json();
    });
  },
}

export default BookingsApiServices;