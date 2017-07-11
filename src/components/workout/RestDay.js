import React, {Component, PropTypes} from 'react';

export default class RestDay extends Component {
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
			<div className="rest-day-wrapper">
				<div className="rest-day-container">
					<div className="track-icon">{this.getIcon()}</div>
					<h2 className="track-name">{track.name}</h2>
					<h1 className="track-status">Rest<br />Day</h1>
					<div className="hidden-sm hidden-xs">
						{nextTrack ?
							<a href="javascript:;" onClick={e => onSelectNextTrack(nextTrack)} className="pull-right next-wod">
								Next Track <i className="icon-arrow-next"/>
							</a> : undefined}

						{prevTrack ?
							<a href="javascript:;" onClick={e => onSelectPrevTrack(prevTrack)} className="pull-left prev-wod">
								<span className="mirror-icon"><i className="icon-arrow-next"/></span>
								Prev Track
							</a> : undefined}
					</div>
				</div>

			</div>
		);
	}
}
