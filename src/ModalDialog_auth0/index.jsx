import { ModalDialog } from '@ctx-core/dialog-ui-solid'
import { Style_ } from '@ctx-core/ui-solid'
import { mergeProps } from 'solid-js'
import { Auth0 } from '../Auth0/index.jsx'
/**
 * @param _$p{import('./index.d.ts').ModalDialog_auth0__props_T}
 * @return {JSX.Element[]}
 */
export function ModalDialog_auth0(_$p) {
	const $p = mergeProps({ class: '', title: '' }, _$p)
	return [
		<Style/>,
		<ModalDialog
			class={`ModalDialog_auth0 ${$p.class}`}
			title={$p.title}
			onClose={()=>$p.onclose()}
		>
			<Auth0 show_close={false}/>
		</ModalDialog>
	]
}
// language=CSS
const Style = Style_(()=>`
	.ModalDialog_auth0 .Auth0 .form {
		margin-top: 16px;
	}
	.ModalDialog_auth0 .Auth0 fieldset {
		margin: 0;
	}
	.ModalDialog_auth0 .Auth0 p {
		margin-top: 12px;
		text-align: center;
	}
`)
