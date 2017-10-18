import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import Step from "./Step";
import {setAnswer} from "../../redux/modules/assessmentStore";

@connect(
	state => ({
		gender: state.assessmentStore.answers[0],
		answer: state.assessmentStore.answers[3]
	}),
	{setAnswer}
)

export default class Step5k extends Component {

	answerOptions = {
		male: [
			{value: '', label: '-'},
			{value: '1', label: '35:00 min'},
			{value: '2', label: '33:00 min'},
			{value: '3', label: '31:00 min'},
			{value: '4', label: '29:00 min'},
			{value: '5', label: '27:00 min'},
			{value: '6', label: '24:00 min'},
			{value: '7', label: '23:00 min'},
			{value: '8', label: '22:00 min'},
			{value: '9', label: '20:00 min'},
			{value: '10', label: '18:00 min or less'}
		],
		female: [
			{value: '', label: '-'},
			{value: '1', label: '38:00 min'},
			{value: '2', label: '36:00 min'},
			{value: '3', label: '34:00 min'},
			{value: '4', label: '32:00 min'},
			{value: '5', label: '30:00 min'},
			{value: '6', label: '28:00 min'},
			{value: '7', label: '26:00 min'},
			{value: '8', label: '24:00 min'},
			{value: '9', label: '22:00 min'},
			{value: '10', label: '19:30 min or less'}
		]
	};

	render() {
		const {answer, gender, setAnswer} = this.props;

		return (
			<Step stepTitle="5k">
				<p>Please select the time you were closest to, if you are inbetween please select the lower option.</p>
				<form>
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
