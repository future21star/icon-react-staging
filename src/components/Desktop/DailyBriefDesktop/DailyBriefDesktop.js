import React, {Component} from 'react';
import './DailyBriefDesktop.scss';

export default class DailyBriefDesktop extends Component {

	render() {
		return (
			<div className="daily-brief-wrapper-desktop">
				<div className="daily-brief-desktop">
					<h2>Daily Brief</h2>
					<p>
						{this.props.content}
					</p>
				</div>
			</div>
		);
	}
}
