import React, {Component} from 'react';
import {connect} from "react-redux";
import ReactDisqusThread from 'react-disqus-thread';
import {Menubar} from "../../components";
import moment from "moment";
import ReactAudioPlayer from 'react-audio-player';

@connect(
	state => ({
		activeItemType: state.feedStore.activeItemType,
		activeItem: state.feedStore.activeItem
	})
)

export default class SingleFeedMobile extends Component {

	render() {
		const {activeItemType, activeItem} = this.props;
		const defaultImage = require('../../../static/logo.png');

		return (
			<div className="feed-page-wrapper bottom-padding">
				<Menubar
					title=""
					className="text-white"
					backButton={true}
				/>
				{activeItem && (
					<div className="feed-content-wrapper">
						<div className="feed-featured-post">
							<div className="feed-featured-post-image">
								{/*type-video*/}
								<div className="">
									<img width="100%" src={activeItem.image || defaultImage}/>
								</div>
							</div>

							<div className="container">
								<h2 className="feed-featured-post-title">{activeItem.title}</h2>
								<div className="feed-featured-post-date">Posted {moment(activeItem.date).format('DD.MM.YYYY')}</div>
								<div className="feed-featured-post-content">
									{ (activeItemType === 'podcast' && activeItem.audio) && (
										<ReactAudioPlayer
											src={activeItem.audio}
											controls
											style={{'width': '100%'}}
										/>
									)}
									{activeItem.description}
								</div>


								<ReactDisqusThread
									shortname="example"
									identifier="something-unique-12345"
									title="Example Thread"
									url="http://www.example.com/example-thread"
									category_id="123456"/>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
}
