import React, {Component, PropTypes} from 'react';
import './RestDay.scss';

export default class RestDay extends Component {
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
		const {track, nextTrack, prevTrack, selectNextTrack, selectPrevTrack} = this.props;

		return (
			<div className="rest-day-wrapper">
				<div className="rest-day-container">
					<div className="track-icon">{this.getIcon()}</div>
					<h2 className="track-name">{track.title}</h2>
					<h1 className="track-status">Rest Day</h1>
					<div className="rest-day-bg"></div>
					<div className="hidden-sm hidden-xs">
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
