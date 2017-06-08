import React, {Component, PropTypes} from 'react';
import './DailyBrief.scss';

export default class DailyBrief extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isExpanded: false,
		};
	}

	static propTypes = {
		user: PropTypes.object,
	};

	toggleBrief = () => {
		this.setState({
			isExpanded: !this.state.isExpanded
		});
	};

	render() {
		const {user} = this.props;

		return user ? (
			<div className="daily-brief-wrapper">
				<div className="container">
					<div className="daily-brief-header" onClick={this.toggleBrief}>
						<span className="daily-brief-header-text">Daily Brief</span>
						<div className="pull-right">
							<div className={`daily-brief-expand-btn ${this.state.isExpanded ? 'active' : ''}`}>
								<span className="icon-arrow-down"/>
							</div>
						</div>
					</div>
					{ this.state.isExpanded ? (
						<div className="daily-brief-body">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							Sed vel quam ac quam scelerisque imperdiet ut sit amet sapien.
						</div>)
						: undefined}
				</div>
			</div>) : <div/>;
	}
}
