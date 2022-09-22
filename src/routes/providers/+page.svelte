<script lang='ts'>

	import type { PageServerData } from './$types'
	import Prism from 'prismjs'
	import 'prismjs/components/prism-yaml.min.js'

	let language = 'yaml'

	// yaml code
	const code = `
	apiVersion: v1
	kind: Pod
	metadata:
	  name: myapp-pod
	  labels:
	    app: myapp
	spec:
	  containers:
	  - name: myapp-container
	    image: busybox
	    command: ['sh', '-c', 'echo Hello Kubernetes! && sleep 3600']
	`

	export let data: PageServerData
</script>

<main class='grid grid-cols-2 gap-24'>
	<div>
		<div class='flex flex-row gap-4'>
			{#each data.providers as provider}
				<div class='flex flex-col justify-between bg-accent p-4 rounded-lg'>
					<p class='text-lg font-semibold'>{provider.name}</p>
					<p class='text-lg font-semibold opacity-50'>{provider.version}</p>
					<div class='flex-row flex gap-3'>
				<span class='tag' class:active={provider.installed}>
				{provider.installed ? 'Installed' : 'Not installed'}
			</span>
						<span class='tag' class:active={provider.healthy}>
				{provider.healthy ? 'Healthy' : 'Unhealthy'}
			</span>
					</div>
				</div>
			{/each}
		</div>
	</div>
	<div>
		<div class='code'>
			{@html Prism.highlight(code, Prism.languages[language], language)}
		</div>
	</div>
</main>
<svelte:head>
	<link href='prism.css' rel='stylesheet' />
</svelte:head>
<style>

  .tag {
    @apply border-2 border-red-500 font-semibold px-2 py-1 rounded-full text-center mt-4 text-red-500;
  }

  .active {
    @apply border-green-600 text-green-600;
  }

	.code {
		@apply p-4 rounded-lg whitespace-pre-wrap text-white;
		background: rgb(45, 45, 45);
  }
</style>
