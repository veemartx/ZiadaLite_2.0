<script>
    import ComputerHeader from "./ComputerHeader.svelte";
    import MobileHeader from "./MobileHeader.svelte";
</script>

<main>
    <div class="wrapper">
        <div class="mobileHeader">
            <MobileHeader />
        </div>

        <div class="computerHeader">
            <ComputerHeader />
        </div>
    </div>
</main>

<style>
    .wrapper {
        background-color: rgb(255, 255, 255);
    }

    .mobileHeader {
        display: block;
    }

    .computerHeader {
        display: none;
        padding-top: 0.1em;
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
