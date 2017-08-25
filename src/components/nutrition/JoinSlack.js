import React, {Component} from 'react';
import slackImg from '../../../static/slack.png';

export default class JoinSlack extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			showForm: false
		}
	}

	showToggle(){
		this.setState({ 
			showForm: !this.state.showForm
		});
	}

	render() {
		const {showForm} = this.state;
	
		return (
			<div className="slack-section">
				<div className="col-xs-12">
					<h4>
						<img src={slackImg} alt="slack" className="img-responsive slack-img"/>
						<span>Join Icon Slack Chat</span>
					</h4>
					<a href="#" onClick={e => this.showToggle()} className="pull-right">Join Us</a>
				</div>
				{showForm && (
					<div className="col-xs-12 join-slack-form">
						<iframe src="https://iconinvite.herokuapp.com/" id="slack-signup" scrolling="no"></iframe>
					</div>
				)}
				<div className="clearfix"/>
			</div>
		);
	}
}
