import React, {Component, PropTypes} from 'react';
import {Link} from "react-router";
import {connect} from "react-redux";
import './BottomNav.scss';

@connect(
	state => ({routing: state.routing})
)

export default class BottomNav extends Component {
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
		const {routing} = this.props;
		const currentUri = routing.locationBeforeTransitions.pathname;

		return (
			<div className="bottom-nav-wrapper">
				<div className={`${this.state.helpfulLinksActive ? 'helpful-links-overlay' : ''}`}/>
				<div className={`popover top helpful-links-wrapper ${this.state.helpfulLinksActive ? 'show' : ''}`}>
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
				<ul className="nav nav-pills nav-justified navbar-fixed-bottom bottom-nav">
					{BottomNav.linkItemRender('/', 'icon-nav-home', currentUri)}
					{BottomNav.linkItemRender('/feed', 'icon-nav-feed', currentUri)}
					<li><a href="#" onClick={this.toggleHelpfulLinks} className="helpful-links-item"><span
						className="icon-nav-links"/></a></li>
					{BottomNav.linkItemRender('/nutrition', 'icon-nav-nutrition', currentUri)}
					{BottomNav.linkItemRender('/programming', 'icon-nav-programming', currentUri)}
				</ul>
			</div>
		);
	}
}
