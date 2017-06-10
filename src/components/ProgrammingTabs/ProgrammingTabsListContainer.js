import React, {Component} from 'react';
import './ProgrammingTabs.scss';
import ProgrammingTabsListItem from './ProgrammingTabsListItem';
import {padStart} from 'lodash';

export default class ProgrammingtabsListContainer extends Component {

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
			<div className="programming-tabs-list-container-wrapper">
				<div className="container">
					<ul className="programming-tabs-list list-group">
						{!content ? <li>No Task</li> : undefined }
						{parsedContentObj.map((chunk, i) => {
							let number = padStart((i + 1).toString(), 2, '0');
							return (
								<ProgrammingTabsListItem number={number} key={i}>
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
								</ProgrammingTabsListItem>
							)
						})}

					</ul>
				</div>
			</div>
		);
	}
}
