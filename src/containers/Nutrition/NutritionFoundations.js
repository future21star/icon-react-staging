import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Menubar, NoAccess, DotList} from '../../components/index';
import {connect} from "react-redux";
import {includes} from 'lodash';
import {Link} from 'react-router';
import strengthBG from '../../../static/strengthBG.jpg';

@connect(
	state => ({
		vaultAccess: state.authStore.user.vaultAccess
	}),
	{}
)

export default class NutritionFoundations extends Component {

	constructor(props) {
		super(props);

		this.state = {
			activeTab: 'overview',
		};
	}

	changeTab = (e, tabName) => {
		e.preventDefault();
		this.setState({
			activeTab: tabName
		});
	};

	render() {
		const {vaultAccess} = this.props;

		let accessToNutrition = includes(vaultAccess, 'nutrition');
		let style = {backgroundImage: 'url(' + strengthBG + ')'};
		let imageUrl = "http://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/lowering_blood_pressure_exercise_slideshow/getty_rf_photo_of_men_lifting_weights_in_gym.jpg";

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
				<div>
					<Helmet title="Nutrition"/>

					<Menubar
						title="Nutrition Foundations"
						leftSideContent={<Link to="nutrition"><span className="icon-arrow-left" style={{fontSize: 16+'px'}}/>
						</Link>}
						className="gradient-turquoise menu-color-white">
					</Menubar>

					<div className="nutrition-foundations-page-content-wrapper bottom-padding">
						<div className="nutrition-banner-wrapper">
							<div className="nutrition-dot-list-container">
								<div className="dotlist-wrapper">
									<ul className="list-inline dot-list">
										<li>
											<span className='dot active'/>
										</li>
										<li>
											<span className='dot'/>
										</li>
										<li>
											<span className='dot'/>
										</li>
									</ul>
								</div>
							</div>
							<div className="nutrition-banner" style={style}>
								<div className="overlay"/>
								<div className="title">
									<h3>The Lean Machine</h3>
									<h5>Sustainable Weight Loss</h5>
									<button className="btn btn-primary btn-pill">Select this track</button>
								</div>
							</div>
						</div>
						<div className="nutrition-tabs">
							<ul className="nav nav-tabs nav-justified">
								<li>
									<a
										href="#"
										onClick={e => this.changeTab(e, 'overview')}
										className={this.state.activeTab === 'overview' ? 'active-black' : ''}
									>
										OVERVIEW
									</a>
								</li>
								<li>
									<a
										href="#"
										onClick={e => this.changeTab(e, 'expectations')}
										className={this.state.activeTab === 'expectations' ? 'active-black' : ''}
									>
										EXPECTATIONS
									</a>
								</li>
								<li>
									<a
										href="#"
										onClick={e => this.changeTab(e, 'goals')}
										className={this.state.activeTab === 'goals' ? 'active-black' : ''}
									>
										GOALS
									</a>
								</li>
							</ul>
							<div className="tab-content">
								<div className={`tab-pane ${this.state.activeTab === 'overview' ? 'active' : ''}`}>
									<div className="nutrition-tab-content">
										<h4>Pursuit of the icon lifestyle</h4>
										<p className="margin-bottom-20">
											Healthy and sustainable weight loss is slow and gradual and is the name of the game here.
										</p>
										<p>
											Anyone who loses 5 ibs in a week has:
										</p>
										<p>
											<span className="red">&#8212;</span> Mostly lost water weight and
										</p>
										<p>
											<span className="red">&#8212;</span> Is likely to gain it all back quickly
										</p>
									</div>
								</div>
								<div className={`tab-pane ${this.state.activeTab === 'expectations' ? 'active' : ''}`}>
									<div className="nutrition-tab-content">
										<h4>Expectations of the icon lifestyle</h4>
										<p className="margin-bottom-20">
											Healthy and sustainable weight loss is slow and gradual and is the name of the game here.
										</p>
										<p>
											Anyone who loses 5 ibs in a week has:
										</p>
										<p>
											<span className="red">&#8212;</span> Mostly lost water weight and
										</p>
										<p>
											<span className="red">&#8212;</span> Is likely to gain it all back quickly
										</p>
									</div>
								</div>
								<div className={`tab-pane ${this.state.activeTab === 'goals' ? 'active' : ''}`}>
									<div className="nutrition-tab-content">
										<h4>Goals of the icon lifestyle</h4>
										<p className="margin-bottom-20">
											Healthy and sustainable weight loss is slow and gradual and is the name of the game here.
										</p>
										<p>
											Anyone who loses 5 ibs in a week has:
										</p>
										<p>
											<span className="red">&#8212;</span> Mostly lost water weight and
										</p>
										<p>
											<span className="red">&#8212;</span> Is likely to gain it all back quickly
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}

