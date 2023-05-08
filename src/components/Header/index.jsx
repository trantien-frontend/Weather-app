import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchCities from '../SearchCities';
import './style.scss';
import logo from '../../assets/images/logo.png';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

Header.propTypes = {
	onSubmit: PropTypes.func,
};

function Header({ onSubmit = null }) {
	const location = useLocation();

	const coor = useRef({});

	const handleGetCurrentLocation = () => {
		if (!onSubmit) return;

		navigator.geolocation.getCurrentPosition((postion) => {
			coor.current.lat = postion.coords.latitude;
			coor.current.lon = postion.coords.longitude;

			onSubmit(coor.current);
		});
	};

	const handleSubmit = (value) => {
		onSubmit?.(value);
	};

	return (
		<header>
			<h1 className="logo">
				<a href="#" style={{ display: 'block' }}>
					<img src={logo} alt="" />
				</a>
			</h1>

			<SearchCities onSubmit={handleSubmit} />

			<button
				className="button button--primary"
				onClick={handleGetCurrentLocation}
			>
				<span>
					<FontAwesomeIcon icon="fa-solid fa-location-crosshairs" />
				</span>
			</button>
		</header>
	);
}

export default Header;
