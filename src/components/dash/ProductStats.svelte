<script>
    import ProductIcon from "../../assets/icons/products.png";
    import ShortExpIcon from "../../assets/icons/short-exp.png";
    import DeadStockIcon from "../../assets/icons/dead-stock.png";
    import ExpiredYellowIcon from "../../assets/icons/expired_yellow.png";
    import ExpiredRedIcon from "../../assets/icons/expired_red.png";
    import { addCommas } from "../../scripts/js/methods";

    export let productStats = {};

    let expiringCurrentMonth = 0;

    let expiringCurrentMonthValue = 0;

    let productsAtRisk = 0;

    let productsAtRiskValue = 0;

    let shortExpAtRisk = 0;

    let shortExpAtRiskValue = 0;

    let expiredLastMonth = 0;

    let expiredLastMonthValue = 0;

    let deadStockAtRisk = 0;

    let deadStockAtRiskValue = 0;

    let today = new Date();

    // set currentMonth
    today.setMonth(today.getMonth());

    let currentMonth = today.toLocaleString("default", { month: "long" });

    // set previousMonth
    today.setMonth(today.getMonth() - 1);

    let previousMonth = today.toLocaleString("default", { month: "long" });

    $: {
        // console.log(productStats);
        if (productStats.products) {
            productsAtRisk = productStats.products.number;
            productsAtRiskValue = productStats.products.value;
        }

        if (productStats.expiringThisMonth) {
            expiringCurrentMonth = productStats.expiringThisMonth.number;
            expiringCurrentMonthValue = productStats.expiringThisMonth.value;
        }

        if (productStats.deadStock) {
            deadStockAtRisk = productStats.deadStock.number;
            deadStockAtRiskValue = productStats.deadStock.value;
        }

        if (productStats.shortExp) {
            shortExpAtRisk = productStats.shortExp.number;
            shortExpAtRiskValue = productStats.shortExp.value;
        }

        if (productStats.expiredLastMonth) {
            expiredLastMonth = productStats.expiredLastMonth.number;
            expiredLastMonthValue = productStats.expiredLastMonth.value;
        }
    }
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="contentTitleBar">
                <div class="contentTitle">At A Glance (Nation Wide)</div>
            </div>
            <div class="contentContainer">
                <div class="statsPanel">
                    <div class="iconContainer">
                        <img
                            src={ProductIcon}
                            alt="products icon"
                            width="32"
                            height="32"
                        />
                    </div>

                    <div class="descriptionContainer">
                        <div class="valueFigureContainer">
                            <span class="totalProducts"
                                >{addCommas(productsAtRisk, 0)}</span
                            >
                        </div>
                        <div class="figureContainer">
                            <span class="productsAtRiskValue"
                                >{addCommas(productsAtRiskValue, 2)}</span
                            >
                        </div>
                        <div class="description">All Products At Risk</div>
                    </div>
                </div>

                <div class="statsPanel">
                    <div class="iconContainer">
                        <img
                            src={ShortExpIcon}
                            alt="products icon"
                            width="32"
                            height="32"
                        />
                    </div>

                    <div class="descriptionContainer">
                        <div class="valueFigureContainer">
                            <span class="shortExpProducts"
                                >{addCommas(shortExpAtRisk, 0)}</span
                            >
                        </div>
                        <div class="figureContainer">
                            <span class="shortExpProductsValue"
                                >{addCommas(shortExpAtRiskValue, 2)}</span
                            >
                        </div>
                        <div class="description">Short Exp. At Risk</div>
                    </div>
                </div>

                <div class="statsPanel">
                    <div class="iconContainer">
                        <img
                            src={DeadStockIcon}
                            alt="products icon"
                            width="32"
                            height="32"
                        />
                    </div>

                    <div class="descriptionContainer">
                        <div class="valueFigureContainer">
                            <span class="deadStockProducts"
                                >{addCommas(deadStockAtRisk, 0)}</span
                            >
                        </div>
                        <div class="figureContainer">
                            <span class="deadStockProductsValue"
                                >{addCommas(deadStockAtRiskValue, 2)}</span
                            >
                        </div>
                        <div class="description">Dead St. At Risk</div>
                    </div>
                </div>

                <div class="statsPanel">
                    <div class="iconContainer">
                        <img
                            src={ExpiredYellowIcon}
                            alt="products icon"
                            width="32"
                            height="32"
                        />
                    </div>

                    <div class="descriptionContainer">
                        <div class="valueFigureContainer">
                            <span
                                class="expiringThisMonth"
                                style="color:crimson;"
                                >{expiringCurrentMonth}</span
                            >
                        </div>
                        <div class="figureContainer">
                            <span
                                class="expiringThisMonthValue"
                                style="color:crimson;"
                                >{addCommas(expiringCurrentMonthValue, 2)}</span
                            >
                        </div>
                        <div class="description" style="color:crimson">
                            Expiring ( <span class="currentMonth"
                                >{currentMonth}</span
                            > )
                        </div>
                    </div>
                </div>

                <div class="statsPanel">
                    <div class="iconContainer">
                        <img
                            src={ExpiredRedIcon}
                            alt="products icon"
                            width="32"
                            height="32"
                        />
                    </div>

                    <div class="descriptionContainer">
                        <div class="valueFigureContainer">
                            <span class="expiredLastMonth"
                                >{expiredLastMonth}</span
                            >
                        </div>
                        <div class="figureContainer">
                            <span class="expiredLastMonthValue"
                                >{addCommas(expiredLastMonthValue, 2)}</span
                            >
                        </div>
                        <div class="description">
                            Expired ( <span class="previousMonth"
                                >{previousMonth}</span
                            > )
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    .contentContainer {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding-top: 0.4em;
    }

    .statsPanel {
        border: 1px solid rgba(128, 128, 128, 0.151);
        padding: 0.4em;
        border-radius: 4px;
        color: aliceblue;
        display: flex;
        flex-direction: row;
        margin-bottom: 10px;
        background: #fff;
        width: 44%;
    }

    .statsPanel:hover {
        background: #f7f7f794;
        border: 1px solid rgba(73, 73, 73, 0.137);
        color: orangered;
    }

    .iconContainer {
        text-align: right;
        flex: 1;
        padding-top: 2em;
    }

    .descriptionContainer {
        flex: 3;
    }

    .valueFigureContainer {
        color: rgb(61, 61, 61);
        font-size: 20px;
        text-align: center;
        font-weight: 600;
        padding-top: 10px;
    }

    .figureContainer {
        font-size: 15px;
        text-align: center;
        font-weight: 600;
        padding-top: 10px;
        color: rgb(61, 61, 61);
    }

    .description {
        font-size: 13px;
        font-weight: 500;
        text-align: center;
        padding-top: 10px;
        color: rgb(47, 47, 48);
    }

    @media only screen and (min-width: 640px) {
        .statsPanel {
            border: 1px solid rgba(128, 128, 128, 0.151);
            padding: 0.4em;
            border-radius: 4px;
            color: aliceblue;
            display: flex;
            flex-direction: row;
            margin-bottom: 10px;
            background: #fff;
            flex: 1;
            margin-inline: 0.5em;
        }
    }
</style>
