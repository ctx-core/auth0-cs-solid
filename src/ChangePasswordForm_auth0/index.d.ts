import type  { JSX } from 'solid-js'
export function ChangePasswordForm_auth0(_$p:ChangePasswordForm_auth0__props_T):JSX.Element
export interface ChangePasswordForm_auth0__props_T {
	error_class?:string
	input_class?:string
	button_class?:string
	label_class?:string
	start__onsubmit?:()=>void
	onsuccess?:()=>void
	onerror?:(params:{ error:any })=>void
	end__onsubmit?:()=>void
}
