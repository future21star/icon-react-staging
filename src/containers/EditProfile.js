import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {Menubar, SuccessMessage, ErrorMessage, CancelMembershipModal} from '../components/index';
import {Link} from "react-router";
import Select from 'react-select';
import {range} from "lodash";
import {connect} from "react-redux";
import {push} from 'react-router-redux';
import axios from "axios";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {showLoading, hideLoading} from 'react-redux-loading-bar'
import {
	setAuthUserAsEditingUser,
	changeEditProfileField,
	editProfile,
	changeAvatar
} from "../redux/modules/editProfileStore";

@connect(
	state => ({
		user: state.authStore.user,
		editProfileStore: state.editProfileStore,
	}),
	{
		setAuthUserAsEditingUser,
		changeEditProfileField,
		editProfile,
		changeAvatar,
		showLoading,
		hideLoading,
		pushState: push
	}
)

export default class EditProfile extends Component {
	static propTypes = {
		user: PropTypes.object.isRequired,
		editProfileStore: PropTypes.object.isRequired,
		setAuthUserAsEditingUser: PropTypes.func.isRequired,
		changeEditProfileField: PropTypes.func.isRequired,
		editProfile: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);

		this.state = {
			showCancelMembershipModal: false
		}
	}

	componentDidMount() {
		this.props.setAuthUserAsEditingUser(this.props.user);
	}

	toggleCancelMembershipModal = () => {
		this.setState({
			showCancelMembershipModal: !this.state.showCancelMembershipModal
		})
	};

	genderOptions = [
		{value: 'Yes', label: 'Male'},
		{value: 'No', label: 'Female'}
	];

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
		this.props.changeEditProfileField('gender', gender.value);
	};

	changeHeightFt = (heightFt) => {
		this.props.changeEditProfileField('height_feet', heightFt.value);
	};

	changeHeightIn = (heightIn) => {
		this.props.changeEditProfileField('height_inches', heightIn.value);
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.editProfileStore.updated) {
			this.props.pushState('/profile');
		}
	}

	handleSubmit = (event) => {
		event.preventDefault();
		const {editProfileStore} = this.props;
		this.props.editProfile({
			name: editProfileStore.editingUser.name,
			email: editProfileStore.editingUser.email,
			gender: editProfileStore.editingUser.gender,
			height_feet: editProfileStore.editingUser.height_feet,
			height_inches: editProfileStore.editingUser.height_inches,
			weight: editProfileStore.editingUser.weight
		});
	};

	changeAvatar = (avatarUrl) => {
		this.props.changeAvatar(avatarUrl);
	};

	showImageBrowser = () => {
		this.refs.avatarRef.click();
	};

	uploadAvatar = (e) => {
		let file = e.target.files[0];
		if (!file) return;

		let formData = new FormData();
		formData.append('file', file);
		this.props.showLoading();

		axios.post('http://54.148.236.111/wp-json/wp/v2/media', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: 'Bearer ' + this.props.user.jwtToken
			}
		}).then(result => {
			this.props.changeAvatar(result.data.source_url);
			this.props.hideLoading();
		}).catch(error => {
			console.log(error);
			this.props.hideLoading();
		})
	};

	render() {
		const avatarImages = [
			'https://s-media-cache-ak0.pinimg.com/736x/d7/a3/ae/d7a3ae5506817d1ef60dabde37150fe9--grumpy-cat-humor-grumpy-cats.jpg',
			'https://humorkitty.files.wordpress.com/2015/06/cute-cat-hipster-desktop-background-wallpaper.jpg?w=256&h=256&crop=1',
			'https://lh3.googleusercontent.com/-oL8Q6AGlCng/VdIBUw4AwTI/AAAAAAAAACA/ETe50Q5K8AU/s256-p/funny-cat-glasses-dressed-reflex.jpg',
			'https://pbs.twimg.com/profile_images/682493419579699200/xu2JTnH4.jpg',
			'https://s-media-cache-ak0.pinimg.com/736x/fc/53/60/fc53609874a4fe09f114a6ed15b8ed95--pretty-cats-cute-cats.jpg',
			'https://lh3.googleusercontent.com/-N3snMHFmoL4/AAAAAAAAAAI/AAAAAAAAAAc/WAk5ewtc1sw/photo.jpg',
		];

		const {editProfileStore, changeEditProfileField} = this.props;

		const rightSideContent = (
			<Link to="profile" className="text-danger">Cancel</Link>
		);

		return editProfileStore.editingUser ? (

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
					<Helmet title="Edit Profile"/>

					<Menubar
						title="Edit Profile"
						rightSideContent={rightSideContent}
						className="menu-bar-grey"
						backButton={true}
					/>

					<form className="register-page--register-form menu-head-buffer" onSubmit={this.handleSubmit}>
						<div className="container user-update-container">

							<div className="row">
								<div className="col-xs-12">

									<div className="text-center">
										<button className="btn btn-default" type="button" onClick={this.toggleCancelMembershipModal}>Cancel Membership</button>
									</div>

									<div className="upload-avatar-wrapper">
										<img src={editProfileStore.editingUser.profile_picture_url} onClick={this.showImageBrowser}/>
										<input ref="avatarRef" type="file" accept=".jpg,.jpeg,.png" style={{display: 'none'}}
													 onChange={this.uploadAvatar}/>
										<br/>
										<p>Current Avatar</p>
									</div>

									<ErrorMessage error={editProfileStore.error}/>
									<SuccessMessage success={editProfileStore.success}/>

									<label>Select New Avatar:</label>
									<div className="row">
										{avatarImages.map((avatar, i) => {
											return (
												<div className="col-xs-4 col-sm-2" key={i}>
													<img className="img-circle" onClick={e => this.changeAvatar(avatar)} src={avatar} width="100%"
															 alt="Avatar"/>
												</div>
											)
										})}
									</div>

									<div className="form-group block">
										<div className="input-group input-effect">
											<input
												type="text"
												name="name"
												value={editProfileStore.editingUser.name}
												onChange={e => changeEditProfileField(e.target.name, e.target.value)}
												className="form-control"
												placeholder="Full Name"/>
											<div className="input-group-addon">
												<span className="icon-user-profile-filled"/>
											</div>
											<div className="underline"/>

										</div>
									</div>
									<div className="form-group block">
										<div className="input-group input-effect">
											<input type="email"
														 name="email"
														 value={editProfileStore.editingUser.email}
														 onChange={e => changeEditProfileField(e.target.name, e.target.value)}
														 className="form-control"
														 placeholder="Email"/>
											<div className="input-group-addon">
												<span className="icon-email"/>
											</div>
											<div className="underline"/>
										</div>
									</div>
									<div className="form-group block">
										<div className="input-group input-effect">
											<div className="input-group-addon">
												<span className="icon-gender"/>
											</div>
											<Select
												className="pretty-select"
												value={editProfileStore.editingUser.gender}
												placeholder="Gender"
												options={this.genderOptions}
												onChange={this.changeGender}
												clearable={false}
												arrowRenderer={EditProfile.arrowRenderer}/>
											<div className="underline"/>
										</div>
									</div>
									<div className="form-group block">
										<div className="row">
											<div className="col-xs-6">
												<div className="input-effect">
													<Select placeholder="Height (Ft)"
																	value={editProfileStore.editingUser.height_feet}
																	options={this.heightFeetOptions}
																	onChange={this.changeHeightFt}
																	clearable={false}
																	arrowRenderer={EditProfile.arrowRenderer}
																	className="pretty-select"/>
													<div className="underline"/>
												</div>
											</div>
											<div className="col-xs-6">
												<div className="input-effect">
													<Select
														placeholder="Height (In)"
														value={editProfileStore.editingUser.height_inches}
														options={this.heightInchesOptions}
														onChange={this.changeHeightIn}
														clearable={false}
														arrowRenderer={EditProfile.arrowRenderer}
														className="pretty-select"/>
													<div className="underline"/>
												</div>
											</div>
											<div className="col-xs-6 col-xs-offset-3">
												<div className="input-number input-number-effect">
													<input name="weight"
																 type="number"
																 value={editProfileStore.editingUser.weight}
																 onChange={e => changeEditProfileField(e.target.name, e.target.value)}
																 className="form-control"
																 placeholder="Weight (Kg)"/>
													<span className="icon-range"/>
												</div>
											</div>
										</div>

										<button className="btn btn-primary btn-block btn-lg btn-fixed-bottom" type="submit">Save Changes
										</button>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>

				<CancelMembershipModal isShown={this.state.showCancelMembershipModal} onClose={this.toggleCancelMembershipModal}/>
			</ReactCSSTransitionGroup>
		) : <div/>;
	}
}
