import type { auth0__login_data_T } from '@ctx-core/auth0'
import type { ctx_T } from 'ctx-core/be'
export declare function login(
	ctx:ctx_T,
	data:auth0__login_data_T,
	schedule_forms_clear?:()=>void
):Promise<void>
