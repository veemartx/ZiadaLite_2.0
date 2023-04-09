<script>
    // @ts-nocheck
    import Breadcrumbs from "../Breadcrumbs.svelte";
    import { Dexie, liveQuery } from "dexie";
    import { db } from "../../db/db";
    import { fade } from "svelte/transition";
    import { onMount } from "svelte";
    import axios from "axios";
    import { apiBaseUrl } from "../../config/config";

    let initializingLocalDBStoreLoading = false;

    let crumbs = {
        title: "Product Transfer",
        crumbs: [
            {
                name: "Home",
                url: "/",
            },
            {
                name: "Transfers",
                url: "/transfers",
            },
        ],
    };

    onMount(() => {
    });
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="breadcrumbs">
                <Breadcrumbs {crumbs} />
            </div>

            <div class="contentContainer">

            </div>
        </div>
    </div>
</main>

<style>


    .contentContainer {
        background: #fff;
        padding: 1em;
    }
</style>
