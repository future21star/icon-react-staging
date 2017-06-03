import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {BottomNav, MenubarTurquoise} from '../../components'

export default class Feed extends Component {
	render() {
		return (
			<div >
				<Helmet title="Feed"/>

				<MenubarTurquoise title="Feed"/>

				<div className="container">
					<h1>Feed Page</h1>
				</div>

				<BottomNav/>
			</div>
		);
	}
}
