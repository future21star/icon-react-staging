import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import TracksListTabsDesktop from './TracksListTabsDesktop';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class TracksListItemDesktop extends Component {
	static propTypes = {
		wod: PropTypes.object
	};

	render() {

		const {wod} = this.props;

		return (
			<ReactCSSTransitionGroup
				transitionName="react-anime"
				transitionAppear={true}
				transitionAppearTimeout={5000}
				transitionEnter={true}
				transitionEnterTimeout={500}
				transitionLeave={true}
				transitionLeaveTimeout={500}
			>
				<div className="track-list-item-desktop">
					{wod ? (
						<div className="row">
							<div className={`col-md-4 track-list-banner-desktop ${wod.format}`}
									 style={{backgroundImage: 'url(../' + wod.track.bgImgUrl + ')'}}>
								<div className="overlay-desktop"/>
								<div className="title-desktop">
									<span className="day pull-left">{moment(wod.date).format('dd')}</span>
									<h3>{wod.title}</h3>

									<ul className="track-data-list-desktop list-inline">
										<li>
											<p>{`${wod.duration} min` || '--'}</p>
											<p>Duration</p>
										</li>
										<li>
											<p>{wod.intensity || '--'}</p>
											<p>Intensity</p>
										</li>
										<li>
											<p>{wod.focus || '--'}</p>
											<p>Focus</p>
										</li>
									</ul>
								</div>
							</div>

							<div className="col-md-8 track-list-tabs-area-desktop">
								<TracksListTabsDesktop track={wod}/>
							</div>
						</div> ) : undefined }
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}
