import {
	auth0__close,
	auth0__forgot_password__check_email__open,
	auth0__forgot_password__validate,
	auth0__init,
	auth0__login__open,
	auth0__passwordless_start__POST__fetch2,
	auth0__signup__open,
	auth0__token__error$_,
	auth0__token__error__logout,
	AUTH0_CLIENT_ID_,
	AUTH0_DOMAIN$_,
} from '@ctx-core/auth0'
import { CloseDialogHandle } from '@ctx-core/dialog-ui-solid'
import { ctx__Context__use } from '@ctx-core/solid-js'
import { useMemo } from '@ctx-core/solid-nanostores'
import { html_class_ } from 'ctx-core/html'
import { createMemo, onMount, Show } from 'solid-js'
import { auth0__body__login_ } from '../../auth0__body__login_/index.js'
/** @typedef {import('solid-js').JSX} */
/**
 * @param {import('./index.d.ts').Auth0ForgotPasswordForm_spa__props_T}$p
 * @return {JSX.Element}
 */
export function Auth0ForgotPasswordForm_spa($p) {
	const error_class_ = createMemo(()=>$p.error_class ?? '')
	const input_class_ = createMemo(()=>$p.input_class ?? '')
	const button_class_ = createMemo(()=>$p.button_class ?? '')
	const label_class_ = createMemo(()=>$p.label_class ?? '')
	const ctx = ctx__Context__use()
	auth0__init(ctx)
	const AUTH0_DOMAIN_ = useMemo(AUTH0_DOMAIN$_(ctx))
	const auth0__token__error_ = useMemo(auth0__token__error$_(ctx))
	/** @type {HTMLInputElement} */
	let email_input
	const error_ = createMemo(()=>
		auth0__token__error_()?.error)
	return /** @type {JSX.Element} */(
		<div class="form forgot_password">
			<CloseDialogHandle onclick={()=>auth0__close(ctx)}/>
			<h1>Forgot Password</h1>
			<form
				action={`https://${AUTH0_DOMAIN_()}/passwordless/start`}
				accept-charset="UTF-8"
				method="post"
				onSubmit={$=>
					forgot_password__onsubmit($, { email_input })}
			>
				<Errors/>
				<Fieldset/>
				<Footer/>
			</form>
		</div>)
	function Errors() {
		return (
			<Show when={!!auth0__token__error_()}>
				<ul>
					<li class={html_class_(
						'error',
						error_class_()
					)}>
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
					<div class={label_class_()}>Email</div>
					<input
						ref={$=>email_input = $}
						placeholder="your@email.com"
						required={true}
						class={html_class_(
							'form-control',
							input_class_(),
							{
								invalid: !!error_()
							})}
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
				<input
					type="submit"
					value="Reset Password"
					class={html_class_(
						'button',
						button_class_()
					)}
				/>
				<label
					class={html_class_(
						'auth_navigation',
						label_class_()
					)}
					onclick={()=>auth0__login__open(ctx)}
				>Have an account? Log in&hellip;</label>
				<label
					class={html_class_(
						'auth_navigation',
						label_class_()
					)}
					onclick={()=>auth0__signup__open(ctx)}
				>Don't have an account? Signup&hellip;</label>
			</footer>
		)
	}
	/**
	 * @param event{Event}
	 * @param email_input{HTMLInputElement}
	 * @return {Promise<void>}
	 */
	async function forgot_password__onsubmit(event, { email_input }) {
		event.preventDefault()
		const email = email_input.value
		/** @type {import('@ctx-core/auth0').auth0__passwordless_start__POST__fetch2__body_T} */
		const data = {
			client_id: AUTH0_CLIENT_ID_(ctx),
			connection: 'email',
			send: 'link',
			email
		}
		const auth0_token_error = auth0__forgot_password__validate(data)
		if (auth0_token_error) {
			auth0__token__error__logout(ctx, auth0_token_error)
			return
		}
		/** @type {import('../_types/index.d.ts').auth0__passwordless_start__POST__fetch2__body_T} */
		await auth0__passwordless_start__POST__fetch2(ctx, auth0__body__login_(ctx, data))
		auth0__forgot_password__check_email__open(ctx)
	}
}
