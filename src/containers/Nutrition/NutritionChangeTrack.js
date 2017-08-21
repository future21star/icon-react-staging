import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
	Menubar, 
	NoAccess,
	NutritionTrack 
} from '../../components/index';
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
						className="menu-bar-red"
						backButton={true}
					/>
					<div className="container-fluid">
						<div className="assessment-tabs-nav row">
							
							<div onClick={e => this.selectTrack('lean-machine')} className={`col-xs-12 col-sm-4 col-md-4 ${selectedTrack === 'lean' ? "active" : ""}`}>
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

					<div className="container assessment-tabs-content nutrition-track-tabs-content">
						<div className="row">
							<div className="col-xs-12">
								<NutritionTrack 
									track={selectedTrack}
								/>
							</div>
						</div>	
					</div>

				</div>
			</ReactCSSTransitionGroup>
		);
	}

}

