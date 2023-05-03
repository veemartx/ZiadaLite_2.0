<script>
    import { onMount } from "svelte";
    import UserPerformanceTrend from "./UserPerformanceTrend.svelte";
    import { useLocation } from "svelte-navigator";
    import { getFirstAndLastDatesOfAMonth } from "../../scripts/js/methods";
    import UserSales from "./UserSales.svelte";

    const location = useLocation();

    let startDate = "2023-04-01";
    let endDate = "2023-04-10";

    let user = "Achieng";

    let qs;

    $: {
        qs = $location.search;
        getParamsFromQs(qs);
    }

    function getParamsFromQs(qs) {
        const urlSearchParams = new URLSearchParams(qs);
        const params = Object.fromEntries(urlSearchParams.entries());
        user = params.user || "";

        startDate = params.sd || "";
        endDate = params.ed || "";
    }

    onMount(() => {});
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="userSales">
                <UserSales bind:startDate bind:endDate bind:user />
            </div>
            <!-- performance trend -->
            <div class="">
                <UserPerformanceTrend bind:startDate bind:endDate bind:user />
            </div>
            <!-- performance trend -->
        </div>
    </div>
</main>

<style>
</style>
