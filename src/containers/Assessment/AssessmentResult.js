import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";
import {
	Menubar,
	ProblemHouston
} from '../../components/index';
import {Polar} from 'react-chartjs-2';
import {Link} from "react-router";
import {includes} from 'lodash';
import assessmentResults from '../../../api/assessmentResults.json';
import {saveAssessmentResult} from "../../redux/modules/assessmentStore";

@connect(
	state => ({
		answers: state.assessmentStore.answers,
		allTracks: state.allTracksStore.allTracks,
		user: state.authStore.user
	}),
	{saveAssessmentResult}
)


export default class AssessmentResult extends Component {

	constructor(props) {
		super(props);

		this.state = {
			totalScore: 0,
			radarData: [],
			recommendedTrackName: null,
			addStrength: false
		}
	}

	componentDidMount() {
		const {answers} = this.props;

		let recommendedTrackName = false;
		let recommendedTrack = false;
		let trackShown = false;
		let addStrength = false;
		let answersAsArray = Object.values(answers);
		let radarData = answersAsArray.slice(1, 8);
		let totalScore = 0;
		let unifyCount = 0;

		///////////////
		// total score
		///////////////
		radarData.map(value => totalScore += parseInt(value));

		///////////////
		// check unify
		///////////////
		radarData.map(value => {
			if (value <= 4) unifyCount++;
		});

		if ((unifyCount > 4 || totalScore <= 27) || answers[8] === 'yes') {
			recommendedTrackName = 'unify';
			trackShown = true;
		}

		///////////////
		// check dynamic
		///////////////
		if (!trackShown && (radarData.every((value) => (value >= 4 && value <= 7)) || totalScore >= 28 && totalScore <= 56)) {
			recommendedTrackName = 'dynamic';
			trackShown = true;
		}

		///////////////
		// check hyper
		///////////////
		if ( !trackShown && radarData.every((value) => (value >= 7)) && totalScore >= 56) {
			recommendedTrackName = 'hyper';
			trackShown = true;
		}

		///////////////
		// check strength
		///////////////
		if (radarData[3] <= 4 && radarData[5] <= 4 && radarData[6]  <= 4 && radarData[0] >= 7 && radarData[1] >= 7 && radarData[2] >= 7 && radarData[4] >= 7 && totalScore >= 28) {
			addStrength = true;
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
			recommendedTrack: recommendedTrack,
			addStrength: addStrength
		});

		this.props.saveAssessmentResult(answers, totalScore, recommendedTrackName);
	}

	createMarkup = (html) => {
		return {__html: html};
	};

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

		const {totalScore, radarData, recommendedTrackName, recommendedTrack, addStrength} = this.state;

		if (!totalScore || radarData.length === 0 || !recommendedTrackName || !recommendedTrack) {
			return (<ProblemHouston/>);
		}

		let trackDetails = assessmentResults.assessment_results.filter((result) => {
			return result.name === recommendedTrackName;
		})[0];

		const {user} = this.props;
		let style = {backgroundImage: 'url(../../' + recommendedTrack.bgImgUrl + ')'};
		let actionContent = null;

		if(user) {
			const {subscription, vaultAccess} = user;
			let hasAccessOfProgramming = false;
			if (includes(vaultAccess, 'programming-all')) hasAccessOfProgramming = true;
			else if (includes(vaultAccess, 'programming-unify')) hasAccessOfProgramming = true;
			else if (includes(vaultAccess, 'programming-masters')) hasAccessOfProgramming = true;

			actionContent = (
					<div className="btn-wrap">
						{(parseInt(subscription.subscription_id) === 1 || parseInt(subscription.subscription_id) === 11) && (
								<a href="https://iconathlete.com/register/upgrade" target="_blank"
								   className="btn btn-lg btn-icon btn-icon-icon">
									<span className="icon-update-sub"/>Get Access
								</a>
						)}

						{hasAccessOfProgramming && (
								<Link to="/edit-tracks" className="btn btn-lg btn-icon btn-icon-icon"><span
										className="icon-nav-links"/>
									Add Track
								</Link>
						)}
					</div>
			);
		} else {
			actionContent = (
					<div className="btn-wrap">
						<a href="https://iconathlete.com/register" target="_blank" className="btn btn-lg btn-icon btn-icon-icon">
							<span className="icon-update-sub"/> Join Now
						</a>
					</div>
			);
		}

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
				<Helmet title="Assessment - Result"/>

				<Menubar
					title="Assessment - Result"
					className="menu-color-white menu-bar-transparent"
					backButton={true}
				/>

				<div className="container-fluid assessment-result-wrapper menu-head-buffer full-height-header" style={style}>
					<div className="overlay-gradient"/>
					<div className="row">
						<div className="col-xs-12 col-sm-6">
							<div className="chart-wrapper">
								<Polar data={data} width={300} height={300} options={{
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
						</div>
						<div className="col-xs-12 col-sm-6">
							<h1 className="title title-desc">Track Best Suited For You:</h1>
							<h1 className="title title-track-name">{recommendedTrack.name}</h1>
								{addStrength && (
									<h1 className="title track-strength">
										<span className="icon icon-nav-links"/>
										STRENGTH
									</h1>
								)}
							<div className="description" dangerouslySetInnerHTML={this.createMarkup(trackDetails.details || '')}/>
							{actionContent}
						</div>
					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}