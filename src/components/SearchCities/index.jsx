import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.scss';
import { API_KEY } from '../../constant/constant';
import weatherApis from '../../api/weatherApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

SearchCities.propTypes = {
	onSubmit: PropTypes.func,
};

function SearchCities({ onSubmit = null }) {
	const showSearch = useRef(null);
	const nodeCitieList = useRef(null);
	const searchDebounce = useRef(null);

	const [citiesList, setCitiesList] = useState([]);

	const [value, setValue] = useState('');

	const handleShowSearch = () => {
		showSearch.current.classList.add('show');
	};

	const handleHideSearch = () => {
		showSearch.current.classList.remove('show');
	};

	const handleSearchCity = (e) => {
		let searchValue = e.target.value;
		setValue(searchValue);

		nodeCitieList.current.classList.remove('hide-cities-list');

		if (searchDebounce) clearInterval(searchDebounce.current);

		searchDebounce.current = setTimeout(async () => {
			try {
				const params = {
					q: searchValue,
					limit: 5,
					appid: API_KEY,
				};

				const data = await weatherApis.getGeocoding(params);

				setCitiesList(() => {
					return data.map(({ country, lat, lon, name, state }, index) => ({
						id: index,
						country,
						lat,
						lon,
						name,
						state: state ? state : '',
					}));
				});
			} catch (error) {
				console.log('message', error);
			}
		}, 800);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const handleFocus = (e) => {
		const target = e.target;

		if (showSearch.current.contains(target)) {
			nodeCitieList.current.classList.remove('hide-cities-list');
		}

		document.addEventListener('click', (e) => {
			const target = e.target;

			if (!showSearch.current.contains(target)) {
				nodeCitieList.current.classList.add('hide-cities-list');
			}
		});
	};

	const handleChooseCity = (city) => {
		const { lat, lon, name } = city;
		onSubmit?.({ lat, lon });
		setValue(name);
		showSearch.current.classList.remove('show');

		nodeCitieList.current.classList.add('hide-cities-list');
	};

	return (
		<>
			<div className="search">
				<button className="button " onClick={handleShowSearch}>
					<span>
						<FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
					</span>
				</button>

				<div
					ref={showSearch}
					onFocus={(e) => handleFocus(e)}
					className={classNames({
						'search-cities': true,
					})}
				>
					<div>
						<form onSubmit={handleSubmit}>
							<span onClick={handleHideSearch}>
								<FontAwesomeIcon icon="fa-solid fa-arrow-left" />
							</span>

							<input
								type="text"
								onChange={handleSearchCity}
								value={value}
								placeholder="Search city..."
							/>
						</form>

						<ul className="cities-list" ref={nodeCitieList}>
							{citiesList.map((city, index) => (
								<li
									key={city.id}
									data-index={index}
									onClick={() => handleChooseCity(city)}
								>
									<span>
										<FontAwesomeIcon icon="fa-solid fa-location-dot" />
									</span>
									<div>
										<p>{city.name}</p>
										<p>{`${city.country}, ${city.state}`}</p>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}

export default SearchCities;
