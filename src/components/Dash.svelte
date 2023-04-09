<script>
    import MainDashData from "./dash/MainDashData.svelte";
    import MainDashStats from "./dash/MainDashStats.svelte";
    import QuickLinks from "./dash/QuickLinks.svelte";
    import TopSalesTrends from "./dash/TopSalesTrends.svelte";
    import MainProgressBar from "./MainProgressBar.svelte";
    import { loading } from "../stores/main-loader";
    import { onMount } from "svelte";
    import axios from "axios";
    import { apiBaseUrl } from "../config/config";

    let showMainLoadingBar = false;

    // const LOADING_OBJ = {
    //     n: "users",
    // };

    // const startLoading = () => {
    //     // loading.update((n) => n + 1);
    //     $loading = [...$loading, LOADING_OBJ];
    // };

    onMount(() => {
    });
</script>

<main>
    <div class="wrapper">
        <div class="content">
            {#if showMainLoadingBar}
                <MainProgressBar bind:showMainLoadingBar />
            {/if}

            <!-- qlinks -->
            <div class="quickLinks">
                <QuickLinks />
            </div>

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
