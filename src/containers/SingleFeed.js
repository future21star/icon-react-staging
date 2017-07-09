import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {MenubarTurquoise, JumbotronWhite, SubscriptionUpgradeCard} from '../components/index';
import {connect} from "react-redux";
import {includes} from 'lodash';
import {Link} from 'react-router';
import ReactDisqusThread from 'react-disqus-thread';

@connect(
	state => ({
		vaultAccess: state.authStore.user.vaultAccess
	}),
	{}
)

export default class SingleFeed extends Component {
	render() {
		const {vaultAccess} = this.props;

		let accessToFeed = includes(vaultAccess, 'feed');

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
				<div className="feed-page-wrapper bottom-padding">
					<Helmet title="Single Feed"/>

					<MenubarTurquoise
						title="Overview"
						leftSideContent={<Link to="/feed"><span className="icon-back"/><span
							className="mobile-hide">Back</span></Link>}
					/>

					{accessToFeed ? this.renderSingleFeed() : this.renderNoVaultAccess()}
				</div>
			</ReactCSSTransitionGroup>
		);
	}

	renderNoVaultAccess() {
		return (
			<div className="container">
				<JumbotronWhite title="No Access"
												description={<span>You do not have access to view feeds.</span>}
												logo={true}/>
			</div>
		);
	}

	renderSingleFeed() {
		let featuredImageUrl = require('../../static/temp/feed-featured-temp.jpg');

		return (
			<div className="feed-content-wrapper">
				<div className="feed-featured-post">
					<div className="feed-featured-post-image">
						<div className="type-video">
							<img width="100%" src={featuredImageUrl}/>
						</div>
					</div>

					<div className="container">
						<div className="feed-featured-post-title">Here goes to title of this post</div>
						<div className="feed-featured-post-date">Posted 24.02.2017</div>
						<div className="feed-featured-post-content">
							<p>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab exercitationem facilis id natus nihil.
								Consequatur eveniet expedita id in, iusto nam nobis officia porro quae quas qui saepe temporibus
								voluptates?
							</p>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus autem cum dolorem ea facere ipsam
								maxime minus obcaecati rerum? Amet enim laboriosam laudantium, maiores nulla quidem reprehenderit sint
								totam veniam.
							</p>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. A blanditiis culpa debitis dicta dolore
								dolores vero! Consequuntur corporis dolores excepturi facere itaque praesentium repudiandae sequi
								similique ullam! Delectus praesentium, sit!
							</p>
						</div>

						<ReactDisqusThread
							shortname="example"
							identifier="something-unique-12345"
							title="Example Thread"
							url="http://www.example.com/example-thread"
							category_id="123456"/>
					</div>
				</div>
			</div>
		);
	}
}
