import React, {Component} from 'react';
import './ShowPasswordInput.scss';

export default class ShowPasswordInput extends Component {

	constructor(props) {
		super(props);

		this.state = {
			mode: 'password',
			text: 'Show'
		};
	}

	getValue() {
		return this.refs.password.value;
	}

	toggleMode = () => {
		let prevModeIsPassword = this.state.mode === 'password';
		this.setState({
			mode: prevModeIsPassword ? 'text' : 'password',
			text: prevModeIsPassword ? 'Hide' : 'Show',
		})
	};

	render() {
		return (
			<div className="form-group show-password-form-group block">
				<div className="input-group input-effect">
					<div className="input-group-addon">
						<span className="icon-register-password"/>
					</div>
					<input ref="password" type={this.state.mode} className="form-control" placeholder="Password" {...this.props}/>
					<div className="underline"/>
					<span className="input-group-btn">
						<button className="btn btn-hide-show" type="button" onClick={this.toggleMode}>
							{this.state.text}
						</button>
					</span>
				</div>
			</div>
		);
	}
}
