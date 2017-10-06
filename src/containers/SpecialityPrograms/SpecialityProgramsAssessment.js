import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";
import CheckAccessLevel from '../HOC/CheckAccessLevel'
import {Menubar} from '../../components/index';

@connect(
	state => ({

	}),
	{}
)

@CheckAccessLevel('assessment')

export default class SpecialityProgramsAssessment extends Component {

	answerOptions = [
		{value: 'male', label: 'Male'},
		{value: 'female', label: 'Female'},
	];

	render() {
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
				<div className="assessment-form-container bottom-padding">
					<Helmet title="Assessment - Calculate"/>

					<Menubar
						title="Icon Assessment"
						backButton={true}
					/>
					<div className="container container-small">
						<h1 className="assessment-form-title">Calculate Your Track</h1>
						<div className="assessment-form-wrapper">

							<div className="step-content">
								<p>Please select which of the following you are:</p>
								<form className="form-radio">
									{this.answerOptions.map((item, i) => {
										return (
											<div className="radio-inline" key={i}>
												<label>
													<input
															type="radio"
															name="gender"
															value={item.value}
															// checked={answer === item.value}
															// onChange={e => setAnswer(e.target.value)}
													/>
													<p className="input-label">{item.label}</p>
												</label>
											</div>
										)
									})}
								</form>
							</div>

							<div className="btn-group btn-group-lg btn-group-justified">
								<a href="#" className="btn btn-primary">Strength Evaluation</a>
								<a href="#" className="btn btn-default">Technique Evaluation</a>
								<a href="#" className="btn btn-default">Flexibility Evaluation</a>
							</div>

							<div className="step-content">
								<form className="form-select">
									<select className="form-control">
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
									</select>
								</form>
							</div>
						</div>
					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}

	renderSteps() {
		const {currentStep} = this.props;

		return (
			<ul className="assessment-steps-list inline-list">
				{[1, 2, 3, 4, 5, 6, 7, 8].map(i => {
					return <li key={i} className={currentStep === i ? "active" : ""}>{i}</li>
				})}
			</ul>
		);
	}
}

