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
					<button className="btn btn-lg btn-icon btn-icon-icon" onClick={onClickLoadMore} disabled={loading}>
						<span className="icon-loading" />
						{loading ? 'Loading...' : 'Load More'}
					</button>
					: 
					undefined
				}
			</div>
		);
	}
}
