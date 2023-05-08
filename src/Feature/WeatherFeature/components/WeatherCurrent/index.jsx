import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import { DAY_NAMES, MONTH_NAMES } from '../../constant/constant';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

WeatherCurrent.propTypes = {
	weatherNow: PropTypes.object,
};

function WeatherCurrent({
	weatherNow: { id, dt, temp, name, country, icon, dsc },
}) {
	const UTC = new Date(dt * 1000);
	const day = DAY_NAMES[UTC.getDay()];
	const date = UTC.getDate();
	const month = MONTH_NAMES[UTC.getMonth()];

	return (
		<div className="weather-now">
			<h6>Now</h6>

			<div className="weather-now__temp">
				<h5>
					{Math.round(temp)}
					<sup>o</sup>
				</h5>

				<div>
					<img
						src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
						alt=""
					/>
				</div>
			</div>

			<p className="weather-now-dsc">{dsc}</p>

			<div className="weather-now__information">
				<p>
					<span>
						<FontAwesomeIcon icon="fa-regular fa-calendar" />
					</span>
					{`${day} ${date}, ${month}`}
				</p>

				<p>
					<span>
						<FontAwesomeIcon icon="fa-solid fa-location-dot" />
					</span>
					{`${name}, ${country}`}
				</p>
			</div>
		</div>
	);
}

export default WeatherCurrent;
