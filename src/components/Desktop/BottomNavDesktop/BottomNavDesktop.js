import React, {Component} from 'react';
import {Link} from "react-router";
import './BottomNavDesktop.scss';

export default class BottomNavDesktop extends Component {

	static linkItemRender(uri, iconName, currentUri) {
		return (
			<li className={uri === currentUri ? 'active' : ''}><Link to={uri}><span className={iconName}/></Link></li>
		)
	}

	render() {

		const logoImg = require('../../../../static/logo.png');
		const {routing} = this.props;
		const currentUri = routing.locationBeforeTransitions.pathname;

		return (
			<div className="bottom-nav-wrapper-desktop">
				<div className="bottom-nav-desktop">
					<div className="container-fluid">
						<div className="pull-left">
							<img src={logoImg} alt="logo" className="bottom-nav-logo-desktop"/>
							<span className="copyright">&copy; 2017</span>
						</div>
						<div className="pull-right">
							<ul className="nav nav-pills">
								{BottomNavDesktop.linkItemRender('/', 'icon-nav-home', currentUri)}
								{BottomNavDesktop.linkItemRender('/feed', 'icon-nav-feed', currentUri)}
								{BottomNavDesktop.linkItemRender('/nutrition', 'icon-nav-nutrition', currentUri)}
								{BottomNavDesktop.linkItemRender('/programming', 'icon-nav-programming', currentUri)}
								{BottomNavDesktop.linkItemRender('/programming-desktop', 'icon-information', currentUri)}
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
