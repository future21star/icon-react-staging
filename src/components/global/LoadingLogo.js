import React, {Component} from 'react';

export default class LoadingLogo extends Component {
	render(){

		const logoImg = require('../../../static/iconlogobg.png');

		return(
			<div className="loading-logo">
				<div className="lds-css ng-scope">
				  <div className="lds-eclipse">
				    <div></div>
				  </div>
				</div>
				<img src={logoImg} alt="logo"/>
			</div>
		);
	}
}