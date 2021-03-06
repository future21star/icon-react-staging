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

	createMarkup = (html) => {
        return {__html: html};
    };

	render() {

		const {noteContent, classNames} = this.props;
		const {isOpened} = this.state;

		return (
			<div className="note-wrapper">
				<div className="container-small">
					<div className={classNames}>
						<div className="note-header" onClick={this.toggleExpand}>
							<h4 className="note-title">
								Workout Tips
								{isOpened ? <i className="fa fa-minus pull-right"/> :
									<span className="icon-nav-links pull-right"/>}
							</h4>
						</div>

						<Collapse isOpened={isOpened}>
							<div className="note-body">
								<div dangerouslySetInnerHTML={this.createMarkup(noteContent)}/>
							</div>
						</Collapse>

					</div>
				</div>
			</div>
		);
	}
}
