import React, {Component, PropTypes} from 'react';
import {Link} from "react-router";
import {connect} from "react-redux";
import './BottomNav.scss';

@connect(
	state => ({
		routing: state.routing,
		helpfulLinks: state.helpfulLinksStore.links
	})
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

	createMarkup = (html) => {
		return {__html: html};
	};

	render() {
		const {routing, helpfulLinks} = this.props;
		const currentUri = routing.locationBeforeTransitions.pathname;

		return (
			<div className="bottom-nav-wrapper">
				<div className={`${this.state.helpfulLinksActive ? 'helpful-links-overlay' : ''}`}/>
				<div className={`popover top helpful-links-wrapper ${this.state.helpfulLinksActive ? 'show' : ''}`}>
					<div className="arrow"/>
					<div className="popover-title">Helpful Links</div>
					<div className="popover-content">
						<div className="list-group" onClick={this.toggleHelpfulLinks}>
							{helpfulLinks.map((item, i) => {
								return (
									<Link key={i} to={`/help/${item.slug}`} className="list-group-item" dangerouslySetInnerHTML={this.createMarkup(item.title)}/>
								);
							})}
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
