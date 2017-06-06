import React, {Component} from 'react';
import './EditTracksDotsContainer.scss';
import DotList from '../DotList/DotList';

export default class EditTracksDotsContainer extends Component {

	render() {
		const {selectedTrack, allTracks} = this.props;
		const allTracksTitle = [];

		allTracks.map((track, i) => {
			allTracksTitle.push(track.title);
		});

		//console.log(allTracksTitle);

		return (
			<div className="edit-tracks-dots-container-wrapper">
				<div className="edit-tracks-dots-container">
					<DotList
						selectedTrack={selectedTrack}
						allTracks={allTracksTitle}
					/>
				</div>
			</div>
		);
	}
}
