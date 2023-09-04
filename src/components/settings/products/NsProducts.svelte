<script>
    import axios from "axios";
    import CreateCategory from "./CreateCategory.svelte";
    import { apiBaseUrl } from "../../../config/config";
    import { onMount } from "svelte";
    import { Link } from "svelte-navigator";
    import { addCommas, formatDate } from "../../../scripts/js/methods";
    import CreateProductProperty from "./CreateProductProperty.svelte";
    import { async } from "pdfmake/build/pdfmake";
    import { Notify } from "notiflix";
    import dayjs from "dayjs";
    import { read, utils, writeFileXLSX } from "xlsx";
    import SearchNsProduct from "./SearchNsProduct.svelte";

    let nsProducts = [];

    let nsProductsShow = [];

    let NsProductsStats;

    let currentPage = 1;

    let pageSize = 100;

    let totalPages;

    let offset;

    let pages = [];

    // when current page changes
    $: {
        if (currentPage) {
            getNsProducts();
            createPages();
        }
    }

    const getNsProducts = async () => {
        let dt = {
            page: currentPage,
            pageSize: pageSize,
        };
        try {
            let response = await axios({
                method: "POST",
                url: `${apiBaseUrl}getNsProducts.php`,
                data: dt,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            nsProducts = response.data;

            console.log(nsProducts);
        } catch (err) {
            console.log(err);
        }
    };

    const getNsProductsShow = async () => {
        let dt = {
            page: currentPage,
            pageSize: pageSize,
        };
        try {
            let response = await axios({
                method: "POST",
                url: `${apiBaseUrl}getNsProductsShow.php`,
                data: dt,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            nsProductsShow = response.data;

            console.log(nsProducts);
        } catch (err) {
            console.log(err);
        }
    };

    const handleEditProduct = async (propertyId) => {
        let dt = {
            id: propertyId,
        };

        if (confirm("Delete Selected Product?")) {
            const response = await axios({
                method: "POST",
                data: dt,
                url: `${apiBaseUrl}deleteNsProduct.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            // console.log(res);
            if (res.success) {
                Notify.success(res.message);

                getNsProducts();
            } else {
                Notify.failure(res.message);
            }
        }
    };

    const generateExcel = () => {
        let timestamp = dayjs();
        // console.log(inventory);
        const ws = utils.json_to_sheet(nsProducts);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        writeFileXLSX(wb, `NsProducts_${timestamp}.xlsx`);
    };

    const createPages = () => {
        offset = currentPage * pageSize - pageSize;
    };
    const generateAdditionsReportExcel = () => {
        let timestamp = dayjs();
        // console.log(inventory);
        const ws = utils.json_to_sheet(NsProductsStats.additions);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        writeFileXLSX(wb, `NsProductsAdditionsReport_${timestamp}.xlsx`);
    };

    const getNsProductsStats = async () => {
        let response = await axios.get(apiBaseUrl + "getNsProductsStats.php");

        let res = response.data;

        // console.log(res);

        NsProductsStats = res;

        totalPages = Math.floor(NsProductsStats.added / pageSize);

        let pgs = [];

        // make the pages
        for (let index = 0; index < totalPages; index++) {
            pgs.push(index + 1);
        }

        // pages
        pages = pgs;

        createPages();
    };

    onMount(() => {
        getNsProducts();
        getNsProductsStats();
        getNsProductsShow();
    });
</script>

<main>
    <div class="wrapper">
        <div class="titleBar">
            <div class="title">NsProducts</div>
            <div class="action">
                <button
                    on:click={generateExcel}
                    class="ui basic purple mini icon button"
                >
                    <i class="excel file icon" /> Export
                </button>
            </div>
        </div>
        <br />
        <div class="mainStatsBar">
            <div class="mainStatsContentBar">
                {#if NsProductsStats}
                    <div class="statCol">
                        <div class="statFig">
                            {addCommas(NsProductsStats.products)}
                        </div>
                        <div class="statText">Products</div>
                    </div>

                    <div class="statCol">
                        <div class="statFig">
                            {addCommas(NsProductsStats.added)}
                        </div>
                        <div class="statText">Added Products</div>
                    </div>

                    <div class="statCol">
                        <div class="statFig">
                            {addCommas(
                                NsProductsStats.products - NsProductsStats.added
                            )}
                        </div>
                        <div class="statText">Remaining</div>
                    </div>

                    <div class="statCol" style="border: none;">
                        <button
                            on:click={generateAdditionsReportExcel}
                            class="ui basic orange icon button"
                        >
                            <i class="excel file icon" /> Additions Report
                        </button>
                    </div>
                {/if}
            </div>
        </div>
        <br />
        <div class="contentBar">
            <div class="titleBar">
                <div class="title">Search Product</div>
            </div>
        </div>
        <div class="searchBar">
            <SearchNsProduct />
        </div>
        <br />
        <div class="contentBar">
            <table class="ui very basic striped unstackable table">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Code</th>
                        <th>Category</th>
                        <th>Subcategory One</th>
                        <th>Subcategory Two</th>
                        <th>Subcategory Three</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {#each nsProductsShow as ct, i}
                        <tr>
                            <td>{offset + 1 + i}</td>
                            <td>{ct.name}</td>
                            <td>{ct.code}</td>
                            <td>{ct.category}</td>
                            <td>
                                {ct.subcategory_one}
                            </td>
                            <td>
                                {ct.subcategory_two}
                            </td>

                            <td>
                                {ct.subcategory_three}
                            </td>

                            <td>
                                <Link to={`../ns-product/edit/${ct.id}`}>
                                    <span>
                                        <i
                                            style="font-size: 20px;"
                                            class="yellow edit icon"
                                        />
                                    </span>
                                </Link>

                                <Link to={`../ns-product/pd/${ct.id}`}>
                                    <span>
                                        <i
                                            style="font-size: 20px;"
                                            class="green eye icon"
                                        />
                                    </span>
                                </Link>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
        <br />

        <!-- pages bar  -->
        <!-- <div class="pagesCol">
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
        </div> -->
        <!-- pages bar  -->

        <br /> <br />
    </div>
</main>

<style>
    .title {
        font-size: small;
    }

    .mainStatsContentBar {
        /* background: lightblue; */
        display: flex;
        justify-content: space-evenly;
    }

    .statCol {
        padding: 1em;
        /* background: red; */
        border: 1px solid rgba(128, 128, 128, 0.436);
        margin: 0.5em;
    }

    .statFig {
        font-size: large;
        font-weight: 800;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .contentBar {
        max-width: 90vw;
        overflow-x: auto;
    }
</style>
