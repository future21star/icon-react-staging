import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import {goToPrevStep, goToNextStep} from "../../redux/modules/assessmentStore";

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
			<div className="panel panel-primary">
				<div className="panel-heading">
					<h3 className="panel-title">
						{(currentStep > 0)
							? <span>Step {currentStep} - {stepTitle}</span>
							: <span>{stepTitle}</span>
						}
					</h3>
				</div>
				<div className="panel-body">
					{children}
				</div>
				<div className="panel-footer clearfix">
					<button className="btn btn-primary" onClick={goToPrevStep} disabled={currentStep < 1}>&lt; Previous</button>
					{currentStep < 8 ? (
						<button
							className="btn btn-primary pull-right"
							onClick={goToNextStep}
							disabled={!currentStepAnswer}>
							Next &gt;
						</button>
					) : (
						<button
							className="btn btn-primary pull-right"
							onClick={goToNextStep}
							disabled={!currentStepAnswer}>
							Calculate</button>
					)}

				</div>
			</div>
		);
	}
}
