import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";
import {Menubar} from '../../components/index';
import {Polar} from 'react-chartjs-2';

@connect(
	state => ({
		answers: state.assessmentStore.answers,
		allTracks: state.allTracksStore.allTracks
	}),
	{}
)

export default class AssessmentResult extends Component {

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
					'rgba(255, 99, 132, 0.8)',
					'rgba(75, 192, 192, 0.8)',
					'rgba(255, 206, 86, 0.8)',
					'rgba(255, 0, 188, 0.8)',
					'rgba(54, 162, 235, 0.8)',
					'rgba(54, 162, 34, 0.8)',
				],
				fillColor: 'red',
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
			<ReactCSSTransitionGroup
				transitionName="react-anime"
				transitionAppear={true}
				transitionAppearTimeout={5000}
				transitionEnter={true}
				transitionEnterTimeout={500}
				transitionLeave={true}
				transitionLeaveTimeout={500}
			>
				<Helmet title="Icon Assessment Result"/>

				<div className="assessment-result-wrapper" style={style}>
					<div className="assessment-result">
						<div className="container">
							<div className="row">
								<div className="col-xs-12 col-sm-6 col-sm-offset-3">
									<Polar data={data} width={200} height={240} options={{
										legend: {
											display: true,
											labels: {
												fontColor: '#fff',
												fontSize: 16
											}
										},
										scale: {
											ticks: {
												stepSize: 1,
												suggestedMax: 10,
											},
											gridLines: {
												color: '#fff'
											}
										}
									}}/>
								</div>
								<div className="col-xs-12">
									<h1 className="recommended-track">
										Track Best Suited For You: <br/>
										<div className="recommended-track-name">{recommendedTrack.name}</div>
									</h1>
									<div className="recommended-track-description">
										Sessions last no more than 1 hour so you can put your increased fitness to use outside the confines
										of the gym. Icon ambassadors that are professionals in other sports or adventure seekers need more
										time outside of the gym.
										Warm Up, Workout, Goals for each Session, and Cool Down/Accessory work are always included. The
										Lifestyle Track opens doors to better experiences with improved levels of general physical
										preparedness
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}

