import React from 'react';
import {JumbotronWhite} from '../../components'
import {Link} from "react-router";

export default function NotFound() {
	const description = (
		<div>
			This page does not exist.
		</div>
	);
	return (
		<div className="container">
			<JumbotronWhite
				title="Oh Crap! 404"
				description={description}
				logo={true}
			/>

			<Link to="/" className="btn btn-danger btn-lg btn-fixed-bottom"> Go Home</Link>
		</div>
	);
}
