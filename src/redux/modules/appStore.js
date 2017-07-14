const initialState = {
	desktopCategoryItems: [
		{
			icon: 'icon icon-feed-video',
			text: 'Videos',
			count: 4,
			iconClassName: '',
			link: '/feed'
		}, {
			icon: 'icon icon-feed-podcast',
			text: 'Podcasts',
			count: 13,
			iconClassName: '',
			link: '/feed/podcast'
		},
		{
			icon: 'icon icon-feed-rehab',
			text: 'Rehab',
			count: 8,
			iconClassName: '',
			link: '/feed/rehab'
		}, {
			icon: 'icon icon-user-mentality',
			text: 'Mentality',
			count: 2,
			iconClassName: '',
			link: '/feed/mentality'
		}
	]
};

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		default:
			return state;
	}
}
