import React, {Component} from 'react';

export default class MenuBarListView extends Component {

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
		const {leftSideContentDesktop, rightSideContentDesktop, tracks} = this.props;

		return (
			<div className="menu-bar-desktop menu-bar-desktop-red">
				<div className="container-fluid">
					<div className="row">
						<div className="col-sm-3 col-md-3 col-lg-3 menu-bar-left-side-content-desktop">
							{leftSideContentDesktop}
						</div>
						<div className="col-sm-6 col-md-6 col-lg-6 menu-bar-title-desktop">
							<div
								className={`popover top track-popover-wrapper ${this.state.trackPopOverActive ? 'show-popover' : 'hide-popover'}`}>
								<div className="popover-content">
									<div className="list-group">
										{
											tracks.map((track, index) => {

												return (<a key={index} href="#" className="list-group-item text-capitalize" onClick={(e) => {
													this.hidePopOverAndSetDisplayName(e, track.trackName)
												}}>{track.trackName + " Track"}</a>);

											})
										}
									</div>
								</div>
							</div>
							<a href="/" onClick={this.toggleTracks} className="text-capitalize">
								{this.state.selectedTrack + ' Track'}
								<span className="icon icon-arrow-down"/>
							</a>
						</div>
						<div className="col-sm-3 col-md-3 col-lg-3 menu-bar-right-side-content-desktop">
							{rightSideContentDesktop}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
