<script>
	import { MountainSnow, Star, User, Github, Eye, GitFork, CircleDotDashed } from '@lucide/svelte';
	let props = $props();
</script>

<div
	class="card z-0 my-2 flex w-72 transform-cpu flex-col rounded-lg border-0 border-gray-200 bg-white shadow-lg shadow-black transition-transform hover:z-10 hover:scale-110 dark:border-gray-700 dark:bg-[rgb(30,30,30)]"
>
	<div class="flex h-full flex-col justify-center gap-4 p-6">
		<img src={props.avatar_url} alt="misshod" width="40" height="40" class="w-10 rounded-full" />

		<span class="truncate text-2xl font-bold text-gray-900 dark:text-white">{props.repo_name}</span>

		<p class="flex w-min truncate rounded-2xl bg-gray-600 text-gray-400 dark:text-gray-400">
			<span class="flex w-fit rounded-2xl bg-gray-800 p-2 text-gray-600 dark:text-gray-400">
				<User size={22} width={22} class="min-h-[22px] min-w-[22px]" />&nbsp;<a class="hover:underline" href={(props.provider === "gh" ? "/profiles/github/": "/profiles/codeberg") + props.owner_name}>{props.owner_name}</a>
			</span>
			<span class="flex content-center items-center px-2">
				{#if props.provider === 'gh'}
					<Github size={22} />
				{:else if props.provider === 'cb'}
					<MountainSnow size={22} />
				{/if}
			</span>
		</p>
		<div class="flex space-x-3">
			<span
				class="mt-1 flex h-fit w-fit items-center gap-1 rounded border border-slate-200 bg-white p-1 px-2 py-0.5 text-xs font-semibold dark:border-none dark:bg-slate-600"
			>
				<span>{props.minimum_zig_version}</span>
			</span><span
				class="mt-1 flex h-fit w-fit items-center gap-1 rounded border border-slate-200 bg-white p-1 px-2 py-0.5 text-xs font-semibold dark:border-none dark:bg-slate-600"
				><span>{props.spdx_id}</span></span
			>
		</div>
		<p class="font-normal text-gray-700 dark:text-gray-400">
			{props.description}
		</p>
		<div class="flex items-center">
			<Star
				class="mr-1 text-[#cfbc0e]"
				stroke="currentColor"
				fill="currentColor"
				stroke-width="0"
				viewBox="-5 -5 30 30"
				color="#cfbc0e"
				height="10"
				width="10"
			></Star>{props.stars}<Eye
				class="mr-1 ml-2 text-[skyblue]"
				stroke="currentColor"
				stroke-width="0"
				color="skyblue"
				viewBox="0 0 24 24"
				height="20"
				width="20"><use href="#icon-eye"></use></Eye
			>{props.watchers}<GitFork
				class="mr-1 ml-2 text-[lightpink]"
				stroke="currentColor"
				stroke-width="0"
				viewBox="0 0 24 24"
				color="lightpink"
				height="20"
				width="20"><use href="#icon-fork"></use></GitFork
			>0<CircleDotDashed
				class="mr-1 ml-2 text-[lightgreen]"
				stroke="currentColor"
				stroke-width="0"
				viewBox="0 0 24 24"
				color="lightgreen"
				height="18"
				width="18">{props.forks}</CircleDotDashed
			>{props.issues}
			<div
				tabindex="-1"
				class="invisible absolute top-[211.993px] left-[134.169px] z-10 mr-1 ml-2 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
				id=":r0Rkq2a:"
				role="tooltip"
			>
				<div class="relative z-20">docker,oci,zig,zig-package</div>
				<div
					class="absolute bottom-[-4px] left-[67px] z-10 h-2 w-2 rotate-45 bg-gray-900 dark:bg-gray-700"
				>
					&nbsp;
				</div>
			</div>
		</div>
		<div class="flex"></div>
		<a
			href={props.url}
			type="button"
			class=":ring-cyan-700 group relative flex items-stretch justify-center rounded-full border border-gray-200 bg-white p-0.5 text-center font-medium text-gray-900 transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:z-10 focus:text-cyan-700 focus:ring-4 focus:outline-none enabled:hover:bg-gray-100 enabled:hover:text-cyan-700 dark:border-gray-600 dark:bg-transparent dark:text-gray-400 dark:enabled:hover:bg-gray-700 dark:enabled:hover:text-white"
			><span class="flex items-stretch rounded-md px-4 py-2 text-sm transition-all duration-200"
				>View package</span
			></a
		>
	</div>
</div>
