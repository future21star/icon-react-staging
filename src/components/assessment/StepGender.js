import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import Step from "./Step";
import {setAnswer} from "../../redux/modules/assessmentStore";

@connect(
	state => ({
		answer: state.assessmentStore.answers[0]
	}),
	{setAnswer}
)

export default class StepGender extends Component {

	answerOptions = [
		{value: 'male', label: 'Male'},
		{value: 'female', label: 'Female'},
	];

	render() {
		const {answer, setAnswer} = this.props;

		return (
			<Step stepTitle="Gender">
				<p>Please select which of the following you are:</p>
				{this.answerOptions.map((item, i) => {
					return (
						<div className="radio" key={i}>
							<label>
								<input
									type="radio"
									name="gender"
									value={item.value}
									checked={answer === item.value}
									onChange={e => setAnswer(e.target.value)}
								/> {item.label}
							</label>
						</div>
					)
				})}
			</Step>
		);
	}
}
