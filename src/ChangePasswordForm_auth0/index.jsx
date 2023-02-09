import { auth0__init } from '@censible/domain'
import {
	auth0__change_password__fetch_post,
	auth0__change_password__validate,
	auth0__close,
	auth0__login__open,
	auth0__token__error__,
	auth0__token__error__logout,
	AUTH0_DOMAIN__,
} from '@ctx-core/auth0'
import { notyf_error, notyf_success } from '@ctx-core/notyf'
import { useMemo } from '@ctx-core/solid-nanostores'
import { CloseDialogHandle, ctx__Context__use } from '@ctx-core/ui-solid'
import { createMemo, mergeProps, onMount, Show } from 'solid-js'
import { type DOMElement } from 'solid-js/jsx-runtime'
import { form__clear__schedule_ } from '../form__clear__schedule_/index.js'
/**
 * @param _$p{import('./index.d.ts').ChangePasswordForm_auth0__props_T}
 * @return {JSX.Element}
 */
export function ChangePasswordForm_auth0(_$p) {
	const $p =
		mergeProps({ error_class: '', input_class: '', button_class: '', label_class: '' }, _$p)
	const ctx = ctx__Context__use()
	auth0__init(ctx)
	const AUTH0_DOMAIN_ = useMemo(AUTH0_DOMAIN__(ctx))
	const auth0__token__error_ = useMemo(auth0__token__error__(ctx))
	let root: HTMLDivElement, password__input: HTMLInputElement, password_confirmation__input: HTMLInputElement
	const password__error_ =
		createMemo(()=>auth0__token__error_()?.password)
	const password_confirmation__error_ =
		createMemo<string>(()=>auth0__token__error_()?.password_confirmation)
	onMount(()=>queueMicrotask(()=>password__input.focus()))
	return (
		<div ref={$=>root = $} class="form change_password ChangePasswordForm_auth0">
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
							<li class={`error ${$p.error_class}`}>{password__error_()}</li>
						</Show>
						<Show when={!!password_confirmation__error_()}>
							<li class={`error ${$p.error_class}`}>{password_confirmation__error_()}</li>
						</Show>
					</ul>
				</Show>
				<fieldset>
					<label class="field">
						<div class={$p.label_class}>Password</div>
						<input
							ref={$=>password__input = $}
							type="password"
							placeholder="**********"
							required={true}
							class={$p.input_class}
							classList={{ invalid: !!password__error_() }}
							id="password-change_password"
							name="password"/>
					</label>
					<label class="field">
						<div class={$p.label_class}>Confirm Password</div>
						<input
							ref={$=>password_confirmation__input = $}
							type="password"
							id="password_confirmation-change_password"
							name="password_confirmation"
							class={$p.input_class}
							classList={{ invalid: !!password_confirmation__error_() }}
							required={true}
							placeholder="**********"/>
					</label>
				</fieldset>
				<footer>
					<input type="submit" value="Change Password" class={`button ${$p.button_class}`}/>
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
	async function change_password(form, schedule_forms_clear = ()=>{}) {
		const { password } = form
		let error: string
		try {
			const [response_json, response] =
				await auth0__change_password__fetch_post(ctx, password)
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
