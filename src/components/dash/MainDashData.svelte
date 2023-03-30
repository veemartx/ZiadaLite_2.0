<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import { apiBaseUrl } from "../../config/config";
    // @ts-ignore
    import BranchPerformance from "./BranchPerformance.svelte";

    import ExpiringCurrentMonth from "./ExpiringCurrentMonth.svelte";
    import LatestTransactions from "./LatestTransactions.svelte";

    let expiringCurrentMonth = [];

    let latestTransactions = [];

    let branchPerfomance = [];

    const getDashData = async () => {
        let response = await axios({
            method: "GET",
            url: `${apiBaseUrl}getMainDashData.php`,
        });

        let res = response.data;

        expiringCurrentMonth = res.expiringCurrentMonth;

        latestTransactions = res.latestTransactions;

        branchPerfomance = res.branchPerformance;
    };

    onMount(() => {
        getDashData();
    });
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="">
                <BranchPerformance {branchPerfomance} />
            </div>
            <br />

            <!-- expiring current month -->
            <div class="expiringCurrentMonth">
                <ExpiringCurrentMonth {expiringCurrentMonth} />
            </div>
            <!-- expiring current month -->

            <br />

            <!-- latest transactions -->
            <div class="latestTransactions">
                <LatestTransactions {latestTransactions} />
            </div>
            <!-- latest transactions -->

            <br />
            <br />
        </div>
    </div>
</main>

<style>
</style>
