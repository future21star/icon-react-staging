import React, {Component} from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Menubar, BtnBottom} from '../../components/index';
import {connect} from "react-redux";
import {Link} from 'react-router';
import Select from 'react-select';
import {range} from "lodash";
import {
	changeCalculatorField
} from "../../redux/modules/nutritionCalculatorStore";

@connect(
	state => ({
		vaultAccess: state.authStore.user.vaultAccess,
		nutritionCalculatorStore: state.nutritionCalculatorStore,
	}),
	{changeCalculatorField}
)

export default class NutritionCalculator extends Component {

	static arrowRenderer() {
		return (
			<span className="icon-arrow-down"/>
		)
	};

	genderOptions = ['Male', 'Female'].map(val => {
		return {value: val, label: val};
	});

	activityLevelOptions = [
		{value: '1.2', label: '1.2 Sedentary Lifestyle'},
		{value: '1.3', label: '1.3 Little Daily Activity'},
		{value: '1.4', label: '1.4 Some Activity'},
		{value: '1.5', label: '1.5 Moderate Activity'},
		{value: '1.6', label: '1.6 Workout A Little Every Day'},
		{value: '1.7', label: '1.7 Workout Moderately Every Day'},
		{value: '1.8', label: '1.8 Active A Lot of the Day'},
		{value: '1.9', label: '1.9 Exteremly Active Every Day'},
		{value: '2', label: '2 Exteremly Active Every Day'},
	];

	render() {
		const {vaultAccess, nutritionCalculatorStore, changeCalculatorField, formIsValid} = this.props;

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
				<div className="bottom-padding">
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
										<div className="input-effect">
											<Select
												className="pretty-select"
												value={nutritionCalculatorStore.gender}
												placeholder="Gender"
												options={this.genderOptions}
												onChange={gender => changeCalculatorField('gender', gender.value)}
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
												value={nutritionCalculatorStore.age}
												onChange={e => changeCalculatorField(e.target.name, e.target.value)}
												className="form-control"
												placeholder="Your Age"
											/>
											<div className="underline"/>
										</div>
									</div>
									<div className="form-group block">
										<div className="row">
											<div className="col-xs-6">
												<div className="input-effect input-effect-less-padding">
													<input
													 	type="input"
													 	name="height"
														value={nutritionCalculatorStore.height}
														onChange={e => changeCalculatorField(e.target.name, e.target.value)}
														className="form-control"
														placeholder="Height"
													/>
													<div className="underline"/>
												</div>
												{nutritionCalculatorStore.unit === 'pounds'
													? <small className="text-center help-block">(in feet, If you are 5' 11" please add it as 5.11)</small>
													: <small className="text-center help-block">(in meters)</small>}
											</div>
											<div className="col-xs-6">
												<div className="input-effect input-effect-less-padding">
													<input
													 	type="input"
													 	name="weight"
														value={nutritionCalculatorStore.weight}
														onChange={e => changeCalculatorField(e.target.name, e.target.value)}
														className="form-control"
														placeholder="Weight"
													/>
													<div className="underline"/>
												</div>
												<small className="text-center help-block">(in lbs)</small>
											</div>
										</div>
									</div>
									<div className="form-group block">
										<div className="unit-radios">
											<div className="btn-group-block" data-toggle="buttons">
												<label
													className={`btn btn-primary btn-white-left ${nutritionCalculatorStore.unit === 'pounds' ? 'active' : ''}`}
													onChange={e => changeCalculatorField('unit', 'pounds')}
												>
													<input type="radio" name="options" id="pounds"/> Pounds
												</label>
												<label
													className={`btn btn-primary btn-white-right ${nutritionCalculatorStore.unit === 'metrics' ? 'active' : ''}`}
													onChange={e => changeCalculatorField('unit', 'metrics')}
												>
													<input type="radio" name="options" id="metrics"/> Metrics
												</label>
											</div>
										</div>
									</div>
									<div className="form-group block">
										<div className="row">
											<div className="col-xs-10">
												<div className="input-effect">
													<Select
														className="pretty-select"
														value={nutritionCalculatorStore.activityLevel}
														placeholder="Activity Level"
														options={this.activityLevelOptions}
														onChange={level => changeCalculatorField('activityLevel', level.value)}
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
							{nutritionCalculatorStore.validForm ? (
								<Link
									className="btn btn-primary btn-lg btn-block btn-fixed-mobile"
									to="/nutrition/calculator/result"
								>Calculate My Goals</Link>
							) : (
								<Link
									className="btn btn-primary btn-lg btn-block btn-fixed-mobile"
									to="/nutrition/calculator"
								>Calculate My Goals</Link>
							)}
						</div>
					</div>
				</div>
			</ReactCSSTransitionGroup>
		);
	}
}

