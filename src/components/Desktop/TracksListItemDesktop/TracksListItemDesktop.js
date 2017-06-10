import React, {Component} from 'react';
import './TracksListItemDesktop.scss';
import TracksListTabsDesktop from '../TracksListTabsDesktop/TracksListTabsDesktop';

export default class TracksListItemDesktop extends Component {

	render() {

		const {bgImg} = this.props;

		return (
			<div className="track-list-item-desktop">
				<div className="row">

					<div className="col-md-4 track-list-banner-desktop" style={{backgroundImage: 'url(' + bgImg + ')',}}>
						<div className="overlay-desktop"/>
						<div className="title-desktop">
							<span className="day pull-left">Mo</span>
							<h3>Emom</h3>

							<ul className="track-data-list-desktop list-inline">
								<li>
									<p>15 MIN.</p>
									<p>Duration</p>
								</li>
								<li>
									<p>MODERATE</p>
									<p>Intensity</p>
								</li>
								<li>
									<p>Loremp</p>
									<p>Focus</p>
								</li>
							</ul>
						</div>
					</div>

					<div className="col-md-8 track-list-tabs-area-desktop">
						<TracksListTabsDesktop/>
					</div>
				</div>
			</div>
		);
	}
}
