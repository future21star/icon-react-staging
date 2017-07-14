import React, {Component} from 'react';
import {connect} from "react-redux";

import {
	DesktopFeedTopNav,
	DesktopFeedFeaturedPost,
	DesktopFeedPost,
	DesktopFeedPagination,
	DesktopFeedSidebar
} from '../../components'
import {range} from "lodash";

@connect(
	state => ({})
)

export default class FeedDesktop extends Component {

	componentDidMount() {
		document.body.classList.toggle('desktop-disable-scrolling');
	}

	componentWillUnmount() {
		document.body.classList.remove('desktop-disable-scrolling');
	}

	render() {
		return (
			<div className="feed-page-wrapper-desktop bottom-padding hidden-xs">

				<div className="feed-content-wrapper-desktop">
					<div className="container-fluid container-fluid-full">

						<DesktopFeedTopNav/>

						<div className="feed-body-desktop">
							<div className="feed-body-desktop-content">
								<div className="row no-margin-left-right">
									<div className="col-md-4 col-lg-3 feed-body-left overflow-custom-scroll">
										<DesktopFeedSidebar/>
									</div>

									<div className="col-md-8 col-lg-9 feed-body-right overflow-custom-scroll">
										<DesktopFeedFeaturedPost/>

										<div className="feed-posts-section">
											<div className="row">
												{range(4).map((item, index) => {
													return (
														<div className="col-sm-12 col-md-6" key={index}>
															<DesktopFeedPost/>
														</div>
													);
												})}
											</div>
										</div>

										<DesktopFeedPagination/>

									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
