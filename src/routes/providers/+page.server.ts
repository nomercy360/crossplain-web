import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	const url = import.meta.env.VITE_API_URL + '/pkg.crossplane.io/v1/providers?limit=500'
	const providers = await fetch(url)
	const providersJson = await providers.json()

	// "conditions": [
	// 	{
	// 		"lastTransitionTime": "2022-09-22T10:01:04Z",
	// 		"reason": "HealthyPackageRevision",
	// 		"status": "True",
	// 		"type": "Healthy"
	// 	},
	// 	{
	// 		"lastTransitionTime": "2022-09-22T10:00:32Z",
	// 		"reason": "ActivePackageRevision",
	// 		"status": "True",
	// 		"type": "Installed"
	// 	}
	// ],
	// return installed: true, false, healthy: true, false
	// "spec": {
	// 		"package": "crossplane/provider-aws:v0.32.0",
	// extract provider name and version
	return {
		providers: providersJson.items.map((provider: any) => {
				return {
					name: provider.spec.package.split(':')[0].split('/')[1],
					version: provider.spec.package.split(':')[1],
					installed: provider.status?.conditions?.filter((condition: any) => condition.type === 'Installed')[0].status === 'True',
					healthy: provider.status?.conditions?.filter((condition: any) => condition.type === 'Healthy')[0].status === 'True'
				}
			}
		)
	}
}