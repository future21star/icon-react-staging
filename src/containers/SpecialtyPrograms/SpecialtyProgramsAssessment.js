import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {connect} from "react-redux";
import CheckAccessLevel from '../HOC/CheckAccessLevel'
import {Menubar} from '../../components/index';
import {Link} from "react-router";

@connect(
	state => ({

	}),
	{}
)

@CheckAccessLevel('assessment')

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

							<div className="btn-group btn-group-lg btn-group-justified">
								<a href="javascript:;" onClick={e => this.selectEvaluation('strength')} className={selectedEvaluation === 'strength' ? "btn btn-primary" : "btn btn-default"}>Strength Evaluation</a>
								<a href="javascript:;" onClick={e => this.selectEvaluation('technique')} className={selectedEvaluation === 'technique' ? "btn btn-primary" : "btn btn-default"}>Technique Evaluation</a>
								<a href="javascript:;" onClick={e => this.selectEvaluation('flexibility')} className={selectedEvaluation === 'flexibility' ? "btn btn-primary" : "btn btn-default"}>Flexibility Evaluation</a>
							</div>

							{selectedEvaluation === 'strength' && (
								<div className="step-content">
									Options for strength
									<form className="form-select">
										<select className="form-control">
											<option value="1">S 1</option>
											<option value="2">S 2</option>
											<option value="3">S 3</option>
										</select>
									</form>
								</div>
							)}
							{selectedEvaluation === 'technique' && (
									<div className="step-content">
										Options for technique
										<form className="form-select">
											<select className="form-control">
												<option value="1">T 1</option>
												<option value="2">T 2</option>
												<option value="3">T 3</option>
											</select>
										</form>
									</div>
							)}
							{selectedEvaluation === 'flexibility' && (
									<div className="step-content">
										Options for flexibility
										<form className="form-select">
											<select className="form-control">
												<option value="1">F 1</option>
												<option value="2">F 2</option>
												<option value="3">F 3</option>
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

