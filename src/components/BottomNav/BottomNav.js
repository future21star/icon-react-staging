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
			helpfulLinksActive: true
		}
	}

	toggleHelpfulLinks = () => {
		this.setState({
			helpfulLinksActive: !this.helpfulLinksActive
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
			<div className="test">
				<div className="popover top" role="tooltip">
					<div className="arrow"/>
					<h3 className="popover-title">Popover title</h3>
					<div className="popover-content">
						<div className="list-group">
							<li className="list-group-item"><a href="/">TEST</a></li>
							<li className="list-group-item"><a href="/">TEST</a></li>
							<li className="list-group-item"><a href="/">TEST</a></li>
							<li className="list-group-item"><a href="/">TEST</a></li>
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
