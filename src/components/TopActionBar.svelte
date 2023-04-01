<script>
    import { onMount } from "svelte";
    import { Link, useLocation } from "svelte-navigator";
    import QuickApps from "./QuickApps.svelte";

    const location = useLocation();

    let showQuickApps = false;

    $: {
        hideQuickApps($location);
    }

    const hideQuickApps = ($location) => {
        showQuickApps = false;
        return $location;
    };

    const toggleQuickApps = () => {
        showQuickApps = !showQuickApps;
    };

    // handle theme change
    onMount(() => {});
</script>

<main>
    <div class="wrapper">
        <div class="actionIconsContainer">
            <div class="actionIcons">
                <Link to="/">
                    <div class="icon-btn">
                        <i class="ri-home-line" />
                    </div>
                </Link>

                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div
                    on:click={toggleQuickApps}
                    class={showQuickApps ? "icon-btn active" : "icon-btn"}
                >
                    <i class="ri-layout-grid-fill" />
                </div>

                <Link to="/products/new">
                    <div class="icon-btn">
                        <i class="ri-add-box-line" />
                    </div>
                </Link>

                <div class="icon-btn">
                    <i class="ri-nurse-line" />
                </div>
            </div>

            {#if showQuickApps}
                <div class="quickAppsBar">
                    <QuickApps />
                </div>
            {/if}
        </div>
    </div>
</main>

<style>
    .actionIcons {
        display: flex;
        justify-content: flex-end;
    }

    .icon-btn {
        color: #f2f2f2c7;
    }

    .quickAppsBar {
        background: rgb(20, 78, 57);
        padding: 0.4em;
        position: absolute;
        border-radius: 5px;
    }
</style>
