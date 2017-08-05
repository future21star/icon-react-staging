import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import {} from "../../redux/modules/assessmentStore";
import {Polar} from 'react-chartjs-2';

@connect(
	state => ({
		answers: state.assessmentStore.answers,
		allTracks: state.allTracksStore.allTracks
	}),
	{}
)

export default class StepResult extends Component {

	constructor(props) {
		super(props);

		this.state = {
			totalScore: 0,
			radarData: [],
			recommendedTrackName: null
		}
	}

	componentDidMount() {
		const {answers} = this.props;

		let recommendedTrackName = false;
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
			recommendedTrackName = 'lifestyle';
		}

		///////////////
		// check hyper
		///////////////
		if (radarData.every((value) => (value >= 8 && value <= 10)) && (totalScore >= 56 && totalScore <= 70)) {
			recommendedTrackName = 'hyper';
		}

		///////////////
		// check dynamic
		///////////////
		if (radarData.every((value) => (value >= 4 && value <= 7)) || (totalScore >= 28 && totalScore <= 55)) {
			recommendedTrackName = 'dynamic';
		}

		///////////////
		// check strength
		///////////////
		if ([1, 6, 7].every(value => (value <= 4)) && [2, 3, 4, 5].every(value => (value >= 7)) && totalScore >= 28) {
			recommendedTrackName = 'strength';
		}


		///////////////
		// radar
		///////////////
		let newRadarData = [
			parseInt(answersAsArray[1]),
			Math.floor((parseInt(answersAsArray[6]) + parseInt(answersAsArray[7])) / 2),
			parseInt(answersAsArray[5]),
			parseInt(answersAsArray[3]),
			parseInt(answersAsArray[2]),
			parseInt(answersAsArray[1])
		];

		if (recommendedTrackName) {
			recommendedTrack = this.props.allTracks.filter(track => {
				return track.name === recommendedTrackName;
			})[0];
		}

		this.setState({
			totalScore: totalScore,
			radarData: newRadarData,
			recommendedTrackName: recommendedTrackName,
			recommendedTrack: recommendedTrack
		});
	}

	render() {
		const data = {
			datasets: [{
				data: this.state.radarData,
				backgroundColor: [
					'rgba(255, 99, 132, 0.6)',
					'rgba(75, 192, 192, 0.6)',
					'rgba(255, 206, 86, 0.6)',
					'rgba(255, 0, 188, 0.6)',
					'rgba(54, 162, 235, 0.6)',
					'rgba(54, 162, 34, 0.6)',
				],
				borderWidth: 0,
				label: 'Categories'
			}],
			labels: [
				'Raw Strength',
				'Olympic Lifting',
				'Stamina',
				'Gymnastics',
				'Cardio',
				'Mobility'
			]
		};

		const {totalScore, radarData, recommendedTrackName, recommendedTrack} = this.state;

		if (!totalScore || radarData.length === 0 || !recommendedTrackName || !recommendedTrack) {
			return (<div>loading...</div>);
		}

		let style = {backgroundImage: 'url(../../' + recommendedTrack.bgImgUrl + ')'};

		return (
			<div className="row">
				<div className="col-xs-12 col-sm-6 col-sm-offset-3">
					<Polar data={data} width={200} height={240} options={{
						scale: {
							ticks: {
								stepSize: 1,
								suggestedMax: 10
							}
						}
					}}/>
				</div>
				<div className="col-xs-12">
					<h3>Track Best Suited For You: {recommendedTrack.name}</h3>
					<div style={style}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid architecto asperiores beatae cumque, doloremque ea error et exercitationem facilis minus nihil omnis porro quos recusandae voluptate. Eum nesciunt nobis suscipit!</div>
				</div>
			</div>
		);
	}
}
