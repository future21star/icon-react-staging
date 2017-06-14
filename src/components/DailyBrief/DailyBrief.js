import React, {Component, PropTypes} from 'react';
import './DailyBrief.scss';

export default class DailyBrief extends Component {
	static propTypes = {
		content: PropTypes.string
	};

	constructor(props) {
		super(props);
		this.state = {
			isExpanded: false,
		};
	}

	toggleBrief = () => {
		this.setState({
			isExpanded: !this.state.isExpanded
		});
	};

	render() {
		const {content} = this.props;
		const {isExpanded} = this.state;

		return (
			<div className="daily-brief-wrapper">
				<div className="container">
					<div className="daily-brief-header" onClick={this.toggleBrief}>
						<span className="daily-brief-header-text">Daily Brief</span>
						<div className="pull-right">
							<div className={`daily-brief-expand-btn ${isExpanded ? 'active' : ''}`}>
								<span className="icon-arrow-down"/>
							</div>
						</div>
					</div>
					{ isExpanded ? (
						<div className="daily-brief-body">{content || 'No daily brief found'}</div>
					) : undefined }
				</div>
			</div>
		);
	}
}
