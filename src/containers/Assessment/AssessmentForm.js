import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";
import CheckAccessLevel from '../HOC/CheckAccessLevel'
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
	StepHoursInTheGym
} from '../../components/index';

@connect(
	state => ({
		currentStep: state.assessmentStore.currentStep
	}),
	{}
)

@CheckAccessLevel('assessment')

export default class AssessmentForm extends Component {

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
				<div className="assessment-form-container bottom-padding">
					<Helmet title="Assessment - Calculate"/>

					<Menubar
						title="Icon Assessment"
						backButton={true}/>
					<div className="container container-small">
						<h1 className="assessment-form-title">Calculate Your Track</h1>
						<div className="assessment-form-wrapper">
							{this.renderSteps()}

							{currentStep === 0 && <StepGender/>}
							{currentStep === 1 && <StepBackSquat/>}
							{currentStep === 2 && <Step5k/>}
							{currentStep === 3 && <StepPullingPushing/>}
							{currentStep === 4 && <StepOverheadSquat/>}
							{currentStep === 5 && <StepWallballs/>}
							{currentStep === 6 && <StepSnatch/>}
							{currentStep === 7 && <StepCleanAndJerk/>}
							{currentStep === 8 && <StepHoursInTheGym/>}
						</div>
					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}

	renderSteps() {
		const {currentStep} = this.props;

		return (
			<ul className="assessment-steps-list inline-list">
				{[1, 2, 3, 4, 5, 6, 7, 8].map(i => {
					return <li key={i} className={currentStep === i ? "active" : ""}>{i}</li>
				})}
			</ul>
		);
	}
}

