<script lang="ts">
    import { ChevronsDown } from '@lucide/svelte';
    let { href = '#', label = 'View More' } = $props();
</script>

<a {href} class="view-more-bulge">
    <span class="view-more-text">{label}</span>
    <ChevronsDown size={20} />
</a>

<style>
    .view-more-bulge {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        background: linear-gradient(180deg, #1e1e1e 0%, #242424 100%);
        border-radius: 0 0 2rem 2rem;

        /* I think I will change this to -1.5.*/
        margin-top: -0.8rem;

        padding: 2rem 0 1.5rem;
        text-decoration: none;
        color: #9ca3af;
        transition: all 0.3s ease;
    }

    .view-more-bulge:hover {
        background: linear-gradient(180deg, #1e1e1e 0%, #2a2a2a 100%);
        color: #d1d5db;
    }

    .view-more-text {
        font-weight: 600;
        font-size: 0.875rem;
    }
</style>
