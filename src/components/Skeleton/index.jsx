import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

Skeleton.propTypes = {
	widthHeight: PropTypes.object,
};

function Skeleton({ widthHeight: { width, height } = null }) {
	return (
		<div
			className="skeleton"
			style={{ width: `100%`, height: `${height}px`, backgroundColor: 'gray' }}
		></div>
	);
}

export default Skeleton;
