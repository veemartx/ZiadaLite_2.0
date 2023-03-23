<script>
    import { addCommas } from "../../scripts/js/methods";

    export let saleStats = {};

    let currentMonthOverallSales = 0;

    let currentMonthOverallSalesValue = 0;

    let currentMonthDeadStockSales = 0;

    let currentMonthDeadStockSalesValue = 0;

    let currentMonthShortExpSales = 0;

    let currentMonthShortExpSalesValue = 0;

    let previousMonthOverallSales = 0;
    let previousMonthOverallSalesValue = 0;
    let previousMonthDeadStockSales = 0;
    let previousMonthDeadStockSalesValue = 0;
    let previousMonthShortExpSales = 0;
    let previousMonthShortExpSalesValue = 0;

    let shortExpPercentageChange = 0;

    let deadStockPercentageChange = 0;

    let todaySales = 0;
    let todaySalesValue = 0;

    let yesterdaySales = 0;

    let yesterdaySalesValue = 0;

    let unfulfilled = 0;

    let today = new Date();

    // set currentMonth
    today.setMonth(today.getMonth());

    let currentMonth = today.toLocaleString("default", { month: "long" });

    // set previousMonth
    today.setMonth(today.getMonth() - 1);

    let previousMonth = today.toLocaleString("default", { month: "long" });

    $: {
        if (saleStats.previousMonth) {
            previousMonthShortExpSales = saleStats.previousMonth.shortExp.sales;
            previousMonthShortExpSalesValue =
                saleStats.previousMonth.shortExp.value;

            previousMonthDeadStockSales =
                saleStats.previousMonth.deadStock.sales;

            previousMonthDeadStockSalesValue =
                saleStats.previousMonth.deadStock.value;
        }

        if (saleStats.currentMonth) {
            currentMonthShortExpSales = saleStats.currentMonth.shortExp.sales;
            currentMonthShortExpSalesValue =
                saleStats.currentMonth.shortExp.value;

            currentMonthDeadStockSales = saleStats.currentMonth.deadStock.sales;
            currentMonthDeadStockSalesValue =
                saleStats.currentMonth.deadStock.value;

            shortExpPercentageChange =
                ((currentMonthShortExpSalesValue -
                    previousMonthShortExpSalesValue) /
                    previousMonthShortExpSalesValue) *
                100;

            deadStockPercentageChange =
                ((currentMonthDeadStockSalesValue -
                    previousMonthDeadStockSalesValue) /
                    previousMonthDeadStockSalesValue) *
                100;
        }
    }
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="contentTitleBar">
                <div class="contentTitle">Sales At A Glance</div>
            </div>
            <div class="contentContainer">
                <div
                    class="statPanel  lastMonthShortExpirySales "
                    style="padding: 1em !important;"
                >
                    <div class="efig ">
                        <span class="salesValueFig">
                            {addCommas(previousMonthShortExpSalesValue, 2)}
                        </span>
                        <span class="salesNumberFig"
                            >({addCommas(previousMonthShortExpSales, 0)})</span
                        >
                    </div>

                    <div class="line-container">
                        <div class="line lastMonthsSESales" />
                    </div>

                    <div class="descBar" style="color: black;">
                        <div class="titleCol">
                            Prev Month Short Exp Sales ({previousMonth.substring(
                                0,
                                3
                            )})
                        </div>

                        <div class="percentageChange" />
                    </div>
                </div>

                <div
                    class="statPanel  thisMonthShortExpirySales "
                    style="padding: 1em !important;"
                >
                    <div class="efig ">
                        <span class="salesValueFig">
                            {addCommas(currentMonthShortExpSalesValue, 2)}
                        </span>
                        <span class="salesNumberFig"
                            >({addCommas(currentMonthShortExpSales, 0)})</span
                        >
                    </div>

                    <div class="line-container">
                        <div class="line thisMonthsSESales" />
                    </div>

                    <div class="descBar" style="color: black;">
                        <div class="titleCol">
                            This Month Short Exp Sales ({currentMonth.substring(
                                0,
                                3
                            )})
                        </div>

                        <div
                            class="percentageChange"
                            style={shortExpPercentageChange > 0
                                ? "color:green"
                                : "color:red"}
                        >
                            <!-- let shortExpPChange = addCommas((salesStats.currentMonth.shortExp.value - salesStats.previousMonth.shortExp.value) / salesStats.previousMonth.shortExp.value -->
                            {addCommas(shortExpPercentageChange, 2)}%
                        </div>
                    </div>
                </div>

                <div
                    class="statPanel  lastMonthDeadStockSales "
                    style="padding: 1em !important;"
                >
                    <div class="efig ">
                        <span class="salesValueFig">
                            {addCommas(previousMonthDeadStockSalesValue, 2)}
                        </span>
                        <span class="salesNumberFig"
                            >({addCommas(previousMonthDeadStockSales, 0)})</span
                        >
                    </div>

                    <div class="line-container">
                        <div class="line lastMonthsDSSales" />
                    </div>

                    <div class="descBar" style="color: black;">
                        <div class="titleCol">
                            Prev Month Dead Stock Sales ({previousMonth.substring(
                                0,
                                3
                            )})
                        </div>

                        <div class="percentageChange" />
                    </div>
                </div>

                <div
                    class="statPanel  thisMonthDeadStockSales "
                    style="padding: 1em !important;"
                >
                    <div class="efig ">
                        <span class="salesValueFig">
                            {addCommas(currentMonthDeadStockSalesValue, 2)}
                        </span>
                        <span class="salesNumberFig"
                            >({addCommas(currentMonthDeadStockSales, 0)})</span
                        >
                    </div>

                    <div class="line-container">
                        <div class="line thisMonthsDSSales" />
                    </div>

                    <div class="descBar" style="color: black;">
                        <div class="titleCol">
                            This Month Dead Stock Sales ({currentMonth.substring(
                                0,
                                3
                            )})
                        </div>

                        <div
                            class="percentageChange"
                            style={deadStockPercentageChange > 0
                                ? "color:green"
                                : "color:red"}
                        >
                            {addCommas(deadStockPercentageChange, 2)}%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    main {
        margin-top: 1em;
    }
    .contentContainer {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding-top: 0.4em;
    }

    .statPanel {
        border: 1px solid rgba(128, 128, 128, 0.151);
        padding: 0.4em;
        border-radius: 4px;
        margin-bottom: 10px;
        background: #fff;
        width: 40%;
    }

    .efig {
        font-weight: 500;
        font-size: 15px;
    }

    .line-container {
        width: 100%;
        background-color: #ddd;
        margin-top: 1em;
        border-radius: 5px;

        overflow: hidden;
    }

    .line {
        text-align: right;
        color: white;
    }

    .lastMonthShortExpirySales {
        color: purple;
    }

    .thisMonthShortExpirySales {
        color: rgb(20, 126, 20);
    }

    .lastMonthDeadStockSales {
        color: crimson;
    }

    .thisMonthDeadStockSales {
        color: dodgerblue;
    }

    .lastMonthsSESales {
        background-color: purple;
        width: 54%;
        height: 0.4em;
    }

    .thisMonthsSESales {
        background-color: green;
        width: 54%;
        height: 0.4em;
    }

    .lastMonthsDSSales {
        background-color: crimson;
        width: 54%;
        height: 0.4em;
    }

    .thisMonthsDSSales {
        background-color: dodgerblue;
        width: 54%;
        height: 0.4em;
    }

    .descBar {
        display: flex;
        padding-top: 0.5em;
        font-size: 10px;
        font-weight: 500;
    }

    .titleCol {
        flex: 5;
    }

    .percentageChange {
        flex: 2;
        font-weight: 500;
        font-size: smaller;
    }

    .salesValueFig {
        font-weight: 600;
        font-size: 13px;
    }

    .salesNumberFig {
        font-weight: 600;
        font-size: 11px;
    }

    @media only screen and (min-width: 640px) {
        .descBar {
            display: flex;
            padding-top: 1em;
            font-size: 13px;
            font-weight: 500;
        }

        .salesValueFig {
            font-weight: 600;
            font-size: 16px;
        }

        .statPanel {
            border: 1px solid rgba(128, 128, 128, 0.151);
            padding: 0.4em;
            border-radius: 4px;
            margin-bottom: 10px;
            background: #fff;
            flex: 1;
            margin-inline: 0.5em;
        }
    }
</style>
