import React, {Component} from 'react';
import './EditTracksDotsContainer.scss';

export default class EditTracksDotsContainer extends Component {

	render() {
		return (
			<div className="edit-tracks-dots-container-wrapper">
				<div className="edit-tracks-dots-container">
					<ul className="list-inline dot-list">
						<li><span className="dot active"/></li>
						<li><span className="dot"/></li>
						<li><span className="dot"/></li>
						<li><span className="dot"/></li>
					</ul>
				</div>
			</div>
		);
	}
}
