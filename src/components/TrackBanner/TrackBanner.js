import React, {Component} from 'react';
import './TrackBanner.scss';
import gymBodyImg from '../../../static/gym-body.jpg';

export default class TrackBanner extends Component {

	render() {
		const {midContent, title, bgImg} = this.props;
		return (
			<div className="track-banner-wrapper">
				<div className="track-banner" style={{backgroundImage: 'url(' + bgImg + ')',}}>
					<div className="overlay"/>
					<div className="mid-content">
						{midContent}
					</div>
					<div className={`title ${!midContent? 'title-padding' : ''}`}>
						<h3>{title}</h3>

						<ul className="track-banner-list list-inline">
							<li>
								<h3>15 MIN.</h3>
								<p>Duration</p>
							</li>
							<li>
								<h3>MODERATE</h3>
								<p>Intensity</p>
							</li>
							<li>
								<h3>SHOULDERS</h3>
								<p>Focus</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}
