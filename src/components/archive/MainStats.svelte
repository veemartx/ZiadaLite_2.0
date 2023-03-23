<script>
    // @ts-nocheck

    import { onMount } from "svelte";
    import axios from "axios";
    import { apiBaseUrl } from "../config/config";
    import ProductsMainStats from "./ProductsMainStats.svelte";
    import SalesMainStats from "./SalesMainStats.svelte";
    import RegionalSummaryStats from "./RegionalSummaryStats.svelte";
    import RegionsSummaryGraph from "./RegionsSummaryGraph.svelte";
    import MainDashData from "./MainDashData.svelte";

    
    let displayType = "compact";

    let showDisplaySettingsPanel = false;

    let mainProductStats;

    let mainSaleStats;

    let regionStatsSummary;

    //
    //
    //

    // sales values

    let showErrorMessage = false;

    let showSkeleton = true;

    const toggleDisplaySettings = () => {
        showDisplaySettingsPanel = !showDisplaySettingsPanel;
    };

    const getMainStats = async () => {
        try {
            let response = await axios.get(`${apiBaseUrl}getMainStats.php`);

            let result = response.data;

            let regionsArray = [];

            let branchesArray = [];

            // console.log(mainStats);
            for (const key in result) {
                if (Object.hasOwnProperty.call(result, key)) {
                    const element = result[key];

                    // check if region in arrey
                    if (!regionsArray.includes(element.region)) {
                        regionsArray.push(element.region);
                    }

                    branchesArray.push(element);
                }
            }

            // make the stat objects
            let productStats = {
                products: {
                    title: "All Products",
                    number: branchesArray
                        .map((p) => p.productsAtRisk)
                        .reduce((partialSum, a) => partialSum + a, 0),
                    value: branchesArray
                        .map((p) => p.productsAtRiskValue)
                        .reduce((partialSum, a) => partialSum + a, 0),
                },
                shortExp: {
                    title: "Short Exp",
                    number: branchesArray
                        .map((p) => p.shortExpAtRisk)
                        .reduce((partialSum, a) => partialSum + a, 0),
                    value: branchesArray
                        .map((p) => p.shortExpAtRiskValue)
                        .reduce((partialSum, a) => partialSum + a, 0),
                },

                deadStock: {
                    title: "Dead Stock",
                    number: branchesArray
                        .map((p) => p.deadStockAtRisk)
                        .reduce((partialSum, a) => partialSum + a, 0),
                    value: branchesArray
                        .map((p) => p.deadStockAtRiskValue)
                        .reduce((partialSum, a) => partialSum + a, 0),
                },
                expiringThisMonth: {
                    title: "Expiring This Month",
                    number: branchesArray
                        .map((p) => p.expiringCurrentMonth)
                        .reduce((partialSum, a) => partialSum + a, 0),
                    value: branchesArray
                        .map((p) => p.expiringCurrentMonthValue)
                        .reduce((partialSum, a) => partialSum + a, 0),
                },
                expiredLastMonth: {
                    title: "Expired Last Month",
                    number: branchesArray
                        .map((p) => p.expiredPreviousMonth)
                        .reduce((partialSum, a) => partialSum + a, 0),
                    value: branchesArray
                        .map((p) => p.expiredPreviousMonth)
                        .reduce((partialSum, a) => partialSum + a, 0),
                },
            };

            let salesStats = {
                currentMonth: {
                    all: {
                        sales: branchesArray
                            .map((p) => p.currentMonthSales)
                            .reduce((partialSum, a) => partialSum + a, 0),
                        value: branchesArray
                            .map((p) => p.currentMonthSalesValue)
                            .reduce((partialSum, a) => partialSum + a, 0),
                    },

                    deadStock: {
                        sales: branchesArray
                            .map((p) => p.currentMonthDeadStockSales)
                            .reduce((partialSum, a) => partialSum + a, 0),
                        value: branchesArray
                            .map((p) => p.currentMonthDeadStockSalesValue)
                            .reduce((partialSum, a) => partialSum + a, 0),
                    },

                    shortExp: {
                        sales: 0,
                        value: branchesArray
                            .map((p) => p.currentMonthShortExpSalesValue)
                            .reduce((partialSum, a) => partialSum + a, 0),
                    },
                },

                previousMonth: {
                    all: {
                        sales: 0,
                        value: branchesArray
                            .map((p) => p.previousMonthSalesValue)
                            .reduce((partialSum, a) => partialSum + a, 0),
                    },

                    deadStock: {
                        sales: branchesArray
                            .map((p) => p.previousMonthDeadStockSales)
                            .reduce((partialSum, a) => partialSum + a, 0),
                        value: branchesArray
                            .map((p) => p.previousMonthDeadStockSalesValue)
                            .reduce((partialSum, a) => partialSum + a, 0),
                    },

                    shortExp: {
                        sales: branchesArray
                            .map((p) => p.previousMonthShortExpSales)
                            .reduce((partialSum, a) => partialSum + a, 0),
                        value: branchesArray
                            .map((p) => p.previousMonthShortExpSalesValue)
                            .reduce((partialSum, a) => partialSum + a, 0),
                    },
                },

                today: {
                    sales: branchesArray
                        .map((p) => p.todaySales)
                        .reduce((partialSum, a) => partialSum + a, 0),
                    value: branchesArray
                        .map((p) => p.todaySalesValue)
                        .reduce((partialSum, a) => partialSum + a, 0),
                },

                yesterday: {
                    sales: branchesArray
                        .map((p) => p.yesterdaySales)
                        .reduce((partialSum, a) => partialSum + a, 0),
                    value: branchesArray
                        .map((p) => p.yesterdaySalesValue)
                        .reduce((partialSum, a) => partialSum + a, 0),
                },

                unfulfilled: branchesArray
                    .map((p) => p.unfulfilledTransferReqs)
                    .reduce((partialSum, a) => partialSum + a, 0),
            };

            let regionsSummary = [];
            mainProductStats = productStats;

            mainSaleStats = salesStats;

            regionsArray.forEach((region) => {
                let filteredRegionBranches = branchesArray.filter((br) => {
                    if (br.region == region) {
                        return br;
                    }
                });

                let regionObject = {
                    region: region,
                    products: filteredRegionBranches
                        .map((p) => p.productsAtRisk)
                        .reduce((partialSum, a) => partialSum + a, 0),

                    productsValue: filteredRegionBranches
                        .map((p) => p.productsAtRiskValue)
                        .reduce((partialSum, a) => partialSum + a, 0),

                    shortExp: filteredRegionBranches
                        .map((p) => p.shortExpAtRisk)
                        .reduce((partialSum, a) => partialSum + a, 0),
                    shortExpValue: filteredRegionBranches
                        .map((p) => p.shortExpAtRiskValue)
                        .reduce((partialSum, a) => partialSum + a, 0),
                    deadStock: filteredRegionBranches
                        .map((p) => p.deadStockAtRisk)
                        .reduce((partialSum, a) => partialSum + a, 0),
                    deadStockValue: filteredRegionBranches
                        .map((p) => p.deadStockAtRiskValue)
                        .reduce((partialSum, a) => partialSum + a, 0),

                    todaySales: filteredRegionBranches
                        .map((p) => p.todaySales)
                        .reduce((partialSum, a) => partialSum + a, 0),

                    todaySalesValue: filteredRegionBranches
                        .map((p) => p.todaySalesValue)
                        .reduce((partialSum, a) => partialSum + a, 0),

                    yesterdaySales: filteredRegionBranches
                        .map((p) => p.yesterdaySales)
                        .reduce((partialSum, a) => partialSum + a, 0),

                    yesterdaySalesValue: filteredRegionBranches
                        .map((p) => p.yesterdaySalesValue)
                        .reduce((partialSum, a) => partialSum + a, 0),

                    unfulfilled: filteredRegionBranches
                        .map((p) => p.unfulfilledTransferReqs)
                        .reduce((partialSum, a) => partialSum + a, 0),
                };

                regionsSummary.push(regionObject);
            });

            regionStatsSummary = regionsSummary;
            // showSkeleton = false;
        } catch (err) {
            console.log(err);

            showErrorMessage = true;
        }
    };

    onMount(() => {
        getMainStats();
    });
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="titleBar">
                <div class="title">At A Glance</div>
                <div class="actions">
                    <button
                        on:click={toggleDisplaySettings}
                        class="ui basic green mini icon button"
                    >
                        <i class="cog icon" />
                    </button>

                    {#if showDisplaySettingsPanel}
                        <div class="dashSettingsPanel">
                            <div class="dashSettings">
                                <div class="dsTitle">Display Option</div>
                                <div class="dsPanel">
                                    <select
                                        name="displayOptions"
                                        id="displayOptions"
                                        bind:value={displayType}
                                    >
                                        <option value="compact">Compact</option>
                                        <option value="standard"
                                            >Standard</option
                                        >
                                    </select>
                                </div>
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
            <div class="mainStatsBar">
                <div class="productStats">
                    <ProductsMainStats
                        bind:displayType
                        stats={mainProductStats}
                    />
                </div>

                <br />

                <div class="salesStats">
                    <SalesMainStats bind:displayType stats={mainSaleStats} />
                </div>

                <br />

                <div class="stitle">Regions Summary</div>
                <div class="dataColumn">
                    <div class="regionChart">
                        <RegionsSummaryGraph
                            bind:displayType
                            stats={regionStatsSummary}
                        />
                    </div>
                    <div class="regionStats">
                        <RegionalSummaryStats
                            bind:displayType
                            stats={regionStatsSummary}
                        />
                    </div>
                </div>
            </div>

            <br />
            <div class="title">Branch Perfomance Summary</div>
            <div class="mainDataBar">
                <MainDashData />
            </div>
        </div>
    </div>
</main>

<style>
    .title {
        flex: 2;
    }

    .actions {
        flex: 1;
        display: flex;
        justify-content: flex-end;
    }

    .mainStatsBar {
        margin-top: 1em;
    }

    .dashSettingsPanel {
        position: absolute;
        padding-top: 1em;
        margin-top: 2em;
    }

    .dashSettings {
        width: 12em;
        background: rgb(255, 255, 255);
        border-radius: 5px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        padding: 1em;
        border: 1px solid rgba(128, 128, 128, 0.239);
    }

    .dsTitle {
        border-bottom: 1px solid rgb(194, 194, 194);
        font-weight: 500;
        color: rgb(14, 58, 14);
    }

    .dsPanel {
        padding-top: 1em;
        opacity: 0.6;
    }

    .dataColumn {
        display: flex;
        flex-direction: column;
    }

    .regionChart {
        flex: 1;
    }

    @media only screen and (min-width: 640px) {
        .dataColumn {
            display: flex;
            flex-direction: row;
        }
        .regionStats {
            margin-left: 0.4em;
            flex: 2;
        }
    }
</style>
