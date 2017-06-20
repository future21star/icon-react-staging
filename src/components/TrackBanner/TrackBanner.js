import React, {Component} from 'react';
import Note from '../Note/Note';
import {Link} from 'react-router';
import './TrackBanner.scss';

export default class TrackBanner extends Component {

	getIcon() {
		const {wod} = this.props;

		if (wod.track.iconUrl === 'icon-track-dynamic') {
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

		else if (wod.track.iconUrl === 'icon-track-strength') {
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

		else if (wod.track.iconUrl === 'icon-track-lifestyle') {
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

		else if (wod.track.iconUrl === 'icon-track-hyper') {
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
		const {nextTrack, prevTrack, onSelectNextTrack, onSelectPrevTrack, wod} = this.props;

		return (
			<div className="track-banner-wrapper">
				<div className={`track-banner ${wod.track.format}`}
						 style={{backgroundImage: 'url(' + wod.track.bgImgUrl + ')',}}>
					<div className="overlay"/>
					<div className="workout-button">
						<Link to={`/workout/${wod.track.name}/${wod.id}`} className="text-white">
							<span className="icon-workout-mode"/>
						</Link>
					</div>
					<div className="mid-content">
						<div className="mid-content-section">
							{this.getIcon()}
							<h1>{wod.track.name}</h1>
						</div>
					</div>
					<div className="title">
						<h3>{wod.track.title}</h3>

						<ul className={`track-banner-list list-inline ${wod.notes ? 'track-banner-list-with-note' : ''}`}>
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
					</div>

					{wod.notes ? (
						<Note
							noteContent={wod.notes}
							classNames="note note-has-margin-bottom"
						/>) : undefined}

					<div className="hidden-xs hidden-sm">
						{nextTrack ? (
							<a href="#" onClick={e => onSelectNextTrack(nextTrack)} className="pull-right next-track">
								Next Track <i className="icon-arrow-next"/>
							</a>) : undefined}

						{prevTrack ? (
							<a href="#" onClick={e => onSelectPrevTrack(prevTrack)} className="pull-left prev-track">
								<span className="mirror-icon"><i className="icon-arrow-next"/></span>
								Prev Track
							</a>) : undefined}
					</div>
				</div>
			</div>
		);
	}
}
