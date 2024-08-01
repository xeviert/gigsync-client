const initialState = {
  events: [],
  loading: false,
};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_EVENTS_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'FETCH_EVENTS_SUCCESS':
      return {
        ...state,
        loading: false,
        events: action.payload,
      };
    case 'FETCH_EVENTS_FAILURE':
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default eventsReducer;