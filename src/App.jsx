import './App.css';
import './utils/fontIcon';
import WeatherFeature from './Feature/WeatherFeature';
import { Route, Routes } from 'react-router-dom';
import NotFound from './Feature/WeatherFeature/Pages/NotFound/NotFound';

function App() {
	return <WeatherFeature />;
}

export default App;
