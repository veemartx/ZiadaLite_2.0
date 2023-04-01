<script>
    import SettingsNav from "./SettingsNav.svelte";
</script>

<main>
    <div class="wrapper">
        <div class="mobileSettingsNavBar">
            <SettingsNav />
        </div>
        <div class="computerComputerHome">Comp Settings Home</div>
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
        }
    }
</style>
