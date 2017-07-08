import React, {Component} from 'react';
import WorkoutListItem from './WorkoutListItem';
import {padStart} from 'lodash';

export default class WorkoutListContainer extends Component {

	render() {
		const {content} = this.props;

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
			<div className="workout-tabs-list-container-wrapper">
				<div className="container">
					<ul className="workout-tabs-list list-group">
						{!content ? <li>No Task</li> : undefined }
						{parsedContentObj.map((chunk, i) => {
							let number = padStart((i + 1).toString(), 2, '0');
							return (
								<WorkoutListItem number={number} key={i}>
									<div className={`${chunk.optional ? 'wod-optional' : ''}`}>
										{chunk.optional ? <p className="text-danger">OPTIONAL</p> : undefined}
										<p>{chunk.title}</p>
										{chunk.lines.map((line, j) => {
											return (
												<p key={j}>
													<span className="red-hyphen">&#8212; </span>
													{line}
												</p>
											)
										})}
									</div>
								</WorkoutListItem>
							)
						})}
					</ul>
				</div>
			</div>
		);
	}
}
