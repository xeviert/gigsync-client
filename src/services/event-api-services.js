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
  },
  createEvent({ venue_id, name, date }) {
    const authToken = localStorage.getItem('authToken');
    debugger
    return fetch(`${config.API_ENDPOINT}/events`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({ venue_id, name, date }),
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((e) => {
          throw new Error(e.error || 'Failed to create event');
        });
      }
      return res.json();
    })
      .catch((error) => {
        console.error('Error in API call:', error); // Log the error for debugging
        throw error;
      });
  },
}

export default EventApiServices;