import React, {Component} from 'react';
import slackImg from '../../../static/slack.png';

export default class JoinSlack extends Component {

	render() {
	
		return (
			<div className="slack-section">
				<div className="col-xs-12">
					<h4>
						<img src={slackImg} alt="slack" className="img-responsive slack-img"/>
						<span>Join Icon Slack Chat</span>
					</h4>
					<a href="#" className="pull-right">Join Us</a>
				</div>
				<div className="clearfix"/>
			</div>
		);
	}
}
