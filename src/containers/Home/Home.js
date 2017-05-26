import React, {Component} from 'react';
import config from '../../config';
import Helmet from 'react-helmet';

export default class Home extends Component {
	render() {
		return (
			<div >
				<Helmet title="Home"/>
				<div className="container">

					<h1>{config.app.title}</h1>

					<h2>{config.app.description}</h2>

					<h1>Home page</h1>
				</div>
			</div>
		);
	}
}
