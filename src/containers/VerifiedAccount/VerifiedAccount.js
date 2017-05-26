import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {JumbotronWhite, MenubarWhite} from '../../components';
import {Link} from "react-router";

export default class VerifiedAccount extends Component {

	render() {
		const description = (
			<div>
				We have verified your account <br/>
				<span className="text-primary">example@example.com</span> <br/>
				successfully.
			</div>
		);

		return (
			<div>
				<Helmet title="Verified Account"/>

				<MenubarWhite title="Verified Account"/>

				<div className="container">

					<JumbotronWhite
						title="Welcome to"
						description={description}
						logo={true}
					/>
				</div>
				<Link to="/" className="btn btn-primary btn-block btn-lg btn-fixed-bottom">Start Training</Link>
			</div>
		);
	}
}
