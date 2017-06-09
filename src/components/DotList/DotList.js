import React, {Component, PropTypes} from 'react';
import './DotList.scss';

export default class DotList extends Component {

	render() {
		const {selectedTrack, allTracks} = this.props;
		return (
			<div className="dotlist-wrapper">
				<ul className="list-inline dot-list">
					{allTracks.map((track, i) => {
						return (
							<li key={i}>
								<span className={`dot ${selectedTrack.toLowerCase() === track.title.toLowerCase() ? 'active' : ''}`}/>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
}
