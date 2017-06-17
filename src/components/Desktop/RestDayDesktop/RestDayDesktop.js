import React, {Component, PropTypes} from 'react';
import './RestDayDesktop.scss';

export default class RestDayDesktop extends Component {
	static propTypes = {
		track: PropTypes.object.isRequired,
		prevTrack: PropTypes.string,
		nextTrack: PropTypes.string,
		onSelectNextTrack: PropTypes.func.isRequired,
		onSelectPrevTrack: PropTypes.func.isRequired
	};

	getIcon() {
		const {track} = this.props;

		if (track.iconUrl === 'icon-track-dynamic') {
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

		else if (track.iconUrl === 'icon-track-strength') {
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

		else if (track.iconUrl === 'icon-track-lifestyle') {
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

		else if (track.iconUrl === 'icon-track-hyper') {
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
		const {track, nextTrack, prevTrack, onSelectNextTrack, onSelectPrevTrack} = this.props;

		return (
			<div className="rest-day-desktop-wrapper">
				<div className="rest-day-container">
					<div className="track-icon">{this.getIcon()}</div>
					<div className="track-name">{track.name}</div>
					<div className="track-status">Rest Day</div>
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
		);
	}
}
