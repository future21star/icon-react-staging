import React, {Component} from 'react';
import './TrackBannerDesktop.scss';

export default class TrackBannerDesktop extends Component {

	render() {
		const {nextTrack, prevTrack, onSelectNextTrack, onSelectPrevTrack, wod} = this.props;

		return (
			<div className="track-banner-wrapper-desktop">
				<div className="track-banner-desktop" style={{backgroundImage: 'url(' + wod.track.bgImgUrl + ')',}}>
					<div className="overlay"/>
					<div className="title-desktop">
						<h1>{wod.track.name}</h1>

						<ul className="track-banner-list-desktop list-inline">
							<li>
								<h3>{`${wod.duration} min` || '--'}</h3>
								<p>Duration</p>
							</li>
							<li>
								<h3>{wod.intensity || '--'}</h3>
								<p>Intensity</p>
							</li>
							<li>
								<h3>{wod.focus || '--'}</h3>
								<p>Focus</p>
							</li>
						</ul>

						{nextTrack ?
							<a href="#" onClick={e => onSelectNextTrack(nextTrack)} className="pull-right next-track">
								Next Track <i className="icon-arrow-next"/>
							</a> : undefined}
						{prevTrack ?
							<a href="#" onClick={e => onSelectPrevTrack(prevTrack)} className="pull-left prev-track">
								<span className="mirror-icon"><i className="icon-arrow-next"/></span> Prev Track
							</a> : undefined}
					</div>
				</div>
			</div>
		);
	}
}
