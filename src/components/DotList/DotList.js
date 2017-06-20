import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import './DotList.scss';

@connect(
	state => ({
		selectedTracks: state.selectedTracksStore.selectedTracks,
		swipedActiveTrackName: state.swipeStore.swipedActiveTrackName
	})
)
export default class DotList extends Component {
	render() {
		const {selectedTracks, swipedActiveTrackName} = this.props;

		return (
			<div className="dotlist-wrapper">
				<ul className="list-inline dot-list">
					{selectedTracks.map((track, i) => {
						return (
							<li key={i}>
								<span className={`dot ${swipedActiveTrackName === track.trackName ? 'active' : ''}`}/>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}
