import {
	auth0__body_,
	auth0__forgot_password__open,
	auth0__init,
	auth0__login__open,
	auth0__token__error__,
	auth0__token__error__logout,
	auth0__token__error_txt__,
	AUTH0_DOMAIN__,
	password_realm__body_,
	post_auth0_dbconnections_signup,
	validate_auth0_signup
} from '@ctx-core/auth0'
import { class_ } from '@ctx-core/html'
import { useMemo } from '@ctx-core/solid-nanostores'
import { ctx__Context__use } from '@ctx-core/ui-solid'
import { createMemo, mergeProps, Show } from 'solid-js'
import { login } from '../../login/index.js'
import { form__clear__schedule_ } from '../../form__clear__schedule_/index.js'
import { CloseDialogHandle_auth0_spa } from '../CloseDialogHandle_auth0_spa/index.jsx'
/**
 * @param _$p{import('./index.d.ts').SignupForm_auth0_spa__props_T}
 * @return {JSX.Element}
 */
export function SignupForm_auth0_spa(_$p) {
	const $p = mergeProps({
		error_class: '', input_class: '', button_class: '', label_class: ''
	}, _$p)
	const ctx = ctx__Context__use()
	auth0__init(ctx)
	const AUTH0_DOMAIN_ = useMemo(AUTH0_DOMAIN__(ctx))
	const auth0__token__error_ = useMemo(auth0__token__error__(ctx))
	/** @type {HTMLDivElement} */
	let root
	/** @type {HTMLInputElement} */
	let email__input
	/** @type {HTMLInputElement} */
	let password__input
	/** @type {HTMLInputElement} */
	let password_confirmation__input
	const auth0__token__error_txt_ = useMemo(auth0__token__error_txt__(ctx))
	const error_ = createMemo(()=>auth0__token__error_()?.error)
	const username__error_ = createMemo(()=>error_() === 'invalid_grant')
	const password__error_ = createMemo(()=>error_() === 'invalid_grant')
	const password_confirmation__error_ =
		createMemo(()=>error_() === 'invalid_grant')
	return (
		<div ref={$=>root = $} class="form signup">
			<CloseDialogHandle_auth0_spa/>
			<h1><Show when={!!$p.signup_text} fallback={'Sign Up'}>{$p.signup_text}</Show></h1>
			<form
				action={`https://${AUTH0_DOMAIN_()}/dbconnections/signup`}
				accept-charset="UTF-8"
				method="post"
				onSubmit={$=>
					signup__onsubmit($, {
						email_input: email__input,
						password_input: password__input,
						password_confirmation_input: password_confirmation__input
					}, form__clear__schedule_(ctx, root))
				}
			>
				<Errors/>
				<Fieldset/>
				<Footer/>
			</form>
		</div>)
	function Errors() {
		return (
			<Show when={!!auth0__token__error_txt_()}>
				<ul>
					<li class={`error ${$p.error_class}`}>
						{auth0__token__error_txt_()}
					</li>
				</ul>
			</Show>)
	}
	function Fieldset() {
		return (
			<fieldset>
				<label class="field">
					<div class={$p.label_class}>Email</div>
					<input
						ref={$=>email__input = $}
						placeholder="your@email.com"
						required={true}
						autocomplete="email"
						class={class_(
							`form-control ${$p.input_class}`, {
								invalid: !!username__error_()
							})}
						type="email"
						id="email-signup"
						name="email"/>
				</label>
				<label class="field">
					<div class={$p.label_class}>Password</div>
					<input
						ref={$=>password__input = $}
						placeholder="**********"
						required={true}
						class={class_(
							$p.input_class, {
								invalid: !!password__error_()
							})}
						id="password-signup"
						type="password"
						name="password"/>
				</label>
				<label class="field">
					<div class={$p.label_class}>Confirm Password</div>
					<input
						ref={$=>password_confirmation__input = $}
						placeholder="**********"
						required={true}
						class={class_(
							$p.input_class, {
								invalid: !!password_confirmation__error_()
							})}
						type="password"
						name="password_confirmation"
						id="password_confirmation-signup"/>
				</label>
				<Show when={!$p.signup_tos} fallback={$p.signup_tos}>
					<p>
						By clicking ‘Sign up’ you agree to the terms of this Website
						<br/>
						<a href="." target="_blank">Terms of Service</a>
						and
						<a href="." target="_blank">Privacy Policy</a>
					</p>
				</Show>
			</fieldset>)
	}
	function Footer() {
		return (
			<footer>
				<input type="submit" value="Sign up" class={`button ${$p.button_class}`}/>
				<label
					class={`auth_navigation ${$p.label_class}`}
					onclick={()=>auth0__login__open(ctx)}
				>Have an account? Log in&hellip;</label>
				<label
					class={`auth_navigation ${$p.label_class}`}
					onclick={()=>auth0__forgot_password__open(ctx)}
				>Forgot Password?</label>
			</footer>)
	}
	/**
	 * @param event{Event}
	 * @param params{import('../_types').signup__onsubmit__o_T}
	 * @param schedule_forms_clear{()=>void}
	 * @return {Promise<boolean>}
	 */
	async function signup__onsubmit(
		event,
		{
			email_input,
			password_input,
			password_confirmation_input,
		},
		schedule_forms_clear = ()=>{}
	) {
		event.preventDefault()
		const email = email_input.value
		const password = password_input.value
		const password_confirmation = password_confirmation_input.value
		const auth0_token_error = validate_auth0_signup({
			email,
			password,
			password_confirmation
		})
		if (auth0_token_error) {
			auth0__token__error__logout(ctx, auth0_token_error)
			return false
		}
		await signup({
			email,
			password
		}, schedule_forms_clear)
		return true
	}
	/**
	 * @param data{import('../_types').auth0__signup_data_T}
	 * @param schedule_forms_clear{()=>void}
	 * @return {Promise<void>}
	 */
	async function signup(data, schedule_forms_clear = ()=>{}) {
		const [auth0_userinfo_or_auth0_error] =
			await post_auth0_dbconnections_signup(
				ctx,
				password_realm__body_(ctx, auth0__body_(ctx, data)))
		const auth0_error = auth0_userinfo_or_auth0_error
		if (auth0_error.statusCode) {
			const { code, description } = auth0_error
			const error_description =
				code === 'user_exists'
				? `${data.email} is already signed up`
				: description
			auth0__token__error__logout(ctx, { error: 'email', error_description })
			return
		}
		schedule_forms_clear()
		await login(ctx, {
			username: data.email,
			password: data.password,
		}, schedule_forms_clear)
	}
}
