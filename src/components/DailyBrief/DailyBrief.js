import React, {Component, PropTypes} from 'react';
import './DailyBrief.scss';

export default class DailyBrief extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isExpanded: false,
		};
		this.toggleBrief = this.toggleBrief.bind(this);
	}
	static propTypes = {
		user: PropTypes.object,
	};
	toggleBrief(){
		this.setState({
			isExpanded: !this.state.isExpanded
		});
	}
	render() {
		const {user} = this.props;
		return user ? (
				<div className="daily-brief-wrapper">
					<div className="container">
						<div className="daily-brief">
							<div className="row">
								<div className="daily-brief-header">
									<h3 className="pull-left">Daily Brief</h3>
									<span className="pull-right">
										<button className="btn btn-link btn-daily-brief-expand" onClick={this.toggleBrief}>
											<i className="icon-arrow-up"/>
										</button>
									</span>
								</div>
							</div>

							<div className="row">
								{
									this.state.isExpanded ?

									<div className="daily-brief-body">
										<p>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											Sed vel quam ac quam scelerisque imperdiet ut sit amet sapien.
										</p>
									</div> :

									<div/>
								}

							</div>
						</div>
					</div>
				</div>) : <div/>;
	}
}
