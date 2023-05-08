import React from 'react';
import PropTypes from 'prop-types';
import sunriseLogo from '../../../../../public/sunrise.svg';

import './style.scss';

SunriseSunset.propTypes = {
	sunRiseSunSet: PropTypes.object,
};

function getTime(dt) {
	const UTC = new Date(dt * 1000);

	const hours = UTC.getHours();
	const minute = `0${UTC.getMinutes()}`;

	const result =
		hours > 12
			? `${hours % 12}:${minute.slice(-2)} PM`
			: `${hours}:${minute.slice(-2)} AM`;

	return result;
}

function SunriseSunset({ sunRiseSunSet }) {
	const { sunrise, sunset } = sunRiseSunSet;

	const timeSunRise = getTime(sunrise);
	const timeSunSet = getTime(sunset);

	return (
		<div className="sunrise-sunset">
			<h5>Sunrise & Sunset</h5>

			<div>
				<div className="sunrise">
					<div className="sunrise-img">
						<img src={sunriseLogo} className="logo react" alt="React logo" />
					</div>
					<div className="sunrise-time">
						<span> Sunrise</span>
						<span>{`${timeSunRise}`}</span>
					</div>
				</div>

				<div className="sunset">
					<div className="sunset-img">
						<img src={sunriseLogo} className="logo react" alt="React logo" />
					</div>
					<div className="sunset-time">
						<span> Sunset</span>
						<span>{`${timeSunSet}`}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SunriseSunset;
