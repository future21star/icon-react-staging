import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from "react-redux";
import {Link} from "react-router";
import {
	Menubar
} from '../../components/index';

@connect(
	state => ({
		user: state.authStore.user
	})
)
export default class NutritionWelcome extends Component {

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
		
		return (
			<div className="bottom-padding menu-head-buffer">
				<Helmet title="Welcome"/>
				<div className="container text-center">
					<h1>Welcome To Icon Nutrition!</h1>
					<p>Please follow the steps below to get started!</p>
				</div>
				<div className="container block">
					<div className="assessment-tabs-nav welcome-tabs-nav row">

						<div onClick={e => this.setActiveTab(1)} className={`col-xs-12 col-sm-3 ${activeTab === 1 ? "active" : ""}`}>
							<a href="javascript:;">1. Join Slack</a>
						</div>
						<div onClick={e => this.setActiveTab(2)} className={`col-xs-12 col-sm-3 ${activeTab === 2 ? "active" : ""}`}>
							<a href="javascript:;">2. Select Track</a>
						</div>
						<div onClick={e => this.setActiveTab(3)} className={`col-xs-12 col-sm-3 ${activeTab === 3 ? "active" : ""}`}>
							<a href="javascript:;">3. Calculate Targets</a>
						</div>
						<div onClick={e => this.setActiveTab(4)} className={`col-xs-12 col-sm-3 ${activeTab === 4 ? "active" : ""}`}>
							<a href="javascript:;"><span className="icon-arrow-right icon"/> Go To Nutrition</a>
						</div>

					</div>
				</div>
				<div className="container assessment-tabs-content welcome-tabs-content">
					<div className="row">
						<div className="col-xs-12">
							<div className={`tab tab-1 ${activeTab === 1 ? "active" : ""}`}>
								<div className="col-xs-12 col-sm-6 text-right">
									<h3>Join Our Slack Channel</h3>
									<p>Our slack channel is how you can talk daily to your Sports Nutritionist Kary and other Nutrition members!</p>
								</div>
								<div className="col-xs-12 col-sm-6 join-slack-form">
									<iframe src="https://iconinvite.herokuapp.com/" id="slack-signup" scrolling="no"></iframe>
								</div>
							</div>
							<div className={`tab tab-2 ${activeTab === 2 ? "active" : ""}`}>
								<div className="col-xs-12 col-sm-9">
									<h3>Select a Nutrtion Track</h3>
									<p>We provide three nutrition routes for you to follow, click the button below to learn about each and select your track.</p>
									<Link to="/nutrition/change-track" className="btn btn-lg btn-icon btn-icon-blue btn-icon-icon btn-icon-right">Select Track<span className="icon-arrow-right"/></Link>
								</div>
							</div>
							<div className={`tab tab-3 ${activeTab === 3 ? "active" : ""}`}>
								<div className="col-xs-12 col-sm-9">
									<h3>Calculate Your Targets</h3>
									<p>Let’s run the numbers! The calculator will let you know what your numbers are (calories, carbohydrates, protein) based upon your track selection</p>
									<p>Once you calculate your targets press the Back button to come back here.</p>
									<Link to="/nutrition/change-track" className="btn btn-lg btn-icon btn-icon-blue btn-icon-icon btn-icon-right btn-icon-lg">Calculate Targets<span className="icon-arrow-right"/></Link>
								</div>
							</div>
							<div className={`tab tab-4 ${activeTab === 4 ? "active" : ""}`}>
								<div className="col-xs-12 text-center">
									<h2>Time to start learning!</h2>
									<Link to="/nutrition" className="btn btn-lg btn-icon btn-icon-icon btn-icon-right">
										Lets Go
										<span className="icon-arrow-right"/>
									</Link>
								</div>
							</div>
						</div>
					</div>	
				</div>
			</div>
		);
	}
}