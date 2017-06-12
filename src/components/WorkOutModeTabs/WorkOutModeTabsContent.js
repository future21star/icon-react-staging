import React, {Component} from 'react';
import './WorkOutModeTabs.scss';
import {padStart} from 'lodash';
import WorkOutModeTabsListItem from './WorkOutModeTabsListItem';

export default class WorkOutModeTabsContent extends Component {

	render() {
		const {content} = this.props;

		let chunks = content.split('@@');
		chunks = chunks.filter(chunk => {
			return chunk.trim() !== '';
		});

		let parsedContentObj = [];

		chunks.map(chunk => {
			let parsedChunks = chunk.split('--');
			let title = parsedChunks[0];
			parsedChunks.splice(0, 1);
			parsedContentObj.push({
				title,
				lines: parsedChunks
			});
		});

		return (
			<div className="container">
				<div className="workout-mode-tabs-content-container-wrapper">
					<div className="workout-mode-tabs-content-container">
						<ul className="workout-mode-tabs-list list-group">
							{!content ? <li>No Task</li> : undefined }
							{parsedContentObj.map((chunk, i) => {
								let number = padStart((i + 1).toString(), 2, '0');
								return (
									<WorkOutModeTabsListItem number={number} key={i}>
										<div>
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
									</WorkOutModeTabsListItem>
								)
							})}
						</ul>
						<div className="exit">
							<a href="javascript:history.back()">Exit</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
