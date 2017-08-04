import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import Step from "./Step";
import {setAnswer} from "../../redux/modules/assessmentStore";

@connect(
	state => ({
		answer: state.assessmentStore.answers[3]
	}),
	{setAnswer}
)

export default class StepPullingPushing extends Component {

	answerOptions = [
		{
			value: '1',
			label: 'Ten consecutive ring rows at a forty five degree angle twenty second hold with knees on a twenty inch box.'
		},
		{value: '2', label: 'One strict pull-up and a twenty second handstand hold against the wall'},
		{value: '3', label: 'Ten chest-to-bar pull-ups performed in aconsecutive set and one strict handstand push-up.'},
		{
			value: '4',
			label: 'One muscle-up and five handstand push-ups performed in a consecutive set (kipping permitted for each).'
		},
		{
			value: '5',
			label: 'Four muscle-ups performed in a consecutive set and fifteen handstand push-ups performed in a consecutive set.'
		},
		{
			value: '6',
			label: 'Seven muscle-ups performed in a consecutive set and twenty five handstand push-ups performed in a consecutive set.'
		},
		{
			value: '7',
			label: 'Twelve muscle-ups performed in a consecutive set and thirty handstand push-ups performed in a consecutive set.'
		},
		{
			value: '8',
			label: 'Twenty muscle-ups performed in a consecutive set and forty handstand push-ups performed in a consecutive set.'
		},
		{
			value: '9',
			label: 'Twenty five muscle-ups performed in a consecutive set and forty five handstand push-ups performed in a consecutive set.'
		},
		{
			value: '10',
			label: 'Thirty muscle-ups performed in a consecutive set and fifty handstand push-ups performed in a consecutive set.'
		}
	];

	render() {
		const {answer, setAnswer} = this.props;

		return (
			<Step stepTitle="Pulling/Pushing">
				<p>Please select the last option you were able to complete</p>

				{this.answerOptions.map((item, i) => {
					return (
						<div className="radio" key={i}>
							<label>
								<input
									type="radio"
									name="push-pull"
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
