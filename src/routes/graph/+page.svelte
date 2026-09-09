<svelte:head>
    <title>Dependency Graph - Zigistry</title>
    <meta
        name="description"
        content="Interactive dependency graph of packages and libraries in the Zig programming language ecosystem."
    />
    <link rel="canonical" href="https://zigistry.dev/graph" />
    <meta property="og:title" content="Dependency Graph - Zigistry" />
    <meta
        property="og:description"
        content="Interactive dependency graph of packages and libraries in the Zig programming language ecosystem."
    />
    <meta property="og:url" content="https://zigistry.dev/graph" />
</svelte:head>

<div class="graph-frame">
    <iframe title="Zigistry dependency graph" src="/dependency-graph.html"></iframe>
</div>

<style>
    .graph-frame {
        width: 100%;
        height: 80vh;
        background-color: #1e1e1e;
    }

    .graph-frame iframe {
        display: block;
        width: 100%;
        height: 100%;
        border: 0;
    }
</style>
