import React, {Component, PropTypes} from 'react';
import {Link} from "react-router";
import {connect} from "react-redux";
import './BottomNav.scss';

@connect(
	state => ({routing: state.routing})
)

export default class BottomNav extends Component {
	static linkItemRender(uri, iconName, currentUri) {
		return (
			<li className={uri === currentUri ? 'active' : ''}><Link to={uri}><span className={iconName}/></Link></li>
		)
	}

	render() {
		const {routing} = this.props;

		const currentUri = routing.locationBeforeTransitions.pathname;

		return (
			<ul className="nav nav-pills nav-justified navbar-fixed-bottom bottom-nav">
				{BottomNav.linkItemRender('/', 'icon-nav-home', currentUri)}
				{BottomNav.linkItemRender('/feed', 'icon-nav-feed', currentUri)}
				<li><a href="#" className="helpful-links-item"><span className="icon-nav-links"/></a></li>
				{BottomNav.linkItemRender('/nutrition', 'icon-nav-nutrition', currentUri)}
				{BottomNav.linkItemRender('/programming', 'icon-nav-programming', currentUri)}
			</ul>
		);
	}
}
