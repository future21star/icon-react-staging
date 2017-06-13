import React, {Component} from 'react';
import {Link} from "react-router";
import './BottomNavDesktop.scss';

export default class BottomNavDesktop extends Component {
	constructor(props) {
		super(props);

		this.state = {
			helpfulLinksActive: false
		}
	}

	toggleHelpfulLinks = (e) => {
		e.preventDefault();
		this.setState({
			helpfulLinksActive: !this.state.helpfulLinksActive
		});
	};

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
				<div className={`${this.state.helpfulLinksActive ? 'helpful-links-overlay' : ''}`}/>
				<div className={`popover top helpful-links-desktop-wrapper ${this.state.helpfulLinksActive ? 'show' : ''}`}>
					<div className="arrow"/>
					<div className="popover-title">Helpful Links</div>
					<div className="popover-content">
						<div className="list-group">
							<a href="/" className="list-group-item">Icon Assessment</a>
							<a href="/" className="list-group-item">Travel WOD's</a>
							<a href="/" className="list-group-item">FAQ's</a>
							<a href="/" className="list-group-item">Facebook Group</a>
							<a href="/" className="list-group-item">Athletes Worldwide</a>
							<a href="/" className="list-group-item">Gear</a>
							<a href="/" className="list-group-item">Events</a>
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
								{BottomNavDesktop.linkItemRender('/', 'icon-nav-home', currentUri)}
								{BottomNavDesktop.linkItemRender('/feed', 'icon-nav-feed', currentUri)}
								{BottomNavDesktop.linkItemRender('/nutrition', 'icon-nav-nutrition', currentUri)}
								{BottomNavDesktop.linkItemRender('/programming', 'icon-nav-programming', currentUri)}
								{/*{BottomNavDesktop.linkItemRender('/programming/list-view', 'icon-information', currentUri)}*/}
								<li><a href="#" onClick={this.toggleHelpfulLinks} className="helpful-links-item"><span
									className="icon-information"/></a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
