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

	answerOptions = [
		{value: 'male', label: 'Male'},
		{value: 'female', label: 'Female'},
	];

	saveSpAssessment = () => {
		if(this.props.form.gender) {
			this.props.saveSpAssessmentResult(this.props.form);
		}
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
					<div className="container container-small">
						<div className="assessment-form-wrapper">

							<div className="step-content">
								<h3 className="text-center">Gender</h3>
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
															checked={form.gender === item.value}
															onChange={e => changeInput(e.target.name, e.target.value)}
													/>
													<p className="input-label">{item.label}</p>
												</label>
											</div>
										)
									})}
								</form>
							</div>

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

							{form.evaluation === 'strength' && (
								<div className="step-content sp-assesment-content">
									<p>How many strict pull-ups can you complete?</p>
									{/* q1 */}
									<form className="form-select">
										<select className="form-control" value={form.q1} onChange={e => changeInput('q1', e.target.value)}>
											<option value="1">0 strict pull-ups</option>
											<option value="3">2 strict pull-ups</option>
											<option value="5">5 strict pull-ups</option>
											<option value="10">12 strict pull-ups</option>
										</select>
									</form>

									{/* q2 */}
									<p>How many strict dips can you complete?</p>
									<form className="form-select">
										<select className="form-control" value={form.q2} onChange={e => changeInput('q2', e.target.value)}>
											<option value="1">0 strict dips</option>
											<option value="3">2 strict dips</option>
											<option value="5">5 strict dips</option>
											<option value="10">12 strict dips</option>
										</select>
									</form>
								</div>
							)}
							{form.evaluation === 'technique' && (
								<div className="step-content sp-assesment-content">
									<p>Please select your False Grip ability:</p>
									{/* q1 */}
									<form className="form-select">
										<select className="form-control" value={form.q1} onChange={e => changeInput('q1', e.target.value)}>
											<option value="1">Not able to use false grip on low rings.</option>
											<option value="5">Can apply false grip low rings, not high rings.</option>
											<option value="10">False grip pull up while hanging on high rings.</option>
										</select>
									</form>

									{/* q2 */}
									<form className="form-select">
										<select className="form-control" value={form.q2} onChange={e => changeInput('q2', e.target.value)}>
											<option value="1">Rings pull to the armpits instead of the sternum and athlete skips steps during transition on low rings.</option>
											<option value="5">Transition rings to sternum low feet under rings, rings go to armpits feet extended in front of the body.</option>
											<option value="10">Athlete can successfully perform an l-sit transition on low rings while rings pull to sternum and trace the bottom pecs.</option>
										</select>
									</form>
								</div>									
							)}
							{form.evaluation === 'flexibility' && (
								<div className="step-content sp-assesment-content">
									<p>Please select your current Shoulder position when performing a ring dip:</p>
									{/* q1 */}
									<form className="form-select">
										<select className="form-control" value={form.q1} onChange={e => changeInput('q1', e.target.value)}>
											<option value="1">Shoulder remains above elbow at bottom of ring dip hold.</option>
											<option value="5">Shoulder at parallel in bottom of dip position.</option>
											<option value="10">Shoulder below elbow ring dip hang.</option>
										</select>
									</form>

									{/* q2 */}
									<p>Please select the movement of the rings during transition</p>
									<form className="form-select">
										<select className="form-control" value={form.q2} onChange={e => changeInput('q2', e.target.value)}>
											<option value="1">Rings cannot come to sternum with feet supporting on low rings.</option>
											<option value="5">Rings trace nipple line in transition.</option>
											<option value="10">Rings trace under pecs through transition.</option>
										</select>
									</form>
								</div>
							)}

							<div className="bottom-padding text-center">
								<button onClick={this.saveSpAssessment} disabled={!form.gender} className="btn btn-primary btn-lg">Evaluate</button>
							</div>
						</div>
					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}

