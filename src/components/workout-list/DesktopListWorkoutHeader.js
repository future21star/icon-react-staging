import React, {Component} from 'react';

export default class DesktopListWorkoutHeader extends Component{

	constructor(props) {
		super(props);

		let selectedTrack = null;
		if (this.props.tracks[0]) {
			selectedTrack = this.props.tracks[0].trackName;
		}

		this.state = {
			trackPopOverActive: false,
			selectedTrack: (selectedTrack) ? selectedTrack.charAt(0).toUpperCase() + selectedTrack.slice(1) : null
		}
	}

	toggleTracks = (e) => {
		e.preventDefault();
		this.setState({
			trackPopOverActive: !this.state.trackPopOverActive
		});
	};

	hidePopOverAndSetDisplayName = (event, track) => {
		event.preventDefault();
		this.setState({
			trackPopOverActive: false,
			selectedTrack: track.charAt(0).toUpperCase() + track.slice(1)
		}, () => {
			this.props.onSelectTrack(track);
		});
	};

	render() {
		const {tracks} = this.props;

		return(
			<div className="page-list-workout-header">
				<a href="/" onClick={this.toggleTracks} className="track-popover-title">
					<p>
					{this.state.selectedTrack}
					<span className="icon icon-arrow-down"/>
					</p>
				</a>

				<div
					className={`popover top track-popover-wrapper ${this.state.trackPopOverActive ? 'show-popover' : 'hide-popover'}`}>
					<div className="popover-content">
						<div className="list-group">
							{
								tracks.map((track, index) => {

									return (<a key={index} href="#" className="list-group-item" onClick={(e) => {
										this.hidePopOverAndSetDisplayName(e, track.trackName)
									}}>{track.trackName}</a>);

								})
							}
						</div>
					</div>
				</div>
			</div>
		);
	}
}