import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/index';
import artistsReducer from './slices/artistSlice';

const store = configureStore({
  reducer: {
    artists: artistsReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;