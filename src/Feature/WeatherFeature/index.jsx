import { useEffect, useMemo, useRef, useState } from 'react';

import weatherApis from '../../api/weatherApi';

import Header from '../../components/Header';
import { API_KEY, COOR } from '../../constant/constant';
import TodaysAt from './components/TodaysAt';
import TodaysHightLight from './components/TodaysHightLights';
import WeatherCurrent from './components/WeatherCurrent';
import WeatherForecast from './components/WeatherForecast';

import queryString from 'query-string';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import Skeleton from '../../components/Skeleton';
import './style.scss';

WeatherFeature.propTypes = {};

function WeatherFeature(props) {
	const history = useNavigate();
	const location = useLocation();

	const [loading, setLoading] = useState(true);

	const [weatherNow, setWeatherNow] = useState({});

	const [weatherForecast, setWeatherForecast] = useState([]);

	const [valuesToday, setValuesToday] = useState({});
	

	let queryParams = useMemo(() => {
		const params = queryString.parse(location.search);

		return {
			...params,
			lat: +params.lat || COOR.LAT,
			lon: +params.lon || COOR.LON,
			units: params.units || 'metric',
		};
	}, [location.search]);

	useEffect(() => {
		history({
			pathname: location.pathname,
			search: queryString.stringify(queryParams),
		});
	}, [queryParams]);

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);

				const params = queryString.parse(location.search);

				const queryParams = {
					...params,
					appid: API_KEY,
				};

				const weatherCurrentData = weatherApis.getWeatherCurrent(queryParams);

				const weatherForestData = weatherApis.getWeatherForecast(queryParams);

				const airPollutionData =
					weatherApis.getWeatherAirPollution(queryParams);

				const cityData = weatherApis.getGeocodingReverse(queryParams);

				const data = await Promise.all([
					weatherCurrentData,
					weatherForestData,
					airPollutionData,
					cityData,
				]);

				const {
					dt,
					main: { temp, humidity, feels_like, pressure },
					weather: des,
					visibility,
					sys: { sunrise, sunset },
				} = data[0];

				const { name, country } = data[3][0];

				const { list } = data[2];

				const {
					components: { pm2_5, no2, so2, o3 },
				} = list[0];

				setTimeout(() => {
					setWeatherNow({
						id: dt,
						dt: dt,
						temp,
						dsc: des[0].description,
						icon: des[0].icon,
						name,
						country,
					});

					setValuesToday({
						pm2_5: pm2_5,
						so2,
						no2,
						o3,
						humidity,
						feels_like,
						pressure,
						visibility,
						sunrise,
						sunset,
					});

					setWeatherForecast(data[1].list);

					setLoading(false);
				}, 1000);
			} catch (errors) {
				console.log('errorsMessage: ', errors);
			}
		})();
	}, [queryParams]);

	const handleSubmit = (coors) => {
		queryParams = {
			...queryParams,
			...coors,
		};

		history({
			pathname: location.pathname,
			search: queryString.stringify(queryParams),
		});
	};

	return (
		<div className="container">
			<Header onSubmit={handleSubmit} />

			<div className="main">
				<div className="main-content">
					<div className="main-left">
						<div>
							{loading ? (
								<Skeleton widthHeight={{ height: 220 }} />
							) : (
								<WeatherCurrent weatherNow={weatherNow} />
							)}

							<h4>5 Days Forecast</h4>

							{loading ? (
								<Skeleton widthHeight={{ height: 300 }} />
							) : (
								<WeatherForecast weatherForecast={weatherForecast} />
							)}
						</div>
					</div>

					<div className="main-right">
						<div>
							<TodaysHightLight valuesToday={valuesToday} isLoading={loading} />

							<TodaysAt weatherForecast={weatherForecast} isLoading={loading} />
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	);
}

export default WeatherFeature;
