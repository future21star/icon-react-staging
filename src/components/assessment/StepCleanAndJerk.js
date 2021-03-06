import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import Step from "./Step";
import {setAnswer} from "../../redux/modules/assessmentStore";

@connect(
	state => ({
		gender: state.assessmentStore.answers[0],
		answer: state.assessmentStore.answers[8]
	}),
	{setAnswer}
)

export default class StepCleanAndJerk extends Component {

	answerOptions = {
		male: [
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
		],
		female: [
			{value: '', label: '-'},
			{value: '1', label: '95 lbs'},
			{value: '2', label: '110 lbs'},
			{value: '3', label: '125 lbs'},
			{value: '4', label: '145 lbs'},
			{value: '5', label: '160 lbs'},
			{value: '6', label: '175 lbs'},
			{value: '7', label: '190 lbs'},
			{value: '8', label: '210 lbs'},
			{value: '9', label: '225 lbs'},
			{value: '10', label: '245 lbs'}
		]
	};

	render() {
		const {answer, gender, setAnswer} = this.props;

		return (
			<Step stepTitle="Clean & Jerk">
				<form className="form-select">
					<select className="form-control" onChange={e => setAnswer(e.target.value)} value={answer}>
						{this.answerOptions[gender].map((item, i) => {
							return <option value={item.value} key={i}>{item.label}</option>
						})}
					</select>
				</form>
			</Step>
		);
	}
}
