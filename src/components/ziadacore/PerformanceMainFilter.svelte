<script>
    import axios from "axios";
    import { onMount } from "svelte";
    import { apiBaseUrl } from "../../config/config";
    import { read, utils, writeFileXLSX } from "xlsx";
    import dayjs from "dayjs";
    import { addCommas } from "../../scripts/js/methods";

    let filterBranches = [];

    let currentlyFilteredBranch;

    let productsMix = [];

    let startDate;

    let getPerformanceLoading = false;

    let endDate;

    let totalSales = 0;

    let totalCostValue = 0;

    let totalRetailValue = 0;

    let totalMargin = 0;

    let selectedMonth;

    $: {
        if (totalCostValue != 0 && totalRetailValue != 0) {
            totalMargin =
                ((totalRetailValue - totalCostValue) / totalRetailValue) * 100;
        }
    }

    const getPerformance = async () => {
        getPerformanceLoading = true;

        let dt = {
            branch: currentlyFilteredBranch,
            start: startDate,
            end: endDate,
        };

        try {
            const response = await axios({
                method: "POST",
                data: dt,
                url: `${apiBaseUrl}core/getPerformance.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            getPerformanceLoading = false;

            productsMix = res;

            //
            totalSales = productsMix
                .map((v) => v.unitSales)
                .reduce((partialSum, a) => partialSum + a, 0);

            totalCostValue = productsMix
                .map((v) => v.cost)
                .reduce((partialSum, a) => partialSum + a, 0);
            totalRetailValue = productsMix
                .map((v) => v.retail)
                .reduce((partialSum, a) => partialSum + a, 0);
        } catch (err) {
            getPerformanceLoading;
            console.log(err);
        }
    };

    const getFilterBranches = async () => {
        let dt = {
            consumer: "notSoldIn",
        };

        try {
            const response = await axios({
                method: "POST",
                data: dt,
                url: `${apiBaseUrl}core/getFilterBranches.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            filterBranches = res;

            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    const generateExcel = () => {
        let timestamp = dayjs();
        // console.log(inventory);
        const ws = utils.json_to_sheet(productsMix);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        writeFileXLSX(
            wb,
            `${currentlyFilteredBranch}_${startDate}_${endDate}_Performance_${timestamp}.xlsx`
        );
    };

    onMount(() => {
        getFilterBranches();
    });
</script>

<main>
    <div class="mainContainer">
        <div class="titleBar">
            <div class="titleCol">
                <div class="title">
                   Filter
                </div>
            </div>
            <div class="actions">
                <i class="ri-more-2-fill" />
            </div>
        </div>
        <br /> 

        <div class="filtersContainer">
            <form class="ui form" on:submit|preventDefault={getPerformance}>
                <div class="three fields">
                    <div class="field">
                        <label for="start">Start Date</label>
                        <input
                            type="date"
                            name="start"
                            id="startDate"
                            required
                            bind:value={startDate}
                        />
                    </div>

                    <div class="field">
                        <label for="end"> End Date </label>
                        <input
                            type="date"
                            name="start"
                            id="endDate"
                            required
                            bind:value={endDate}
                        />
                    </div>

                    <div class="field">
                        <label for="filterBranch">Filter Branch</label>
                        <select
                            name="filterBranch"
                            id="filterBranch"
                            required
                            bind:value={currentlyFilteredBranch}
                        >
                            <option value="">Select Branch</option>
                            {#each filterBranches as fp}
                                <option value={fp}>{fp}</option>
                            {/each}
                        </select>
                    </div>
                </div>

                <div class="field" style="text-align: center;padding-top:2em">
                    <button
                        class={getPerformanceLoading
                            ? "ui basic red loading button"
                            : "ui basic red button"}
                    >
                        <i class="send icon" /> Filter
                    </button>
                </div>
            </form>
        </div>

        <!-- if filtered -->
        {#if productsMix.length > 0}
            <br />
            <div
                class="titleBar"
                style="padding-top:1em;display flex;justify-content:space-between"
            >
                <div
                    class="title"
                    style="color: crimson;font-size:15px;font-weight:600"
                />
                <div class="">
                    <button
                        on:click={generateExcel}
                        class="ui basic icon green mini button"
                    >
                        <i class="file excel icon" /> Excel
                    </button>
                </div>
            </div>

            <br />
            <div class="summaryContainer">
                <div class="summaryCol" style="color:purple">
                    Total Sales: {addCommas(totalSales)}
                </div>

                <div class="summaryCol" style="color:dodgerblue">
                    Retail Value: {addCommas(totalRetailValue, 2)}
                </div>

                <div class="summaryCol" style="color:darkgreen">
                    Cost Value: {addCommas(totalCostValue, 2)}
                </div>

                <div class="summaryCol" style="color:crimson">
                    Margin: {addCommas(totalMargin, 2)}%
                </div>
            </div>
            <br />

            <div class="tableContainer">
                <table
                    class="ui very basic striped single line unstackable table"
                >
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Branch</th>
                            <th>Unit Sales</th>
                            <th>Cost</th>
                            <th>Sale</th>
                            <th>Margin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each productsMix as p, i}
                            <tr>
                                <td>{i + 1}</td>
                                <td>{p.name}</td>
                                <td>{p.branch}</td>
                                <td>{p.unitSales}</td>
                                <td>{addCommas(p.cost, 2)}</td>
                                <td>{addCommas(p.retail, 2)}</td>
                                <td
                                    >{addCommas((p.margin / p.retail) * 100, 2)}
                                    %</td
                                >
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        {/if}
        <!-- if filtered -->
    </div>
</main>

<style>
    .mainContainer {
        padding: 1em;
    }

    .field {
        margin-inline: 0.3em;
    }

    input {
        width: 90% !important;
    }

    .summaryContainer {
        display: flex;
        padding: 1em;
        background: rgba(255, 0, 0, 0.101);
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .summaryCol {
        width: 45%;
        font-weight: 600;
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
