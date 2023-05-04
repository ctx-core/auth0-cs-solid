import {
	auth0__body_,
	auth0__close,
	auth0__forgot_password__open,
	auth0__init,
	auth0__oauth_token__POST__fetch2,
	auth0__signup__open,
	auth0__token__error__,
	auth0__token__error__logout,
	auth0__token__error_txt__,
	auth0__token__json__,
	AUTH0_DOMAIN__,
	password_realm__body_,
} from '@ctx-core/auth0'
import { class_ } from '@ctx-core/html'
import { ctx__Context__use } from '@ctx-core/solid-js'
import { useMemo } from '@ctx-core/solid-nanostores'
import { createMemo, onMount, Show } from 'solid-js'
import { form__clear__schedule } from '../../form__clear__schedule/index.js'
import { CloseDialogHandle_auth0_spa } from '../CloseDialogHandle_auth0_spa/index.jsx'
/** @typedef {import('@ctx-core/auth0').auth0__login_data_T}auth0__login_data_T */
/** @typedef {import('./index.d.ts').LoginForm_auth0_spa__props_T}LoginForm_auth0__props_T */
/**
 * @param {LoginForm_auth0__props_T}$p
 * @returns {JSX.Element}
 */
export function LoginForm_auth0_spa($p) {
	const $p__class_ = createMemo(()=>$p.class ?? '')
	const error_class_ = createMemo(()=>$p.error_class ?? '')
	const input_class_ = createMemo(()=>$p.input_class ?? '')
	const button_class_ = createMemo(()=>$p.button_class ?? '')
	const label_class_ = createMemo(()=>$p.label_class ?? '')
	const ctx = ctx__Context__use()
	auth0__init(ctx)
	const auth0__token__error_ = useMemo(auth0__token__error__(ctx))
	const auth0__token__error_txt_ = useMemo(auth0__token__error_txt__(ctx))
	const AUTH0_DOMAIN_ = useMemo(AUTH0_DOMAIN__(ctx))
	/** @type {HTMLDivElement} */
	let root
	/** @type {HTMLInputElement} */
	let username__input
	/** @type {Element} */
	let password__input
	const error_ = createMemo(()=>
		auth0__token__error_()?.error)
	const error_username_ = createMemo(()=>error_() === 'invalid_grant')
	const error_password_ = createMemo(()=>error_() === 'invalid_grant')
	return (
		<div
			ref={$=>root = $}
			class={class_(
				'form',
				$p__class_()
			)}
		>
			<CloseDialogHandle_auth0_spa/>
			<h1>
				<Show when={!!$p.login_text} fallback={'Login'}>{$p.login_text}</Show>
			</h1>
			<form
				action={`https://${AUTH0_DOMAIN_()}/oauth/token`}
				accept-charset="UTF-8"
				method="post"
				onSubmit={$=>
					login__onsubmit($, username__input, password__input,
						()=>form__clear__schedule(ctx, root))}
			>
				<Errors/>
				<Fieldset/>
				<Footer/>
			</form>
		</div>
	)
	function Errors() {
		return (
			<Show when={!!auth0__token__error_txt_()}>
				<ul>
					<li class={class_(
						'error',
						error_class_()
					)}>
						{auth0__token__error_txt_()}
					</li>
				</ul>
			</Show>
		)
	}
	function Fieldset() {
		onMount(()=>queueMicrotask(()=>username__input.focus()))
		return (
			<fieldset>
				<label class="field">
					<div class={label_class_()}>Email</div>
					<input
						ref={$=>username__input = $}
						placeholder="your@email.com"
						required={true}
						class={class_(
							'form-control',
							input_class_(),
							{ invalid: !!error_username_() }
						)}
						type="email"
						id="username-login"
						name="username"/>
				</label>
				<label class="field">
					<div class={label_class_()}>Password</div>
					<input
						ref={$=>password__input = $}
						placeholder="**********"
						required={true}
						class={class_(
							input_class_(),
							{ invalid: !!error_password_() }
						)}
						id="password-login"
						type="password"
						name="password"/>
				</label>
			</fieldset>)
	}
	function Footer() {
		const label_class_ = createMemo(()=>
			class_('auth_navigation', label_class_()))
		return (
			<footer>
				<input
					type="submit"
					value="Login"
					class={class_(
						'button',
						button_class_(),
					)}
				/>
				<label
					class={label_class_()}
					onclick={()=>auth0__signup__open(ctx)}
				>Don't have an account? Signup&hellip;</label>
				<label
					class={label_class_()}
					onclick={()=>auth0__forgot_password__open(ctx)}
				>Forgot Password?</label>
			</footer>)
	}
	/**
	 * @param event{Event}
	 * @param username_login_input{HTMLInputElement}
	 * @param password_login_input{HTMLInputElement}
	 * @param schedule_forms_clear{()=>void}
	 * @return {Promise<void>}
	 */
	async function login__onsubmit(
		event,
		username_login_input,
		password_login_input,
		schedule_forms_clear = ()=>{},
	) {
		event.preventDefault()
		const username = username_login_input.value
		const password = password_login_input.value
		await login({ username, password }, schedule_forms_clear)
	}
	/**
	 * @param data{auth0__login_data_T}
	 * @param schedule_forms_clear{()=>void}
	 * @return {Promise<void>}
	 */
	async function login(data, schedule_forms_clear = ()=>{}) {
		/** @type {auth0__login_data_T} */
		const body = password_realm__body_(ctx, auth0__body_(ctx, data))
		const [token_response_or_error, response] =
			await auth0__oauth_token__POST__fetch2(ctx, body)
		if (response.ok) {
			auth0__token__json__(ctx).$ = JSON.stringify(token_response_or_error)
			schedule_forms_clear()
			auth0__close(ctx)
		} else if ('error' in token_response_or_error) {
			const auth_token_error = token_response_or_error
			auth0__token__error__(ctx).$ = auth_token_error
			auth0__token__error__logout(ctx, auth_token_error)
		}
	}
}
