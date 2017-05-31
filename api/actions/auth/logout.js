import {successMessage} from "../../utils/message";

export default function logout(req) {
	return new Promise((resolve) => {
		req.session.destroy(() => {
			req.session = null;
			return resolve(successMessage("You have been logged out"));
		});
	});
}
