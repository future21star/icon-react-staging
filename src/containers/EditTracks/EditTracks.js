import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {MenubarWhite, EditTracksDotsContainer, EditTracksBanner, EditTracksMidSection} from '../../components';
import {Link} from "react-router";
import './EditTracks.scss';

export default class EditTracks extends Component {

	render() {
		const binImg = require('../../../static/bin.png');

		const rightSideContent = (
			<Link to="/programming" className="turquoise-color">
				Done
			</Link>
		);

		return (
			<div className="edit-tracks-wrapper">
				<Helmet title="Edit Tracks"/>
				<MenubarWhite
					title="Edit Tracks"
					rightSideContent={rightSideContent}
				/>
				<EditTracksDotsContainer/>
				<EditTracksBanner/>
				<EditTracksMidSection/>
				<button className="btn btn-block btn-lg btn-fixed-bottom btn-red btn-full">
					<img src={binImg} alt="bin" className="bin-img"/>
					Delete This Track
				</button>
			</div>
		);
	}
}
