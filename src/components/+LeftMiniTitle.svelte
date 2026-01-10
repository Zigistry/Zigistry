<script>
    let props = $props();
    const Icon = props.icon;
</script>

<div
    class="titles my-5 ml-10 flex w-fit items-center rounded-2xl border-2 border-slate-400 px-4 pt-[18px] pb-4 text-left text-xl font-semibold shadow-lg shadow-black"
>
    <div class="flex translate-y-[-5px] items-center gap-3">
        <div class="relative flex w-8">
            <Icon class="absolute left-0 z-10 -translate-y-[6px]" viewBox="0 0 25 25" />
        </div>
    </div>
    <h1>&nbsp;{props.name}</h1>
</div>
