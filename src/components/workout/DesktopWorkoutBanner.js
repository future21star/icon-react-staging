import React, {Component} from 'react';
import Note from "./Note";

export default class DesktopWorkoutBanner extends Component {

	render() {
		const {nextTrack, prevTrack, onSelectNextTrack, onSelectPrevTrack, wod} = this.props;

		let noteContent = wod.track.notes;

		return (
			<div className="workout-banner-wrapper-desktop">
				<div className={`workout-banner-desktop ${wod.track.format}`}
						 style={{backgroundImage: 'url(' + wod.track.bgImgUrl + ')',}}>
					<div className="overlay"/>
					<div className="title-desktop">
						<h1>{wod.track.name}</h1>
						<ul className={`workout-banner-list-desktop list-inline ${noteContent ? 'workout-banner-list-with-note' : ''}`}>
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

						{noteContent ?
							<Note
								noteContent={noteContent}
								classNames="note note-has-margin-bottom"
							/> : undefined}

						{nextTrack ?
							<a href="#" onClick={e => onSelectNextTrack(nextTrack)} className="pull-right next-wod">
								Next Track <i className="icon-arrow-next"/>
							</a> : undefined}
						{prevTrack ?
							<a href="#" onClick={e => onSelectPrevTrack(prevTrack)} className="pull-left prev-wod">
								<span className="mirror-icon"><i className="icon-arrow-next"/></span> Prev Track
							</a> : undefined}
					</div>
				</div>
			</div>
		);
	}
}
