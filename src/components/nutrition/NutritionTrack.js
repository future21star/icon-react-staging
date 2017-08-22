import React, {Component, PropTypes} from 'react';
import {
    Targets
} from '../../components/index';
import nutritionTracks from '../../../api/nutritionTracks.json';

export default class NutritionTrack extends Component {
	static propTypes = {
		track: PropTypes.any.isRequired
	};

	render() {
		const {track} = this.props;

		const trackData = nutritionTracks.nutrition_tracks.filter(item => {
			return item.track_name === track;
		})[0];


		if(!trackData) {
			return <div className="alert alert-danger">Track not found</div>;
		}

		let header = trackData.track_name.replace(/-/g, ' ');

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
					<h2><span className={`icon-track-${trackData.track_name} icon`}/>{header}</h2>
					<p>{trackData.desc}</p>
					<ul className="inline-list">
						<li><a href="#">Goals</a></li>
						<li><a href="#">Expectations</a></li>
					</ul>
					<button className="btn btn-lg btn-icon btn-icon-blue btn-icon-icon btn-icon-right">
						Select Track
						<span className="icon-nav-links"/>
					</button>
				</div>
				<div className="hidden-md hidden-lg hidden-sm hidden-xs">
					<h4>Goals</h4>
					<p className="nutrition-track-goals-desc">{trackData.goals_desc}</p>
					<ul className="list-check nutrition-track-goals">
					{trackData.goals.map((goal, i) => {
				       return <li key={i}>{goal}</li>;
				    })}
					</ul>
				</div>
				<div className="hidden-md hidden-lg hidden-sm hidden-xs">
					<h4>Expectations</h4>
					<ul className="list-check nutrition-track-goals">
					{trackData.expectations.map((expectation, i) => {
				       return <li key={i}>{expectation}</li>;
				    })}
					</ul>
				</div>
				<div className="clearfix" />
			</div>
		);
	}

}