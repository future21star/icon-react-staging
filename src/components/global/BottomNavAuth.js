import React, {Component, PropTypes} from 'react';
import {Link} from "react-router";
import {connect} from "react-redux";
import BtnBottom from "../tracks/BtnBottom";
import {logout} from "../../redux/modules/authStore";

@connect(
	state => ({
		routing: state.routing,
		browser: state.browser,
		user: state.authStore.user,
		helpfulLinks: state.helpfulLinksStore.helpfulLinks
	}),
	{logout}
)

export default class BottomNavAuth extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showHelpfulLinksPopup: false
		}
	}

	toggleHelpfulLinksPopUp = (e) => {
		e.preventDefault();
		this.setState({
			showHelpfulLinksPopup: !this.state.showHelpfulLinksPopup
		});
	};

	handleLogout = (event) => {
		event.preventDefault();
		this.props.logout();
	};

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
		const {routing, helpfulLinks, user} = this.props;
		const {showHelpfulLinksPopup} = this.state;
		const currentUri = routing.locationBeforeTransitions.pathname;

		return (
			user && (
				<div className="bottom-nav-wrapper">
					<div className={`${showHelpfulLinksPopup ? 'helpful-links-overlay show-transition-backdrop' : ''}`}/>
					<div className={`popover top helpful-links-wrapper ${showHelpfulLinksPopup ? 'show show-transition' : ''}`}>
						<div className="arrow"/>
						<div className="popover-title">Helpful Links</div>
						<div className="popover-content">
							<div className="list-group" onClick={this.toggleHelpfulLinksPopUp}>
								<Link to="/assessment" className="list-group-item">Assessment</Link>
								<Link to="/faqs" className="list-group-item">FAQ's</Link>
								{helpfulLinks.map((item, i) => {
									return (
										<Link key={i} to={`/help/${item.slug}`} className="list-group-item"
													dangerouslySetInnerHTML={this.createMarkup(item.title)}/>
									);
								})}
								<a href="javascript:;" onClick={this.handleLogout} className="list-group-item">Log Out</a>
							</div>
						</div>
					</div>
					<ul className="nav nav-pills nav-justified navbar-fixed-bottom bottom-nav">
						{BottomNavAuth.renderLinkItem('/', 'icon-nav-home', currentUri)}
						{BottomNavAuth.renderLinkItem('/feed', 'icon-nav-feed', currentUri)}
						<li><a href="#" onClick={this.toggleHelpfulLinksPopUp} className="helpful-links-item"><span
							className="icon-menu-more"/></a></li>
						{BottomNavAuth.renderLinkItem('/nutrition', 'icon-nav-nutrition', currentUri)}
						{BottomNavAuth.renderLinkItem('/programming', 'icon-nav-programming', currentUri)}
					</ul>
				</div>
			)
		);
	}

	desktopMenu() {
		const logoImg = require('../../../static/logo.png');
		const {routing, helpfulLinks, user} = this.props;
		const {showHelpfulLinksPopup} = this.state;
		const currentUri = routing.locationBeforeTransitions.pathname;

		return (
		user && (
			<div className="bottom-nav-wrapper-desktop">
				<div className={`${showHelpfulLinksPopup ? 'helpful-links-overlay show-transition-backdrop' : ''}`}/>
				<div
					className={`popover top helpful-links-desktop-wrapper ${showHelpfulLinksPopup ? 'show show-transition' : ''}`}>
					<div className="arrow"/>
					<div className="popover-title">Helpful Links</div>
					<div className="popover-content">
						<div className="list-group" onClick={this.toggleHelpfulLinksPopUp}>
							<Link to="/assessment" className="list-group-item">Assessment</Link>
							<Link to="/faqs" className="list-group-item">FAQ's</Link>
							{helpfulLinks.map((item, i) => {
								return (
									<Link key={i} to={`/help/${item.slug}`} className="list-group-item"
												dangerouslySetInnerHTML={this.createMarkup(item.title)}/>
								);
							})}
							<a className="list-group-item" href="javascript:;" onClick={this.handleLogout}>Log Out</a>
						</div>
					</div>
				</div>

				<div className="bottom-nav-desktop">
					<div className="container-fluid">
						<div className="pull-left">
							<img src={logoImg} alt="logo" className="bottom-nav-logo-desktop"/>
							<span className="copyright">&copy; 2017</span>
						</div>
						<div className="pull-right">
							<ul className="nav nav-pills">
								{BottomNavAuth.renderLinkItem('/', 'icon-nav-home', currentUri)}
								{BottomNavAuth.renderLinkItem('/feed', 'icon-nav-feed', currentUri)}
								{BottomNavAuth.renderLinkItem('/nutrition', 'icon-nav-nutrition', currentUri)}
								{BottomNavAuth.renderLinkItem('/programming', 'icon-nav-programming', currentUri)}
								<li className="helpful-links-desktop-li"><a href="#" onClick={this.toggleHelpfulLinksPopUp}
																														className="helpful-links-item"><span
									className="icon-menu-more"/></a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		));
	}
}
