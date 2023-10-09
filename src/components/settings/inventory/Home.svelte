<script>
    import axios from "axios";
    import AddProduct from "./AddProduct.svelte";
    import InventorySearch from "./InventorySearch.svelte";
    import { apiBaseUrl } from "../../../config/config";
    import { onMount } from "svelte";
    import { read, utils, writeFileXLSX } from "xlsx";
    import dayjs from "dayjs";
    import { getBranches, getLiuDetails } from "../../../scripts/js/methods";
    import { async } from "pdfmake/build/pdfmake";

    export let crumbs;

    let showAddProducts = false;

    let searchProduct;

    let stats = {};

    let products = [];

    let filterBranches = [];

    let filteredBranch = "All";

    let filteredProducts = [];

    let liu = getLiuDetails();

    $: {
        handleBranchesFilter(filteredBranch);
    }

    const getStats = async () => {
        let res = await axios.get(
            `${apiBaseUrl}getNsProductStockExpiriesStats.php?host=${liu.b}`
        );

        stats = res.data;
    };

    const getProducts = async () => {
        let res = await axios.get(`${apiBaseUrl}getNsProductStockExpiries.php`);

        products = res.data;
    };

    const generateExcel = () => {
        let timestamp = dayjs();
        // console.log(inventory);
        const ws = utils.json_to_sheet(filteredProducts);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        writeFileXLSX(wb, `${filteredBranch}_NsProducts_${timestamp}.xlsx`);
    };

    const handleBranchesFilter = (filteredBranch) => {
        if (filteredBranch == "All") {
            filteredProducts = products;
        } else {
            let fp = products.filter((p) => {
                if (p.branch == filteredBranch) {
                    return p;
                }
            });

            filteredProducts = fp;

            filteredProducts = filteredProducts;
        }
    };

    onMount(async () => {
        getStats();
        getProducts();

        filterBranches = await getBranches();

        if (liu.p != "admin") {
            filteredBranch = liu.b;
        }

        handleBranchesFilter(filteredBranch);

        // console.log(filterBranches);
    });
</script>

<main>
    <div class="titleBar">
        <div class="title" style="margin: .5em;">
            Inventory Stock Take [{liu.b}]
        </div>

        {#if liu.p == "admin"}
            <div class="" style="margin: .5em;">
                <select
                    style="background:rgba(0, 0, 0, 0)"
                    name="branches"
                    id="branches"
                    bind:value={filteredBranch}
                >
                    <option value="">Filter Branches</option>
                    <option value="All">All</option>
                    {#each filterBranches as b}
                        <option value={b}>{b}</option>
                    {/each}
                </select>
            </div>
        {/if}

        <div class="actions" style="padding: 1em;">
            <span style="margin: .4em;">
                <button
                    on:click={generateExcel}
                    class="ui green mini button icon"
                >
                    <i class="excel file icon" />
                </button>
            </span>
        </div>
    </div>

    <div class="contentBar">
        <div class="searchBar">
            <InventorySearch
                on:product={(e) => {
                    searchProduct = e.detail;

                    // open modal
                    showAddProducts = true;
                    // console.log(searchProduct);
                }}
            />
        </div>
        <div class="statsCol">
            <div class="statsPanel">
                <div class="statsFig">{stats.all_products}</div>
                <div class="statDesc">Products</div>
            </div>

            <div class="statsPanel">
                <div class="statsFig">{stats.added}</div>
                <div class="statDesc">
                    Added <span class="host">(All)</span>
                </div>
            </div>

            <div class="statsPanel">
                <div class="statsFig">{stats.host_products}</div>
                <div class="statDesc">
                    Added <span class="host">({liu.b})</span>
                </div>
            </div>

            <div class="statsPanel">
                <div class="statsFig">{stats.remaining}</div>
                <div class="statDesc">Remaining</div>
            </div>
        </div>

        <div class="tableCol">
            {#if liu.p == "admin"}
                <div class="subTitle">
                    <b>
                        Filtered Branch <i style="font-size: small;"
                            >({filteredBranch})</i
                        >
                    </b>
                </div>
            {/if}
            <table class="ui very basic unstackable striped table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Code</th>
                        <th>Pack Size</th>
                        <th>Qty</th>
                        <th>Batch</th>
                        <th>Branch</th>
                    </tr>
                </thead>
                <tbody>
                    {#each filteredProducts as product, i}
                        <tr>
                            <td>{i + 1}</td>
                            <td>{product.name}</td>
                            <td>{product.code}</td>
                            <td>{product.pack_size}</td>
                            <td>{`${product.qtyw}W ${product.qtyp}P`}</td>
                            <td>{product.batch}</td>
                            <td>{product.branch}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</main>

<!-- show add product -->
{#if showAddProducts && searchProduct}
    <AddProduct
        {searchProduct}
        on:cancel={() => {
            searchProduct = null;
            showAddProducts = false;
        }}
        on:success={() => {
            searchProduct = null;
            showAddProducts = false;
            getStats();
            getProducts();
        }}
    />
{/if}

<!-- show add product -->

<style>
    .statsCol {
        display: flex;
    }

    .statsPanel {
        margin: 0.5em;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        flex: 1;
        padding: 1em;
        text-align: center;
    }

    .statsFig {
        font-size: 25px;
        font-weight: 700;
        color: purple;
    }

    .statDesc {
        font-size: 15px;
        color: brown;
    }

    .searchBar {
        padding: 1em;
    }

    .subTitle {
        padding: 1em;
        color: crimson;
    }

    .host {
        font-size: small;
        color: green;
    }
</style>
