import React, {Component, PropTypes} from 'react';
import WorkoutTabsContent from './WorkoutTabsContent';
import {padStart} from 'lodash';

export default class WorkoutTabsContentContainer extends Component {
	static propTypes = {
		content: PropTypes.string,
		className: PropTypes.string
	};

	render() {
		const {content, className} = this.props;

		let chunks = content.split('@@');
		chunks = chunks.filter(chunk => {
			return chunk.trim() !== '';
		});

		let parsedContentObj = [];

		chunks.map(chunk => {
			let parsedChunks = chunk.split('--');
			let optional = false;
			let title = parsedChunks[0];
			let parsedTitle = title.split('OP '); // the space is important
			if (parsedTitle.length === 2) {
				title = parsedTitle[1];
				optional = true;
			}
			parsedChunks.splice(0, 1);
			parsedContentObj.push({
				title,
				lines: parsedChunks,
				optional
			});
		});

		return (
			<div className={`workout-tabs-content-container ${className}`}>
				<div className="container">
					<ul className="workout-tabs-list list-group">
						{!content ? <li>No Workout</li> : undefined }
						{parsedContentObj.map((chunk, i) => {
							let number = padStart((i + 1).toString(), 2, '0');
							let classes = (chunk.optional ? 'wod-optional' : '');
							return (
								<WorkoutTabsContent number={number} key={i} className={classes}>
									{chunk.optional ? <p className="text-danger">OPTIONAL</p> : undefined}
									<p className="title">{chunk.title}</p>
									{chunk.lines.map((line, j) => {
										return (
											<p key={j}>
												<span className="red-hyphen">&#8212; </span>
												{line}
											</p>
										)
									})}
								</WorkoutTabsContent>
							)
						})}
					</ul>
				</div>
			</div>
		);
	}
}
