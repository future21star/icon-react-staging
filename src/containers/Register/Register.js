import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {MenubarWhite, ShowPasswordInput, Loader, SuccessMessage, ErrorMessage} from '../../components';
import {Link} from "react-router";
import Select from 'react-select';
import {register} from '../../redux/modules/auth';

@connect(
	state => ({
		auth: state.auth
	}),
	{register}
)

export default class Register extends Component {
	static propTypes = {
		auth: PropTypes.object,
		register: PropTypes.func,
	};

	constructor(props) {
		super(props);

		this.state = {
			gender: null,
			height: null,
			weight: null,
			subscription: null
		}
	}

	genderOptions = [
		{value: 'Male', label: 'Male'},
		{value: 'Female', label: 'Female'}
	];

	heightOptions = [
		{value: '1', label: '1'},
		{value: '2', label: '2'}
	];

	weightOptions = [
		{value: '1', label: '1'},
		{value: '2', label: '2'}
	];

	subscriptionOptions = [
		{value: 'Base', label: 'Base'},
		{value: 'Rx', label: 'Rx'},
		{value: 'Max', label: 'Max'},
		{value: 'Nutrition', label: 'Nutrition'},
		{value: 'Masters', label: 'Masters'},
	];

	static arrowRenderer() {
		return (
			<span className="icon-arrow-down"/>
		)
	};

	changeGender = (gender) => {
		this.setState({
			gender: gender.value
		});
	};

	changeHeight = (height) => {
		this.setState({
			height: height.value
		});
	};

	changeWeight = (weight) => {
		this.setState({
			weight: weight.value
		});
	};

	changeSubscription = (subscription) => {
		this.setState({
			subscription: subscription.value
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const {username, full_name, email, password} = this.refs;
		const {gender, height, weight, subscription} = this.state;

		const data = {
			username: username.value,
			full_name: full_name.value,
			email: email.value,
			password: password.getValue(),
			gender,
			height,
			weight,
			subscription
		};
		this.props.register(data);
	};


	render() {
		const {auth} = this.props;

		const rightSideContent = (
			<Link to="login" className="text-danger">Cancel</Link>
		);

		const uploadAvatar = require('../../../static/upload-avatar.png');

		return (
			<div>
				<Helmet title="Create Account"/>

				<MenubarWhite title="Create Account" rightSideContent={rightSideContent}/>

				<form className="register-page--register-form" onSubmit={this.handleSubmit}>
					<div className="container">

						<div className="row">
							<div className="col-xs-12">

								<div className="upload-avatar-wrapper">
									<img src={uploadAvatar}/>
								</div>

								<SuccessMessage success={auth.success}/>
								<ErrorMessage error={auth.error}/>

								<div className="form-group">
									<div className="input-group">
										<div className="input-group-addon">
											<span className="icon-user-profile-filled"/>
										</div>
										<input type="text" ref="username" className="form-control" placeholder="Username"/>
									</div>
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

								<ShowPasswordInput ref="password"/>

								<div className="form-group">
									<div className="input-group">
										<div className="input-group-addon">
											<span className="icon-gender"/>
										</div>
										<Select
											name="gender"
											value={this.state.gender}
											placeholder="Gender"
											options={this.genderOptions}
											onChange={this.changeGender}
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
												value={this.state.height}
												placeholder="Height"
												options={this.heightOptions}
												onChange={this.changeHeight}
												clearable={false}
												arrowRenderer={Register.arrowRenderer}
												className="pretty-select"
											/>
										</div>
										<div className="col-xs-6">
											<Select
												name="weight"
												value={this.state.weight}
												placeholder="Weight"
												options={this.weightOptions}
												onChange={this.changeWeight}
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
										value={this.state.subscription}
										placeholder="Select your subscription"
										options={this.subscriptionOptions}
										onChange={this.changeSubscription}
										clearable={false}
										arrowRenderer={Register.arrowRenderer}
										className="pretty-select"
									/>
								</div>
								{auth.loading ? <Loader/> : undefined}


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
