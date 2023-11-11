import { ModalDialog } from '@ctx-core/dialog-ui-solid'
import { class_ } from '@ctx-core/html'
import { Style_ } from '@ctx-core/ui-solid'
import { createMemo } from 'solid-js'
import { Auth0_spa } from '../Auth0_spa/index.jsx'
/** @typedef {import('solid-js').JSX}JSX */
/**
 * @param {import('./index.d.ts').ModalDialog_auth0_spa__props_T}$p
 * @return {JSX.Element[]}
 */
export function ModalDialog_auth0_spa($p) {
	const $p__class_ = createMemo(()=>$p.class ?? '')
	const title_ = createMemo(()=>$p.title ?? '')
	return /** @type {JSX.Element} */[
		<Style/>,
		<ModalDialog
			class={class_(
				'ModalDialog_auth0_spa',
				$p__class_()
			)}
			title={title_()}
			onclose={()=>$p.onclose()}
		>
			<Auth0_spa show_close={false}/>
		</ModalDialog>
	]
}
// language=CSS
const Style = Style_(()=>`
	.ModalDialog_auth0_spa .Auth0_spa .form {
		margin-top: 16px;
	}
	.ModalDialog_auth0_spa .Auth0_spa fieldset {
		margin: 0;
	}
	.ModalDialog_auth0_spa .Auth0_spa p {
		margin-top: 12px;
		text-align: center;
	}
`)
