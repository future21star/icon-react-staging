import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import Step from "./Step";
import {setAnswer} from "../../redux/modules/assessmentStore";

@connect(
	state => ({
		answer: state.assessmentStore.answers[4]
	}),
	{setAnswer}
)

export default class StepOverheadSquat extends Component {

	answerOptions = [
		{value: '', label: '-'},
		{value: '1', label: '>:30 sec'},
		{value: '2', label: ':35 sec'},
		{value: '3', label: ':40 sec'},
		{value: '4', label: ':50 sec'},
		{value: '5', label: ':55 sec'},
		{value: '6', label: ':60 sec'},
		{value: '7', label: ':70 sec'},
		{value: '8', label: ':75 sec'},
		{value: '9', label: ':80 sec'},
		{value: '10', label: ':90 sec plus'}
	];

	render() {
		const {answer, setAnswer} = this.props;

		return (
			<Step stepTitle="Overhead Squat w/ PVC (For Time)">
				<p>Points of Perfomance</p>
				<ul className="text-left">
					<li>Lumbar Curve</li>
					<li>Weight in Heels</li>
					<li>Hip Crease Below Knee</li>
					<li>Knees Tracking Toes</li>
					<li>Bar Over Heel</li>
					<li>Upright Torso</li>
				</ul>

				<form className="form-select">
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
