<script>
    // @ts-nocheck

    import { onMount, createEventDispatcher } from "svelte";
    import { fly } from "svelte/transition";
    import { Confirm } from "notiflix";

    let deviceDetails = JSON.parse(window.localStorage.pcims_device_tkn);

    // send message to close modal
    const dispatch = createEventDispatcher();

    function closeModal() {
        dispatch("close");
    }

    const handleDeviceReset = () => {
        Confirm.show(
            `Device Reset`,
            `Reset Device ${deviceDetails.deviceCode}? You Might be logged out`,
            `Ok`,
            `Cancel`,
            () => {
                // handle device reset
                window.localStorage.removeItem("pcims_device_tkn");

                window.location.reload();
            }
        );
    };

    onMount(() => {
        // change body attributes
        // document.body.style.overflow = "hidden"; // ADD THIS LINE
        // document.body.style.height = "100%";
    });
</script>

<main>
    <div class="wrapper">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
            id="sideBarModal"
            class="sideBarModal"
            on:click={(e) => {
                let modal = document.getElementById("sideBarModal");

                window.onclick = function (event) {
                    if (event.target == modal) {
                        closeModal();
                    }
                };
            }}
        >
            <div transition:fly={{ x: 200, duration: 400 }} class="sidebar">
                <div class="sideBarTitle">
                    <div class="title" />
                    <div class="close closeModal">
                        <i on:click={closeModal} class="ri-close-line" />
                    </div>
                </div>

                <div class="deviceDetailsContainer">
                 
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    .sideBarModal {
        background: rgba(0, 0, 0, 0.547);
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 10000;
        animation: darken 1s;
        display: flex;
        justify-content: flex-end;
        backdrop-filter: blur(5px);
    }

    .sidebar {
        width: 100%;
        padding: 1em;
        background: #fff;
    }

    .sideBarTitle {
        border-bottom: 1px solid rgba(128, 128, 128, 0.212);
        font-weight: 500;
        font-size: 20px;
        display: flex;
        justify-content: space-between;
    }

    .deviceDetailsContainer {
        border-radius: 5px;
        border: 1px solid rgba(0, 0, 255, 0.173);
        min-height: 5em;
        margin-top: 1em;
    }


    .title {
        font-weight: 600;
        font-size: 23px;
    }


    @media only screen and (min-width: 640px) {
        .sidebar {
            width: 25em;
        }
    }
</style>
