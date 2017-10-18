import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";
import {
	Menubar,
	StepGender,
	StepAge,
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
							{currentStep === 1 && <StepAge/>}
							{currentStep === 2 && <StepBackSquat/>}
							{currentStep === 3 && <Step5k/>}
							{currentStep === 4 && <StepPullingPushing/>}
							{currentStep === 5 && <StepOverheadSquat/>}
							{currentStep === 6 && <StepWallballs/>}
							{currentStep === 7 && <StepSnatch/>}
							{currentStep === 8 && <StepCleanAndJerk/>}
							{currentStep === 9 && <StepHoursInTheGym/>}
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
				{[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => {
					return <li key={i} className={currentStep === i ? "active" : ""}>{i}</li>
				})}
			</ul>
		);
	}
}

