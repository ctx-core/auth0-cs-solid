import type {
	auth0__client_id__body_T,
	auth0__grant_type__body_T,
	auth0__login_data_T,
	auth0__oauth_token__fetch__body_T,
	auth0__passwordless_start__fetch_post__body_T,
	auth0__signup_data_T,
	password_realm__body_T
} from '@ctx-core/auth0'
export type signup__password_realm_body_T =
	auth0__signup_data_T
	&auth0__client_id__body_T
	&auth0__passwordless_start__fetch_post__body_T
	&password_realm__body_T
	&auth0__grant_type__body_T
	&auth0__oauth_token__fetch__body_T
export type login__password_realm__body_T =
	auth0__login_data_T
	&auth0__client_id__body_T
	&auth0__passwordless_start__fetch_post__body_T
	&password_realm__body_T
	&auth0__grant_type__body_T
	&auth0__oauth_token__fetch__body_T
export interface change_password__onsubmit__o_T {
	password_input:HTMLInputElement
	password_confirmation_input:HTMLInputElement
}
export interface forgot_password__onsubmit__params_T {
	email_input:HTMLInputElement
}
export interface signup__onsubmit__o_T {
	email_input:HTMLInputElement
	password_input:HTMLInputElement
	password_confirmation_input:HTMLInputElement
}
