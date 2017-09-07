export const APP_NAME = 'Icon Athlete Vault';
export const APP_URL = 'https://vault.iconathlete.com';


// WP_API_URL
let wpApiUrl = 'https://wp-staging.iconathlete.com/wp-json';

if(process.env.NODE_ENV === 'production') {
	wpApiUrl = 'https://iconathlete.com/wp-json';
}

export const WP_API_URL = wpApiUrl;
