import React, {Component} from 'react';
import './EditTracksDotsContainer.scss';
import DotList from '../DotList/DotList';

export default class EditTracksDotsContainer extends Component {

	render() {
		const {selectedTrack, allTracks} = this.props;

		return (
			<div className="edit-tracks-dots-container-wrapper">
				<div className="edit-tracks-dots-container">
					<DotList
						selectedTrack={selectedTrack}
						allTracks={allTracks}
					/>
				</div>
			</div>
		);
	}
}
