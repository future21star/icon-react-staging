import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import Step from "./Step";
import {setAnswer} from "../../redux/modules/assessmentStore";

@connect(
	state => ({
		answer: state.assessmentStore.answers[2]
	}),
	{setAnswer}
)

export default class Step5k extends Component {

	answerOptions = [
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
	];

	render() {
		const {answer, setAnswer} = this.props;

		return (
			<Step stepTitle="5k">
				<p>Please select the time you were closest to, if you are inbetween please select the lower option.</p>
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
