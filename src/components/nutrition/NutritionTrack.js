import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {
    Targets
} from '../../components/index';
import nutritionTracks from '../../../api/nutritionTracks.json';
import {updateSelectedNutritionTrack} from '../../redux/modules/authStore';


@connect(
	state => ({
		user: state.authStore.user,
		nutritionCalculatorStore: state.nutritionCalculatorStore
	}),
	{updateSelectedNutritionTrack}
)

export default class NutritionTrack extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			showContent: 'main'
		}
	}

	changeContent = (content) => {
		this.setState({
			showContent: content
		});
	}

	static propTypes = {
		track: PropTypes.any.isRequired
	};

	render() {
		const {user, track, updateSelectedNutritionTrack, nutritionCalculatorStore} = this.props;

		if(!user) return <div/>;

		const {nutritionSelectedTrack} = user;

		const trackData = nutritionTracks.nutrition_tracks.filter(item => {
			return item.track_name === track;
		})[0];

		const targetResults = nutritionCalculatorStore.result;

		const targetResult = targetResults.filter(item => {
			return item.nutritionTrack === track;
		})[0];


		if(!trackData) {
			return <div className="alert alert-danger">Track not found</div>;
		}

		let header = trackData.track_name.replace(/-/g, ' ');

		const mainContent = (
			<div>
				<h2><span className={`icon-track-${trackData.track_name} icon`}/>{header}</h2>
				<p>{trackData.desc}</p>
				<ul className="inline-list">
					<li><a href="javascript:;" onClick={e => this.changeContent('goal')}>Goals</a></li>
					<li><a href="javascript:;" onClick={e => this.changeContent('expectation')}>Expectations</a></li>
				</ul>

				{nutritionSelectedTrack === trackData.track_name ? (
					<button className="btn btn-lg btn-icon btn-icon-icon btn-icon-right" disabled>
						Selected Track <span className="icon-checkmark"/>
					</button>
				) : (
					<button className="btn btn-lg btn-icon btn-icon-blue btn-icon-icon btn-icon-right" onClick={e => updateSelectedNutritionTrack(trackData.track_name)}>
						Select Track <span className="icon-nav-links"/>
					</button>
				)}
			</div>
		);

		const goalContent = (
			<div>
				<h4>
					Goals
					<button className="btn pull-right" onClick={e => this.changeContent('main')}><span className="icon-close icon"/></button>
				</h4>
				<p className="nutrition-track-goals-desc">{trackData.goals_desc}</p>
				<ul className="list-check nutrition-track-goals">
				{trackData.goals.map((goal, i) => {
			       return <li key={i}>{goal}</li>;
			    })}
				</ul>
			</div>
		);

		const expectationContent = (
			<div>
				<h4>
					Expectations
					<button className="btn pull-right" onClick={e => this.changeContent('main')}><span className="icon-close icon"/></button>
				</h4>
				<ul className="list-check nutrition-track-goals">
				{trackData.expectations.map((expectation, i) => {
			       return <li key={i}>{expectation}</li>;
			    })}
				</ul>
			</div>
		);

		return(
			<div className="nutriton-track-wrapper">	
				<div className="col-xs-12 col-sm-6">
					<div className="nutrition-track-img-wrapper" style={{backgroundImage:'url("../../nutrition-tracks/' + trackData.track_name + '.jpg")'}}>
					{targetResult ? (
						<Targets
							isTransparent={true}
							calories={targetResult.nutritionCalories}
							carbs={targetResult.nutritionCarbs}
							protein={targetResult.nutritionProtein}
						/>) : (
							<Targets
							isTransparent={true}
						/>
					)}
					</div>
				</div>
				<div className="nutrition-track-header col-xs-12 col-sm-6">
					{this.state.showContent === 'main' && mainContent}
					{this.state.showContent === 'goal' && goalContent}
					{this.state.showContent === 'expectation' && expectationContent}
				</div>
				<div className="clearfix" />
			</div>
		);
	}

}