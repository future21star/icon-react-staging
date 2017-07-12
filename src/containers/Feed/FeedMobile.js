import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from 'react-router';
import {
	Menubar,
	SubscriptionUpgradeCard,
	FeedTopNav,
	FeedFeaturedPost,
	FeedFeaturedLockedPost,
	FeedPost,
	FeedFilterBtn,
	FeedSeeAllVideosBtn
} from '../../components'
import {range} from "lodash";

@connect(
	state => ({

	}),
	{}
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
					<div>
						<FeedTopNav/>

						{/*unlocked post*/}
						<FeedFeaturedPost/>

						{/*locked post*/}
						{/*<FeedFeaturedLockedPost/>*/}
					</div>

					{/* show subscription card if locked*/}
					{/*<div className="container">*/}
						{/*<SubscriptionUpgradeCard*/}
							{/*description={(<div>*/}
								{/*Unlock This Section of the Vault <br/>*/}
								{/*<span className="text-danger">Cancel Anytime</span>*/}
							{/*</div>)}*/}
						{/*/>*/}
					{/*</div>*/}

					<div>
						{range(3).map((item, index) => {
							return (
								<div key={index}>
									<FeedPost/>
								</div>
							)
						})}

						<FeedSeeAllVideosBtn/>
						<FeedFilterBtn/>
					</div>
				</div>
			</div>
		);
	}
}
