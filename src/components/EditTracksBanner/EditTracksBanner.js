import React, {Component} from 'react';
import './EditTracksBanner.scss';

export default class EditTracksBanner extends Component {

	render() {
		const cycleImg = require('./../../../static/bicycle.png');
		const checkImg = require('./../../../static/checked.png');
		const {bgImg, title, trackIcon} = this.props;
		return (
			<div className="edit-tracks-banner-wrapper">
				<div className="edit-tracks-banner" style={{backgroundImage: 'url(' + bgImg + ')',}}>
					<div className="overlay"/>
					<div className="title">
						{trackIcon}
						<h1>{title}</h1>
						<span className="icon-checkmark"/>
					</div>
				</div>
			</div>
		);
	}
}
