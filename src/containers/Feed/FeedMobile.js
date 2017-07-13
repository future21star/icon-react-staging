import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from 'react-router';
import {
	Menubar,
	FeedTopNav
} from '../../components'

@connect(
	state => ({})
)

export default class FeedMobile extends Component {

	render() {
		return (
			<div className="feed-page-wrapper bottom-padding">
				<Menubar
					className="gradient-turquoise menu-color-white"
					title="Feed"
					leftSideContent={<Link to="/profile"><span className="icon-user-profile"/><span className="mobile-hide">Profile</span></Link>}
					rightSideContent={<Link to="/feed/search">
						<span className="icon-search"/>
						<span className="mobile-hide">Search</span>
					</Link>}
				/>

				<div className="feed-content-wrapper">
					<FeedTopNav/>
					{this.props.children}
				</div>
			</div>
		);
	}
}
