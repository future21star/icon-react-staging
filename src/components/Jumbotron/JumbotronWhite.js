import React, {Component, PropTypes} from 'react';
import Logo from '../Logo/Logo'
import './Jumbotron.scss';

export default class JumbotronWhite extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		description: PropTypes.object,
		logo: PropTypes.bool
	};

	render() {
		const {title, description, logo} = this.props;
		return (
			<div className="jumbotron jumbotron-white">
				<h3 className="jumbotron-title">{title}</h3>
				{logo && (
					<div className="row">
						<div className="col-xs-8 col-xs-offset-2">
							<Logo/>
						</div>
					</div>
				)}
				<div className="jumbotron-description">{description}</div>
			</div>
		);
	}
}
