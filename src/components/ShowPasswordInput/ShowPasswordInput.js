import React, {Component} from 'react';
import './ShowPasswordInput.scss';

export default class ShowPasswordInput extends Component {

	constructor(props) {
		super(props);

		this.state = {
			mode: 'password',
			text: 'Show'
		};

		this.toggleMode = this.toggleMode.bind(this);
	}

	toggleMode() {
		let prevModeIsPassword = this.state.mode === 'password';
		this.setState({
			mode: prevModeIsPassword ? 'text' : 'password',
			text: prevModeIsPassword ? 'Hide' : 'Show',
		})
	}

	render() {
		return (
			<div className="form-group show-password-form-group">
				<div className="input-group">
					<div className="input-group-addon">
						<span className="icon-register-password"/>
					</div>
					<input type={this.state.mode} ref="password" className="form-control" placeholder="Password" {...this.props}/>
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