<script>
    // @ts-nocheck
    import axios from "axios";
    import { onMount } from "svelte";
    import { apiBaseUrl } from "../../config/config";
    import ProductStats from "./ProductStats.svelte";
    import SalesStats from "./SalesStats.svelte";

    let regionsArray = [];

    let branchesArray = [];

    let productStats = {};

    let saleStats = {};

    const getMainDashStats = async () => {
        let response = await axios({
            method: "GET",
            url: `${apiBaseUrl}getMainDashStats.php`,
        });

        let result = response.data;

        for (const key in result) {
            if (Object.hasOwnProperty.call(result, key)) {
                const element = result[key];

                // check if region in arrey
                if (!regionsArray.includes(element.region)) {
                    regionsArray.push(element.region);
                    regionsArray = regionsArray;
                }

                branchesArray.push(element);

                branchesArray = branchesArray;
            }
        }

        productStats = {
            products: {
                number: branchesArray
                    .map((p) => p.productsAtRisk)
                    .reduce((partialSum, a) => partialSum + a, 0),
                value: branchesArray
                    .map((p) => p.productsAtRiskValue)
                    .reduce((partialSum, a) => partialSum + a, 0),
            },
            shortExp: {
                number: branchesArray
                    .map((p) => p.shortExpAtRisk)
                    .reduce((partialSum, a) => partialSum + a, 0),
                value: branchesArray
                    .map((p) => p.shortExpAtRiskValue)
                    .reduce((partialSum, a) => partialSum + a, 0),
            },

            deadStock: {
                number: branchesArray
                    .map((p) => p.deadStockAtRisk)
                    .reduce((partialSum, a) => partialSum + a, 0),
                value: branchesArray
                    .map((p) => p.deadStockAtRiskValue)
                    .reduce((partialSum, a) => partialSum + a, 0),
            },
            expiringThisMonth: {
                number: branchesArray
                    .map((p) => p.expiringCurrentMonth)
                    .reduce((partialSum, a) => partialSum + a, 0),
                value: branchesArray
                    .map((p) => p.expiringCurrentMonthValue)
                    .reduce((partialSum, a) => partialSum + a, 0),
            },
            expiredLastMonth: {
                number: branchesArray
                    .map((p) => p.expiredPreviousMonth)
                    .reduce((partialSum, a) => partialSum + a, 0),
                value: branchesArray
                    .map((p) => p.expiredPreviousMonthValue)
                    .reduce((partialSum, a) => partialSum + a, 0),
            },
        };

        saleStats = {
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


        // console.log(branchesArray);
    };

    onMount(() => {
        getMainDashStats();
    });
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="salesStats">
                <SalesStats {saleStats} />
            </div>
            <br />
            <div class="productStats">
                <ProductStats {productStats} />
            </div>
            <br />
        </div>
    </div>
</main>

<style>
</style>
