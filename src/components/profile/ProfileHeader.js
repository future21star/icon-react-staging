import React, {Component, PropTypes} from 'react';

export default class ProfileHeader extends Component {
	static propTypes = {
		user: PropTypes.object,
	};

	render() {
		const {user} = this.props;

		return user ? (
			<div className="profile-header bg-turquoise-light menu-head-buffer">
				<div className="profile-base">
					<div className="avatar">
						<img src={user.avatar_urls[96]}/>
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
								<div className="information-value">{user.gender}</div>
							</div>
							<div className="col-xs-4 information-item">
								<div className="information-title">Height</div>
								<div className="information-value">
									{user.heightFt ? <span>{user.heightFt}' </span> : undefined}
									{user.heightIn ? <span>{user.heightIn}"</span> : undefined}
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
