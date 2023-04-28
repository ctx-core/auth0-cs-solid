import { createMemo, Show } from 'solid-js'
import {
	auth0__change_password__opened__,
	auth0__forgot_password__check_email__opened__,
	auth0__forgot_password__opened__,
	auth0__login__opened__,
	auth0__opened__class__,
	auth0__signup__opened__,
} from '@ctx-core/auth0'
import { class_ } from '@ctx-core/html'
import { ctx__Context__use } from '@ctx-core/solid-js'
import { useMemo } from '@ctx-core/solid-nanostores'
import { Matcha, Style_ } from '@ctx-core/ui-solid'
import { Auth0ForgotPasswordForm_spa } from '../Auth0ForgotPasswordForm_spa/index.jsx'
import { ChangePasswordForm_auth0_spa } from '../ChangePasswordForm_auth0_spa/index.jsx'
import { CloseDialogHandle_auth0_spa } from '../CloseDialogHandle_auth0_spa/index.jsx'
import { ForgotPassword__CheckEmailForm__auth0_spa } from '../ForgotPassword__CheckEmailForm__auth0_spa/index.jsx'
import { LoginForm_auth0_spa } from '../LoginForm_auth0_spa/index.jsx'
import { SignupForm_auth0_spa } from '../SignupForm_auth0_spa/index.jsx'
/** @typedef {import('solid-js').JSX}JSX */
/**
 * @param {import('./index.d.ts').Auth0_spa__props_T}$p Auth0_spa__props_T}
 * @return {JSX.Element[]}
 * @constructor
 */
export function Auth0_spa(/** @type {Auth0_spa__props_T} */$p) {
	const $p__class_ = createMemo(()=>$p.class ?? '')
	const show_close_ = createMemo(()=>$p.show_close ?? true)
	const ctx = ctx__Context__use()
	const auth0__change_password__opened_ = useMemo(auth0__change_password__opened__(ctx))
	const auth0__opened__class_ = useMemo(auth0__opened__class__(ctx))
	const auth0__forgot_password__check_email__opened_ = useMemo(auth0__forgot_password__check_email__opened__(ctx))
	const auth0__forgot_password__opened_ = useMemo(auth0__forgot_password__opened__(ctx))
	const auth0__login__opened_ = useMemo(auth0__login__opened__(ctx))
	const auth0__signup__opened_ = useMemo(auth0__signup__opened__(ctx))
	return /** @type {JSX.Element} */[
		<Style/>,
		<div
			class={class_(
				'Auth0',
				auth0__opened__class_(),
				$p__class_(),
				{
					dialog: $p.dialog,
					visible: !!auth0__opened__class_(),
				})}
		>
			<Show when={show_close_()}><CloseDialogHandle_auth0_spa/></Show>
			<Matcha whenthen={[
				[auth0__login__opened_(), ()=><LoginForm_auth0_spa {...$p}/>],
				[auth0__signup__opened_(), ()=><SignupForm_auth0_spa signup_tos={null} {...$p}/>],
				[auth0__forgot_password__opened_(), ()=><Auth0ForgotPasswordForm_spa {...$p}/>],
				[auth0__forgot_password__check_email__opened_(), ()=><ForgotPassword__CheckEmailForm__auth0_spa/>],
				[auth0__change_password__opened_(), ()=><ChangePasswordForm_auth0_spa {...$p}/>]
			]}/>
			{$p.children}
		</div>,
	]
}
// language=CSS
const Style = Style_(()=>`
	.Auth0_spa {
		display: block;
		overflow: hidden;
	}
	.Auth0_spa.dialog div .close {
		display: block;
	}
	.Auth0_spa h1 {
		font-size: 2rem;
		text-align: center;
	}
	.Auth0_spa [name=auth_navigation] {
		display: none;
	}
	.Auth0_spa [name=auth_navigation] ~ .form {
		display: none;
	}
	.Auth0_spa [name=auth_navigation].auth_navigation-signup:checked ~ .signup {
		display: block;
	}
	.Auth0_spa [name=auth_navigation].auth_navigation-login:checked ~ .login {
		display: block;
	}
	.Auth0_spa [name=auth_navigation].auth_navigation-forgot_password:checked ~ .forgot_password {
		display: block;
	}
	.Auth0_spa [name=auth_navigation].auth_navigation-forgot_password_check_email:checked ~ .forgot_password_check_email {
		display: block;
	}
	.Auth0_spa [name=auth_navigation].auth_navigation-change_password:checked ~ .change_password {
		display: block;
	}
	.Auth0_spa label.auth_navigation {
		color: #3EBBC0;
		font-weight: bold;
	}
	.Auth0_spa label.auth_navigation:hover {
		text-decoration: underline;
	}
	.Auth0_spa > div {
		position: relative;
		height: 100%;
	}
	.Auth0_spa > div > .close {
		display: none;
		position: absolute;
		right: 0;
	}
	.Auth0_spa form input {
		line-height: 1.8rem;
		border-color: transparent;
		border-bottom: 2px solid lightgrey;
	}
	.Auth0_spa form input.invalid {
		border-color: red;
	}
	.Auth0_spa form label {
		display: block;
	}
	.Auth0_spa form fieldset {
		clear: both;
		border: none;
	}
	.Auth0_spa form fieldset .field {
		width: 20em;
		margin: 0 auto;
		display: block;
		clear: both;
		text-align: left;
	}
	.Auth0_spa form fieldset .field input {
		display: block;
		width: 100%;
		padding: 0.2em;
		color: black;
	}
	.Auth0_spa form fieldset p {
		margin-bottom: 0;
		-webkit-margin-after: 0;
	}
	.Auth0_spa form footer {
		margin-top: 1rem;
		text-align: center;
	}
	.Auth0_spa form footer .button {
		float: none;
		width: 10em;
		padding: 0.4rem;
		color: white;
		background-color: #3EBBC0;
		border-radius: 5px;
		border: none;
	}
	.Auth0_spa form footer .button:hover {
		background-color: #5CC6CA;
	}
	.Auth0_spa form footer label {
		margin-top: 1em;
	}
	.Auth0_spa .error {
		color: red;
	}
`)
