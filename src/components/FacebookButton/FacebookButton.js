import React, {Component, PropTypes} from 'react';
import './FacebookButton.scss';

export default class FacebookButton extends Component {

	render() {
		return (
			<button className="btn btn-lg btn-block btn-fb" type="button">
				<i className="fa fa-facebook"/> Log In with Facebook
			</button>
		);
	}
}
