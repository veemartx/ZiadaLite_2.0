<script>
    import { onMount } from "svelte";
    import { Link } from "svelte-navigator";
    import { addCommas, goBack } from "../../../scripts/js/methods";
    import axios from "axios";
    import { apiBaseUrl } from "../../../config/config";
    import BranchesProductsGraph from "./BranchesProductsGraph.svelte";

    export let crumbs;

    let totalCostValue = 0;

    let totalRetailValue = 0;

    let totalProducts = 0;

    onMount(() => {
        crumbs = {
            title: "Core Products",
            crumbs: [
                {
                    name: "Home",
                    url: "/apps",
                },
                {
                    name: "ZiadaCore",
                    url: "/apps/ziadacore",
                },
                {
                    name: "Products",
                    url: "/apps/ziadacore/products",
                },
            ],
        };
    });

    let branches = [];

    const getBranchesProducts = async () => {
        try {
            const response = await axios({
                method: "POST",
                url: `${apiBaseUrl}core/getBranchesInventory.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            branches = res;

            // console.log(branches);
            totalRetailValue = branches
                .map((v) => parseFloat(v.retailValue))
                .reduce((partialSum, a) => partialSum + a, 0);

            totalCostValue = branches
                .map((v) => parseFloat(v.costValue))
                .reduce((partialSum, a) => partialSum + a, 0);

            totalProducts = branches
                .map((v) => parseFloat(v.products))
                .reduce((partialSum, a) => partialSum + a, 0);

            // console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    onMount(() => {
        getBranchesProducts();
    });
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="mainContainer">
                <div class="summaryContainer">
                    <div class="summaryCol" style="color:purple">
                        Total Products: {addCommas(totalProducts)}
                    </div>

                    <div class="summaryCol" style="color:dodgerblue">
                        Retail Value: {addCommas(totalRetailValue, 2)}
                    </div>

                    <div class="summaryCol" style="color:darkgreen">
                        Cost Value: {addCommas(totalCostValue, 2)}
                    </div>

                    <div class="summaryCol" style="color:brown">
                        Export:
                        <button class="ui mini green icon basic button">
                            <i class="file excel icon" /> Export
                        </button>
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
                                <th>Branch</th>
                                <th>Products</th>
                                <th>Cost Value</th>
                                <th>Retail Value</th>
                                <th>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each branches as b, i}
                                <tr>
                                    <td>{i + 1}</td>
                                    <td>{b.branch}</td>
                                    <td>{addCommas(parseInt(b.products), 0)}</td
                                    >
                                    <td
                                        >{addCommas(
                                            parseFloat(b.costValue),
                                            2
                                        )}</td
                                    >
                                    <td
                                        >{addCommas(
                                            parseFloat(b.retailValue),
                                            2
                                        )}</td
                                    >
                                    <td>
                                        <Link
                                            to={`br/${b.branch.toLowerCase()}`}
                                        >
                                            <i class="eye icon" /> View
                                        </Link>
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>

                <br />

                <!-- bar graph -->
                <div class="branchesGraph">
                    <BranchesProductsGraph bind:branches />
                </div>
                <!-- bar graph -->
            </div>
        </div>
    </div>
</main>

<style>
    .mainContainer {
        padding: 1em;
        overflow-x: auto;
        max-width: 100vw;
    }

    .content {
        max-width: 100vw;
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

    .summaryCol button {
        /* min-width: 8em !important; */
        font-size: x-small !important;
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
