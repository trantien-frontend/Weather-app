import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Skeleton from '../../../../components/Skeleton';

HumidityPressure.propTypes = {
	humidityPressure: PropTypes.object,
	isLoading: PropTypes.bool,
};

function HumidityPressure({ humidityPressure, isLoading }) {
	const { humidity, pressure } = humidityPressure;
	return (
		<div className="humidity-pressure">
			<div>
				{isLoading ? (
					<Skeleton widthHeight={{ height: 120 }} />
				) : (
					<div className="humidity-pressure__item">
						<h5>humidity</h5>

						<div>
							<span>
								<FontAwesomeIcon icon="fa-solid fa-droplet" />
							</span>

							<p>
								{humidity}
								<span>%</span>
							</p>
						</div>
					</div>
				)}
			</div>

			<div>
				{isLoading ? (
					<Skeleton widthHeight={{ height: 120 }} />
				) : (
					<div className="humidity-pressure__item">
						<h5>pressure</h5>

						<div>
							<span>
								<FontAwesomeIcon icon="fa-solid fa-water" />
							</span>
							<p>
								{pressure}
								<span>hPa</span>
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default HumidityPressure;
