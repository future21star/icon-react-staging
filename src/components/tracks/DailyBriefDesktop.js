import React, {Component, PropTypes} from 'react';

export default class DailyBriefDesktop extends Component {
	static propTypes = {
		content: PropTypes.string
	};

	createMarkup = (html) => {
        return {__html: html};
    };

	render() {
		const {content} = this.props;

		return (
			<div className="daily-brief-wrapper">
				<div className="daily-brief-desktop hidden-sm hidden-xs">
					<h2>Daily Brief</h2>
					<div dangerouslySetInnerHTML={this.createMarkup(content)}/>
				</div>
			</div>
		);
	}
}
