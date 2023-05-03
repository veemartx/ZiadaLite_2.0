<script>
    import { onMount } from "svelte";
    import { Link } from "svelte-navigator";

    export let crumbs;

    onMount(() => {});
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="crumpsContainer">
                <div class="title">
                    {@html crumbs.title}
                </div>

                <div class="crumbs">
                    {#each crumbs.crumbs as crumb}
                        <div class="crumb">
                            <Link to={crumb.url}>
                                <div class="crumbNav">
                                    {crumb.name}&nbsp;/&nbsp;
                                </div>
                            </Link>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    main {
        border-bottom: 1px dotted rgba(81, 81, 81, 0.284);
        margin-bottom: 0.5em;
        margin-top: 1em;

        background: #fff;
    }
    .crumpsContainer {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.6em;
        flex-direction: column;
        padding-inline: 0.5em;
    }
    .crumbs {
        display: flex;
        padding-top: 0.5em;
    }

    .title {
        text-transform: capitalize;
        font-size: 15px;
        font-weight: 600;
        color: var(--background-primary);
    }

    @media only screen and (min-width: 640px) {
        main {
            border-bottom: 1px dotted rgba(81, 81, 81, 0.284);
            margin-bottom: 0.5em;
            margin-top: 0.5em;

            background: #fff;
        }
        .crumpsContainer {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.6em;
            flex-direction: row;
            padding-inline: 0.5em;
        }
    }
</style>
