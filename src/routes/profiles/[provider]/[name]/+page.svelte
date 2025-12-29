<script>
	import { page } from '$app/stores';

	$: provider = $page.params.provider;
	$: owner_name = $page.params.name;
</script>

<h1>{provider}/{owner_name}</h1>
