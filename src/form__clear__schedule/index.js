import { auth0__token__error__clear } from '@ctx-core/auth0'
import { dom_a_ } from '@ctx-core/dom'
/** @type {typeof import('./index.d.ts').form__clear__schedule} */
export const form__clear__schedule = (ctx, root)=>{
	setTimeout(()=>{
		auth0__token__error__clear(ctx)
		input_a__clear(dom_a_('input[type=text]', root))
		input_a__clear(dom_a_('input[type=password]', root))
	}, 100)
}
function input_a__clear(input_a: NodeList) {
	for (let i = 0; i < input_a.length; i++) {
		/** @type {HTMLInputElement} */
		const input = input_a[i]
		input.value = ''
	}
}
