import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";
import {Menubar, FeedHeader, DesktopFeedSidebar} from "../../components";
import {Link} from "react-router";

@connect(
	state => ({
		browser: state.browser,
		user: state.authStore.user
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
		if (nextProps.location.pathname !== this.props.location.pathname && this.props.browser.is.desktop) {
			this.refs.overflowCustomScroll.scrollTop = 0;
		}
	}

	render() {
		const {browser, user} = this.props;

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
							className="menu-bar-white"
							title="Feed"
							leftSideContent={<Link to="/profile"><span className="icon-user-profile"/><span className="mobile-hide">Profile</span></Link>}
							rightSideContent={
								user ? (<Link to="/feed/search">
									<span className="mobile-hide">Search</span>
									<span className="icon-search"/>
								</Link>) : undefined}
						/>
					)}

					<div className={`${browser.is.mobile ? 'feed-content-wrapper' : 'feed-content-wrapper-desktop'}`}>
						<div className={`${browser.is.mobile ? 'container-fluid' : 'container-fluid container-fluid-full'}`}>
							<FeedHeader/>
						</div>

						{browser.is.mobile && this.props.children}

						{browser.is.desktop && (
							<div className={user ? "feed-body-desktop" : "feed-body-desktop-guest"}>
								<div className="feed-body-desktop-content">
									<div className="row no-margin-left-right">
										{user && (
											<div className="col-md-4 col-lg-3 feed-body-left overflow-custom-scroll">
												<DesktopFeedSidebar/>
											</div>
										)}
										<div className={user ? "col-md-8 col-lg-9 feed-body-right overflow-custom-scroll": "col-md-offset-2 col-md-8 feed-body-right overflow-custom-scroll"} ref="overflowCustomScroll">
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
