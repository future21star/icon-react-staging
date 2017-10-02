import React, {Component} from 'react';
import {Link} from "react-router";

export default class EmailCapture extends Component {
	render(){

		return(
			<div className="container-fluid menu-head-buffer">
				<div className="subscription-upgrade-card">
					<h1>Want A Free Week of Icon?</h1>
					<p>Get a free week of programming so you can see the Icon Difference.</p>
					<button className="btn btn-lg btn-icon">I Want Free Programming</button>
				</div>
			</div>		
		);
	}
}