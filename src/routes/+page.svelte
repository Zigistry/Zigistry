<script>
	import LeftMiniTitle from '../components/+LeftMiniTitle.svelte';
	import Card from '../components/+card.svelte';
	import all_database from '../database.json';
	import { Rocket } from '@lucide/svelte';
	const top_10_latest_repos = Object.entries(all_database.packages)
		.sort(([, a], [, b]) => new Date(b.c) - new Date(a.c))
		.slice(0, 10);
</script>

<div class="flex flex-col items-center">
	<div class="searchArea rounded-lg sm:m-5 sm:p-5 sm:shadow-lg sm:shadow-black">
		<h1 class="my-5 text-center text-2xl font-semibold">Search Ziglang Packages</h1>
		<div class="flex">
			<div class="w-fit">
				<div class="ml-4 flex">
					<div class="relative w-max max-w-36 min-w-10">
						<label for="dropDownID" class="hidden">Filter</label><select
							class="block w-full rounded-lg border border-yellow-500 bg-yellow-50 p-2.5 text-sm text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500"
							id="dropDownID"
							><option>No Filter</option><option>api</option><option>http</option><option
								>rest</option
							><option>gamedev</option><option>gui</option><option>cross-platform</option></select
						>
					</div>
				</div>
			</div>
			<div class="mx-4 mb-5 flex w-60 max-w-72">
				<div class="relative w-full">
					<input
						class="block w-full rounded-lg border border-slate-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-[#2e2e2e] dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500"
						type="text"
						placeholder="Search 500+ Zig libraries"
						autofocus=""
						id="search_box"
					/>
				</div>
			</div>
		</div>
	</div>
</div>
<div>
	<LeftMiniTitle icon={Rocket} name="Recently Released" />
	<section class="flex w-full flex-wrap justify-evenly">
		{@html '<!--What!!!! package is a reserved keyword!!!!!!-->'}
		{#each top_10_latest_repos as [name, library]}
			{@const name_splitted = name.split('/')}
			{console.log(library)}
			{#if name_splitted[0] === 'gh'}
				<Card
					avatar_url={'https://avatars.githubusercontent.com/' + name_splitted[1]}
					owner_name={name_splitted[1]}
					repo_name={name_splitted[2]}
					stars={library.s}
					description={library.d}
					watchers={library.w}
					forks={library.f}
					issues={library.i}
					provider="gh"
					spdx_id={library.l}
					minimum_zig_version={library.dbi.m}
				/>
			{:else if name_splitted[0] === 'cb'}
				<Card
					avatar_url={'https://codeberg.org/avatars/' + library.a}
					owner_name={name_splitted[1]}
					repo_name={name_splitted[2]}
					description={library.d}
					watchers={library.w}
					stars={library.s}
					forks={library.f}
					issues={library.i}
					minimum_zig_version={library.dbi.m}
					provider="cb"
					spdx_id={library.l}
				/>
			{/if}
		{/each}
	</section>
</div>
