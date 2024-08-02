import { combineReducers } from 'redux';
import userReducer from './userReducer';
import eventsReducer from './eventsReducer';
import artistsReducers from './artistsReducers'

const rootReducer = combineReducers({
  user: userReducer,
  events: eventsReducer,
  artists: artistsReducers,
});

export default rootReducer;
