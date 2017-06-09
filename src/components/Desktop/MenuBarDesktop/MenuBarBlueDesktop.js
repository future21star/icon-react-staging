import React, {Component} from 'react';
import './MenuBarDesktop.scss';

export default class MenuBarBlueDesktop extends Component {

	render() {

		return (
			<div className="menu-bar-desktop menu-bar-desktop-blue">
				<div className="container-fluid">
					<div className="row">
						<div className="col-sm-3 col-md-3 col-lg-3 menu-bar-left-side-content-desktop">
							<h3>
								<span className="icon-user-edit"/>
								Lifestyle Track
							</h3>
						</div>
						<div className="col-sm-6 col-md-6 col-lg-6 menu-bar-title-desktop">
							<ul className="nav nav-pills nav-justified">
								<li><span>Su</span></li>
								<li><span>Mo</span></li>
								<li><span>Tu</span></li>
								<li><span>We</span></li>
								<li><span>Th</span></li>
								<li><span className="active">Fr</span></li>
								<li><span>Sa</span></li>
							</ul>
							<p>
								May <span className="year">2017</span>
							</p>
						</div>
						<div className="col-sm-3 col-md-3 col-lg-3 menu-bar-right-side-content-desktop">
							<p>
								List View
								<span>
									<i className="fa fa-list-ul" aria-hidden="true"/>
								</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
