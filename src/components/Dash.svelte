<script>
    import MainDashData from "./dash/MainDashData.svelte";
    import MainDashStats from "./dash/MainDashStats.svelte";
    import QuickLinks from "./dash/QuickLinks.svelte";
    import TopSalesTrends from "./dash/TopSalesTrends.svelte";
</script>

<main>
    <div class="wrapper">
        <div class="content">
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
