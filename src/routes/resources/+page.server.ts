// load function
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	const res = await fetch(import.meta.env.VITE_API_URL + '?timeout=32s')
	const apis = await res.json()
	// get all group names that match the pattern *.crossplane.io
	// collect preferredVersion.version
	// run GET /apis/<group>/<version> to get all groups
	// collect resources[].name
	// get each resource and collect metadata.name as name
	const groups = apis.groups.filter((group: any) => group.name.endsWith('.crossplane.io'))
	const groupVersions = groups.map((group: any) => {
		return {
			group: group.name,
			version: group.preferredVersion.version
		}
	})
	const resourcesList = await Promise.all(groupVersions.map(async (groupVersion: any) => {
		const res = await fetch(import.meta.env.VITE_API_URL + '/' + groupVersion.group + '/' + groupVersion.version)
		const resources = await res.json()
		// also check that singularName is not empty. Collect group, version, name
		return resources.resources.reduce((acc: any, resource: any) => {
			if (resource.singularName !== '') {
				acc.push({
					group: groupVersion.group,
					version: groupVersion.version,
					name: resource.name
				})
			}
			return acc
		}, [])
	}))

	const resources = resourcesList.flat()
	const resourcesWithNames = await Promise.all(resources.map(async (resource: any) => {
		const url = import.meta.env.VITE_API_URL + '/' + resource.group + '/' + resource.version + '/' + resource.name
		const res = await fetch(url)
		const resourceJson = await res.json()
		return resourceJson.items.reduce((acc: any, resource: any) => {
			if (resource.metadata?.finalizers?.includes('finalizer.managedresource.crossplane.io')) {
				acc.push({
					group: resource.group,
					kind: resource.kind,
					name: resource.metadata.name,
					conditions: resource.status?.conditions
				})
			}
			return acc
		}, [])
	}))
	return {
		resources: resourcesWithNames.flat()
	}
}