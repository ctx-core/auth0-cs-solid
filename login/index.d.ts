import type { auth0__login_data_T } from '@ctx-core/auth0'
import type { Ctx } from '@ctx-core/object'
export declare function login(
	ctx:Ctx,
	data:auth0__login_data_T,
	schedule_forms_clear?:()=>void
):Promise<void>
