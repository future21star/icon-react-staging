import React, {Component} from 'react';
import './MenuBarDesktop.scss';

export default class MenuBarBlueDesktop extends Component {

	render() {

		const {leftSideContentDesktop, rightSideContentDesktop} = this.props;

		return (
			<div className="menu-bar-desktop menu-bar-desktop-blue">
				<div className="container-fluid">
					<div className="row">
						<div className="col-sm-3 col-md-3 col-lg-3 menu-bar-left-side-content-desktop">
							{leftSideContentDesktop}
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
							{rightSideContentDesktop}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
