<script>
    // @ts-nocheck
    import axios from "axios";
    import { onMount } from "svelte";
    import { apiBaseUrl } from "../../config/config";
    import { addCommas } from "../../scripts/js/methods";

    let topSaleTargets = [];

    let latestSales = [];

    const getMainDashStats = async () => {
        let response = await axios({
            method: "GET",
            url: `${apiBaseUrl}getTopSalesTrends.php`,
        });

        let res = response.data;

        topSaleTargets = res.topSalesRank;

        latestSales = res.latestSales;

        console.log(res);
    };

    onMount(() => {
        getMainDashStats();
    });
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="contentTitleBar">
                <div class="contentTitle">Sales Trends</div>
            </div>

            <div class="contentContainer">
                <div class="col targetsContainer">
                    <table
                        class="ui very  basic striped unstackable single line table"
                    >
                        <thead>
                            <tr>
                                <th> No </th>
                                <th> Name </th>
                                <th> Branch </th>
                                <th> Sales </th>
                                <th> Target </th>
                                <th> Variance </th>
                            </tr>
                        </thead>
                        <tbody class="topSalesTargetUserList">
                            {#each topSaleTargets as tps, i}
                                <tr>
                                    <td>{i + 1}</td>
                                    <td>{tps.name}</td>
                                    <td>{tps.branch}</td>
                                    <td>{addCommas(tps.totalSales, 2)}</td>
                                    <td
                                        >{addCommas(
                                            parseFloat(tps.target),
                                            2
                                        )}</td
                                    >
                                    <td
                                        style={tps.variance < 0
                                            ? "color:crimson"
                                            : "color:green;"}
                                    >
                                        <b>{addCommas(tps.variance, 2)}</b>

                                        <span class="percentageVariance">
                                            ({addCommas(
                                                (tps.variance / tps.target) *
                                                    100,
                                                0
                                            )}%)
                                        </span>
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>

                <div class="col salesContainer">
                    <table
                        class="ui very  basic striped unstackable single line table"
                    >
                        <thead>
                            <tr>
                                <th> No </th>
                                <th> Name </th>
                                <th> Init </th>
                                <th> Branch </th>
                                <th> Type </th>

                                <th> Qty </th>
                                <th> Value </th>

                                <th> Date </th>
                            </tr>
                        </thead>
                        <tbody class="latestSalesList">
                            {#each latestSales as lts, i}
                                <tr>
                                    <td>{i + 1}</td>
                                    <td>{lts.productName}</td>
                                    <td>{lts.init}</td>
                                    <td>{lts.branch}</td>
                                    <td>
                                        {#if lts.productType == "Dead Stock"}
                                            <div class="dead">D.S</div>
                                        {:else if lts.productType == "Short Exp"}
                                            <div class="short">S.E</div>
                                        {:else}
                                            {lts.productType}
                                        {/if}
                                    </td>
                                    <td>
                                        {lts.qty}
                                    </td>

                                    <td>
                                        {lts.value}
                                    </td>

                                    <td>
                                        {lts.date}
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    main {
        margin-top: 1em;
    }

    .col {
        overflow-x: auto;
        background: #fff;
        flex: 1;
    }

    .contentContainer {
        display: flex;
        justify-content: space-between;
        margin-top: 1em;
        flex-direction: column;
    }

    .salesContainer {
        margin-top: 1em;
    }

    .percentageVariance {
        font-size: x-small;
    }

    .dead {
        color: orangered;
        font-weight: 600;
    }

    .short {
        color: crimson;
        font-weight: 600;
    }

    @media only screen and (min-width: 640px) {
        .contentContainer {
            display: flex;
            justify-content: space-between;
            margin-top: 1em;
            flex-direction: row;
        }

        .targetsContainer {
            margin-right: 0.4em;
        }
        .salesContainer {
            margin-top: 0;
            margin-left: 0.4em;
        }
    }
</style>
