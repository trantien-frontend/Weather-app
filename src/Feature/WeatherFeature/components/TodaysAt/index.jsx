import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import './style.scss';
import { useHorizontalScroll } from '../hooks/useHorizontalScroll';
import Skeleton from '../../../../components/Skeleton';

TodaysAt.propTypes = {
	weatherForecast: PropTypes.array,
	isLoading: PropTypes.bool,
};

const NUMBER = 7;

function getHours(dt) {
	const hours = new Date(dt * 1000).getHours();

	const result = hours > 12 ? `${hours % 12} PM` : `${hours} AM`;

	return result;
}

function TodaysAt({ weatherForecast, isLoading }) {
	const scrollLeft = useHorizontalScroll();
	let newList;

	if (weatherForecast[0]) {
		newList = [];
		for (let index = 0; index <= NUMBER; index++) {
			const {
				dt,
				main: { temp },
				weather,
			} = weatherForecast[index];
			newList.push({
				id: dt,
				hours: getHours(dt),
				temp: temp,
				icon: weather[0].icon,
			});
		}
	} else {
		newList = Array.from({ length: NUMBER });
	}

	return (
		<div>
			<h4>today at</h4>

			<div className="today-temp-list">
				<div ref={scrollLeft}>
					{newList.map((e, index) => {
						if (isLoading) {
							return (
								<div key={index} className="today-temp-list__item">
									<Skeleton widthHeight={{ height: 150 }} />
								</div>
							);
						} else {
							return (
								<div key={e.id} className="today-temp-list__item">
									<div>
										<span className="time">{e.hours}</span>
										<img
											src={`https://openweathermap.org/img/wn/${e.icon}@2x.png`}
											alt=""
										/>
										<span className="temp">
											{Math.round(e.temp)}
											<sup>o</sup>
										</span>
									</div>
								</div>
							);
						}
					})}
				</div>
			</div>
		</div>
	);
}

export default TodaysAt;
