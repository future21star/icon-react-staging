import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {MenubarWhite} from '../../components';
import {Link} from "react-router";
import Select from 'react-select';

export default class EditProfile extends Component {
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
			<Link to="profile" className="text-danger">Cancel</Link>
		);

		const uploadAvatar = require('../../../static/upload-avatar.png');

		return (
			<div>
				<Helmet title="Edit Profile"/>

				<MenubarWhite title="Edit Profile" rightSideContent={rightSideContent}/>

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
											arrowRenderer={EditProfile.arrowRenderer}
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
												arrowRenderer={EditProfile.arrowRenderer}
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
												arrowRenderer={EditProfile.arrowRenderer}
												className="pretty-select"
											/>
										</div>
									</div>
								</div>

								<button className="btn btn-primary btn-block btn-lg btn-fixed-bottom" type="submit">Save Changes
								</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		);
	}
}
