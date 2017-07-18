import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import checkAccessLevel from '../HOC/CheckAccessLevel'
import {connect} from "react-redux";
import {Menubar, FeedHeader, DesktopFeedSidebar} from "../../components";
import {Link} from "react-router";

@checkAccessLevel('feed')

@connect(
	state => ({
		browser: state.browser
	})
)

export default class Feed extends Component {

	componentDidMount() {
		document.body.classList.toggle('desktop-disable-scrolling');
	}

	componentWillUnmount() {
		document.body.classList.remove('desktop-disable-scrolling');
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.location.pathname !== this.props.location.pathname) {
			this.refs.overflowCustomScroll.scrollTop = 0;
		}
	}

	render() {
		const {browser} = this.props;

		return (
			<ReactCSSTransitionGroup
				transitionName="react-anime"
				transitionAppear={true}
				transitionAppearTimeout={5000}
				transitionEnter={true}
				transitionEnterTimeout={500}
				transitionLeave={true}
				transitionLeaveTimeout={500}
			>
				<Helmet title="Feed"/>

				<div
					className={`${browser.is.mobile ? 'feed-page-wrapper bottom-padding' : 'feed-page-desktop-wrapper bottom-padding'}`}>

					{browser.is.mobile && (
						<Menubar
							className="menu-color-white"
							title="Feed"
							leftSideContent={<Link to="/profile"><span className="icon-user-profile"/><span className="mobile-hide">Profile</span></Link>}
							rightSideContent={<Link to="/feed/search">
								<span className="mobile-hide">Search</span>
								<span className="icon-search"/>
							</Link>}
						/>
					)}

					<div className={`${browser.is.mobile ? 'feed-content-wrapper' : 'feed-content-wrapper-desktop'}`}>
						<div className={`${browser.is.mobile ? '' : 'container-fluid container-fluid-full'}`}>
							<FeedHeader/>
						</div>

						{browser.is.mobile && this.props.children}

						{browser.is.desktop && (
							<div className="feed-body-desktop">
								<div className="feed-body-desktop-content">
									<div className="row no-margin-left-right">
										<div className="col-md-4 col-lg-3 feed-body-left overflow-custom-scroll">
											<DesktopFeedSidebar/>
										</div>
										<div className="col-md-8 col-lg-9 feed-body-right overflow-custom-scroll" ref="overflowCustomScroll">
											<div className="feed-posts-section">
												{this.props.children}
											</div>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>

			</ReactCSSTransitionGroup>
		);
	}
}
