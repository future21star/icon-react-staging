import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import Step from "./Step";
import {setAnswer} from "../../redux/modules/assessmentStore";

@connect(
	state => ({
		answer: state.assessmentStore.answers[7]
	}),
	{setAnswer}
)

export default class StepCleanAndJerk extends Component {

	answerOptions = [
		{value: '', label: '-'},
		{value: '1', label: '135 lbs'},
		{value: '2', label: '160 lbs'},
		{value: '3', label: '185 lbs'},
		{value: '4', label: '215 lbs'},
		{value: '5', label: '235 lbs'},
		{value: '6', label: '265 lbs'},
		{value: '7', label: '285 lbs'},
		{value: '8', label: '315 lbs'},
		{value: '9', label: '340 lbs'},
		{value: '10', label: '365 lbs'}
	];

	render() {
		const {answer, setAnswer} = this.props;

		return (
			<Step stepTitle="Clean & Jerk">
				<form>
					<select className="form-control" onChange={e => setAnswer(e.target.value)} value={answer}>
						{this.answerOptions.map((item, i) => {
							return <option value={item.value} key={i}>{item.label}</option>
						})}
					</select>
				</form>
			</Step>
		);
	}
}
