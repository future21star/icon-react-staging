import React, {Component, PropTypes} from 'react';
import './ProgrammingHeader.scss';

export default class ProgrammingHeader extends Component {
	static propTypes = {
		user: PropTypes.object,
	};

	render() {
		const {user} = this.props;

		return user ? (
			<div className="programming-header-wrapper">
				<div className="container">
					<div className="row">
						<div className="col-xs-12">
							<ul className="nav nav-pills nav-justified">
								<li><span>Su</span></li>
								<li><span>Mo</span></li>
								<li><span>Tu</span></li>
								<li><span>We</span></li>
								<li><span>Th</span></li>
								<li><span className="active">Fr</span></li>
								<li><span>Sa</span></li>
							</ul>
						</div>
						<div className="col-xs-12">
							<div className="title">Lifestyle Track</div>
							<ul className="list-inline dot-list">
								<li><span className="dot active"/></li>
								<li><span className="dot"/></li>
								<li><span className="dot"/></li>
							</ul>
						</div>
					</div>
				</div>
			</div>) : <div/>;
	}
}
