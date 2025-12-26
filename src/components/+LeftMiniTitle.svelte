<script>
	let props = $props();
	import { Rocket } from '@lucide/svelte';
</script>

<h1
	class="titles my-5 ml-10 flex w-fit items-center rounded-2xl border-2 border-slate-400 px-4 pt-[18px] pb-4 text-left text-xl font-semibold shadow-lg shadow-black"
>
	<div class="flex translate-y-[-5px] items-center gap-3">
		<div class="relative flex w-8">
			<Rocket class="absolute left-0 z-10 -translate-y-[6px]" viewBox="0 0 25 25" />
		</div>
	</div>
	<span>&nbsp;{props.name}</span>
</h1>
