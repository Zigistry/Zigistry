<script>
  import {SquareArrowOutUpRight, Package, Code} from "@lucide/svelte";
  const { data } = $props();  
  import database from "../../../../database.json"
  import LeftMiniTitle from "../../../../components/+LeftMiniTitle.svelte"
  import Card from "../../../../components/+card.svelte"
  let packages = Object.entries(database.packages);
  let programs = Object.entries(database.programs);
</script>
<div class="sm:px-20 sm:py-10 px-40 py-20">
 {#if data.provider === "github"}
<img class="rounded-full min-w-[100px] max-w-[150px]"
   src={"https://avatars.githubusercontent.com/" + data.owner_name}/>
 {:else if data.provider === 'codeberg'}
<img class="rounded-full min-w-[100px] max-w-[150px]"
   src={"https://codeberg.org/" + data.a}/>
 {/if}
 <h2 class="mt-4 font-bold">Name: {data.owner_name}</h2>
 <p>Bio: {data.user.b}</p>
 {#if data.provider === "github"}
   <a class="flex hover:underline mt-2 bg-slate-800 p-2 rounded-full w-fit items-center justify-center" target="_blank" href={"https://github.com/" + data.owner_name}>GitHub&nbsp;<SquareArrowOutUpRight size={18} /></a>
 {:else if data.provider === 'codeberg'}
   <a target="_blank" href={"https://codeberg.org/"+data.owner_name}>Codeberg<SquareArrowOutUpRight /></a>
 {/if}
</div>
<div>
<LeftMiniTitle icon={Package} name="Packages"></LeftMiniTitle>
<section class="flex w-full flex-wrap justify-evenly">
		{#each packages as [name, library]}
			{@const name_splitted = name.split('/')}
			{@const name2 = name_splitted[0] + "/" + name_splitted[1]}
			{console.log(library)}
			{@const sub = (data.provider === 'github' ? 'gh' : 'cb')}
			{#if name2 ===sub+'/'+data.owner_name && sub === 'gh' }
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
			{:else if name2 === sub + '/' + data.owner_name && sub === 'cb'}
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
<LeftMiniTitle icon={Code} name="Programs"></LeftMiniTitle>
<section class="flex w-full flex-wrap justify-evenly">
		{#each programs as [name, library]}
			{@const name_splitted = name.split('/')}
			{@const name2 = name_splitted[0] + "/" + name_splitted[1]}
			{console.log(library)}
			{@const sub = (data.provider === 'github' ? 'gh' : 'cb')}
			{#if name2 ===sub+'/'+data.owner_name && sub === 'gh' }
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
			{:else if name2 === sub + '/' + data.owner_name && sub === 'cb'}
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
