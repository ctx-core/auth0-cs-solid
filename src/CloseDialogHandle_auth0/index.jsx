import { auth0__close } from '@ctx-core/auth0'
import { CloseDialogHandle, ctx__Context__use } from '@ctx-core/ui-solid'
export function CloseDialogHandle_auth0() {
	const ctx = ctx__Context__use()
	return <CloseDialogHandle onclick={()=>auth0__close(ctx)}/>
}
