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

	constructor(props) {
		super(props);

		this.state = {
			activeTab: 1
		}
	}


	setActiveTab = (index) => {
		this.setState({
			activeTab: index
		});
	};


	render() {
		const {user} = this.props;
		const{activeTab} = this.state;

		if(!user) {
			return <div/>;
		}
		
		const {subscription} = user;

		let imageOne = require('../../static/add-icon-first.jpg');
		let imageTwo = require('../../static/add-icon-second.jpg');

		return (
			<div className="bottom-padding menu-head-buffer">
				<Helmet title="Welcome"/>
				<div className="container text-center">
					<h1>Welcome To Icon Athlete</h1>
					<p>Lets get started, you have access to a bunch of cool new stuff!</p>
				</div>
				<div className="container block">
					<div className="assessment-tabs-nav welcome-tabs-nav row">

						<div onClick={e => this.setActiveTab(1)} className={`col-xs-12 col-sm-3 ${activeTab === 1 ? "active" : ""}`}>
							<a href="javascript:;"><span className="icon icon-nav-home"/> Home</a>
						</div>
						<div onClick={e => this.setActiveTab(2)} className={`col-xs-12 col-sm-3 ${activeTab === 2 ? "active" : ""}`}>
							<a href="javascript:;"><span className="icon icon-nav-feed"/> the Feed</a>
						</div>
						<div onClick={e => this.setActiveTab(3)} className={`col-xs-12 col-sm-3 ${activeTab === 3 ? "active" : ""}`}>
							<a href="javascript:;"><span className="icon icon-nav-programming"/> Programming</a>
						</div>
						<div onClick={e => this.setActiveTab(4)} className={`col-xs-12 col-sm-3 ${activeTab === 4 ? "active" : ""}`}>
							<a href="javascript:;"><span className="icon icon-nav-nutrition"/> Nutrition</a>
						</div>

					</div>
				</div>
				<div className="container assessment-tabs-content welcome-tabs-content">
					<div className="row">
						<div className="col-xs-12">
							<div className={`tab tab-1 ${activeTab === 1 ? "active" : ""}`}>
								<div className="col-xs-12 col-sm-3">
									<span className="icon icon-nav-home"/>
								</div>
								<div className="col-xs-12 col-sm-9">
									<h3>Home</h3>
									<p className="text-left">The home icon on the bottom right will allow you to see today's workout and view/edit your Profile from the homepage.</p>
								</div>
							</div>
							<div className={`tab tab-2 ${activeTab === 2 ? "active" : ""}`}>
								<div className="col-xs-12 col-sm-3">
									<span className="icon icon-nav-feed"/>
								</div>
								<div className="col-xs-12 col-sm-9">
									<h3>The Feed</h3>
									<p className="text-left">Next to the Home Icon is the Feed, here you will find instructional videos, podcasts, and helpful articles!</p>
								</div>
							</div>
							<div className={`tab tab-3 ${activeTab === 3 ? "active" : ""}`}>
								<div className="col-xs-12 col-sm-3">
									<span className="icon icon-nav-programming"/>
								</div>
								<div className="col-xs-12 col-sm-9">
									<h3>Programming</h3>
									<p className="text-left">Click this icon to access your programming, you can see the current weeks workouts and one week ahead.</p>
								</div>
							</div>
							<div className={`tab tab-4 ${activeTab === 4 ? "active" : ""}`}>
								<div className="col-xs-12 col-sm-3">
									<span className="icon icon-nav-nutrition"/>
								</div>
								<div className="col-xs-12 col-sm-9">
									<h3>Nutrition</h3>
									<p className="text-left">Find everything nutrition here, don't worry it will be finished soon.</p>
								</div>
							</div>
						</div>
					</div>	
				</div>
				<div className="container menu-head-buffer add-homescreen">
					<div className="row">
						<div className="col-xs-12 col-sm-6 screenshot-container">
							<h2>First Step</h2>
							<p>Add the Vault to your Iphone Homescreen,simply click the icon show below and select "Add To Homescreen". For you android users try this <a href="http://www.greenbot.com/article/3041304/android/how-to-add-a-web-site-to-your-android-home-screen-with-chrome.html" target="_blank">Link.</a></p>
							<div className="col-xs-6">
								<img src={imageOne} />
							</div>
							<div className="col-xs-6">
								<img src={imageTwo} />
							</div>	
						</div>
						<div className="col-xs-12 col-sm-6 r">
							<h2>Second Step</h2>
							<p>We recommend taking our Assessment to decide which programming track is best for you:</p>
							<div className="block">
								<Link to="assessment" className="btn btn-lg btn-icon">Take Assessment</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}