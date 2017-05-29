import React, {Component, PropTypes} from 'react';
import './SuccessMessage.scss';

export default class SuccessMessage extends Component {
	static propTypes = {
		success: PropTypes.object
	};

	render() {
		const {success} = this.props;

		return (
			<div>
				{ success ?
					(<div className="alert alert-success">
						{success.message}
					</div>) : undefined
				}
			</div>
		);
	}
}
