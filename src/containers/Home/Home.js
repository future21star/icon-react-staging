import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {BottomNav, MenubarTurquoise} from '../../components'
import {Link} from "react-router";
import {connect} from "react-redux";

@connect(
	state => ({user: state.auth.user}),
	{}
)
export default class Home extends Component {
	render() {
		const {user} = this.props;

		const leftSideContent = (
			<div>
				<Link to="profile"><span className="icon-user-profile"/></Link>
			</div>
		);

		return (
			<div >
				<Helmet title="Home"/>

				<MenubarTurquoise title="Today's Workout" leftSideContent={leftSideContent}/>
				<div className="container">
					<h1>Home page</h1>

					<br/>
					<br/>
					<div className="panel panel-default">
						<div className="panel-heading">
							<h3 className="panel-title">You subscription status (for demo only)</h3>
						</div>
							<table className="table table-bordered">
								<tbody>
									<tr>
										<th>Subscription ID:</th>
										<td>{user.subscription.subscription_id}</td>
									</tr>
									<tr>
										<th>Subscription Name:</th>
										<td>{user.subscription.subscription_name}</td>
									</tr>
									<tr>
										<th>Subscription Status:</th>
										<td>{user.subscription.status}</td>
									</tr>
									<tr>
										<th>Access to Vault sections:</th>
										<td>
											<ul>
											{user.vaultAccess.map((item, i) => {
												return <li key={i}>{item}</li>
											})}
											</ul>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
				</div>

				<BottomNav/>
			</div>
		);
	}
}
