import React, {Component} from 'react';
import './ProgrammingBanner.scss';

export default class ProgrammingBanner extends Component {

	render() {
		return (
			<div className="programming-banner-wrapper">
				<div className="programming-banner">
					<div className="overlay"></div>
					<div className="title">
						<h3>EMOM</h3>

						<ul className="programming-banner-list list-inline">
							<li>
								<h3>15 MIN.</h3>
								<p>Duration</p>
							</li>
							<li>
								<h3>MODERATE</h3>
								<p>Intensity</p>
							</li>
							<li>
								<h3>SHOULDERS</h3>
								<p>Focus</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}
