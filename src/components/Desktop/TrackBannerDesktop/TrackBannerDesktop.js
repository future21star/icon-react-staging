import React, {Component} from 'react';
import './TrackBannerDesktop.scss';
import Note from "../../Note/Note";

export default class TrackBannerDesktop extends Component {

	render() {
		const {track, bgImg, onSelectTrack, prevTrack, nextTrack} = this.props;
		let noteContent = track.notes;

		return (
			<div className="track-banner-wrapper-desktop">
				<div className={`track-banner-desktop ${track.format}`} style={{backgroundImage: 'url(' + bgImg + ')',}}>
					<div className="overlay"/>
					<div className="title-desktop">
						<h1>{track.title}</h1>

						<ul className={`track-banner-list-desktop list-inline ${noteContent ? 'track-banner-list-with-note' : ''}`}>
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

						{noteContent ?
							<Note
								noteContent={noteContent}
								classNames="note note-white"
							/> : undefined}

						{
							nextTrack ?
								<a href="#" onClick={e => onSelectTrack(nextTrack)} className="pull-right next-track">
									Next Track
									<i className="icon-arrow-next" aria-hidden="true"/>
								</a> : undefined
						}
						{
							prevTrack ?
								<a href="#" onClick={e => onSelectTrack(prevTrack)} className="pull-left prev-track">
									<span className="mirror-icon"><i className="icon-arrow-next" aria-hidden="true"/></span>
									Prev Track
								</a> : undefined
						}
					</div>
				</div>
			</div>
		);
	}
}
