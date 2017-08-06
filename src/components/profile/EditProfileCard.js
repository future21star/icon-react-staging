import React, {Component, PropTypes} from 'react';
import {Link} from "react-router";

export default class EditProfileCard extends Component {

	render() {
		return (
			<div className="profile-card">
				<div className="card-title">Edit Profile</div>
				<Link to="edit-profile" className="btn btn-lg btn-primary btn-action btn-rounded">
					Edit Profile
				</Link>
			</div>
		);
	}
}
