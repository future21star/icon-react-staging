import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";
import {Menubar} from '../../components/index';
import {push} from 'react-router-redux';
import {asyncConnect} from 'redux-async-connect';
import {
	markAsNewForm,
	isLoaded as isSpAssessmentResultLoaded,
	load as loadSpAssessmentResult,
	changeInput,
	save as saveSpAssessmentResult
} from '../../redux/modules/spAssessmentStore';

@asyncConnect([{
	promise: ({store: {dispatch, getState}}) => {
		const promises = [];

		promises.push(dispatch(markAsNewForm()));

		if (!isSpAssessmentResultLoaded(getState())) promises.push(dispatch(loadSpAssessmentResult()));

		return Promise.all(promises);
	}
}])
@connect(
	state => ({
		saved: state.spAssessmentStore.saved,
		form: state.spAssessmentStore.form
	}),
	{
		pushState: push,
		changeInput,
		saveSpAssessmentResult
	}
)

export default class SpecialtyProgramsAssessment extends Component {

	constructor(props) {
		super(props);
	}

	saveSpAssessment = () => {
		this.props.saveSpAssessmentResult(this.props.form);
	};

	componentWillUpdate(nextProps) {
		if(nextProps.saved !== this.props.saved) {
			// redirect
			this.props.pushState('/specialty-programs/assessment/result');
		}
	}

	render() {
		const {form, changeInput} = this.props;

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
					<Helmet title="Specialty Program - Calculate Your Track"/>

					<Menubar
						title="Calculate Your Track"
						backButton={true}
					/>
					<div className="assessment-form-wrapper container">
						<div className="container-small">
							<div className="assessment-tabs-nav row sp-assessment-tabs-nav">
								<div onClick={e => changeInput('evaluation', 'strength')} className={`col-xs-12 col-md-4 ${form.evaluation === 'strength' ? 'active' : ''}`}>
									<a href="javascript:;">Strength</a>
								</div>
								<div onClick={e => changeInput('evaluation', 'technique')} className={`col-xs-12 col-md-4 ${form.evaluation === 'technique' ? 'active' : ''}`}>
									<a href="javascript:;">Technique</a>
								</div>
								<div onClick={e => changeInput('evaluation', 'flexibility')} className={`col-xs-12 col-md-4 ${form.evaluation === 'flexibility' ? 'active' : ''}`}>
									<a href="javascript:;">Flexibility</a>
								</div>
							</div>
						</div>

						{form.evaluation === 'strength' && (
							<div className="step-content sp-assesment-content row">
								<div className="col-xs-12 col-md-6 pull-right pull-right-desktop sp-assessment-video">
									<p><span className="icon-information icon"/>Movement Help</p>
									<iframe src="https://player.vimeo.com/video/240592544" width="100%" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
								</div>
								<div className="col-xs-12 col-md-6 pull-left pull-left-desktop">
									<div className="sp-assessment-form-wrapper">
										<p>Perform one set of max rep strict pull-ups and one set of max rep strict dips.</p>
										{/* q1 */}
										<form className="form-select">
											<select className="form-control" value={form.q1} onChange={e => changeInput('q1', e.target.value)}>
												<option value="1">0 strict pull-ups - 0 strict dips</option>
												<option value="5">5 Strict pull-ups - 5 strict dips</option>
												<option value="10">12 strict pull-ups - strict dips</option>
											</select>
										</form>
									</div>
								</div>
							</div>
						)}
						{form.evaluation === 'technique' && (
							<div className="step-content sp-assesment-content row">
								<div className="col-xs-12 col-md-6 pull-right pull-right-desktop sp-assessment-video">
									<p><span className="icon-information icon"/>Movement Help</p>
									<iframe src="https://player.vimeo.com/video/240592012" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
								</div>
								<div className="col-xs-12 col-md-6 pull-left pull-left-desktop">
									<div className="sp-assessment-form-wrapper text-left">
										<p><b>Step 1:</b> Apply and maintain the false grip on both the low rings and high rings to evaluate proper grip.</p>
										<p><b>Step 2:</b> Perform a low ring muscle-up transition and evaluate the path of the rings. If rings come to sternum and trace below pecs, increase the difficulty by extending feet in front of the body and evaluate the ring path. If rings come to sternum and trace underneath pecs, attempt an l-sit muscle-up transition on the low rings.</p>
										{/* q1 */}
										<form className="form-select">
											<select className="form-control" value={form.q1} onChange={e => changeInput('q1', e.target.value)}>
												<option value="1">Not able to use false grip on low rings and rings pull to the armpits instead of the sternum while performing a low ring muscle-up transition.</option>
												<option value="5">Can apply false grip low rings, not high rings. Transition rings to sternum low feet under rings, rings go to armpits feet extended in front of the body. </option>
												<option value="10">Can maintain the false grip while hanging and perform a pull up while hanging on high rings. Athlete can successfully perform an l-sit transition on low rings while rings pull to sternum and trace the bottom pecs.</option>
											</select>
										</form>
									</div>
								</div>									
							</div>
						)}
						{form.evaluation === 'flexibility' && (
							<div className="step-content sp-assesment-content row">
								<div className="col-xs-12 col-md-6 pull-right pull-right-desktop sp-assessment-video">
									<p><span className="icon-information icon"/>Movement Help</p>
									<iframe src="https://player.vimeo.com/video/240592165" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
								</div>
								<div className="col-xs-12 col-md-6 pull-left pull-left-desktop">
									<div className="sp-assessment-form-wrapper">
										<p>Perform a static ring dip hold with the shoulder as far below the elbow as possible and evaluate the position.</p>
										{/* q1 */}
										<form className="form-select">
											<select className="form-control" value={form.q1} onChange={e => changeInput('q1', e.target.value)}>
												<option value="1">Shoulder remains above elbow at bottom of ring dip hold.</option>
												<option value="5">Shoulder at parallel in bottom of dip position.</option>
												<option value="10">Shoulder below elbow ring dip hang.</option>
											</select>
										</form>
									</div>
								</div>
							</div>
						)}

						<div className="bottom-padding text-center">
							<button onClick={this.saveSpAssessment} className="btn btn-primary btn-lg">Evaluate</button>
						</div>
					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}

