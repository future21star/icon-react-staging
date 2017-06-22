import React, {Component, PropTypes} from 'react';

export default class DailyBrief extends Component {
	static propTypes = {
		content: PropTypes.string
	};

	render() {
		const {content} = this.props;

		return (
			<div className="daily-brief-wrapper">
				<div className="daily-brief-desktop hidden-sm hidden-xs">
					<h2>Daily Brief</h2>
					<p>
						{content || 'No daily brief found'}
					</p>
				</div>
			</div>
		);
	}
}
