<script>
    import { updateCrumbs } from "../scripts/js/methods";
    import MainDashData from "./dash/MainDashData.svelte";
    import MainDashStats from "./dash/MainDashStats.svelte";
    import TopSalesTrends from "./dash/TopSalesTrends.svelte";
    import MainProgressBar from "./MainProgressBar.svelte";
    import { onMount } from "svelte";

    let crumbs = {
        title: "Dashboard",
        crumbs: [
            {
                name: "Home",
                url: "/",
            },
            {
                name: "Dashboard",
                url: "/dash/",
            },
        ],
    };

    let showMainLoadingBar = false;

    onMount(() => {
        updateCrumbs(crumbs);
    });
</script>

<main>
    <div class="wrapper">
        <div class="content">
            {#if showMainLoadingBar}
                <MainProgressBar bind:showMainLoadingBar />
            {/if}

            <div class="mainStats">
                <MainDashStats />
            </div>

            <div class="salesTrends">
                <TopSalesTrends />
            </div>
            <br />
            <div class="mainDashData">
                <MainDashData />
            </div>
        </div>
    </div>
</main>

<style>
    main {
        margin-bottom: 1em;
    }
</style>
