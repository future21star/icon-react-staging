import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {
    Targets
} from '../../components/index';
import nutritionTracks from '../../../api/nutritionTracks.json';
import {updateSelectedNutritionTrack} from '../../redux/modules/authStore';


@connect(
	state => ({
		user: state.authStore.user
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
		const {user, track, updateSelectedNutritionTrack} = this.props;

		if(!user) return <div/>;

		const {nutritionSelectedTrack} = user;

		const trackData = nutritionTracks.nutrition_tracks.filter(item => {
			return item.track_name === track;
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
					<button className="btn btn-lg btn-icon btn-icon-blue btn-icon-icon btn-icon-right" disabled>
						Selected Track <span className="icon-nav-links"/>
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
					<button className="btn btn-default btn-xs pull-right" onClick={e => this.changeContent('main')}>x</button>
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
					<button className="btn btn-default btn-xs pull-right" onClick={e => this.changeContent('main')}>x</button>
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
				<div className="nutrition-track-img-wrapper col-xs-12 col-sm-6" style={{backgroundImage:'url("../../nutrition-tracks/' + trackData.track_name + '.jpg")'}}>
					<Targets
						isTransparent={true}
						calories={'99'}
						carbs={'100'}
						protein={'101'}
					/>
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