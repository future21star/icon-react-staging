import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from "react-redux";
import {Link} from "react-router";
import {
	Menubar
} from '../components/index';

@connect(
	state => ({
		user: state.authStore.user
	})
)
export default class Welcome extends Component {

	createMarkup = (html) => {
		return {__html: html};
	};

	render() {
		const {user} = this.props;

		if(!user) {
			return <div/>;
		}
		
		const {subscription} = user;


		return (
			<div className="bottom-padding">
				<Helmet title="Welcome"/>
				<div className="container text-center menu-head-buffer">
					<h1>Welcome To Icon Athlete</h1>
					<p>Lets get started, you have access to a bunch of cool new stuff!</p>
					<div className="col-xs-12 col-sm-6 col-md-3">
						<div className="welcome-block-bg">
							<span className="icon icon-nav-home"/>
							<h3>Home</h3>
							<p>See today's workout and view/edit your Profile from the homepage, get there by clicking this icon.</p>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6 col-md-3">
						<div className="welcome-block-bg">
							<span className="icon icon-nav-feed"/>
							<h3>The Feed</h3>
							<p>In the feed you will find all instructional videos, podcasts, and helpful articles!</p>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6 col-md-3">
						<div className="welcome-block-bg">
							<span className="icon icon-nav-programming"/>
							<h3>Programming</h3>
							<p>Access your programming by clicking this icon, you can see the current weeks workouts and one week ahead.</p>
						</div>
					</div>
					<div className="col-xs-12 col-sm-6 col-md-3">
						<div className="welcome-block-bg">
							<span className="icon icon-nav-nutrition"/>
							<h3>Nutrition</h3>
							<p>Find everything nutrition here, don't worry it will be finished soon.</p>
						</div>
					</div>
					<div className="clearfix"/>
					<h1 className="block">First Step</h1>
					<p>We recommend taking our Assessment to decide which programming track is best for you:</p>
					<div className="block">
						<Link to="assessment" className="btn btn-lg btn-icon">Take Assessment</Link>
					</div>
				</div>
			</div>
		);
	}
}
