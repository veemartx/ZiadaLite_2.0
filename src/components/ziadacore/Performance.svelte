<script>
    // @ts-nocheck

    import { onMount } from "svelte";
    import { Link } from "svelte-navigator";
    import { addCommas, goBack } from "../../scripts/js/methods";
    import axios from "axios";
    import { apiBaseUrl } from "../../config/config";
    import PerformanceMainFilter from "./PerformanceMainFilter.svelte";
    import BranchPerformance from "./BranchPerformance.svelte";

    export let crumbs;

    onMount(() => {
        crumbs = {
            title: "Performance",
            crumbs: [
                {
                    name: "Home",
                    url: "/",
                },
                {
                    name: "ZiadaCore",
                    url: "/ziada-core",
                },
                {
                    name: "Performance",
                    url: "/ziada-core/performance",
                },
            ],
        };
    });
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="mainContainer">
                <!-- mainTitle -->
                <div class="titleBar">
                    <div class="titleCol">
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <div
                            class="backCol"
                            on:click={() => {
                                goBack();
                            }}
                        >
                            <div class="" style="padding-right:2px">
                                <i class="arrow left icon" />
                            </div>
                            <div class="">Back</div>
                        </div>

                        <div class="s-title">
                            <i class="cog icon" /> Performance
                        </div>
                    </div>
                    <div class="actions">
                        <i class="ri-more-2-fill" />
                    </div>
                </div>
                <!-- mainTitle  -->

                <div class="branchPerformance">
                    <BranchPerformance />
                </div>

                <br /> <br />
                <div class="h-spacer" />

                <!-- main filter  -->
                <div class="">
                    <PerformanceMainFilter />
                </div>
                <!-- main filter  -->
            </div>
        </div>
    </div>
    <br />
</main>

<style>
    .titleBar {
        padding: 0.5em;
        border-bottom: 1px solid rgba(166, 166, 166, 0.429);
    }
    .backCol {
        font-size: larger;
        color: crimson;
        font-weight: 600;
        display: flex;
        cursor: pointer;
    }

    .titleCol {
        display: flex;
        justify-content: space-between;
    }

    .s-title {
        font-size: larger;
        margin-left: 1em;
        font-weight: 500;
        color: var(--background-secondary);
    }

    .h-spacer {
        background: #f3f3f9;
        min-height: 1em;
    }

    .mainContainer {
        /* background: yellow; */
        padding: 1em;
        overflow-x: auto;
        max-width: 90vw;
    }

    @media only screen and (min-width: 640px) {
    }
</style>
