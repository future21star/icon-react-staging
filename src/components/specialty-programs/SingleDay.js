import React, {Component, PropTypes} from 'react';

export default class SingleDay extends Component {

	constructor(props) {
		super(props);

		this.state = {
			toggledWodVideo: false,
			toggledDay: false
		}
	}

	static propTypes = {
		day: PropTypes.number.isRequired,
		type: PropTypes.string.isRequired,
		videoID: PropTypes.number,
		workouts: PropTypes.array
	};

	toggleCollapsedDay = () => {
		this.setState({
			toggledDay: !this.state.toggledDay
		});
	};

	toggleWodVideo = () => {
		this.setState({
			toggledWodVideo: !this.state.toggledWodVideo
		});
	};

	render() {
		const {day, type, videoID, workouts} = this.props;

		return (
			<div className="col-xs-12 col-sm-12 col-md-6">
				<div className={`assessment-section-bg  sp-day-wrapper sp-day-${day}`}>
					
					<h2 className="sp-day-title" onClick={this.toggleCollapsedDay}>Day {day}<span className={!this.state.toggledDay ? "icon-minus icon" : "icon-nav-links icon"}/></h2>
					{!this.state.toggledDay &&
						<div className="sp-program-collapsible-content">
							{videoID !== null ?
								<div className="sp-day-video">
									<a href="javascript:;" onClick={this.toggleWodVideo}><span className="icon-feed-video icon"/>{this.state.toggledWodVideo ? "Hide" : "Watch"} Instructional Video</a>
									{this.state.toggledWodVideo && (
									<iframe
										src={`https://player.vimeo.com/video/${videoID}`}
										width="640"
										height="360"
										frameBorder="0"
										webkitallowfullscreen
										mozallowfullscreen
										allowfullscreen
									/>)}
								</div>
							: null}
							
							{type === 'strength' && workouts.map((workout, i) => {
								return (
									<div key={i}>
										<div className="sp-program-collapsible-content-title">{workout.title}</div>
										<ol className="sp-program-collapsible-content-list">
											{workout.description.map((desc, j) => {
												return <li key={j}>{desc}</li>
											})}
										</ol>
									</div>
								)
							})}

							{ type === 'technique' && (
								<ol className="sp-program-collapsible-content-list">
									{workouts.map((workout, i) => {
										return <li key={i}>{workout}</li>
									})}
								</ol>
							)}
						</div>
					}
				</div>
			</div>
		);
	}
}