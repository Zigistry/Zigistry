<script>
	let props = $props();
</script>

<h1
	class="titles my-5 ml-10 flex w-fit items-center rounded-2xl border-2 border-slate-400 px-4 pt-[18px] pb-4 text-left text-xl font-semibold shadow-lg shadow-black"
>
	<div class="flex translate-y-[-5px] items-center gap-3">
		<div class="relative flex w-8">
			<svg
				stroke="currentColor"
				fill="currentColor"
				strokewidth="0"
				viewBox="0 0 25 25"
				height="25"
				width="25"
				class="absolute left-0 z-10 -translate-y-[6px]"
				xmlns="http://www.w3.org/2000/svg"
				strokeWidth="0"
				><path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M8 18V6l8 6-8 6Z"
				></path></svg
			><svg
				stroke="currentColor"
				fill="currentColor"
				strokewidth="0"
				viewBox="0 0 25 25"
				height="25"
				width="25"
				class="absolute left-3 -translate-y-[6px]"
				xmlns="http://www.w3.org/2000/svg"
				strokeWidth="0"
				><path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M8 18V6l8 6-8 6Z"
				></path></svg
			>
		</div>
	</div>
	<span>&nbsp;{props.name}</span>
</h1>
