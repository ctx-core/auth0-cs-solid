import {
	auth0__close,
	auth0__oauth_token__POST__fetch2,
	auth0__token__error__,
	auth0__token__error__logout,
	auth0__token__json__,
	password_realm__body_
} from '@ctx-core/auth0'
import { auth0__body__login_ } from '../auth0__body__login_/index.js'
export const login = async (ctx, data, schedule_forms_clear = ()=>{})=>{
	const [json, response] =
		await auth0__oauth_token__POST__fetch2(
			ctx,
			password_realm__body_(ctx, auth0__body__login_(ctx, data)))
	if (response.ok) {
		auth0__token__json__(ctx).$ = JSON.stringify(json)
		schedule_forms_clear()
		auth0__close(ctx)
	} else {
		/** @type {import('auth0-js').Auth0Error} */
		const auth0_error = json
		auth0__token__error__(ctx).$ = auth0_error
		auth0__token__error__logout(ctx, auth0_error)
	}
}
