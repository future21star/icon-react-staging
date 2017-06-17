import React, {Component} from 'react';
import {Collapse} from 'react-collapse';
import './Note.scss';

export default class Note extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isOpened: false,
		};
		this.toggleExpand = this.toggleExpand.bind(this);
	}

	toggleExpand() {
		this.setState({
			isOpened: !this.state.isOpened
		});
	}

	render() {

		const {noteContent, classNames} = this.props;

		return (
			<div className="note-wrapper">
				<div className="container">
					<div className={classNames}>
						<div className="note-header" onClick={this.toggleExpand}>
							<h3 className="note-title">
								Workout Notes
								{
									this.state.isOpened ?

									<i className="fa fa-minus pull-right" aria-hidden="true"/> :

									<span className="icon-nav-links pull-right"/>
								}
							</h3>
						</div>

						<Collapse isOpened={this.state.isOpened}>
							<div className="note-body">
								{noteContent}
							</div>
						</Collapse>

					</div>
				</div>
			</div>
		);
	}
}
