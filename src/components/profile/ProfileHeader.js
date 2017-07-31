import React, {Component, PropTypes} from 'react';

export default class ProfileHeader extends Component {
	static propTypes = {
		user: PropTypes.object,
	};

	render() {
		const {user} = this.props;

		let gender = user.gender;
		if(user.gender === 'Yes') gender = 'Male';
		else if(user.gender === 'No') gender = 'Female';

		return user ? (
			<div className="profile-header bg-turquoise-light menu-head-buffer">
				<div className="profile-base">
					<div className="avatar">
						<img src={user.profile_picture_url}/>
					</div>

					<h4 className="full-name">{user.name}</h4>
					<div className="email">{user.email}</div>
					<div className="member-since">member since {new Date(user.createdAt).getFullYear()}</div>
				</div>
				<div className="profile-information">
					<div className="container">
						<div className="row">
							<div className="col-xs-4 information-item">
								<div className="information-title">Gender</div>
								<div className="information-value">{gender}</div>
							</div>
							<div className="col-xs-4 information-item">
								<div className="information-title">Height</div>
								<div className="information-value">
									{user.height_feet ? <span>{user.height_feet}' </span> : undefined}
									{user.height_inches ? <span>{user.height_inches}"</span> : undefined}
								</div>
							</div>
							<div className="col-xs-4 information-item last-item">
								<div className="information-title">Weight</div>
								<div className="information-value">
									{user.weight ? <span>{user.weight} Kgs</span> : undefined}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>) : <div/>;
	}
}
