<script>
  import {SquareArrowOutUpRight} from "@lucide/svelte";
  const { data } = $props();  
</script>
<div class="sm:p-20 p-40">
<img class="rounded-full min-w-[100px] max-w-[150px]"
   src={"https://avatars.githubusercontent.com/" + data.owner_name}/>
 <h2 class="mt-4 font-bold">Name: {data.owner_name}</h2>
 <p>{data.user.b}</p>
 {#if data.provider === "github"}
   <a target="_blank" href={"https://github.com/" + data.owner_name}>GitHub<SquareArrowOutUpRight /></a>
 {:else if data.provider === 'codeberg'}
   <a target="_blank" href={"https://codeberg.org/"+data.owner_name}>Codeberg<SquareArrowOutUpRight /></a>
 {/if}
 
</div>
