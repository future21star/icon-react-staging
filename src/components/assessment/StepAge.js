import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import Step from "./Step";
import {setAnswer} from "../../redux/modules/assessmentStore";

@connect(
	state => ({
		answer: state.assessmentStore.answers[1]
	}),
	{setAnswer}
)

export default class StepAge extends Component {

	render() {
		const {answer, setAnswer} = this.props;

		return (
			<Step stepTitle="Age">
				<p>Please enter your age:</p>
				<div className="input-number input-number-effect">
					<input type="number"
					       value={answer}
					       onChange={e => setAnswer(e.target.value)}
					       className="form-control"/>
				</div>
			</Step>
		);
	}
}
