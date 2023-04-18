<script>
    import { onMount } from "svelte";
    import { Link } from "svelte-navigator";
    import {
        addCommas,
        getCurrentEntity,
        goBack,
    } from "../../../scripts/js/methods";
    import axios from "axios";
    import { apiBaseUrl } from "../../../config/config";


    export let crumbs;

    onMount(() => {
        crumbs = {
            title: "Core Products",
            crumbs: [
                {
                    name: "Home",
                    url: "/",
                },
                {
                    name: "ZiadaCore",
                    url: "/ziada-core",
                },
                {
                    name: "Products",
                    url: "/ziada-core/products",
                },
            ],
        };
    });

    let branch;

    let totalRetailValue = 0;

    let totalProducts = 0;

    let totalCostValue = 0;

    let products = [];

    let productDetails;

    let firstLetters = [];

    let page = 1;

    let firsLetter = "A";

    let sort = "";

    let pages = [];

    $: {
        // console.log(firsLetter);
        branch = getCurrentEntity(window.location.href);

        sort = `WHERE hostBranch='${branch}' AND productName LIKE '${firsLetter}%'`;

        getBranchProducts(page, sort);
    }

    const getBranchProducts = async (page, sort) => {
        let dt = {
            page: page,
            sort: sort,
            branch: branch,
        };

        try {
            const response = await axios({
                method: "POST",
                data: dt,
                url: `${apiBaseUrl}core/getBranchInventory.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            productDetails = res[0];

            // clear pages
            pages = [];
            // make pages
            for (let x = 1; x < productDetails.totalNumberOfPages; x++) {
                pages.push(x);
            }

            pages = pages;
            // console.log(pages);

            products = res[1];

            console.log(products);

            // console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    const getFirstLetters = async () => {
        try {
            let response = await axios({
                method: "GET",
                url: `${apiBaseUrl}core/getFirstLetters.php`,
            });

            let res = response.data;

            firstLetters = res;

            // console.log(firstLetters);
        } catch (err) {
            console.log(err);
        }
    };

    onMount(() => {
        getFirstLetters();
    });
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="mainContainer">
                {#if productDetails}
                    <div class="summaryContainer">
                        <div
                            class="summaryCol"
                            style="color:purple;text-transform: capitalize;"
                        >
                            Branch: {branch}
                        </div>

                        <div class="summaryCol" style="color:purple">
                            Total Products: {addCommas(
                                parseFloat(productDetails.products)
                            )}
                        </div>

                        <div class="summaryCol" style="color:dodgerblue">
                            Retail Value: {addCommas(
                                parseFloat(productDetails.retailValue),
                                2
                            )}
                        </div>

                        <div class="summaryCol" style="color:darkgreen">
                            Cost Value: {addCommas(
                                parseFloat(productDetails.costValue),
                                2
                            )}
                        </div>

                        <div class="summaryCol" style="color:brown">
                            Export:
                            <button class="ui mini green icon basic button">
                                <i class="file excel icon" /> Export
                            </button>
                        </div>
                    </div>
                {/if}

                <br />
                <div class="firstLettersCol">
                    {#each firstLetters as fl}
                        <button
                            on:click={() => {
                                // reset page
                                page = 1;

                                firsLetter = fl;
                            }}
                            class={firsLetter == fl
                                ? "ui green  mini icon button"
                                : "ui basic mini icon button"}
                        >
                            {fl}
                        </button>
                    {/each}
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
                                <th>Code</th>
                                <th>Branch</th>
                                <th>InStockQty</th>
                                <th>AverageCost</th>
                                <th>PackSize</th>
                                <th>Qty(WP)</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each products as p, i}
                                <tr>
                                    <td>{i + 1}</td>
                                    <td>{p.name}</td>
                                    <td>{p.code}</td>
                                    <td>{p.branch}</td>
                                    <td>{p.instockqty}</td>
                                    <td>{p.averageCost}</td>
                                    <td>{p.packSize}</td>
                                    <td>{p.calcPw}</td>
                                    <td>{addCommas(p.value, 2)}</td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>

                <br />

                <div class="pagesCol">
                    {#each pages as pg}
                        <button
                            on:click={() => {
                                page = pg;
                            }}
                            class={page == pg
                                ? "ui green  mini icon button"
                                : "ui basic mini icon button"}
                        >
                            {pg}
                        </button>
                    {/each}
                </div>
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

    .pagesCol {
        margin-top: 2em;
        margin-bottom: 2em;
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
