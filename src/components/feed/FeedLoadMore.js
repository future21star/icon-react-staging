import React, {Component, PropTypes} from 'react';

export default class FeedLoadMore extends Component {
	static propTypes = {
		'loading': PropTypes.bool.isRequired,
		'allPagesLoaded': PropTypes.bool.isRequired,
		'onClickLoadMore': PropTypes.func.isRequired,
	};

	render() {
		const {loading, allPagesLoaded, onClickLoadMore} = this.props;

		return (
			<div className="text-center block row no-margin-left-right feed-load-more-container">
				{!allPagesLoaded ?
					<button className="btn btn-icon" onClick={onClickLoadMore} disabled={loading}>
						{loading ? 'Loading...' : <span className="icon-loading" /> + 'Load More'}
					</button>
					: 
					undefined
				}
			</div>
		);
	}
}
