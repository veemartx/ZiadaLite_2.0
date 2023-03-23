<script>
    import ComputerHeader from "./ComputerHeader.svelte";
    import LoadingBar from "./LoadingBar.svelte";
    import MobileHeader from "./MobileHeader.svelte";
</script>

<main>
    <div class="wrapper">
        <div class="topHeader" />
        <div class="mobileHeader">
            <MobileHeader />
        </div>

        <div class="computerHeader">
            <ComputerHeader />
        </div>

        <div class="loadingBar">
            <!-- <LoadingBar /> -->
        </div>
    </div>
</main>

<style>
    main {
        background: var(--background-secondary);
    }
    .topHeader {
        height: 0.5em;
    }
    .mobileHeader {
        display: block;
    }

    .computerHeader {
        display: none;
    }

    @media only screen and (min-width: 640px) {
        .mobileHeader {
            display: none;
        }

        .computerHeader {
            display: block;
        }
    }
</style>
