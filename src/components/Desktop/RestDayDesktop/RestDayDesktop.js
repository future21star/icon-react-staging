import React, {Component, PropTypes} from 'react';
import './RestDayDesktop.scss';

export default class RestDayDesktop extends Component {
	static propTypes = {
		track: PropTypes.object.isRequired
	};

	getIcon() {
		const {track} = this.props;

		if (track.trackIconClassName === 'icon-track-dynamic') {
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

		else if (track.trackIconClassName === 'icon-track-strength') {
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

		else if (track.trackIconClassName === 'icon-track-lifestyle') {
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

		else if (track.trackIconClassName === 'icon-track-hyper') {
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
		const {track, nextTrack, prevTrack, onSelectTrack} = this.props;

		return (
			<div className="rest-day-desktop-wrapper">
				<div className="rest-day-container">
					<div className="track-icon">{this.getIcon()}</div>
					<div className="track-name">{track.title}</div>
					<div className="track-status">Rest Day</div>

					{/*{nextTrack ?*/}
						{/*<button onClick={e => onSelectTrack(nextTrack)} className="btn btn-default">*/}
							{/*Next Track*/}
							{/*<i className="icon-arrow-next" aria-hidden="true"/>*/}
						{/*</button> : undefined}*/}
					{/*{prevTrack ?*/}
						{/*<button onClick={e => onSelectTrack(prevTrack)} className="btn btn-default">*/}
							{/*Prev Track*/}
							{/*<i className="icon-arrow-prev" aria-hidden="true"/>*/}
						{/*</button> : undefined}*/}

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
		);
	}
}
