import React from 'react';
import PropTypes from 'prop-types';
import AirQuality from '../AirQuality';

import './style.scss';
import SunriseSunset from '../SunriseSunset';
import HumidityPressure from '../HumidityPressure';
import VisibilityFeelike from '../VisibilityFeelLike';
import Skeleton from '../../../../components/Skeleton';

TodaysHightLight.propTypes = {
	valuesToday: PropTypes.object,
	isLoading: PropTypes.bool,
};

function TodaysHightLight({
	valuesToday: {
		feels_like,
		humidity,
		pressure,
		visibility,
		sunrise,
		sunset,
		no2,
		pm2_5,
		o3,
		so2,
	},
	isLoading,
}) {
	return (
		<div className="todays-hight-light">
			<h4 className="todays-hight-light-title">today hightlights</h4>

			<div className="todays-hight-light__content">
				<div>
					{isLoading ? (
						<Skeleton widthHeight={{ height: 150 }} />
					) : (
						<AirQuality airPollution={{ pm25: pm2_5, so2, o3, no2 }} />
					)}
				</div>

				<div>
					{isLoading ? (
						<Skeleton widthHeight={{ height: 150 }} />
					) : (
						<SunriseSunset sunRiseSunSet={{ sunrise, sunset }} />
					)}
				</div>

				<div>
					<HumidityPressure
						humidityPressure={{ humidity, pressure }}
						isLoading={isLoading}
					/>
				</div>

				<div>
					<VisibilityFeelike
						visibilityFeelsLike={{ visibility, feels_like }}
						isLoading={isLoading}
					/>
				</div>
			</div>
		</div>
	);
}

export default TodaysHightLight;
