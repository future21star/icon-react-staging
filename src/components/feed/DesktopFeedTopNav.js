import React, {Component, PropTypes} from 'react';

export default class DesktopFeedTopNav extends Component {
	static propTypes = {};

	render() {
		return (
			<div className="feed-header-desktop navbar-fixed-top">
				<div className="row no-margin-left-right">

					<div className="col-md-4 col-lg-3 header-desktop">
						<h3>Feed</h3>
					</div>

					<div className="col-md-8 col-lg-9 feed-search-container-desktop">
						<div className="input-group">
							<span className="input-group-addon" id="basic-addon1">
								<span className="icon-search icon-black icon-feed-search-desktop"/>
							</span>
							<input
								type="text"
								className="form-control feed-search-desktop"
								placeholder="Search the Vault"
								aria-describedby="basic-addon1"
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
