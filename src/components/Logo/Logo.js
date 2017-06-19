import React, {Component, PropTypes} from 'react';
import './Logo.scss';

export default class Logo extends Component {
	render() {
		const logo = require('../../../static/logo.svg');
		return (
			<div className="logo-wrapper">
				<img src={logo} width="100%"/>
			</div>
		);
	}
}
