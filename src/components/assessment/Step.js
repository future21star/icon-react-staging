import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import {goToPrevStep, goToNextStep} from "../../redux/modules/assessmentStore";
import {Link} from "react-router";

@connect(
	state => ({
		currentStep: state.assessmentStore.currentStep,
		answers: state.assessmentStore.answers
	}),
	{goToPrevStep, goToNextStep}
)

export default class Step extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {stepTitle, children, currentStep, answers, goToPrevStep, goToNextStep} = this.props;
		const currentStepAnswer = answers[currentStep];

		return (
			<div className="step-wrapper">
				<div className="step-title">{stepTitle}</div>
				<div className="step-content">{children}</div>
				<div className="step-buttons">
					<button className="btn btn-danger" onClick={goToPrevStep} disabled={currentStep < 1}>Previous</button>
					{currentStep < 8 ? (
						<button
							className="btn btn-danger pull-right"
							onClick={goToNextStep}
							disabled={!currentStepAnswer}>
							Next
						</button>
					) : (
						<button
							className="btn btn-danger pull-right"
							onClick={goToNextStep}
							disabled={!currentStepAnswer}>
							Calculate
						</button>
					)}
				</div>
				<Link to="/assessment" className="step-close-button">
					<span className="icon icon-close"/>
				</Link>
			</div>
		);
	}
}
