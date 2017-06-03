import React, {Component} from 'react';
import './EditTracksBanner.scss';
import cycleImg from './../../../static/bicycle.png';
import checkImg from './../../../static/checked.png';
export default class EditTracksBanner extends Component {

	render() {
		return (
			<div className="edit-tracks-banner-wrapper">
				<div className="edit-tracks-banner">
					<div className="overlay"></div>
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
