import React, {Component} from 'react';
import './EditTracksBanner.scss';

export default class EditTracksBanner extends Component {

	render() {
		const cycleImg = require('./../../../static/bicycle.png');
		const checkImg = require('./../../../static/checked.png');

		return (
			<div className="edit-tracks-banner-wrapper">
				<div className="edit-tracks-banner">
					<div className="overlay"/>
					<div className="title">
						<img src={cycleImg} alt="cycle" className="img-responsive banner-img"/>
						<h1>Lifestyle</h1>
						<img src={checkImg} alt="check" className="banner-check-img"/>
					</div>
				</div>
			</div>
		);
	}
}
