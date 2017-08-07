import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import Step from "./Step";
import {setAnswer} from "../../redux/modules/assessmentStore";

@connect(
	state => ({
		gender: state.assessmentStore.answers[0],
		answer: state.assessmentStore.answers[6]
	}),
	{setAnswer}
)

export default class StepSnatch extends Component {


	answerOptions = {
		male: [
			{value: '', label: '-'},
			{value: '1', label: '95 lbs'},
			{value: '2', label: '115 lbs'},
			{value: '3', label: '140 lbs'},
			{value: '4', label: '165 lbs'},
			{value: '5', label: '185 lbs'},
			{value: '6', label: '210 lbs'},
			{value: '7', label: '235 lbs'},
			{value: '8', label: '255 lbs'},
			{value: '9', label: '280 lbs'},
			{value: '10', label: '300 lbs'}
		],
		female: [
			{value: '', label: '-'},
			{value: '1', label: '65 lbs'},
			{value: '2', label: '80 lbs'},
			{value: '3', label: '95 lbs'},
			{value: '4', label: '110 lbs'},
			{value: '5', label: '125 lbs'},
			{value: '6', label: '140 lbs'},
			{value: '7', label: '155 lbs'},
			{value: '8', label: '170 lbs'},
			{value: '9', label: '185 lbs'},
			{value: '10', label: '200 lbs'}
		]
	};

	render() {
		const {answer, gender, setAnswer} = this.props;

		return (
			<Step stepTitle="Snatch">
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
