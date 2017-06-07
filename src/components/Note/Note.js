import React, {Component} from 'react';
import './Note.scss';

export default class Note extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isExpanded: false,
		};
		this.toggleExpand = this.toggleExpand.bind(this);
	}

	toggleExpand() {
		this.setState({
			isExpanded: !this.state.isExpanded
		});
	}

	render() {

		const {noteContent, classNames} = this.props;

		return (
			<div className="note-wrapper">
				<div className="container">
					<div className={classNames}>
						<div className="note-header" onClick={this.toggleExpand}>
							<h3>
								Workout Notes
								{
									this.state.isExpanded ?

									<i className="fa fa-minus pull-right" aria-hidden="true"/> :

									<span className="icon-nav-links pull-right"/>
								}
							</h3>
						</div>
						{
							this.state.isExpanded ?

							<div className="note-body">
								{noteContent}
							</div> :

							<div/>
						}

					</div>
				</div>
			</div>
		);
	}
}
