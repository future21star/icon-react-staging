import React, {Component} from 'react';
import {connect} from "react-redux";
import ReactDisqusThread from 'react-disqus-thread';
import {Menubar} from "../../components";

@connect(
	state => ({})
)

export default class SingleFeedMobile extends Component {

	render() {
		let featuredImageUrl = require('../../../static/temp/feed-featured-temp.jpg');

		return (
			<div className="feed-page-wrapper bottom-padding">
				<Menubar
					title="Overview"
					backButton={true}
				/>
				<div className="feed-content-wrapper">
					<div className="feed-featured-post">
						<div className="feed-featured-post-image">
							<div className="type-video">
								<img width="100%" src={featuredImageUrl}/>
							</div>
						</div>

						<div className="container">
							<div className="feed-featured-post-title">Here goes to title of this post</div>
							<div className="feed-featured-post-date">Posted 24.02.2017</div>
							<div className="feed-featured-post-content">
								<p>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab exercitationem facilis id natus nihil.
									Consequatur eveniet expedita id in, iusto nam nobis officia porro quae quas qui saepe temporibus
									voluptates?
								</p>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus autem cum dolorem ea facere ipsam
									maxime minus obcaecati rerum? Amet enim laboriosam laudantium, maiores nulla quidem reprehenderit sint
									totam veniam.
								</p>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit. A blanditiis culpa debitis dicta dolore
									dolores vero! Consequuntur corporis dolores excepturi facere itaque praesentium repudiandae sequi
									similique ullam! Delectus praesentium, sit!
								</p>
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
			</div>
		);
	}
}
