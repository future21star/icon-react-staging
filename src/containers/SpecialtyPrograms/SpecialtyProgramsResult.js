import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";
import {Menubar} from '../../components/index';

@connect(
		state => ({
			form: state.spAssessmentStore.form,
			mu: state.spAssessmentStore.mu
		}),
		{}
)

export default class SpecialtyProgramsResult extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		const {form, mu} = this.props;
		const evaluation = form.evaluation;

		console.log(form, mu);


		let style = {backgroundImage: 'url(../../muscle-bg-lower.jpg)'};


		let trackName = "Strength Track";
		let trackDescription = "The Stamina and Strength track is a pull and push focused program to develop the strength required to perform a muscle-up while also reinforcing and developing proper technique. This track is ideal for an athlete with adequate technique on the low rings but also lacks the strength to perform a muscle-up.";
		let isBoth = false;

		if(evaluation === 'technique' || evaluation === 'flexibility' && answers.q1.answerValue == 1){
			trackName = "Technique Track";
			trackDescription = "The Technique track will prioritize development of the skills and techniques required to perform a muscle-up while reinforcing strength. Ideal for an athlete who needs development of these skills and flexibility.";
		}else{
			//is strength
			if(answers.q1.answerValue == 1){
				trackName = "Technique + Strength Tracks";
				isBoth = true;
			}else if(answers.q1.answerValue == 10){
				trackName = "Technique Track";
				trackDescription = "The Technique track will prioritize development of the skills and techniques required to perform a muscle-up while reinforcing strength. Ideal for an athlete who needs development of these skills and flexibility.";
			}
		}

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
					<div className="assessment-landing-wrapper bottom-padding menu-head-buffer sp-programs-bg sp-programs-result" style={style}>
						<Helmet title="Muscle Up Assessment"/>
						<Menubar
								className="menu-bar-transparent"
								backButton={true}
						/>
						<div className="container container-small">
							<div className="row">
								<div className="col-xs-12">
									<div className="sp-program-result-item text-white">
										<h3>Based on the {evaluation} evaluation we recommend:</h3>
										<h2>{trackName}</h2>
										<ul className="list-check">
											<li>{trackDescription}</li>
											{isBoth && (
												<li>The Technique track will prioritize development of the skills and techniques required to perform a muscle-up while reinforcing strength. Ideal for an athlete who needs development of these skills and flexibility.</li>
											)}
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</ReactCSSTransitionGroup>
		);
	}
}

