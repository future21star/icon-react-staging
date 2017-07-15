import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {DesktopFeedSidebar, DesktopFeedHeader} from '../../components/index';
import {connect} from "react-redux";

@connect(
	state => ({})
)

export default class SingleFeedDesktop extends Component {
	render() {
		let featuredImageUrl = require('../../../static/temp/feed-featured-temp.jpg');

		return (
			<div className="feed-page-wrapper-desktop bottom-padding hidden-xs">
				<Helmet title="Feed"/>

				<div className="feed-content-wrapper-desktop">
					<div className="container-fluid container-fluid-full">

						<DesktopFeedHeader/>

						<div className="feed-body-desktop">
							<div className="feed-body-desktop-content">
								<div className="row no-margin-left-right">

									<div className="col-sm-7 col-md-8">
										<div className="feed-featured-post">
											<div className="feed-featured-post-image">
												<div className="type-video">
													<img width="100%" src={featuredImageUrl}/>
												</div>
											</div>
											<div className="feed-featured-post-title">Here goes to title of this post</div>
											<div className="feed-featured-post-date">Posted 24.02.2017</div>
											<div className="feed-featured-post-content">
												<p>
													In hac habitasse platea dictumst. In sit amet metus a nunc sagittis consequat ac sed lectus.
													Fusce nec dignissim justo. Aenean efficitur tempor sodales. Morbi scelerisque leo nec
													faucibus pretium.
													Cras elementum lobortis viverra. Suspendisse augue lorem, mollis non eleifend sit amet,
													sagittis eu augue.
													Phasellus ligula est, blandit ac quam vitae, hendrerit semper est.
												</p>
												<p>
													Proin sagittis at quam a tincidunt. Aenean volutpat, lectus vulputate pellentesque
													scelerisque,
													quam libero luctus quam, in sollicitudin erat nunc eget felis. Duis et dolor ut lacus
													gravida
													tincidunt at non arcu. In hac habitasse platea dictumst.
												</p>
												<p>
													In non dolor non purus pellentesque cursus. Pellentesque eu orci vestibulum, vehicula sapien
													nec,
													volutpat neque. Curabitur vel ex non felis laoreet bibendum ac vel nibh. Etiam pretium,
													metus ut aliquam lacinia, velit risus suscipit magna, in fringilla nisi nisi id sem.
													Phasellus sagittis ante sed vestibulum pellentesque. Pellentesque non semper sapien.
													Nam eu quam a sem mattis aliquam a et est. Pellentesque habitant morbi tristique
													senectus et netus et malesuada fames ac turpis egestas.
												</p>
											</div>
										</div>
										<div className="padding-bottom-100"/>
									</div>

									<div className="col-sm-5 col-md-4">
										<DesktopFeedSidebar/>
										<div className="padding-bottom-100"/>
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
