import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import DesktopListWorkoutTabContainer from './DesktopListWorkoutTabContainer';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class DesktopListWorkoutContainer extends Component {
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
	
			{wod ? (
				<div className="track-list-item-desktop">
					<div className={`col-xs-12 track-list-banner-desktop ${wod.format}`}
							 style={{backgroundImage: 'url(../' + wod.track.bgImgUrl + ')'}}>
						<div className="overlay-desktop"/>
						<div className="title-desktop">
							<span className="day pull-left">{moment.utc(wod.date).local().format('dd')}</span>
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

					<div className="col-xs-12 track-list-tabs-area-desktop no-padding-left-right">
						<DesktopListWorkoutTabContainer track={wod}/>
					</div>
				</div> 
			) : undefined }
			
			</ReactCSSTransitionGroup>
		);
	}
}