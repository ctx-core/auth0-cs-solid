import { mergeProps, Show } from 'solid-js'
import {
	auth0__change_password__opened__,
	auth0__forgot_password__check_email__opened__,
	auth0__forgot_password__opened__,
	auth0__login__opened__,
	auth0__opened__class__,
	auth0__signup__opened__,
} from '@ctx-core/auth0'
import { useMemo } from '@ctx-core/solid-nanostores'
import { ctx__Context__use, Matcha, Style_ } from '@ctx-core/ui-solid'
import { Auth0ForgotPasswordForm } from '../Auth0ForgotPasswordForm/index.jsx'
import { ChangePasswordForm_auth0 } from '../ChangePasswordForm_auth0/index.jsx'
import { CloseDialogHandle_auth0 } from '../CloseDialogHandle_auth0/index.js'
import { ForgotPassword__CheckEmailForm__auth0 } from '../ForgotPassword__CheckEmailForm__auth0/index.jsx'
import { LoginForm_auth0 } from '../LoginForm_auth0/index.jsx'
import { SignupForm_auth0 } from '../SignupForm_auth0/index.jsx'
/**
 * @param _$p{import('./index.d.ts').Auth0__props_T} Auth0__props_T}
 * @return {JSX.Element[]}
 * @constructor
 */
export function Auth0(/** @type {Auth0__props_T} */_$p) {
	const $p = mergeProps({ class: '', show_close: true }, _$p)
	const ctx = ctx__Context__use()
	const auth0__change_password__opened_ = useMemo(auth0__change_password__opened__(ctx))
	const auth0__opened__class_ = useMemo(auth0__opened__class__(ctx))
	const auth0__forgot_password__check_email__opened_ = useMemo(auth0__forgot_password__check_email__opened__(ctx))
	const auth0__forgot_password__opened_ = useMemo(auth0__forgot_password__opened__(ctx))
	const auth0__login__opened_ = useMemo(auth0__login__opened__(ctx))
	const auth0__signup__opened_ = useMemo(auth0__signup__opened__(ctx))
	return [
		<Style/>,
		<div
			class={`Auth0 ${auth0__opened__class_()} ${$p.class}`}
			classList={{
				dialog: $p.dialog,
				visible: !!auth0__opened__class_(),
			}}
		>
			<Show when={$p.show_close}><CloseDialogHandle_auth0/></Show>
			<Matcha whenthen={[
				[auth0__login__opened_(), ()=><LoginForm_auth0 {...$p}/>],
				[auth0__signup__opened_(), ()=><SignupForm_auth0 signup_tos={null} {...$p}/>],
				[auth0__forgot_password__opened_(), ()=><Auth0ForgotPasswordForm {...$p}/>],
				[auth0__forgot_password__check_email__opened_(), ()=><ForgotPassword__CheckEmailForm__auth0/>],
				[auth0__change_password__opened_(), ()=><ChangePasswordForm_auth0 {...$p}/>]
			]}/>
			{$p.children}
		</div>,
	]
}
// language=CSS
const Style = Style_(()=>`
	.Auth0 {
		display: block;
		overflow: hidden;
	}
	.Auth0.dialog div .close {
		display: block;
	}
	.Auth0 h1 {
		font-size: 2rem;
		text-align: center;
	}
	.Auth0 [name=auth_navigation] {
		display: none;
	}
	.Auth0 [name=auth_navigation] ~ .form {
		display: none;
	}
	.Auth0 [name=auth_navigation].auth_navigation-signup:checked ~ .signup {
		display: block;
	}
	.Auth0 [name=auth_navigation].auth_navigation-login:checked ~ .login {
		display: block;
	}
	.Auth0 [name=auth_navigation].auth_navigation-forgot_password:checked ~ .forgot_password {
		display: block;
	}
	.Auth0 [name=auth_navigation].auth_navigation-forgot_password_check_email:checked ~ .forgot_password_check_email {
		display: block;
	}
	.Auth0 [name=auth_navigation].auth_navigation-change_password:checked ~ .change_password {
		display: block;
	}
	.Auth0 label.auth_navigation {
		color: #3EBBC0;
		font-weight: bold;
	}
	.Auth0 label.auth_navigation:hover {
		text-decoration: underline;
	}
	.Auth0 > div {
		position: relative;
		height: 100%;
	}
	.Auth0 > div > .close {
		display: none;
		position: absolute;
		right: 0;
	}
	.Auth0 form input {
		line-height: 1.8rem;
		border-color: transparent;
		border-bottom: 2px solid lightgrey;
	}
	.Auth0 form input.invalid {
		border-color: red;
	}
	.Auth0 form label {
		display: block;
	}
	.Auth0 form fieldset {
		clear: both;
		border: none;
	}
	.Auth0 form fieldset .field {
		width: 20em;
		margin: 0 auto;
		display: block;
		clear: both;
		text-align: left;
	}
	.Auth0 form fieldset .field input {
		display: block;
		width: 100%;
		padding: 0.2em;
		color: black;
	}
	.Auth0 form fieldset p {
		margin-bottom: 0;
		-webkit-margin-after: 0;
	}
	.Auth0 form footer {
		margin-top: 1rem;
		text-align: center;
	}
	.Auth0 form footer .button {
		float: none;
		width: 10em;
		padding: 0.4rem;
		color: white;
		background-color: #3EBBC0;
		border-radius: 5px;
		border: none;
	}
	.Auth0 form footer .button:hover {
		background-color: #5CC6CA;
	}
	.Auth0 form footer label {
		margin-top: 1em;
	}
	.Auth0 .error {
		color: red;
	}
`)
