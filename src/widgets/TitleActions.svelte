<script>
    import { Link, useLocation } from "svelte-navigator";

    const location = useLocation();

    $: {
        // when location changes hide panel
        hidePanel($location);
    }

    // this will receive an array of objects describing what will be displayed and how it will be description
    let showPanel = false;

    const togglePanel = () => {
        showPanel = !showPanel;
    };

    const hidePanel = ($location) => {
        showPanel = false;
    };

    export let title;

    export let actions = [];
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="actions">
                <button
                    on:click={togglePanel}
                    class={showPanel
                        ? "ui blue icon small button"
                        : "ui basic blue icon small button"}
                    style="font-size: x-small;"
                >
                    <i class="ellipsis vertical icon" />
                </button>

                {#if showPanel}
                    <div class="actionPanel">
                        <div class="actionsContainer">
                            <div class="aTitle">{title ? title : "Action"}</div>
                            <div class="aContent">
                                {#each actions as a}
                                    <div class="aCol">
                                        <Link to={a.url}>
                                            <div
                                                class="aNav"
                                                style={`color:${a.color}`}
                                            >
                                                <span>
                                                    <i class={a.icon} />
                                                </span>

                                                <span>
                                                    {a.title}
                                                </span>
                                            </div>
                                        </Link>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</main>

<style>
    .content {
        position: relative;
    }
    .actionPanel {
        min-width: 15em;
        position: absolute;
        right: 0;
    }

    .actionsContainer {
        background-color: #fff;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        border: 1px solid rgba(105, 105, 105, 0.121);
        border-radius: 5px;
    }

    .aTitle {
        padding-inline: 1em;
        border-bottom: 1px solid rgba(122, 100, 100, 0.236);
        padding-top: 0.6em;
        padding-bottom: 0.2em;
        font-size: 14px;
        font-weight: 600;
        color: var(--text-primary-light);
    }

    .aCol {
        padding-inline: 1em;
        line-height: 3em;
        border-bottom: 1px solid rgba(27, 52, 27, 0.164);
    }

    .aCol:hover {
        background: rgba(0, 128, 0, 0.17);
    }

    .aNav {
        font-weight: 600;
    }
</style>
