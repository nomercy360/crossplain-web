import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params }) => {
	const api = params.api
	const version = params.version
	const path = api + '/' + version + '/' + params.kind + '/' + params.name
	const url = import.meta.env.VITE_API_URL + '/' + path
	console.log(url)
	const resp = await fetch(url)
	const data = await resp.json()
	return {
		props: {
			data
		}
	}
}