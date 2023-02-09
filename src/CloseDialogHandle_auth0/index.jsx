import { auth0__close } from '@ctx-core/auth0'
import { ctx__Context__use, CloseDialogHandle } from '@ctx-core/ui-solid'
export function CloseDialogHandle_auth0() {
	const ctx = ctx__Context__use()
	return <CloseDialogHandle onclick={()=>auth0__close(ctx)}/>
}
