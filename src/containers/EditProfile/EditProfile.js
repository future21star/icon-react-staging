import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {MenubarWhite} from '../../components';
import {Link} from "react-router";
import Select from 'react-select';
import {range} from "lodash";

export default class EditProfile extends Component {
	constructor(props) {
		super(props);
	}

	genderOptions = ['Male', 'Female'].map(val => {
		return {value: val, label: val};
	});

	heightFeetOptions = range(1, 8).map(val => {
		return {value: val, label: `${val} Ft`};
	});

	heightInchesOptions = range(1, 13).map(val => {
		return {value: val, label: `${val} In`};
	});

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

	changeHeightFt = (heightFt) => {
		this.setState({
			heightFt: heightFt.value
		});
	};

	changeHeightIn = (heightIn) => {
		this.setState({
			heightIn: heightIn.value
		});
	};

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
											onChange={this.changeGender}
											clearable={false}
											arrowRenderer={EditProfile.arrowRenderer}
											className="pretty-select"
										/>
									</div>
								</div>

								<div className="form-group">
									<div className="row">
										<div className="col-xs-4">
											<Select
												name="heightFt"
												placeholder="Height (Ft)"
												options={this.heightFeetOptions}
												onChange={this.changeHeightFt}
												clearable={false}
												arrowRenderer={EditProfile.arrowRenderer}
												className="pretty-select"
											/>
										</div>
										<div className="col-xs-4">
											<Select
												name="heightIn"
												placeholder="Height (In)"
												options={this.heightInchesOptions}
												onChange={this.changeHeightIn}
												clearable={false}
												arrowRenderer={EditProfile.arrowRenderer}
												className="pretty-select"
											/>
										</div>
										<div className="col-xs-4">
											<input type="number" ref="weight" className="form-control" placeholder="Weight (Kg)"/>
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
