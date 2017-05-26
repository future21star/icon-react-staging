import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {MenubarWhite, ShowPasswordInput} from '../../components';
import {Link} from "react-router";
import Select from 'react-select';

export default class Register extends Component {

	constructor(props) {
		super(props);

		this.logChange = this.logChange.bind(this);
	}

	genderOptions = [
		{value: 'male', label: 'Male'},
		{value: 'female', label: 'Female'}
	];

	heightOptions = [
		{value: '1', label: '1'},
		{value: '2', label: '2'}
	];

	weightOptions = [
		{value: '1', label: '1'},
		{value: '2', label: '3'}
	];

	subscriptionOptions = [
		{value: 'base', label: 'Base'},
		{value: 'rx', label: 'Rx'},
		{value: 'max', label: 'Mxx'},
		{value: 'nutrition', label: 'Nutrition'},
		{value: 'masters', label: 'Masters'},
	];

	static arrowRenderer() {
		return (
			<span className="icon-arrow-down"/>
		)
	};

	logChange(val) {
		console.dir(val);
	}


	render() {
		const rightSideContent = (
			<Link to="login" className="text-danger">Cancel</Link>
		);

		const uploadAvatar = require('../../../static/upload-avatar.png');


		return (
			<div>
				<Helmet title="Create Account"/>

				<MenubarWhite title="Create Account" rightSideContent={rightSideContent}/>

				<form className="register-page--register-form">
					<div className="container">

						<div className="row">
							<div className="col-xs-12">

								<div className="upload-avatar-wrapper">
									<img src={uploadAvatar}/>
								</div>
								<div className="form-group">
									<div className="input-group">
										<div className="input-group-addon">
											<span className="icon-user-profile-filled"/>
										</div>
										<input type="text" ref="full_name" className="form-control" placeholder="Full Name"/>
									</div>
								</div>

								<div className="form-group">
									<div className="input-group">
										<div className="input-group-addon">
											<span className="icon-email"/>
										</div>
										<input type="email" ref="email" className="form-control" placeholder="Your Email"/>
									</div>
								</div>

								<ShowPasswordInput/>

								<div className="form-group">
									<div className="input-group">
										<div className="input-group-addon">
											<span className="icon-gender"/>
										</div>
										<Select
											name="gender"
											placeholder="Gender"
											options={this.genderOptions}
											onChange={this.logChange}
											clearable={false}
											arrowRenderer={Register.arrowRenderer}
											className="pretty-select"
										/>
									</div>
								</div>

								<div className="form-group">
									<div className="row">
										<div className="col-xs-6">
											<Select
												name="height"
												placeholder="Height"
												options={this.heightOptions}
												onChange={this.logChange}
												clearable={false}
												arrowRenderer={Register.arrowRenderer}
												className="pretty-select"
											/>
										</div>
										<div className="col-xs-6">
											<Select
												name="weight"
												placeholder="Weight"
												options={this.weightOptions}
												onChange={this.logChange}
												clearable={false}
												arrowRenderer={Register.arrowRenderer}
												className="pretty-select"
											/>
										</div>
									</div>
								</div>

								<div className="form-group">
									<Select
										name="subscription"
										placeholder="Select your subscription"
										options={this.subscriptionOptions}
										onChange={this.logChange}
										clearable={false}
										arrowRenderer={Register.arrowRenderer}
										className="pretty-select"
									/>
								</div>

								<button className="btn btn-primary btn-block btn-lg btn-fixed-bottom" type="submit">Create Account
								</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		);
	}
}
