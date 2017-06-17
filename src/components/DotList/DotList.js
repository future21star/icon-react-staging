import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import './DotList.scss';

@connect(
	state => ({
		selectedTracks: state.selectedTracksStore.selectedTracks,
		swipedActiveTrack: state.swipeStore.swipedActiveTrack
	})
)
export default class DotList extends Component {
	static propTypes = {
		selectedTracks: PropTypes.array.isRequired,
		swipedActiveTrack: PropTypes.func
	};

	render() {
		const {selectedTracks, swipedActiveTrack} = this.props;
		return (
			<div className="dotlist-wrapper">
				<ul className="list-inline dot-list">
					{selectedTracks.map((track, i) => {
						return (
							<li key={i}>
								<span className={`dot ${swipedActiveTrack === track.trackName ? 'active' : ''}`}/>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}
