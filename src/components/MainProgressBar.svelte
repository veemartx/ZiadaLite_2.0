<script>
    // @ts-nocheck

    import { loading } from "../stores/main-loader";

    export let showMainLoadingBar;

    const MAX = 100;

    let loaded = 2;

    // loading speed i milliseconds
    let loadingSpeed = 500;

    // when currentlyLoading changes update the speed
    $: {
        if ($loading.length > 0) {
            if (loaded < 100) {
                updateLoaded($loading);
            } else {
                $loading.pop();
                $loading = $loading;

                showMainLoadingBar = false;
            }
        }
    }

    // this updates pecentage loaded
    const updateLoaded = () => {
        let distance = MAX - loaded;

        if (distance <= 10) {
            loadingSpeed = 600;

            loaded = loaded + Math.floor(Math.random() * 10);
        } else if (distance > 10 && distance <= 40) {
            loadingSpeed = 300;
            loaded = loaded + Math.floor(Math.random() * 10);
        } else if (distance > 40 && distance <= 80) {
            loadingSpeed = 100;
            loaded = loaded + Math.floor(Math.random() * 10);
        } else if (distance > 80) {
            loadingSpeed = 50;
            loaded = loaded + Math.floor(Math.random() * 10);
        }

        if (loaded < 100) {
            setTimeout(() => {
                updateLoaded();
            }, loadingSpeed);
        }
    };
</script>

<main>
    <div class="progressBar" style={`width:${loaded}%`} />
</main>

<style>
    .progressBar {
        /* Remain on top */
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;

        /* Thickness & Color */
        height: 3px;
        background: rgb(13, 220, 106);

        /* How fast progress happens */
        transition: width 0.25s;

        /* Display on top of everything */
        z-index: 1000000;
    }
</style>
