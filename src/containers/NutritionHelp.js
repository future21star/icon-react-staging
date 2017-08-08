import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Menubar, NoAccess, DotList} from '../components/index';
import {connect} from "react-redux";
import {includes} from 'lodash';
import {Link} from 'react-router';
import strengthBG from '../../static/strengthBG.jpg';

@connect(
	state => ({
		vaultAccess: state.authStore.user.vaultAccess
	}),
	{}
)

export default class NutritionHelp extends Component {

	render() {
		const {vaultAccess} = this.props;

		return (
			<ReactCSSTransitionGroup
				transitionName="react-anime"
				transitionAppear={true}
				transitionAppearTimeout={5000}
				transitionEnter={true}
				transitionEnterTimeout={500}
				transitionLeave={true}
				transitionLeaveTimeout={500}
			>
				<div>
					<Helmet title="Nutrition - Help"/>

					<Menubar
						title="Activity Level"
						leftSideContent={<Link to="/nutrition/calculator"><span className="icon-close" style={{fontSize: 16+'px'}}/>
						</Link>}
						className="">
					</Menubar>

					<div className="nutrition-help-page-content-wrapper">
						<div className="nutrition-help-page-content">
							<div className="help-block">
								<h3>sedentary lifestyle</h3>
								<p>You might have a sedentary job (such as a desk job) and no exercise.</p>
							</div>
							<div className="help-block">
								<h3>little daily activity</h3>
								<p>You might have a sedentary job and go for a walk 1-3 times a week.</p>
							</div>
							<div className="help-block">
								<h3>some activity</h3>
								<p>You are somewhat active during the day and you're exercising 3-4 times a week for an hour or less at a time.</p>
							</div>
							<div className="help-block">
								<h3>moderate activity</h3>
								<p>
									You exercise 4-5 times a week about an hour at a time with moderate activity levels during
									the day outside of exercise.
								</p>
							</div>
							<div className="help-block">
								<h3>workout a little every day</h3>
								<p>You exercise 6 days a week, about an hour at a time.</p>
							</div>
						</div>
					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}

