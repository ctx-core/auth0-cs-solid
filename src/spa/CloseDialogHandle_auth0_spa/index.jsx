import { auth0__close } from '@ctx-core/auth0'
import { CloseDialogHandle } from '@ctx-core/dialog-ui-solid'
import { ctx__Context__use } from '@ctx-core/solid-js'
export function CloseDialogHandle_auth0_spa() {
	const ctx = ctx__Context__use()
	return <CloseDialogHandle onclick={()=>auth0__close(ctx)}/>
}
