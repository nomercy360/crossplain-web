import type { RequestHandler } from '@sveltejs/kit'

export const DELETE: RequestHandler = async ({ params }) => {
	const path = params.api + '/' + params.version + '/' + params.kind + '/' + params.name
	const url = import.meta.env.VITE_API_URL + '/' + path
	console.log(url)
	const resp = await fetch(url, {
		method: 'DELETE'
	})

	if (resp.status === 200) {
		return new Response(null, {
			status: 200
		})
	} else {
		return new Response(null, {
			status: 500
		})
	}
}