import React, {Component} from 'react';
import './TrackBannerDesktop.scss';

export default class TrackBannerDesktop extends Component {

	render() {
		const {track, bgImg, onSelectTrack, prevTrack, nextTrack} = this.props;

		return (
			<div className="track-banner-wrapper-desktop">
				<div className="track-banner-desktop" style={{backgroundImage: 'url(' + bgImg + ')',}}>
					<div className="overlay"/>
					<div className="title-desktop">
						<h1>{track.format}</h1>

						<ul className="track-banner-list-desktop list-inline">
							<li>
								<h3>{`${track.duration} min` || '--'}</h3>
								<p>Duration</p>
							</li>
							<li>
								<h3>{track.intensity || '--'}</h3>
								<p>Intensity</p>
							</li>
							<li>
								<h3>{track.focus || '--'}</h3>
								<p>Focus</p>
							</li>
						</ul>

						{nextTrack ?
							<a href="#" onClick={e => onSelectTrack(nextTrack)} className="pull-right next-track">
								Next Track
								<i className="icon-arrow-next" aria-hidden="true"/>
							</a> : undefined}
						{prevTrack ?
							<a href="#" onClick={e => onSelectTrack(prevTrack)} className="pull-left">
								Prev Track
								<i className="icon-arrow-prev" aria-hidden="true"/>
							</a> : undefined}
					</div>
				</div>
			</div>
		);
	}
}
