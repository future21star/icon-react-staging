import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Menubar, NoAccess} from '../../components/index';
import {connect} from "react-redux";
import {includes} from 'lodash';
import {Link} from 'react-router';

@connect(
	state => ({
		user: state.authStore.user
	}),
	{}
)

export default class NutritionChangeTrack extends Component {

	constructor(props) {
		super(props);

		this.state = {
			selectedTrack: 'lean'
		}
	}

	selectTrack = (selectedTrack) => {
		this.setState({
			selectedTrack: selectedTrack
		});
	};

	render() {
		const {user} = this.props;

		if(!user) return <div/>;

		const {selectedTrack} = this.state;
		const image = require('../../../static/feed-default.jpg');

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
				<div className="assessment-landing-wrapper bottom-padding">
					<Helmet title="Change Track"/>

					<Menubar 
						title="Change Track"
						className="menu-bar-white"
						backButton={true}
					/>
					<div className="container-fluid">
						<div className="assessment-tabs-nav row">
							
							<div onClick={e => this.selectTrack('lean')} className={`col-xs-12 col-sm-4 col-md-4 ${selectedTrack === 'lean' ? "active" : ""}`}>
								<a href="javascript:;">The Lean Machine</a>
							</div>
							<div onClick={e => this.selectTrack('perfector')} className={`col-xs-12 col-sm-4 col-md-4 ${selectedTrack === 'perfector' ? "active" : ""}`}>
								<a href="javascript:;">The Perfector</a>
							</div>
							<div onClick={e => this.selectTrack('gainer')} className={`col-xs-12 col-sm-4 col-md-4 ${selectedTrack === 'gainer' ? "active" : ""}`}>
								<a href="javascript:;">The Gainer</a>
							</div>

						</div>
					</div>

					<div className="container-fluid assessment-tabs-content">
						<div className="row">
							<div className="col-xs-12 col-md-8 col-md-offset-2">
							{ selectedTrack === 'lean' && (
								<div className="assessment-section-bg">
									<h2>The Lean Machine</h2>
									<img src={image} width="100%"/>
									<div>
										Lean: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
										tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
										quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
										consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
										cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
										proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
										
										<br/>
										<br/>
										<button className="btn btn-primary">Select this track</button>
									</div>

								</div>
							)}
							{ selectedTrack === 'perfector' && (
								<div className="assessment-section-bg">
									<h2>The Perfector</h2>
									<img src={image} width="100%"/>
									<div>
										Perfector: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
										tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
										quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
										consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
										cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
										proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
									</div>
								</div>
							)}
							{ selectedTrack === 'gainer' && (
								<div className="assessment-section-bg">
									<h2>The Gainer</h2>
									<img src={image} width="100%"/>
									<div>
										Gainer: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
										tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
										quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
										consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
										cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
										proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
									</div>
								</div>
							)}
							</div>
						</div>	
					</div>

				</div>
			</ReactCSSTransitionGroup>
		);
	}

}

