import React, {Component} from 'react';
import Note from './Note';
import {Link} from 'react-router';

export default class WorkoutBanner extends Component {

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
		const {nextTrack, prevTrack, onSelectNextTrack, onSelectPrevTrack, wod, isWorkoutMode} = this.props;

		let bannerBg = (!isWorkoutMode ? wod.track.bgImgUrl : '');

		return (
			<div className="workout-banner-wrapper">
				<div className={`workout-banner ${wod.track.format} workout-banner-${wod.track.name}`} style={{backgroundImage: 'url(' + bannerBg + ')'}}>
					<div className="overlay"/>
					<div className="workout-button">
						<Link to={`/workout/${wod.track.name}/${wod.id}/comments`} className="text-white">
							<span className="icon-comment"/>
							<div className="comment-count">{wod.commentsCount}</div>
						</Link>
						<Link to={`/workout/${wod.track.name}/${wod.id}`} className="text-white">
							<span className="icon-workout-mode"/>
						</Link>
					</div>
					<div className="mid-content">
						<div className="mid-content-section">
							<h2>{wod.track.name}</h2>
							{!isWorkoutMode && this.getIcon()}
							<h3>{wod.title}</h3>
						</div>
						<ul className={`workout-banner-list list-inline ${wod.notes ? 'workout-banner-list-with-note' : ''}`}>
							<li>
								<h4>{`${wod.duration} min` || '--'}</h4>
								<p>Duration</p>
							</li>
							<li>
								<h4>{wod.intensity || '--'}</h4>
								<p>Intensity</p>
							</li>
							<li>
								<h4>{wod.focus || '--'}</h4>
								<p>Focus</p>
							</li>
						</ul>
						{wod.notes ? (
							<Note
								noteContent={wod.notes}
								classNames="note note-has-margin-bottom"
							/>) : undefined}
					</div>

					<div className="hidden-xs hidden-sm">
						{nextTrack ? (
							<a href="#" onClick={e => onSelectNextTrack(nextTrack)} className="pull-right next-wod">
								Next Track <i className="icon-arrow-next"/>
							</a>) : undefined}

						{prevTrack ? (
							<a href="#" onClick={e => onSelectPrevTrack(prevTrack)} className="pull-left prev-wod">
								<span className="mirror-icon"><i className="icon-arrow-next"/></span>
								Prev Track
							</a>) : undefined}
					</div>
				</div>
			</div>
		);
	}
}
