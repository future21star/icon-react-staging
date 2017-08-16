import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Menubar, BtnBottom} from '../../components/index';
import {connect} from "react-redux";
import {Link} from 'react-router';
import Select from 'react-select';
import {range} from "lodash";

@connect(
	state => ({
		vaultAccess: state.authStore.user.vaultAccess
	}),
	{}
)

export default class NutritionCalculator extends Component {

	constructor(props) {
		super(props);

		this.state = {
			gender: '',
			age:'',
			height:'',
			weight:'',
			unit:'pounds',
			activityLevel:''
		};
	}

	static arrowRenderer() {
		return (
			<span className="icon-arrow-down"/>
		)
	};

	genderOptions = ['Male', 'Female'].map(val => {
		return {value: val, label: val};
	});

	heightOptions = range(1, 8).map(val => {
		return {value: val, label: `${val} Ft`};
	});

	weightOptions = range(30, 201).map(val => {
		return {value: val, label: `${val} kg`};
	});

	activityLevelOptions = ['Sedentary Lifestyle', 'Little Daily Activity'].map(val => {
		return {value: val, label: val};
	});

	changeGender = (gender) => {
		this.setState({
			gender: gender
		});
	};

	changeHeight = (height) => {
		this.setState({
			height: height
		});
	};

	changeWeight = (weight) => {
		this.setState({
			weight: weight
		});
	};

	changeNutritionCalculatorField = (name, value) => {
		this.setState({
			name: value
		});
	};

	changeUnit = (e, unitName) => {
		e.preventDefault();
		this.setState({
			unit: unitName
		});
	};

	changeActivityLevel = (activityLevel) => {
		this.setState({
			activityLevel: activityLevel
		});
	};

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
					<Helmet title="Nutrition - Calculator"/>

					<Menubar
						title="Nutrition Calculator"
						leftSideContent={<Link to="/nutrition"><span className="icon-arrow-left" style={{fontSize: 16+'px'}}/>
						</Link>}
						className="gradient-turquoise menu-color-white">
					</Menubar>

					<div className="nutrition-calculator-page-content-wrapper">
						<div className="nutrition-calculator-page-content">
							<div className="calculator-header">
								<h3>fill in your information</h3>
								<p>The results are based on the track you chose to set your goals.</p>
							</div>
							<div className="calculator-section">
								<form action="">
									<div className="form-group block">
										<div className="input-group input-effect">
											<div className="input-group-addon">
												<span className="icon-gender"/>
											</div>
											<Select
												className="pretty-select"
												value={this.state.gender}
												placeholder="Gender"
												options={this.genderOptions}
												onChange={this.changeGender}
												clearable={false}
												arrowRenderer={NutritionCalculator.arrowRenderer}
											/>
											<div className="underline"/>
										</div>
									</div>
									<div className="form-group block">
										<div className="input-group input-effect input-effect-less-padding">
											<input
											 	type="number"
											 	name="age"
												value={this.state.age}
												onChange={e => this.changeNutritionCalculatorField(e.target.name, e.target.value)}
												className="form-control"
												placeholder="Your Age"
											/>
											<div className="underline"/>
										</div>
									</div>
									<div className="form-group block">
										<div className="row">
											<div className="col-xs-6">
												<div className="input-group input-effect">
													<div className="input-group-addon">
														<span className="icon-gender"/>
													</div>
													<Select
														className="pretty-select"
														value={this.state.height}
														placeholder="Height"
														options={this.heightOptions}
														onChange={this.changeHeight}
														clearable={false}
														arrowRenderer={NutritionCalculator.arrowRenderer}
													/>
													<div className="underline"/>
												</div>
											</div>
											<div className="col-xs-6">
												<div className="input-group input-effect">
													<div className="input-group-addon">
														<span className="icon-gender"/>
													</div>
													<Select
														className="pretty-select"
														value={this.state.weight}
														placeholder="Weight"
														options={this.weightOptions}
														onChange={this.changeWeight}
														clearable={false}
														arrowRenderer={NutritionCalculator.arrowRenderer}
													/>
													<div className="underline"/>
												</div>
											</div>
										</div>
									</div>
									<div className="form-group block">
										<div className="unit-radios">
											<div className="btn-group-block" data-toggle="buttons">
												<label
													className={`btn btn-primary btn-white-left ${this.state.unit === 'pounds' ? 'active' : ''}`}
													onClick={e => this.changeUnit(e, 'pounds')}
												>
													<input type="radio" name="options" id="option1"/> Pounds
												</label>
												<label
													className={`btn btn-primary btn-white-right ${this.state.unit === 'metrics' ? 'active' : ''}`}
													onClick={e => this.changeUnit(e, 'metrics')}
												>
													<input type="radio" name="options" id="option2"/> Metrics
												</label>
											</div>
										</div>
									</div>
									<div className="form-group block">
										<div className="row">
											<div className="col-xs-10">
												<div className="input-group input-effect">
													<div className="input-group-addon">
														<span className="icon-gender"/>
													</div>
													<Select
														className="pretty-select"
														value={this.state.height}
														placeholder="Height"
														options={this.heightOptions}
														onChange={this.changeHeight}
														clearable={false}
														arrowRenderer={NutritionCalculator.arrowRenderer}
													/>
													<div className="underline"/>
												</div>
											</div>
											<div className="col-xs-2">
												<div className="input-group-addon">
													<Link to="/nutrition/help">
														<span className="icon-information help-icon"/>
													</Link>
												</div>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
						<div className="bottom-button">
							<BtnBottom
								classNames="btn btn-primary btn-block"
								icon={null}
								title="Calculate My Goals"
								onClick={e => {}}
							/>
						</div>
					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}

