<script>
    import { onMount } from "svelte";
    import ComputerHeader from "./ComputerHeader.svelte";
    import MobileHeader from "./MobileHeader.svelte";

    let showMainLoadingBar = false;

    let loaded = 0;

    const startLoading = () => {
        setInterval(() => {
            if (loaded < 100) {
                loaded = loaded + 1;
                showMainLoadingBar = true;
            } else {
                showMainLoadingBar = false;
            }
        }, 100);
    };

    onMount(() => {});
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
