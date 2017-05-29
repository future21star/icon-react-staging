import React, {Component, PropTypes} from 'react';
import './ErrorMessage.scss';

export default class ErrorMessage extends Component {
	static propTypes = {
		error: PropTypes.object
	};

	render() {
		const {error} = this.props;

		return (
			<div>
				{ error ?
					(<div className="alert alert-danger">
						{error.message}
					</div>) : undefined
				}
			</div>
		);
	}
}
