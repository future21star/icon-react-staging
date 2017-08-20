import React, {Component, PropTypes} from 'react';

export default class NutritionTrack extends Component {
	static propTypes = {
		icon: PropTypes.string.isRequired,
		header: PropTypes.string.isRequired,
		goalsDesc: PropTypes.string.isRequired,
		goals: PropTypes.array.isRequired,
		expectations: PropTypes.array.isRequired,
		desc: PropTypes.string.isRequired,
		imageUrl: PropTypes.string
	};

	render() {
		const {icon,header, goalsDesc, goals, expectations, desc, imageUrl} = this.props;

		let image = "";
		if(imageUrl){
			image = require(imageUrl);
		}else{
			image = require("../../../static/feed-default.jpg");
		}
		return(
			<div className="nutriton-track-wrapper">	
				<div className="nutrition-track-img-wrapper col-xs-12 col-sm-6">
					<img src={image} width="100%"/>
				</div>
				<div className="nutrition-track-header col-xs-12 col-sm-6">
					<h2><span className={`${icon} icon`}/>{header}</h2>
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