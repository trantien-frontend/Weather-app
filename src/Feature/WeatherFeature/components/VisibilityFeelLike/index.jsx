import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './style.scss';
import Skeleton from '../../../../components/Skeleton';

VisibilityFeelike.propTypes = {
	visibilityFeelsLike: PropTypes.object,
	isLoading: PropTypes.bool,
};

function VisibilityFeelike({ visibilityFeelsLike, isLoading }) {
	const { visibility, feels_like } = visibilityFeelsLike;
	return (
		<div>
			<div className="humidity-pressure">
				<div>
					{isLoading ? (
						<Skeleton widthHeight={{ height: 120 }} />
					) : (
						<div className="humidity-pressure__item">
							<h5>visibility</h5>

							<div>
								<span>
									<FontAwesomeIcon icon="fa-regular fa-eye" />
								</span>
								<p>
									{visibility}
									<span>Km</span>
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
							<h5>feels like</h5>

							<div>
								<span>
									<FontAwesomeIcon icon="fa-solid fa-temperature-quarter" />
								</span>
								<p>
									{Math.round(feels_like)}
									<span>
										<sup>o</sup>C
									</span>
								</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default VisibilityFeelike;
