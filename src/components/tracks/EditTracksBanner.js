import React, {Component, PropTypes} from 'react';
import {Link} from "react-router";
import {find} from 'lodash';

export default class EditTracksBanner extends Component {

	static propTypes = {
		track: PropTypes.object.isRequired,
		selectedTracks: PropTypes.array,
		singleTrackView: PropTypes.bool,
		hideInfo: PropTypes.bool
	};

	getIcon() {
		const {track} = this.props;
		let trackIconClassName = track.iconUrl;

		if (trackIconClassName === 'icon-track-dynamic') {
			return (
				<span className="icon icon-track-dynamic">
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

		else if (trackIconClassName === 'icon-track-strength') {
			return (
				<span className="icon icon-track-strength">
					<span className="path1"/>
					<span className="path2"/>
					<span className="path3"/>
					<span className="path4"/>
					<span className="path5"/>
					<span className="path6"/>
					<span className="path7"/>
				</span>);
		}

		else if (trackIconClassName === 'icon-track-unify') {
			return (
				<span className="icon icon-track-unify">
					<span className="path1"/>
					<span className="path2"/>
					<span className="path3"/>
					<span className="path4"/>
					<span className="path5"/>
					<span className="path6"/>
					<span className="path7"/>
				</span>);
		}

		else if (trackIconClassName === 'icon-track-hyper') {
			return (
				<span className="icon icon-track-hyper">
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
		const {track, selectedTracks, singleTrackView, hideInfo} = this.props;
		const isSubscribed = find(selectedTracks, selectedTrack => {
			return selectedTrack.trackName === track.name;
		});

		let style = {backgroundImage: 'url(' + track.bgImgUrl + ')'};
		if (singleTrackView) style = {backgroundImage: 'url(../' + track.bgImgUrl + ')'};

		return (
			<div className="edit-tracks-banner-wrapper">
				<div className="edit-tracks-banner" style={style}>
					<div className="overlay-dark"/>
					<div className="title">
						{!singleTrackView ? (
							<div>
								<h1>{track.name}</h1>
								{!hideInfo && (
									<Link to={`/edit-tracks/${track.name}`}>
										<span className="icon-information"/>
									</Link>
								)}
								{this.getIcon()}
							</div>
							): undefined}
					</div>
				</div>
			</div>
		);
	}
}
