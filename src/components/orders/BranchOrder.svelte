<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import { Route, Router, useLocation } from "svelte-navigator";
    import { addCommas } from "../../scripts/js/methods";
    import axios from "axios";
    import { apiBaseUrl } from "../../config/config";
    import BranchOrderCheckResults from "./BranchOrderCheckResults.svelte";
    import BranchOrderProducts from "./BranchOrderProducts.svelte";

    const location = useLocation();

    let bodCheckProducts = [];

    let bodProducts = [];

    let branchOrder;

    let bodId;

    let bodNumber = "";

    $: {
        window.scrollTo(0, 0);

        if ($location) {
            getBranchOrder($location);
        }
    }

    const getBranchOrder = async ($location) => {
        let pathnameArr = $location.pathname.split("/");

        let bid = pathnameArr[pathnameArr.length - 1];

        bodId = bid;

        let dt = {
            bodId: bodId,
        };

        try {
            const response = await axios({
                method: "POST",
                data: dt,
                url: `${apiBaseUrl}getBranchOrder.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            bodNumber = res.bodNo;

            branchOrder = res;

            bodCheckProducts = branchOrder.transferredProducts;

            bodProducts = branchOrder.products;
        } catch (err) {
            console.log(err);
        }
        let fd = {
            bodNo: bodNumber,
        };
    };

    onMount(() => {});
</script>

<main>
    <div class="wrapper">
        {#if branchOrder}
            <div class="content">
                <div class="titleBar">
                    <div class="title">BRANCH. ORDER</div>
                    <div class="action" />
                </div>

                <div class="summaryContainer">
                    <div class="summaryCol" style="color:purple">
                        BOD:{bodNumber}
                    </div>

                    <div class="summaryCol" style="color:dodgerblue">
                        Cost: {addCommas(parseFloat(branchOrder.totalCost), 2)}
                    </div>

                    <div class="summaryCol" style="color:darkgreen">
                        Ordered: {branchOrder.items}
                    </div>

                    <div class="summaryCol" style="color:olive">
                        Found: {bodCheckProducts.length}
                    </div>
                    <div
                        class="summaryCol"
                        style="color:teal;text-transform:capitalize"
                    >
                        Prepared By: {branchOrder.preparedBy}
                    </div>

                    <div
                        class="summaryCol"
                        style="color:orangered;text-transform:capitalize"
                    >
                        Checked By: {branchOrder.checkedBy}
                    </div>

                    <div
                        class="summaryCol"
                        style="color:green;text-transform:capitalize"
                    >
                        Deliver To: {branchOrder.deliverTo}
                    </div>

                    <div
                        class="summaryCol"
                        style="color:orangered;text-transform:capitalize"
                    >
                        Order To: {branchOrder.orderTo}
                    </div>
                </div>
                <br />

                <Router>
                    <Route path="c/*">
                        <div class="orderCheckResultsBar">
                            <BranchOrderCheckResults
                                products={bodCheckProducts}
                            />
                        </div>
                    </Route>

                    <Route path="v/*">
                        <div class="bodProductsBar">
                            <BranchOrderProducts products={bodProducts} />
                        </div>
                    </Route>
                </Router>
            </div>
        {/if}
    </div>
</main>

<style>
    .content {
        background: #fff;
        margin-bottom: 2em;
    }
    .orderCheckResultsBar {
        padding-top: 1em;
    }

    .titleBar {
        padding: 1em;
        margin-bottom: 1em;
    }

    .bodProductsBar {
        padding: 1em;
    }
    .orderCheckResultsBar {
        padding: 1em;
        overflow-x: auto;
    }

    .title {
        color: var(--text-primary-light);
        font-weight: 600;
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
            width: 20%;
        }
    }
</style>
