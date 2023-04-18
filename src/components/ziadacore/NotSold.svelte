<script>
    // @ts-nocheck

    import { onMount } from "svelte";
    import { Link } from "svelte-navigator";
    import { addCommas, goBack } from "../../scripts/js/methods";
    import axios from "axios";
    import { apiBaseUrl } from "../../config/config";
    import { read, utils, writeFileXLSX } from "xlsx";
    import dayjs from "dayjs";

    // let printBaseUrl = "http://localhost/Projects/ZiadaLite2.0/";

    let printBaseUrl = "https://v2.pharmaplusziadalite.co.ke/";

    let filterBranches = [];

    let currentlyFilteredBranch = "All";

    export let crumbs;

    let totalValue = 0;

    let daysNotSold = 60;

    // all products
    let products = [];

    // Filtered products
    let filteredProducts = [];

    // if currently filtered branch= All , filtered products = all products
    $: {
        // update bra
        if (products.length > 1) {
            handleBranchFilter(currentlyFilteredBranch);
        }
    }

    const handleBranchFilter = (currentlyFilteredBranch) => {
        if (currentlyFilteredBranch == "All") {
            filteredProducts = products;
        } else {
            // filter the branch
            let filteredBranchProducts = products.filter((p) => {
                if (p.branch == currentlyFilteredBranch) {
                    return p;
                }
            });

            filteredProducts = filteredBranchProducts;
        }

        totalValue = filteredProducts
            .map((v) => v.value)
            .reduce((partialSum, a) => partialSum + a, 0);

        pages = [];

        currentPage = 1;
    };

    let currentPage = 1;

    let totalNumberOfPages = 1;

    let pages = [];

    let offset;

    let pageSize = 21;

    let currentPageProducts = [];

    $: {
        offset = (currentPage - 1) * pageSize;

        currentPageProducts = filteredProducts.slice(offset, offset + pageSize);
    }

    // make pages
    $: {
        if (products.length > 0) {
            totalNumberOfPages = filteredProducts.length / pageSize + 1;

            for (let x = 1; x <= totalNumberOfPages; x++) {
                pages.push(x);
            }

            pages = pages;
        }
    }

    $: {
        getProducts(daysNotSold);
    }

    const getProducts = async (daysNotSold) => {
        let dt = {
            daysNotSold: daysNotSold,
        };

        try {
            const response = await axios({
                method: "POST",
                data: dt,
                url: `${apiBaseUrl}core/getNotSoldIn.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            products = res;
        } catch (err) {
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
        const ws = utils.json_to_sheet(products);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        writeFileXLSX(wb, `${daysNotSold}_Dead_Stock_${timestamp}.xlsx`);
    };

    onMount(() => {
        crumbs = {
            title: "Core Filters",
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
                    name: "Core Filters",
                    url: "/ziada-core/filters",
                },
            ],
        };

        getFilterBranches();
    });
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="mainContainer">
                <div class="filtersContainer">
                    <form class="ui form">
                        <div class="two fields">
                            <div class="field">
                                <label for="timeNotSold"
                                    >Select Time Product Not Sold</label
                                >
                                <select
                                    name="timeNotSold"
                                    id="timeNotSold"
                                    on:change={(e) => {
                                        daysNotSold = e.target.value;
                                    }}
                                >
                                    <option value="30"
                                        >Select Time Not Sold</option
                                    >
                                    <option value="30">1 Month</option>
                                    <option value="60">2 Months</option>
                                    <option value="90">3 Months</option>
                                </select>
                            </div>

                            <div class="field">
                                <label for="filterBranch">Filter Branch</label>
                                <select
                                    name="filterBranch"
                                    id="filterBranch"
                                    bind:value={currentlyFilteredBranch}
                                >
                                    <option value="All">Select Branch</option>
                                    <option value="All">All</option>
                                    {#each filterBranches as fp}
                                        <option value={fp}>{fp}</option>
                                    {/each}
                                </select>
                            </div>
                        </div>
                    </form>
                </div>

                <br />
                <div
                    class="titleBar"
                    style="padding-top:1em;display flex;justify-content:space-between"
                >
                    <div
                        class="title"
                        style="color: crimson;font-size:15px;font-weight:600"
                    >
                        {daysNotSold} Days Old Dead Stock - (Ksh {addCommas(
                            totalValue,
                            2
                        )})
                    </div>
                    <div class="">
                        <!-- <a
                            target="_blank"
                            rel="noreferrer"
                            href={`${printBaseUrl}api/core/print-not-sold-in.php?d=${daysNotSold}`}
                        >
                            <button class="ui basic icon purple mini button">
                                <i class="print icon" /> Print
                            </button>
                        </a> -->

                        <button
                            on:click={generateExcel}
                            class="ui basic icon green mini button"
                        >
                            <i class="file excel icon" /> Excel
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
                            {#each currentPageProducts as p, i}
                                <tr>
                                    <td>{i + 1 + offset}</td>
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
                                currentPage = pg;
                            }}
                            class={currentPage == pg
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
    .titleBar {
        padding: 0.5em;
        border-bottom: 1px solid rgba(166, 166, 166, 0.429);
    }
    .backCol {
        font-size: larger;
        color: crimson;
        font-weight: 600;
        display: flex;
        cursor: pointer;
    }

    .titleCol {
        display: flex;
        justify-content: space-between;
    }

    .s-title {
        font-size: larger;
        margin-left: 1em;
        font-weight: 500;
        color: var(--background-secondary);
    }

    .mainContainer {
        padding: 1em;
    }

    .pagesCol {
        margin-bottom: 2em;
    }

    select {
        line-height: 3em !important;
    }
</style>
