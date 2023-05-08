import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

AirQuality.propTypes = {
	airPollution: PropTypes.object,
};

function AirQuality({ airPollution = {} }) {
	const airPollutionList = Object.entries(airPollution);

	return (
		<div>
			<div className="air-quality">
				<h5>air quality index</h5>

				<div className="air-quality__content">
					<div className="air-icon">
						<span>
							<FontAwesomeIcon icon="fa-solid fa-wind" />
						</span>
					</div>

					<div className="air-parameter">
						<div>
							{airPollutionList.map((x, index) => (
								<div key={index}>
									<span>{x[1]}</span>
									<span>{x[0]}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AirQuality;
