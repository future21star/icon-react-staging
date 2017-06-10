import React, {Component} from 'react';
import {Link} from 'react-router';
import './MenuBarDesktop.scss';

export default class MenuBarRedDesktop extends Component {

	constructor(props) {
		super(props);

		this.state = {
			trackPopOverActive: false,
			displayName: 'Dynamic'
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
			displayName: track
		});
	}

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
							<div className={`popover top track-popover-wrapper ${this.state.trackPopOverActive ? 'show' : ''}`}>
								<div className="popover-content">
									<div className="list-group">
										{
											tracks.map((track, index) => {
												return (<a href="#" className="list-group-item" onClick={(e) => {this.hidePopOverAndSetDisplayName(e, track)}}>{track + "Track"}</a>);
											})
										}
									</div>
								</div>
							</div>
							<a href="/" onClick={this.toggleTracks}>
								{this.state.displayName + 'Track'}
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
