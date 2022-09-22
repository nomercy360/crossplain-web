<script>
	import '../app.css'
	import { page } from '$app/stores'
	import Icon from '$lib/shared/icon.svelte'

	const links = [
		{ href: '/resources', text: 'Explore Resources', icon: 'explore' },
		{ href: '/providers', text: 'Providers', icon: 'providers' }
	]
	$: path = $page.url.pathname
</script>

<main class='flex flex-row w-full items-center justify-start'>
	<nav class='flex flex-col gap-4 justify-center py-4 ml-10 h-full pr-10'>
		{#each links as link}
			<a href={link.href}
				 class='text-lg text-neutral-500 hover:bg-secondary flex flex-row gap-3 px-4 py-4
				  rounded-full hover:text-neutral-100 transition-colors duration-400 ease-in-out'
				 class:active={link.href === path}>
				<Icon name={link.icon} width='24' heigth='24'></Icon>
				{link.text}
			</a>
		{/each}
	</nav>
	<slot />
</main>

<style>
  .active {
    @apply bg-button text-neutral-50;
  }
</style>