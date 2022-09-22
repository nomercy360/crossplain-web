<script lang='ts'>
	import type { PageServerData } from './$types'
	import { dtToPretty } from '$lib/utils'

	export let data: PageServerData

	const getPath = (resourceRef) => {
		const apiVersion = resourceRef.apiVersion
		const kind = resourceRef.kind
		const plural = kind.toLowerCase() + 's'
		const name = resourceRef.name
		return `${apiVersion}/${plural}/${name}`
	}

	const handleDelete = async (resourceRef) => {
		const response = await fetch(`/resources/${getPath(resourceRef)}`, {
			method: 'DELETE'
		})
		if (response.ok) {
			window.location.reload()
		}
	}

	// "conditions": [
	// 	{
	// 		"lastTransitionTime": "2022-09-22T20:01:36Z",
	// 		"reason": "Available",
	// 		"status": "True",
	// 		"type": "Ready"
	// 	},
	// 	{
	// 		"lastTransitionTime": "2022-09-22T20:00:35Z",
	// 		"reason": "ReconcileSuccess",
	// 		"status": "True",
	// 		"type": "Synced"
	// 	}
	// ]
</script>

<main>
	<div class='grid-cols-3 grid gap-4'>
		{#each data.resources as resource}
			<div class='p-4 text-white border-secondary border rounded-lg'>
				<p class='text-lg'>{resource.kind}</p>
				<p class='opacity-40'>{resource.name}</p>
				{#each resource.conditions as condition}
					<div class='flex flex-row gap-2 border border-button rounded-3xl px-4 py-1.5 mt-4'>
						<p>{condition.type}</p>
						<p class='opacity-40'>{dtToPretty(condition.lastTransitionTime)}</p>
					</div>
				{/each}
			</div>
		{/each}
	</div>
</main>