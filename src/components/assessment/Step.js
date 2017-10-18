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
					<div className="col-xs-6">
						<button className="btn btn-lg btn-icon btn-icon-blue btn-icon-icon" onClick={goToPrevStep} disabled={currentStep < 1}><span className="icon-arrow-left" />Previous</button>
					</div>
					<div className="col-xs-6 text-right">
						{currentStep < 9 ? (
							<button
								className="btn btn-lg btn-icon btn-icon-blue btn-icon-icon btn-icon-right"
								onClick={goToNextStep}
								disabled={!currentStepAnswer}>
								<span className="icon-arrow-right" />
								Next
							</button>
						) : (
							<Link
								className="btn btn-lg btn-icon btn-icon-blue btn-icon-icon btn-icon-right"
								disabled={!currentStepAnswer}
								to="/assessment/result">
								<span className="icon-nutrition-calculator" />
								Calculate
							</Link>
						)}
					</div>
				</div>
			</div>
		);
	}
}
