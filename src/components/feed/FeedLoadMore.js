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
			<div style={{'background': '#ffffff', 'padding': '20px 0 40px'}} className="text-center">
				{allPagesLoaded ?
					<p className="text-success">All feed has been loaded</p>
					: <button className="btn btn-primary" onClick={onClickLoadMore} disabled={loading}>
						{loading ? 'Loading...' : 'Load More'}
					</button>
				}
			</div>
		);
	}
}
