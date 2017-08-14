const UPDATE_PODCAST_PLAYER = 'podcastPlayer/UPDATE_PODCAST_PLAYER';
const SET_PODCAST_FEED = 'podcastPlayer/SET_PODCAST_FEED';
const SET_PODCAST_AUDIO_LOADING = 'podcastPlayer/SET_PODCAST_AUDIO_LOADING';
import {LOAD_SUCCESS as PODCAST_LOAD_SUCCESS} from './feedStore';
import {LOGOUT_SUCCESS} from './authStore'

const initialState = {
	podcastPlayer: null,
	podcastPlayerFeed: null,
	prevPodcast: null,
	nextPodcast: null,
	podcastPlayerItems: [],
	isPlaying: false,
	isPodcastAudioLoading: false
};

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case UPDATE_PODCAST_PLAYER:
			return {
				...state,
				podcastPlayer: action.payload.howl,
				isPlaying: action.payload.isPlaying,
				isPodcastAudioLoading: false
			};
		case SET_PODCAST_AUDIO_LOADING:
			return {
				...state,		
				isPodcastAudioLoading: true
			};
		case SET_PODCAST_FEED:
			let currentPodcastId = parseInt(action.payload.feed.id);

			let nextPodcast = state.podcastPlayerItems.filter(item => {
				return item.id < currentPodcastId;
			})[0];
			let prevPodcast = state.podcastPlayerItems.filter(item => {
				return item.id > currentPodcastId;
			}).slice(-1)[0];

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
		case LOGOUT_SUCCESS:
			return {
				...state,
				...initialState
			};
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

export function setPodcastAudioLoading() {
	return {
		type: SET_PODCAST_AUDIO_LOADING
	};
}