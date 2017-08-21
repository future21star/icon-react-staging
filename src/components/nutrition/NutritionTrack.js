import React, {Component, PropTypes} from 'react';
import {
    Targets
} from '../../components/index';

export default class NutritionTrack extends Component {
	static propTypes = {
		track: PropTypes.any.isRequired
	};

	render() {
		const {track} = this.props;

		let header = trackName.replace(/-/g, ' ');
		return(
			<div className="nutriton-track-wrapper">	
				<div className="nutrition-track-img-wrapper col-xs-12 col-sm-6" style={{backgroundImage:'url("../../nutrition-tracks/' + trackName + '.jpg")'}}>
					<Targets
						isTransparent={true}
						cal={'99'}
						
					/>
				</div>
				<div className="nutrition-track-header col-xs-12 col-sm-6">
					<h2><span className={`icon-track-${trackName} icon`}/>{header}</h2>
					<p>{desc}</p>
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
					<p className="nutrition-track-goals-desc">{goalsDesc}</p>
					<ul className="list-check nutrition-track-goals">
					{goals.map(function(goal){
				       return <li>{goal}</li>;
				    })}
					</ul>
				</div>
				<div className="hidden-md hidden-lg hidden-sm hidden-xs">
					<h4>Expectations</h4>
					<ul className="list-check nutrition-track-goals">
					{expectations.map(function(expectation){
				       return <li>{expectation}</li>;
				    })}
					</ul>
				</div>
				<div className="clearfix" />
			</div>
		);
	}

}