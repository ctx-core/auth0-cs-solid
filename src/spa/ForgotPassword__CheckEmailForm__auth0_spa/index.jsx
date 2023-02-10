import { auth0__close, auth0__login__open } from '@ctx-core/auth0'
import { CloseDialogHandle } from '@ctx-core/dialog-ui-solid'
import { ctx__Context__use } from '@ctx-core/ui-solid'
import { mergeProps, onMount } from 'solid-js'
/**
 * @param _$p{import('./index.d.ts').ForgotPassword__CheckEmailForm__auth0_spa__props_T}
 * @returns {import('solid-js').JSX.Element}
 */
export function ForgotPassword__CheckEmailForm__auth0_spa(_$p) {
	const $p =
		mergeProps({ class: '', label_class: '' }, _$p)
	const ctx = ctx__Context__use()
	onMount(()=>queueMicrotask(()=>root.focus()))
	/** @type {HTMLDivElement} */
	let root
	return (
		<div ref={$=>root = $} class="form forgot_password_check_email">
			<CloseDialogHandle onclick={()=>auth0__close(ctx)}/>
			<h1>Check Your Email</h1>
			<p>An email to reset you password has been sent to you.</p>
			<Footer/>
		</div>
	)
	function Footer() {
		return (
			<footer>
				<label class={$p.label_class} onclick={()=>auth0__login__open(ctx)}
				>Login</label>
			</footer>)
	}
}
