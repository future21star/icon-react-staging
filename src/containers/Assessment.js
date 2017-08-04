import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";
import {
	Menubar,
	StepGender,
	StepBackSquat,
	Step5k,
	StepPullingPushing,
	StepOverheadSquat,
	StepWallballs,
	StepSnatch,
	StepCleanAndJerk,
	StepHoursInTheGym,
	StepResult
} from '../components/index';

@connect(
	state => ({
		currentStep: state.assessmentStore.currentStep
	}),
	{}
)

export default class Assessment extends Component {

	render() {
		const {currentStep} = this.props;
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
				<div className="bottom-padding">
					<Helmet title="Assessment"/>

					<Menubar title="Assessment" className="text-white"/>

					<div className="container">

						<div className="page-header">
							<h2>Calculate Your Track</h2>
						</div>

						{currentStep === 0 && <StepGender/>}
						{currentStep === 1 && <StepBackSquat/>}
						{currentStep === 2 && <Step5k/>}
						{currentStep === 3 && <StepPullingPushing/>}
						{currentStep === 4 && <StepOverheadSquat/>}
						{currentStep === 5 && <StepWallballs/>}
						{currentStep === 6 && <StepSnatch/>}
						{currentStep === 7 && <StepCleanAndJerk/>}
						{currentStep === 8 && <StepHoursInTheGym/>}
						{currentStep === 9 && <StepResult/>}

					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}

