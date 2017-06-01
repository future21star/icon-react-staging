import React, {Component, PropTypes} from 'react';
import './ProgrammingHeader.scss';

export default class ProgrammingHeader extends Component {
	static propTypes = {
		user: PropTypes.object,
	};

	render() {
		const {user} = this.props;
		const profileAvatar = require('../../../static/profile-avatar.jpg');

		return user ? (
				<div className="programming-header">
					<div className="container">
						<div className="row">
							<ul className="nav nav-pills nav-justified">
								<li role="presentation"><span>Su</span></li>
								<li role="presentation"><span>Mo</span></li>
								<li role="presentation"><span>Tu</span></li>
								<li role="presentation"><span>We</span></li>
								<li role="presentation"><span>Th</span></li>
								<li role="presentation"><span className="active">Fr</span></li>
								<li role="presentation"><span>Sa</span></li>
							</ul>
							<div className="title">
								<p>Lifestyle Track</p>
							</div>
							<ul className="list-inline dot-list">
								<li><span className="dot active"/></li>
								<li><span className="dot"/></li>
								<li><span className="dot"/></li>
							</ul>
						</div>
					</div>

				</div>) : <div/>;
	}
}
