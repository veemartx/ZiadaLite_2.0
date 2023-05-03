<script>
    import InventoryTreeChart from "./InventoryTreeChart.svelte";
    import ZiadaCoreNav from "./ZiadaCoreNav.svelte";
</script>

<main>
    <div class="wrapper">
        <div class="mobileSettingsNavBar">
            <ZiadaCoreNav />
        </div>
        <div class="computerComputerHome">
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
    .computerComputerHome {
        display: none;
    }
    @media only screen and (min-width: 640px) {
        .mobileSettingsNavBar {
            display: none;
        }

        .computerComputerHome {
            display: block;
            padding: 1em;
        }
    }
</style>
