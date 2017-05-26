import React, {Component, PropTypes} from 'react';
import './Logo.scss';

export default class Logo extends Component {
	render() {
		const logo = require('../../../static/logo.png');
		return (
			<div className="logo-wrapper">
				<img src={logo} width="100%"/>
			</div>
		);
	}
}
