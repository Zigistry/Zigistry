<script>
  import { page } from '$app/stores';
  import { error } from '@sveltejs/kit';
  
  $: provider  = $page.params.provider;
  $: owner_name = $page.params.name;

  if (provider != "github" && provider != "codeberg") {
    error(404, 'Unknown provider: ' + provider);
  }
</script>


<h1>{provider}/{owner_name}</h1>
