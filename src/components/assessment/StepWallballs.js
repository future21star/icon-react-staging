import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import Step from "./Step";
import {setAnswer} from "../../redux/modules/assessmentStore";

@connect(
	state => ({
		answer: state.assessmentStore.answers[6]
	}),
	{setAnswer}
)

export default class StepWallballs extends Component {

	answerOptions = [
		{value: '', label: '-'},
		{value: '1', label: '15'},
		{value: '2', label: '20'},
		{value: '3', label: '30'},
		{value: '4', label: '40'},
		{value: '5', label: '50'},
		{value: '6', label: '60'},
		{value: '7', label: '70'},
		{value: '8', label: '80'},
		{value: '9', label: '90'},
		{value: '10', label: '100'}
	];

	render() {
		const {answer, setAnswer} = this.props;

		return (
			<Step stepTitle="Wallballs (20/14) (consecutive reps)">
				<p>Points of Perfomance</p>

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
