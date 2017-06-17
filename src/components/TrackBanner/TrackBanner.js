import React, {Component} from 'react';
import Note from '../Note/Note';
import {Link} from 'react-router';
import './TrackBanner.scss';

export default class TrackBanner extends Component {

	getIcon() {
		const {midContent} = this.props;

		if (midContent === 'icon-track-dynamic') {
			return (
				<span className="icon-track-dynamic">
					<span className="path1"/>
					<span className="path2"/>
					<span className="path3"/>
					<span className="path4"/>
					<span className="path5"/>
					<span className="path6"/>
					<span className="path7"/>
					<span className="path8"/>
				</span>
			);
		}

		else if (midContent === 'icon-track-strength') {
			return (
				<span className="icon-track-strength">
					<span className="path1"/>
					<span className="path2"/>
					<span className="path3"/>
					<span className="path4"/>
					<span className="path5"/>
					<span className="path6"/>
					<span className="path7"/>
				</span>);
		}

		else if (midContent === 'icon-track-lifestyle') {
			return (
				<span className="icon-track-lifestyle">
					<span className="path1"/>
					<span className="path2"/>
					<span className="path3"/>
					<span className="path4"/>
					<span className="path5"/>
					<span className="path6"/>
					<span className="path7"/>
				</span>);
		}

		else if (midContent === 'icon-track-hyper') {
			return (
				<span className="icon-track-hyper">
				<span className="path1"/>
				<span className="path2"/>
				<span className="path3"/>
				<span className="path4"/>
				<span className="path5"/>
				<span className="path6"/>
				<span className="path7"/>
				<span className="path8"/>
				<span className="path9"/>
				<span className="path10"/>
			</span>);
		}


		return (
			<span className="fa fa-circle-o"/>
		)
	}

	render() {
		const {trackName, bgImg, midContent, track, nextTrack, prevTrack, selectNextTrack, selectPrevTrack} = this.props;
		let noteContent = track.notes;

		return (
			<div className="track-banner-wrapper">
				<div className="track-banner" style={{backgroundImage: 'url(' + bgImg + ')',}}>
					<div className="overlay"/>
					<div className="workout-button">
						<Link to={`/workout/${track.trackName}/${track.id}`} className="text-white">
							<span className="icon-workout-mode"/>
						</Link>
					</div>
					<div className="mid-content">
						{midContent || trackName ?
							<div className="mid-content-section">
								{this.getIcon()}
								<h1>{trackName}</h1>
							</div> : undefined
						}
					</div>
					<div className={`title ${!midContent ? 'title-padding' : ''}`}>
						<h3>{track.trackName}</h3>

						<ul className={`track-banner-list list-inline ${noteContent ? 'track-banner-list-with-note' : ''}`}>
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
					</div>
					{noteContent ?
						<Note
							noteContent={noteContent}
							classNames="note note-white"
						/> : undefined}

					<div className="hidden-xs hidden-sm">
						{
							nextTrack ?
								<a href="#" onClick={e => selectNextTrack(nextTrack)} className="pull-right next-track">
									Next Track
									<i className="icon-arrow-next" aria-hidden="true"/>
								</a> : undefined
						}

						{
							prevTrack ?
								<a href="#" onClick={e => selectPrevTrack(prevTrack)} className="pull-left prev-track">
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
