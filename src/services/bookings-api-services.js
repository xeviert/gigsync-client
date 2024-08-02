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
  }
}

export default BookingsApiServices;