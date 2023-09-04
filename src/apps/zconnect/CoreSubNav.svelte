<script>
    import { Link, useLocation } from "svelte-navigator";
    import { getCurrentEntity } from "../../scripts/js/methods";

    const location = useLocation();

    export let coreNav;
    let currentEntity;

    $: {
        // updateLocation($location);

        currentEntity = getCurrentEntity($location.pathname);
    }
</script>

<main>
    <div class="coreNav">
        <div class="coreNavBar">
            {#each coreNav as nav}
                <div class="navcol">
                    <Link to={nav.url}>
                        <div
                            class={currentEntity == nav.entityName.toLowerCase()
                                ? "nav active"
                                : "nav"}
                        >
                            <i class={nav.icon} />
                            {nav.name}
                        </div>
                    </Link>
                </div>
            {/each}
        </div>
    </div>
</main>

<style>
    main {
        padding-top: 0.7em;
        padding-inline: 1em;
        padding-bottom: 1em;
    }

    .coreNavBar {
        display: flex;
        border-bottom: 1px solid rgba(128, 128, 128, 0.169);
        padding-bottom: 0.5em;
        flex-wrap: wrap;
    }

    .navcol {
        margin: 0.4em;
    }

    .nav {
        font-weight: 500;
        color: purple;
        background: rgba(255, 0, 0, 0.04);
        padding-inline: 1em;
        padding-top: 0.2em;
        padding-bottom: 0.2em;
        border: 1px solid purple;
        border-radius: 3px;
    }

    .nav:hover {
        background: rgba(255, 0, 144, 0.14);
        transition: 200ms;
    }

    .active {
        background: rgba(128, 0, 128, 0.198);
        border-bottom: 1px solid purple;
    }
</style>
