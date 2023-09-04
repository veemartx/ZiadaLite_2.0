<script>
    import InventoryTreeChart from "./InventoryTreeChart.svelte";
    import ZiadaCoreNav from "./ZiadaCoreNav.svelte";
</script>

<main>
    <div class="wrapper">
        <div class="mobileSettingsNavBar">
            <ZiadaCoreNav />
        </div>
        <div class="mainContainer">
            <div class="titleBar">
                <div class="title">ZiadaConnect</div>
            </div>

            <div class="contentBar">
                <InventoryTreeChart />
            </div>
        </div>
    </div>
</main>

<style>
    .mainContainer {
        display: block;
        padding: 1em;
    }
    @media only screen and (min-width: 640px) {
        .mobileSettingsNavBar {
            display: none;
        }
    }
</style>
