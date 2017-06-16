import React, {Component} from 'react';
import './TracksListItemDesktop.scss';
import moment from 'moment';
import TracksListTabsDesktop from '../TracksListTabsDesktop/TracksListTabsDesktop';

export default class TracksListItemDesktop extends Component {

	render() {

		const {bgImg, track} = this.props;

		return (
			<div className="track-list-item-desktop">
				{track ? (
					<div className="row">

						<div className="col-md-4 track-list-banner-desktop" style={{backgroundImage: 'url(' + bgImg + ')',}}>
							<div className="overlay-desktop"/>
							<div className="title-desktop">
								<span className="day pull-left">{moment(track.date).format('dd')}</span>
								<h3>{track.format}</h3>

								<ul className="track-data-list-desktop list-inline">
									<li>
										<p>{`${track.duration} min` || '--'}</p>
										<p>Duration</p>
									</li>
									<li>
										<p>{track.intensity || '--'}</p>
										<p>Intensity</p>
									</li>
									<li>
										<p>{track.focus || '--'}</p>
										<p>Focus</p>
									</li>
								</ul>
							</div>
						</div>

						<div className="col-md-8 track-list-tabs-area-desktop">
							<TracksListTabsDesktop track={track}/>
						</div>
					</div> ) : undefined }
			</div>
		);
	}
}
