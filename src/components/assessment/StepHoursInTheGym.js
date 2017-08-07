import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import Step from "./Step";
import {setAnswer} from "../../redux/modules/assessmentStore";

@connect(
	state => ({
		answer: state.assessmentStore.answers[8]
	}),
	{setAnswer}
)

export default class StepHoursInTheGym extends Component {

	answerOptions = [
		{value: 'yes', label: 'Yes'},
		{value: 'no', label: 'No'},
	];

	render() {
		const {answer, setAnswer} = this.props;

		return (
			<Step stepTitle="Hours In The Gym">
				<p>Do you use your fitness primarily for activities outside of the gym and want to spend 5 hours or less per
					week in the gym training for those activities?</p>
				<form className="form-radio">
					{this.answerOptions.map((item, i) => {
						return (
							<div className="radio-inline" key={i}>
								<label>
									<input
										type="radio"
										name="hours"
										value={item.value}
										checked={answer === item.value}
										onChange={e => setAnswer(e.target.value)}
									/> 
									<p className="input-label">{item.label}</p>
								</label>
							</div>
						)
					})}
				</form>

			</Step>
		);
	}
}
