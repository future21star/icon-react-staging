import nodeMailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';
import mailConfig from '../config/sendgrid';
import {APP_NAME} from '../config/app';

export function createEmail(to, subject, body) {
	return {
		to: to,
		from: `"${APP_NAME}" vault@iconathlete.com`,
		subject: subject,
		text: '',
		html: body
	}
}

export default nodeMailer.createTransport(sgTransport(mailConfig));

