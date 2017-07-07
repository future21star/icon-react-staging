import React, {Component, PropTypes} from 'react';

export default class Loader extends Component {

	render() {
		return (
			<div className="loader-wrapper">
				<div className="circle"/>
				<div className="circle"/>
				<div className="circle"/>
			</div>
		);
	}
}
