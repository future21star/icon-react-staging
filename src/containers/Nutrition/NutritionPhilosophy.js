import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";
import {includes} from 'lodash';
import {Link} from 'react-router';

import {
	Menubar,
	Targets,
	NutritionNav,
	NutritionBanner,
	JoinSlack,
	SelectNutritionTrack
} from '../../components/index';

import {isLoaded as isPhilosophyLoaded, load as loadNutritionPhilosophy} from "../../redux/modules/nutritionPhilosophyStore";
import {asyncConnect} from 'redux-async-connect';

@asyncConnect([{
	promise: ({store: {dispatch, getState}}) => {
		const promises = [];

		if (!isPhilosophyLoaded(getState())) {
			promises.push(dispatch(loadNutritionPhilosophy()));
		}

		return Promise.all(promises);
	}
}])

@connect(
	state => ({
		user: state.authStore.user,
		philosophy: state.nutritionPhilosophyStore.philosophy
	}),
	{}
)

export default class NutritionPhilosophy extends Component {

	createMarkup = (html) => {
		return {__html: html};
	};


	render() {
		const {user, philosophy} = this.props;

		if(!user || !philosophy) {
			return <div/>;
		}

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
					<Helmet title={philosophy.title.rendered}/>
					<Menubar
						title={philosophy.title.rendered}
						className="menu-bar-grey"
						backButton={true}
					/>

					<div className="container bottom-padding">
						<div dangerouslySetInnerHTML={this.createMarkup(philosophy.content.rendered)}/>
					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}
