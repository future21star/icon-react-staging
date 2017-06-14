import React, {Component, PropTypes} from 'react';
import {Link} from "react-router";
import {connect} from "react-redux";
import './BottomNav.scss';

@connect(
	state => ({
		routing: state.routing,
		helpfulLinks: state.helpfulLinksStore.helpfulLinks
	})
)

export default class BottomNav extends Component {
	static propTypes = {
		routing: PropTypes.object,
		helpfulLinks: PropTypes.array
	};

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

	static renderLinkItem(uri, iconName, currentUri) {
		return (
			<li className={uri === currentUri ? 'active' : ''}><Link to={uri}><span className={iconName}/></Link></li>
		)
	}

	createMarkup = (html) => {
		return {__html: html};
	};

	render() {
		const {routing, helpfulLinks} = this.props;
		const {showHelpfulLinksPopup} = this.state;
		const currentUri = routing.locationBeforeTransitions.pathname;

		return (
			<div className="bottom-nav-wrapper">
				<div className={`${showHelpfulLinksPopup ? 'helpful-links-overlay' : ''}`}/>
				<div className={`popover top helpful-links-wrapper ${showHelpfulLinksPopup ? 'show' : ''}`}>
					<div className="arrow"/>
					<div className="popover-title">Helpful Links</div>
					<div className="popover-content">
						<div className="list-group" onClick={this.toggleHelpfulLinksPopUp}>
							{helpfulLinks.map((item, i) => {
								return (
									<Link key={i} to={`/help/${item.slug}`} className="list-group-item"
												dangerouslySetInnerHTML={this.createMarkup(item.title)}/>
								);
							})}
						</div>
					</div>
				</div>
				<ul className="nav nav-pills nav-justified navbar-fixed-bottom bottom-nav">
					{BottomNav.renderLinkItem('/', 'icon-nav-home', currentUri)}
					{BottomNav.renderLinkItem('/feed', 'icon-nav-feed', currentUri)}
					<li><a href="#" onClick={this.toggleHelpfulLinksPopUp} className="helpful-links-item"><span
						className="icon-nav-links"/></a></li>
					{BottomNav.renderLinkItem('/nutrition', 'icon-nav-nutrition', currentUri)}
					{BottomNav.renderLinkItem('/programming', 'icon-nav-programming', currentUri)}
				</ul>
			</div>
		);
	}
}
