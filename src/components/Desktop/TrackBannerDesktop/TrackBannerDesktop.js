import React, {Component} from 'react';
import './TrackBannerDesktop.scss';

export default class TrackBannerDesktop extends Component {

	render() {

		return (
			<div className="track-banner-wrapper-desktop">
				<div className="track-banner-desktop">
					<div className="overlay"></div>
					<div className="title-desktop">
						<h1>Emom</h1>
						{/*<div className="container-fluid">
						 <div className="row">
						 <div className="col-sm-4 col-sm-offset-4">
						 <div className="row">
						 <div className="col-sm-4">
						 <h3>15 MIN.</h3>
						 <p>Duration</p>
						 </div>
						 <div className="col-sm-4">
						 <h3>MODERATE</h3>
						 <p>Intensity</p>
						 </div>
						 <div className="col-sm-4">
						 <h3>SHOULDERS</h3>
						 <p>Focus</p>
						 </div>
						 </div>
						 </div>
						 </div>
						 </div>*/}

						<ul className="track-banner-list-desktop list-inline">
							<li>
								<h3>15 MIN.</h3>
								<p>Duration</p>
							</li>
							<li>
								<h3>MODERATE</h3>
								<p>Intensity</p>
							</li>
							<li>
								<h3>SHOULDERS</h3>
								<p>Focus</p>
							</li>
						</ul>

						<a href="#" className="pull-right next-track">
							Next Track
							<i className="fa fa-long-arrow-right" aria-hidden="true"/>
						</a>
					</div>
				</div>
			</div>
		);
	}
}
