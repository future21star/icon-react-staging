import React, {Component, PropTypes} from 'react';
import {Collapse} from 'react-collapse';

export default class DailyBriefCollapsable extends Component {
	static propTypes = {
		content: PropTypes.string
	};

	constructor(props) {
		super(props);
		this.state = {
			isOpened: false,
		};
	}

	createMarkup = (html) => {
        return {__html: html};
    };

	toggleBrief = () => {
		this.setState({
			isOpened: !this.state.isOpened
		});
	};

	render() {
		const {content} = this.props;

		return (
			<div className="daily-brief-wrapper">
				<div className="container">
					<div className="daily-brief-header row" onClick={this.toggleBrief}>
						<h3 className="daily-brief-header-text col-xs-10">Daily Brief</h3>
						<div className="col-xs-2">
							<div className={`daily-brief-expand-btn ${this.state.isOpened ? 'active' : ''}`}>
								<span className="icon-arrow-down"/>
							</div>
						</div>
					</div>
					<Collapse isOpened={this.state.isOpened}>
						<div dangerouslySetInnerHTML={this.createMarkup(content)}/>
					</Collapse>
				</div>
			</div>
		);
	}
}
