import type { RequestHandler } from '@sveltejs/kit'

export const DELETE: RequestHandler = async ({ request }) => {
	const pathParam = request.url.split('?')[1]
	const path = pathParam.split('=')[1]
	const url = import.meta.env.VITE_API_URL + '/' + path
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