import React, {Component} from 'react';
import {Collapse} from 'react-collapse';

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
		const {isOpened} = this.state;

		return (
			<div className="note-wrapper">
				<div className="container container-small">
					<div className={classNames}>
						<div className="note-header" onClick={this.toggleExpand}>
							<h3 className="note-title">
								<span className="icon-notes"/>
								Notes
								{isOpened ? <i className="fa fa-minus pull-right"/> :
									<span className="icon-nav-links pull-right"/>}
							</h3>
						</div>

						<Collapse isOpened={isOpened}>
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
