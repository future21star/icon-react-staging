import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";
import {Menubar} from '../../components/index';
import {Link} from "react-router";

@connect(
	state => ({

	}),
	{}
)

export default class SpecialtyProgramsAssessment extends Component {

	constructor(props) {
		super(props);

		this.state = {
			selectedGender: '',
			selectedEvaluation: 'strength'
		}
	}

	answerOptions = [
		{value: 'male', label: 'Male'},
		{value: 'female', label: 'Female'},
	];

	selectGender = (gender) => {
		this.setState({
			selectedGender: gender
		});
	};

	selectEvaluation = (evaluation) => {
		this.setState({
			selectedEvaluation: evaluation
		});
	};

	render() {
		const {selectedGender, selectedEvaluation} = this.state;

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
															checked={selectedGender === item.value}
															onChange={e => this.selectGender(e.target.value)}
													/>
													<p className="input-label">{item.label}</p>
												</label>
											</div>
										)
									})}
								</form>
							</div>

							<div className="assessment-tabs-nav row sp-assessment-tabs-nav">
								<div onClick={e => this.selectEvaluation('strength')} className={`col-xs-12 col-md-4 ${selectedEvaluation === 'strength' ? 'active' : ''}`}>
									<a href="javascript:;">Strength</a>
								</div>
								<div onClick={e => this.selectEvaluation('technique')} className={`col-xs-12 col-md-4 ${selectedEvaluation === 'technique' ? 'active' : ''}`}>
									<a href="javascript:;">Technique</a>
								</div>
								<div onClick={e => this.selectEvaluation('flexibility')} className={`col-xs-12 col-md-4 ${selectedEvaluation === 'flexibility' ? 'active' : ''}`}>
									<a href="javascript:;">Flexibility</a>
								</div>
							</div>

							{selectedEvaluation === 'strength' && (
								<div className="step-content sp-assesment-content">
									<p>How many strict pull-ups can you complete?</p>
									<form className="form-select">
										<select className="form-control">
											<option value="1">0 strict pull-ups</option>
											<option value="3">2 strict pull-ups</option>
											<option value="5">5 strict pull-ups</option>
											<option value="10">12 strict pull-ups</option>
										</select>
									</form>
									<p>How many strict dips can you complete?</p>
									<form className="form-select">
										<select className="form-control">
											<option value="1">0 strict dips</option>
											<option value="3">2 strict dips</option>
											<option value="5">5 strict dips</option>
											<option value="10">12 strict dips</option>
										</select>
									</form>
								</div>
							)}
							{selectedEvaluation === 'technique' && (
								<div className="step-content sp-assesment-content">
									<p>Please select your False Grip ability:</p>
									<form className="form-select">
										<select className="form-control">
											<option value="1">Not able to use false grip on low rings.</option>
											<option value="5">Can apply false grip low rings, not high rings.</option>
											<option value="10">False grip pull up while hanging on high rings.</option>
										</select>
									</form>
									<form className="form-select">
										<select className="form-control">
											<option value="1">Rings pull to the armpits instead of the sternum and athlete skips steps during transition on low rings.</option>
											<option value="5">Transition rings to sternum low feet under rings, rings go to armpits feet extended in front of the body.</option>
											<option value="10">Athlete can successfully perform an l-sit transition on low rings while rings pull to sternum and trace the bottom pecs.</option>
										</select>
									</form>
								</div>									
							)}
							{selectedEvaluation === 'flexibility' && (
								<div className="step-content sp-assesment-content">
									<p>Please select your current Shoulder position when performing a ring dip:</p>
									<form className="form-select">
										<select className="form-control">
											<option value="1">Shoulder remains above elbow at bottom of ring dip hold.</option>
											<option value="5">Shoulder at parallel in bottom of dip position.</option>
											<option value="10">Shoulder below elbow ring dip hang.</option>
										</select>
									</form>
									<p>Please select the movement of the rings during transition</p>
									<form className="form-select">
										<select className="form-control">
											<option value="1">Rings cannot come to sternum with feet supporting on low rings.</option>
											<option value="5">Rings trace nipple line in transition.</option>
											<option value="10">Rings trace under pecs through transition.</option>
										</select>
									</form>
								</div>
							)}

							<div className="bottom-padding text-center">
								<Link to="/specialty-programs/assessment/result" className="btn btn-primary btn-lg">Evaluate</Link>
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

