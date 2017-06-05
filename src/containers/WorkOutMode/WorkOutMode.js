import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {WorkOutModeTabs} from '../../components';

export default class WorkOutMode extends Component {

	render() {
		return (
			<div className="workout-mode-page-wrapper">
				<Helmet title="Workout Mode"/>
				<WorkOutModeTabs/>
			</div>
		);
	}
}
