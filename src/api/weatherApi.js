import axiosClient from './axiosClient';
const URL_GEOCODING = 'http://api.openweathermap.org/geo/1.0';

const weatherApis = {
	getWeatherCurrent(params) {
		const url = '/weather';
		return axiosClient.get(url, { params });
	},

	getWeatherForecast(params) {
		const url = './forecast';
		return axiosClient.get(url, { params });
	},

	getWeatherAirPollution(params) {
		const url = './air_pollution';
		return axiosClient.get(url, { params });
	},

	getGeocoding(params) {
		const url = '/direct';
		return axiosClient.get(url, { baseURL: URL_GEOCODING, params });
	},

	getGeocodingReverse(params) {
		const url = '/reverse';
		return axiosClient.get(url, { baseURL: URL_GEOCODING, params });
	},
};

export default weatherApis;
