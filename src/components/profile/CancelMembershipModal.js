import React, {Component, PropTypes} from 'react';

export default class CancelMembershipModal extends Component {
	static propTypes = {
		isShown: PropTypes.bool.isRequired,
		onClose: PropTypes.func.isRequired
	};

	render() {
		const {isShown, onClose} = this.props;

		return (
			<div>
				<div className={isShown ? "modal show" : "modal"}>
					<div className="modal-dialog modal-lg">
						<div className="modal-content">
							<div className="modal-header">
								<button type="button" className="close" onClick={onClose}>&times;</button>
								<h4 className="modal-title">Cancel membership?</h4>
							</div>
							<div className="modal-body">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum enim incidunt nobis odio placeat?
								Commodi corporis dolores ea earum facere in ipsa libero pariatur possimus, praesentium provident totam
								ullam, voluptatem!
								<br/>
								<br/>

								{/*yes, it supports grid*/}
								<div className="row">
									<div className="col-xs-6 text-justify">
										Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi commodi, ea excepturi facilis,
										incidunt iste itaque laborum magnam minus obcaecati perferendis qui rerum sequi similique tempore
										ullam velit voluptate voluptates!
									</div>
									<div className="col-xs-6 text-justify">
										Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam autem cupiditate debitis delectus
										ducimus eligendi error, est id ipsa iste nemo nostrum pariatur placeat porro quasi quo reprehenderit
										voluptas, voluptates.
									</div>
								</div>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-default" onClick={onClose}>Close</button>
								<button type="button" className="btn btn-primary">Save changes</button>
							</div>
						</div>
					</div>
				</div>
				{isShown ? <div className="modal-backdrop fade in"/> : undefined}
			</div>
		);
	}
}
