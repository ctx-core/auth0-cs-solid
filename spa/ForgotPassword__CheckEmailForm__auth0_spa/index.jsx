/// <reference types="./index.d.ts" />
import { auth0__close, auth0__login__open } from '@ctx-core/auth0'
import { CloseDialogHandle } from '@ctx-core/dialog-ui-solid'
import { ctx__Context__use } from '@ctx-core/solid-js'
import { html_class_ } from 'ctx-core/html'
import { createMemo, onMount } from 'solid-js'
/** @typedef {import('solid-js').JSX} */
/**
 * @param {ForgotPassword__CheckEmailForm__auth0_spa__props_T}$p
 * @returns {import('solid-js').JSX.Element}
 */
export function ForgotPassword__CheckEmailForm__auth0_spa($p) {
	const $p__class_ = createMemo(()=>$p.class ?? '')
	const label_class_ = createMemo(()=>$p.label_class ?? '')
	const ctx = ctx__Context__use()
	onMount(()=>queueMicrotask(()=>root.focus()))
	/** @type {HTMLDivElement} */
	let root
	return /** @type {JSX.Element} */(
		<div
			ref={$=>root = $}
			class={html_class_(
				'form',
				'forgot_password_check_email',
				$p__class_()
			)}
		>
			<CloseDialogHandle onclick={()=>auth0__close(ctx)}/>
			<h1>Check Your Email</h1>
			<p>An email to reset you password has been sent to you.</p>
			<Footer/>
		</div>
	)
	function Footer() {
		return (
			<footer>
				<label
					class={label_class_()}
					onclick={()=>auth0__login__open(ctx)}
				>Login</label>
			</footer>)
	}
}
