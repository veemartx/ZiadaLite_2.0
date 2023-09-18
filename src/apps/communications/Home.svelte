<script>
    import { onMount } from "svelte";
    import { getLiuDetails, updateCrumbs } from "../../scripts/js/methods";
    import GlobalHome from "./GlobalHome.svelte";
    import BranchHome from "./BranchHome.svelte";

    let liu = getLiuDetails();

    let crumbs = {
        title: "Communications ",
        crumbs: [
            {
                name: "Home",
                url: "/",
            },
            {
                name: "Apps",
                url: "/apps/",
            },
            {
                name: "Communications",
                url: "/apps/communications",
            },
        ],
    };

    $: {
        if (liu) {
            console.log(liu);
        }
    }

    onMount(() => {
        updateCrumbs(crumbs);
    });
</script>

<main>
    {#if liu.p == "admin"}
        <GlobalHome />
    {:else}
        <BranchHome />
    {/if}
</main>
