import React, {Component, PropTypes} from 'react';
import './Menubar.scss';
import DotList from '../DotList/DotList';

export default class MenubarTurquoise extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		leftSideContent: PropTypes.object,
		rightSideContent: PropTypes.object,
		dotSelectedItem: PropTypes.string,
		dotItemsList: PropTypes.array,
	};

	render() {
		const {title, leftSideContent, rightSideContent, dotSelectedItem, dotItemsList} = this.props;
		return (
			<div className={`menu-bar menu-bar-turquoise ${dotItemsList && dotSelectedItem ? 'menu-bar-with-dot-list' : ''}`}>
				<div className="container">
					<div className="row">
						<div className="col-xs-3 menu-bar-left-side-content">{leftSideContent}</div>
						<div className="col-xs-6 menu-bar-title">{title}</div>
						<div className="col-xs-3 menu-bar-right-side-content">{rightSideContent}</div>
					</div>
					{dotItemsList && dotSelectedItem ? (
						<DotList
							selectedTrack={dotSelectedItem}
							allTracks={dotItemsList}
						/>
					) : null}
				</div>
			</div>
		);
	}
}
