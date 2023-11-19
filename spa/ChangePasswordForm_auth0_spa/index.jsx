import {
	auth0__change_password__POST__fetch2,
	auth0__change_password__validate,
	auth0__close,
	auth0__init,
	auth0__login__open,
	auth0__token__error$_,
	auth0__token__error__logout,
	AUTH0_DOMAIN$_,
} from '@ctx-core/auth0'
import { CloseDialogHandle } from '@ctx-core/dialog-ui-solid'
import { class_ } from '@ctx-core/html'
import { notyf_error, notyf_success } from '@ctx-core/notyf'
import { ctx__Context__use } from '@ctx-core/solid-js'
import { useMemo } from '@ctx-core/solid-nanostores'
import { createMemo, onMount, Show } from 'solid-js'
import { form__clear__schedule_ } from '../../form__clear__schedule_/index.js'
/** @typedef {import('solid-js').JSX} */
/**
 * @param {import('./index.d.ts').ChangePasswordForm_auth0_spa__props_T}$p
 * @return {JSX.Element}
 */
export function ChangePasswordForm_auth0_spa($p) {
	const error_class_ = createMemo(()=>$p.error_class ?? '')
	const input_class_ = createMemo(()=>$p.input_class ?? '')
	const button_class_ = createMemo(()=>$p.button_class ?? '')
	const label_class_ = createMemo(()=>$p.label_class ?? '')
	const ctx = ctx__Context__use()
	auth0__init(ctx)
	const AUTH0_DOMAIN_ = useMemo(AUTH0_DOMAIN$_(ctx))
	const auth0__token__error_ = useMemo(auth0__token__error$_(ctx))
	/** @type {HTMLInputElement} */
	let root
	/** @type {HTMLInputElement} */
	let password_confirmation__input
	/** @type {HTMLInputElement} */
	let password__input
	const password__error_ =
		createMemo(()=>auth0__token__error_()?.password)
	const password_confirmation__error_ =
		createMemo(()=>auth0__token__error_()?.password_confirmation)
	onMount(()=>queueMicrotask(()=>password__input.focus()))
	return /** @type {JSX.Element} */(
		<div
			ref={$=>root = $}
			class="form change_password ChangePasswordForm_auth0_spa"
		>
			<CloseDialogHandle onclick={()=>auth0__close(ctx)}/>
			<h1>Change Password</h1>
			<form
				action={`https://${AUTH0_DOMAIN_()}/dbconnections/change_password`}
				accept-charset="UTF-8"
				method="post"
				onSubmit={async $=>{
					$.preventDefault()
					await change_password__onsubmit($)
				}}
			>
				<Show when={!!auth0__token__error_()}>
					<ul>
						<Show when={!!password__error_()}>
							<li class={class_(
								'error',
								error_class_()
							)}>{password__error_()}</li>
						</Show>
						<Show when={!!password_confirmation__error_()}>
							<li class={class_(
								'error',
								error_class_()
							)}>{password_confirmation__error_()}</li>
						</Show>
					</ul>
				</Show>
				<fieldset>
					<label class="field">
						<div class={label_class_()}>Password</div>
						<input
							ref={$=>password__input = $}
							type="password"
							placeholder="**********"
							required={true}
							class={class_(
								input_class_(),
								{ invalid: !!password__error_() })}
							id="password-change_password"
							name="password"/>
					</label>
					<label class="field">
						<div class={label_class_()}>Confirm Password</div>
						<input
							ref={$=>password_confirmation__input = $}
							type="password"
							id="password_confirmation-change_password"
							name="password_confirmation"
							class={class_(
								input_class_(),
								{ invalid: !!password_confirmation__error_() })}
							required={true}
							placeholder="**********"/>
					</label>
				</fieldset>
				<footer>
					<input
						type="submit"
						value="Change Password"
						class={class_(
							'button',
							button_class_()
						)}
					/>
				</footer>
			</form>
		</div>)
	/**
	 * @param event{Event & { submitter: HTMLElement } & { currentTarget: HTMLFormElement, target: DOMElement }}
	 * @return {Promise<void>}
	 */
	async function change_password__onsubmit(event) {
		event.preventDefault()
		$p.start__onsubmit?.call($p)
		try {
			const password = password__input.value
			const password_confirmation = password_confirmation__input.value
			const auth0_token_error = auth0__change_password__validate({
				password, password_confirmation
			})
			if (auth0_token_error) throw auth0_token_error
			await change_password({ password }, form__clear__schedule_(ctx, root))
			$p.onsuccess?.call($p)
		} catch (error) {
			$p.onerror?.call($p, { error })
			throw error
		} finally {
			$p.end__onsubmit?.call($p)
		}
	}
	/**
	 * @param form{{password:string}}
	 * @param schedule_forms_clear
	 * @return {Promise<void>}
	 */
	async function change_password(form, schedule_forms_clear = ()=>{
	}) {
		const { password } = form
		/** @type {string} */
		let error
		try {
			const [response_json, response] =
				await auth0__change_password__POST__fetch2(
					ctx,
					password)
			if (!response.ok) {
				if (response.status === 401) {
					auth0__login__open(ctx)
					const error_description = 'Authentication Error - Log in'
					auth0__token__error__logout(ctx, {
						error: 'username',
						error_description,
					})
					await notyf_error(ctx, error_description)
					return
				}
				error = response_json.error || 'Error changing Password'
			}
		} catch (err) {
			console.warn(err)
			error = err.message
		}
		if (error) {
			await notyf_error(ctx, error)
			return
		}
		await notyf_success(ctx, 'Successfully changed password')
		schedule_forms_clear()
	}
}
