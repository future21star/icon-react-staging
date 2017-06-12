import React, {Component} from 'react';
import {padStart} from 'lodash';
import './ProgrammingTabsDesktop.scss';

export default class ProgrammingTabsListItem extends Component {

	render() {

		const {title, content} = this.props;

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
			<div className="tab-list-item-desktop-wrapper">
				<div className="tab-list-item-desktop">
					<h2>{title}</h2>
					<div className="tab-item-container-desktop">
						{!content ? <p>No Task</p> : undefined }
						{parsedContentObj.map((chunk, i) => {
							let number = padStart((i + 1).toString(), 2, '0');
							return (
								<div key={i}>
									<div className="item-desktop">
										<span className="item-number-desktop">{number}</span>
										<div>
											<p>{chunk.title}</p>
											<ul className="list-group">
												{chunk.lines.map((line, j) => {
													return (
														<li key={j}>
															<span className="red-hyphen">&#8212; </span>
															{line}
														</li>
													)
												})}
											</ul>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
}