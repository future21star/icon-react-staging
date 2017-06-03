import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {BottomNav, MenubarTurquoise} from '../../components'

export default class Nutrition extends Component {
	render() {
		return (
			<div >
				<Helmet title="Nutrition"/>

				<MenubarTurquoise title="Nutrition"/>

				<div className="container">
					<h1>Nutrition Page</h1>
				</div>

				<BottomNav/>
			</div>
		);
	}
}
