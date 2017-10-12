import React, {Component, PropTypes} from 'react';
import {Link} from "react-router";
import {connect} from "react-redux";
import BtnBottom from "../tracks/BtnBottom";

@connect(
	state => ({
		routing: state.routing,
		browser: state.browser
	})
)

export default class BottomNavGuest extends Component {
	constructor(props) {
		super(props);
	}

	static renderLinkItem(uri, iconName, currentUri) {
		return (
			<li className={uri === currentUri ? 'active' : ''}><Link to={uri}><span className={iconName}/></Link></li>
		)
	}

	createMarkup = (html) => {
		return {__html: html};
	};

	render() {
		const {browser} = this.props;

		return (
			<div>
				{browser.is.mobile && this.mobileMenu()}
				{browser.is.desktop && this.desktopMenu()}
			</div>
		);
	}

	mobileMenu() {
		const logoImg = require('../../../static/logoSmall.png');
		const {routing} = this.props;
		const currentUri = routing.locationBeforeTransitions.pathname;

		return (
			<div className="bottom-nav-wrapper bottom-nav-guest">
				<ul className="nav nav-pills nav-justified navbar-fixed-bottom bottom-nav">
					<li><a href="https://iconathlete.com" className="logo-img-wrapper"><img src={logoImg} alt="Icon"/></a></li>
					{BottomNavGuest.renderLinkItem('/feed/podcast', 'icon-feed-podcast', currentUri)}
					{BottomNavGuest.renderLinkItem('/assessment', 'icon-user-mentality', currentUri)}
					{BottomNavGuest.renderLinkItem('/free-week', 'icon-nav-programming', currentUri)}
				</ul>
			</div>
		);
	}

	desktopMenu() {
		const logoImg = require('../../../static/logo.png');
		const {routing} = this.props;
		const currentUri = routing.locationBeforeTransitions.pathname;

		return (
			<div className="bottom-nav-wrapper-desktop bottom-nav-guest">
				<div className="bottom-nav-desktop">
					<div className="container-fluid">
						<div className="pull-left">
							<img src={logoImg} alt="Icon" className="bottom-nav-logo-desktop"/>
							<span className="copyright">&copy; 2017</span>
						</div>
						<div className="pull-right">
							<ul className="nav nav-pills">
								{BottomNavGuest.renderLinkItem('/feed/podcast', 'icon-feed-podcast', currentUri)}
								{BottomNavGuest.renderLinkItem('/assessment', 'icon-user-mentality', currentUri)}
								{BottomNavGuest.renderLinkItem('/free-week', 'icon-nav-programming', currentUri)}
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}

}