const UPDATE_PODCAST_PLAYER = 'podcastPlayer/UPDATE_PODCAST_PLAYER';
const SET_PODCAST_FEED = 'podcastPlayer/SET_PODCAST_FEED';
import {LOAD_SUCCESS as PODCAST_LOAD_SUCCESS} from './feedStore';

const initialState = {
	podcastPlayer: null,
	podcastPlayerFeed: null,
	prevPodcast: null,
	nextPodcast: null,
	podcastPlayerItems: [],
	isPlaying: false
};

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case UPDATE_PODCAST_PLAYER:
			return {
				...state,
				podcastPlayer: action.payload.howl,
				isPlaying: action.payload.isPlaying
			};
		case SET_PODCAST_FEED:
			let currentPodcastId = parseInt(action.payload.feed.id);

			let nextPodcast = state.podcastPlayerItems.filter(item => {
				return item.id < currentPodcastId;
			})[0];
			let prevPodcast = state.podcastPlayerItems.filter(item => {
				return item.id > currentPodcastId;
			})[0];

			return {
				...state,
				podcastPlayerFeed: action.payload.feed,
				prevPodcast: prevPodcast,
				nextPodcast: nextPodcast
			};
		case PODCAST_LOAD_SUCCESS:
			if (action.result.feedType === 'podcast') {
				return {
					...state,
					podcastPlayerItems: state.podcastPlayerItems.concat(action.result.feeds)
				};
			} else {
				return {
					...state
				};
			}
		default:
			return state;
	}
}

export function updatePodcastPlayer(howl, isPlaying) {
	return {
		type: UPDATE_PODCAST_PLAYER,
		payload: {
			howl,
			isPlaying
		}
	};
}

export function setPodcastFeed(feed) {
	return {
		type: SET_PODCAST_FEED,
		payload: {
			feed
		}
	};
}