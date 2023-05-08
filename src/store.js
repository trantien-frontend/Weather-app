import { configureStore } from '@reduxjs/toolkit';
import errorsSlice from './Feature/WeatherFeature/Pages/NotFound/ErrorSlice';

const rootReducer = {
	error: errorsSlice,
};

const store = configureStore({ reducer: rootReducer });

export default store;
