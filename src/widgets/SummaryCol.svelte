<script>
    import Products from "../routes/Products.svelte";

    // this widget takes an array of objects (summary) whicth it displays
    export let summary = [];

    let colors = [
        "purple",
        "darkgreen",
        "dodgerblue",
        "olive",
        "teal",
        "orangered",
        "brown",
        "green",
        "crimson",
    ];
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="summaryContainer">
                {#each summary as s, i}
                    <div
                        class="summaryCol"
                        style={s.color
                            ? `color:${s.color}`
                            : `color:${colors[i]}`}
                    >
                        <span class="name">{s.name} </span> <br />
                        <span class="value"> {s.value}</span>
                        {#if s.number}
                            <span class="figure">({s.number})</span>
                        {/if}
                    </div>
                {/each}
            </div>
        </div>
    </div>
</main>

<style>
    .summaryContainer {
        display: flex;
        padding: 1em;
        background: rgba(255, 0, 0, 0.101);
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .summaryCol {
        width: 45%;
        font-weight: 600;
    }

    .figure {
        font-size: x-small;
    }
    @media only screen and (min-width: 640px) {
        .summaryContainer {
            display: flex;
            padding: 1em;
            justify-content: space-between;
            flex-wrap: wrap;
        }

        .summaryCol {
            width: 20%;
        }
    }
</style>
