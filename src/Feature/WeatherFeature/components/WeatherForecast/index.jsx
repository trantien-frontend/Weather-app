import React from 'react';
import PropTypes from 'prop-types';
import { DAY_NAMES, MONTH_NAMES } from '../../constant/constant';

import './style.scss';

WeatherForecast.propTypes = {
	weatherForecast: PropTypes.array,
};

function getStringDate(text) {
	if (typeof text !== 'string' || text.length === 0) return;

	const newText = text.split(' ')[0];

	return newText;
}

function WeatherForecast({ weatherForecast = [] }) {
	let currentDate = getStringDate(weatherForecast[0].dt_txt);

	const listForecastWeather = weatherForecast
		.map((x) => {
			const date = getStringDate(x.dt_txt);

			if (currentDate === date) return false;

			currentDate = date;

			return {
				id: x.dt,
				dt: {
					day: DAY_NAMES[new Date(x.dt * 1000).getDay()],
					date: new Date(x.dt * 1000).getDate(),
					month: MONTH_NAMES[new Date(x.dt * 1000).getMonth()],
				},
				temp: x.main.temp,
				icon: x.weather[0].icon,
			};
		})
		.filter((x) => x.id);

	return (
		<>
			<div className="five-days-forecast">
				<ul>
					{listForecastWeather.map((x) => (
						<li key={x.id}>
							<div className="five-days-forecast__item">
								<div className="img">
									<img
										src={`https://openweathermap.org/img/wn/${x.icon}@2x.png`}
										alt=""
									/>
								</div>
								<p>
									{Math.floor(x.temp)}
									<sup>o</sup>
								</p>
							</div>

							<div className="five-days-forecast__item">
								<span>{x.dt.date >= 10 ? x.dt.date : `0${x.dt.date}`}</span>
								<span>{x.dt.month}</span>
							</div>

							<div className="five-days-forecast__item">
								<span>{x.dt.day}</span>
							</div>
						</li>
					))}
				</ul>
			</div>
		</>
	);
}

export default WeatherForecast;
