import { ModalDialog } from '@ctx-core/dialog-ui-solid'
import { Style_ } from '@ctx-core/ui-solid'
import { mergeProps } from 'solid-js'
import { Auth0_spa } from '../Auth0_spa/index.jsx'
/**
 * @param _$p{import('./index.d.ts').ModalDialog_auth0_spa__props_T}
 * @return {JSX.Element[]}
 */
export function ModalDialog_auth0_spa(_$p) {
	const $p = mergeProps({ class: '', title: '' }, _$p)
	return [
		<Style/>,
		<ModalDialog
			class={`ModalDialog_auth0_spa ${$p.class}`}
			title={$p.title}
			onClose={()=>$p.onclose()}
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
