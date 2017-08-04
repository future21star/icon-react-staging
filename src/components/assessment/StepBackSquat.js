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

export default class StepBackSquat extends Component {

	answerOptions = [
		{value: '', label: '-'},
		{value: '1', label: '145 lbs'},
		{value: '2', label: '185 lbs'},
		{value: '3', label: '225 lbs'},
		{value: '4', label: '265 lbs'},
		{value: '5', label: '305 lbs'},
		{value: '6', label: '345 lbs'},
		{value: '7', label: '385 lbs'},
		{value: '8', label: '425 lbs'},
		{value: '9', label: '465 lbs'},
		{value: '10', label: '>500 lbs'}
	];

	render() {
		const {answer, setAnswer} = this.props;

		return (
			<Step stepTitle="Back Squat">
				<p>Please select the weight you got closest to, if you are inbetween please select the lower option.</p>
				<select className="form-control" onChange={e => setAnswer(e.target.value)} value={answer}>
					{this.answerOptions.map((item, i) => {
						return <option value={item.value} key={i}>{item.label}</option>
					})}
				</select>
			</Step>
		);
	}
}
