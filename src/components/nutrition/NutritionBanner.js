import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import strengthBG from '../../../static/strengthBG.jpg';
import {connect} from "react-redux";
import nutritionTracks from '../../../api/nutritionTracks.json';

@connect(
	state => ({
		user: state.authStore.user
	}),
	{}
)

export default class NutritionBanner extends Component {
	static propTypes = {
		isLanding: PropTypes.bool
	};

	render() {
		const {isLanding, user} = this.props;

		if(!user) return <div/>;

		const {nutritionSelectedTrack} = user;

		const trackData = nutritionTracks.nutrition_tracks.filter(item => {
			return item.track_name === nutritionSelectedTrack;
		})[0];

		let header = "No Track Selected";
		if(trackData) {
			header = trackData.track_name.replace(/-/g, ' ');
		}

		let style = {backgroundImage: 'url(' + strengthBG + ')'};
		let classes= isLanding ? 'nutrition-banner-wrapper col-xs-12 full-height-menu-header is-landing' : 'nutrition-banner-wrapper col-xs-12 col-sm-4';

		return (
			<div className={classes} style={style}>
				<div className="overlay"/>
				<div className="nutrition-banner-title text-center">
					<h2>{header}</h2>
					{trackData && <p>Goal: {trackData.goals_desc}</p>}
					<Link to="/nutrition/change-track" className="block btn btn-lg btn-icon btn-icon-outline">Change Track</Link>
				</div>
				{!isLanding && (
					<div className="nutrition-banner-content">
					</div>
				)}
				
			</div>
		);
	}
}


