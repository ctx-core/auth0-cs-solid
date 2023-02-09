import { auth0__init } from '@censible/domain'
import {
	auth0__close,
	auth0__forgot_password__check_email__open,
	auth0__forgot_password__validate,
	auth0__login__open,
	auth0__passwordless_start__fetch_post,
	auth0__signup__open,
	auth0__token__error__,
	auth0__token__error__logout,
	AUTH0_DOMAIN__,
} from '@ctx-core/auth0'
import { useMemo } from '@ctx-core/solid-nanostores'
import { CloseDialogHandle, ctx__Context__use } from '@ctx-core/ui-solid'
import { createMemo, mergeProps, onMount, Show } from 'solid-js'
import { auth0__body__login_ } from '../auth0__body__login_/index.js'
/**
 * @param _$p{import('./index.d.ts').Auth0ForgotPasswordForm__props_T}
 * @return {JSX.Element}
 */
export function Auth0ForgotPasswordForm(_$p) {
	const $p =
		mergeProps({ error_class: '', input_class: '', button_class: '', label_class: '' }, _$p)
	const ctx = ctx__Context__use()
	auth0__init(ctx)
	const AUTH0_DOMAIN_ = useMemo(AUTH0_DOMAIN__(ctx))
	const auth0__token__error_ = useMemo(auth0__token__error__(ctx))
	let email_input: HTMLInputElement
	const error_ = createMemo(()=>auth0__token__error_()?.error)
	return (
		<div class="form forgot_password">
			<CloseDialogHandle onclick={()=>auth0__close(ctx)}/>
			<h1>Forgot Password</h1>
			<form
				action={`https://${AUTH0_DOMAIN_()}/passwordless/start`}
				accept-charset="UTF-8"
				method="post"
				onSubmit={$=>forgot_password__onSubmit($, { email_input })}
			>
				<Errors/>
				<Fieldset/>
				<Footer/>
			</form>
		</div>
	)
	function Errors() {
		return (
			<Show when={!!auth0__token__error_()}>
				<ul>
					<li class={`error ${$p.error_class}`}>
						{auth0__token__error_().error_description}
					</li>
				</ul>
			</Show>
		)
	}
	function Fieldset() {
		onMount(()=>queueMicrotask(()=>email_input.focus()))
		return (
			<fieldset>
				<label class="field">
				<div class={$p.label_class}>Email</div>
				<input
					ref={$=>email_input = $}
					placeholder="your@email.com"
					required={true}
					class={`form-control ${$p.input_class}`}
					classList={{ invalid: !!error_() }}
					type="email"
					id="email-forgot_password"
					name="email"/>
				</label>
			</fieldset>
		)
	}
	function Footer() {
		return (
			<footer>
				<input type="submit" value="Reset Password" class={`button ${$p.button_class}`}/>
				<label
					class={`auth_navigation ${$p.label_class}`}
					onclick={()=>auth0__login__open(ctx)}
				>Have an account? Log in&hellip;</label>
				<label
					class={`auth_navigation ${$p.label_class}`}
					onclick={()=>auth0__signup__open(ctx)}
				>Don't have an account? Signup&hellip;</label>
			</footer>
		)
	}
	/**
	 * @param event{Event}
	 * @param email_input{import('../_types').forgot_password__onsubmit__params_T}
	 * @return {Promise<void>}
	 */
	async function forgot_password__onSubmit(event: Event, { email_input }) {
		event.preventDefault()
		const email = email_input.value
		/** @type {import('@ctx-core/auth0').auth0__passwordless_start__fetch__optional_body_T} */
		const data = {
			connection: 'email',
			send: 'link',
			email
		}
		const auth0_token_error = auth0__forgot_password__validate(data)
		if (auth0_token_error) {
			auth0__token__error__logout(ctx, auth0_token_error)
			return
		}
		/** @type {import('../_types').auth0__passwordless_start__fetch__body_T} */
		await auth0__passwordless_start__fetch_post(ctx, auth0__body__login_(ctx, data))
		auth0__forgot_password__check_email__open(ctx)
	}
}
