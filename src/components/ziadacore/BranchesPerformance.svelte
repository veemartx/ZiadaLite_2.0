<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import { apiBaseUrl } from "../../config/config";
    import {
        addCommas,
        getFirstAndLastDatesOfAMonth,
    } from "../../scripts/js/methods";
    import { Link } from "svelte-navigator";
    import dayjs from "dayjs";
    import BranchesPerformarceChart from "./BranchesPerformanceChart.svelte";
    import BranchesPerformanceTrend from "./BranchesPerformanceTrend.svelte";

    let startDate;

    let endDate;

    let currentlyFilteredBranch;

    let monthNo = dayjs().month() + 1;

    let currentMonth;

    // current month
    if (monthNo < 10) {
        currentMonth = dayjs().year() + "-" + "0" + monthNo;
    } else {
        currentMonth = dayjs().year() + "-" + monthNo;
    }

    let branchPerformanceLoading = true;

    let productsMix = [];

    let totalCostValue = 0;

    let totalRetailValue = 0;

    let totalMargin = 0;

    let selectedMonth;

    $: {
        if (selectedMonth) {
            // console.log(selectedMonth);
            startDate = getFirstAndLastDatesOfAMonth(selectedMonth).first;
            endDate = getFirstAndLastDatesOfAMonth(selectedMonth).last;

            getBranchPerformance();
        }
    }

    $: {
        if (totalCostValue != 0 && totalRetailValue != 0) {
            totalMargin =
                ((totalRetailValue - totalCostValue) / totalRetailValue) * 100;
        }
    }

    const getBranchPerformance = async () => {
        branchPerformanceLoading = true;

        let dt = {
            branch: currentlyFilteredBranch,
            start: startDate,
            end: endDate,
        };

        try {
            const response = await axios({
                method: "POST",
                data: dt,
                url: `${apiBaseUrl}core/getBranchPerformance.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            branchPerformanceLoading = false;

            productsMix = res;

            totalCostValue = productsMix
                .map((v) => v.cost)
                .reduce((partialSum, a) => partialSum + a, 0);
            totalRetailValue = productsMix
                .map((v) => v.retail)
                .reduce((partialSum, a) => partialSum + a, 0);
        } catch (err) {
            branchPerformanceLoading;
            console.log(err);
        }
    };

    onMount(() => {
        startDate = getFirstAndLastDatesOfAMonth(currentMonth).first;
        endDate = getFirstAndLastDatesOfAMonth(currentMonth).last;

        getBranchPerformance();
    });
</script>

<main>
    <div class="mainContainer">
        <div class="summaryContainer">
            <div class="summaryCol" style="color:dodgerblue">
                <div class="summaryT">Retail Value</div>
                <div class="summaryC">
                    {addCommas(totalRetailValue, 2)}
                </div>
            </div>

            <div class="summaryCol" style="color:darkgreen">
                <div class="summaryT">Cost Value</div>
                <div class="summaryC">
                    {addCommas(totalCostValue, 2)}
                </div>
            </div>

            <div class="summaryCol" style="color:crimson">
                <div class="summaryT">Percentage Margin</div>
                <div class="summaryC">
                    {addCommas(totalMargin, 2)}%
                </div>
            </div>

            <div class="summaryCol" style="color:crimson">
                <div class="field">
                    <div class="summaryT">
                        <label for="month">Select Month</label>
                    </div>
                    <div class="summaryC">
                        <input
                            type="month"
                            name="month"
                            id="month"
                            min="2023-01"
                            max={currentMonth}
                            bind:value={selectedMonth}
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="tableContainer">
            <div class="contentBar" style="margin-top: 1em;">
                <div class="tableContainer">
                    <table
                        class="ui very basic striped single line unstackable table"
                    >
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Branch</th>
                                <th>Cost Value</th>
                                <th>Sale Value</th>
                                <th>Purchases</th>
                                <th>G.P</th>
                                <th>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each productsMix as p, i}
                                <tr>
                                    <td>{i + 1}</td>
                                    <td>{p.branch}</td>
                                    <td>{addCommas(p.cost, 2)}</td>
                                    <td>{addCommas(p.retail, 2)}</td>
                                    <td
                                        >{addCommas(
                                            parseFloat(p.purchases),
                                            2
                                        )}</td
                                    >
                                    <td
                                        >{addCommas(
                                            (p.retail - p.purchases) /
                                                p.purchases,
                                            2
                                        )}
                                    </td>
                                    <td>
                                        {#if selectedMonth}
                                            <Link
                                                to={`/ziada-core/performance/br/?branch=${p.branch}&month=${selectedMonth}`}
                                            >
                                                <i class="eye icon" /> View
                                            </Link>
                                        {:else}
                                            <Link
                                                to={`/ziada-core/performance/br/?branch=${p.branch}&month=${currentMonth}`}
                                            >
                                                <i class="eye icon" /> View
                                            </Link>
                                        {/if}
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <br />

    <div class="h-spacer" />
    <div class="">
        {#if productsMix.length > 1}
            <BranchesPerformarceChart bind:productsMix />
        {/if}
    </div>

    <br />
    <div class="h-spacer" />
</main>

<style>
    .summaryContainer {
        display: flex;
        padding: 1em;
        background: rgba(255, 0, 0, 0.101);
        justify-content: space-between;
        flex-wrap: wrap;
        margin: 0.5em;
    }
    .summaryCol {
        width: 45%;
        font-weight: 600;
        margin-bottom: 1em;
    }

    .tableContainer {
        padding-inline: 0.5em;
        max-width: 100%;
        overflow: auto;
    }

    .summaryT {
        font-weight: 700;
    }
    .summaryC {
        padding-top: 2px;
    }

    .h-spacer {
        height: 1em;
    }

    @media only screen and (min-width: 640px) {
        .summaryContainer {
            display: flex;
            padding: 1em;
            justify-content: space-between;
            flex-wrap: wrap;
        }

        .summaryCol {
            flex: 1;
        }
    }
</style>
