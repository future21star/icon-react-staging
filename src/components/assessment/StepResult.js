import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import Step from "./Step";
import {} from "../../redux/modules/assessmentStore";

@connect(
	state => ({
		answers: state.assessmentStore.answers
	}),
	{}
)

export default class StepResult extends Component {

	render() {
		const {answers} = this.props;

		let recommendedTrack = false;
		let answersAsArray = Object.values(answers);
		let radarData = answersAsArray.slice(1, 8);
		let totalScore = 0;
		let lifestyleCount = 0;

		///////////////
		// total score
		///////////////
		radarData.map(value => totalScore += parseInt(value));


		///////////////
		// check lifestyle
		///////////////
		radarData.map(value => {
			if (value <= 4) lifestyleCount++;
		});

		if ((lifestyleCount > 4 && totalScore <= 27) || answers[8] === 'yes') {
			recommendedTrack = 'lifestyle';
		}

		///////////////
		// check hyper
		///////////////
		if (radarData.every((value) => (value >= 8 && value <= 10)) && (totalScore >= 56 && totalScore <= 70)) {
			recommendedTrack = 'hyper';
		}

		///////////////
		// check dynamic
		///////////////
		if (radarData.every((value) => (value >= 4 && value <= 7)) || (totalScore >= 28 && totalScore <= 55)) {
			recommendedTrack = 'dynamic';
		}

		///////////////
		// check strength
		///////////////
		if ([1, 6, 7].every(value => (value <= 4)) && [2, 3, 4, 5].every(value => (value >= 7)) && totalScore >= 28) {
			recommendedTrack = 'strength';
		}

		return (
			<h1>
				Total Score: {totalScore}
				<br/>
				Recommended Track: {recommendedTrack}
			</h1>
		);
	}
}
