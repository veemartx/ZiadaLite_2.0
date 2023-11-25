<script>
    // @ts-nocheck

    import axios from "axios";
    import AddProduct from "./AddProduct.svelte";
    import InventorySearch from "./InventorySearch.svelte";
    import { apiBaseUrl } from "../../../config/config";
    import { onMount } from "svelte";
    import { read, utils, writeFileXLSX } from "xlsx";
    import dayjs from "dayjs";
    import { getBranches, getLiuDetails } from "../../../scripts/js/methods";
    import { async } from "pdfmake/build/pdfmake";
    import { Link, Route, Router } from "svelte-navigator";
    import TakeTwo from "./TakeTwo.svelte";
    import { Notify } from "notiflix";
    import AuthToken from "../../AuthToken.svelte";
    import { AUTH_ERROR_MESSAGE } from "../../../scripts/js/messages";
    import { liveQuery } from "dexie";
    import { db } from "../../../db/db";
    import { getPermittedTokens } from "../../../scripts/js/methods";
    import EditProduct from "./EditProduct.svelte";
    import AccessTokens from "./AccessTokens.svelte";

    export let crumbs;

    Notify.init({
        ID: "MKA",
        timeout: 4000,
        showOnlyTheLastOne: true,
        cssAnimationStyle: "from-bottom",
        zindex: 1000000000,
    });

    let shelves = [];

    let showAuthToken = true;

    let showAddProducts = false;

    let showEditProduct = false;

    let showTakeTwo = false;

    let exportExcelBtnLoading = false;

    let exportExcelBtnRawLoading = false;

    let takeTwoBtnLoading = false;

    let archiveStockTakeBtnLoading = false;

    let searchProduct;

    let editProduct;

    let takeTwoShelf;

    let refreshBranchesBtnLoading = false;

    let show_branch_shelf_filters = false;

    let added_filter_sbt_btn_loading = false;

    let added_filter_branch;

    let added_filter_shelf;

    let added_filter_target;

    let added_filter_user;

    let added_filter_type;

    // one need to select branch first
    let added_filter_branch_users = [];

    // users
    let added_filter_products = [];

    // auth
    const RESOURCE = "products";

    const ACTION = "add";

    let authenticatedUser = {};

    let authTokens = [];

    let localDbStoreUsers = liveQuery(() => db.users.toArray());

    let localDbStorePermissions = liveQuery(() => db.permissions.toArray());

    $: {
        if ($localDbStoreUsers && $localDbStorePermissions) {
            // get allowed tokens
            authTokens = getPermittedTokens(
                RESOURCE,
                ACTION,
                $localDbStoreUsers,
                $localDbStorePermissions,
            );
        }
    }

    let stats = {};

    let products = [];

    let filtered_products = [];

    let products_filter_query = "";

    let takeTwoProducts = [];

    let filterBranches = [];

    let filteredBranch;

    let varianceBtnLoading;

    let varianceData;

    let liu = getLiuDetails();

    $: {
        if (filteredBranch) {
            getProducts(filteredBranch);
        }
    }

    $: {
        if (products_filter_query.length > 0) {
            handleProductFilter(products_filter_query);
        } else {
            filtered_products = products;
        }
    }

    // when added filter branch changes
    $: {
        if (added_filter_branch) {
            getAddedFilterBranchUsers(added_filter_branch);
        }
    }
    const getStats = async (branch) => {
        let dt = {
            branch: branch,
            position: liu.p,
        };

        try {
            const response = await axios({
                method: "POST",
                data: dt,
                url: `${apiBaseUrl}getNsProductStockExpiriesStats.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            stats = res;
        } catch (err) {
            console.log(err);
        }
    };

    const getAddedFilterBranchUsers = async (added_filter_branch) => {
        let dt = {
            branch: added_filter_branch,
        };

        try {
            const response = await axios({
                method: "POST",
                data: dt,
                url: `${apiBaseUrl}getAddedFilterBranchUsers.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            added_filter_branch_users = res;
        } catch (err) {
            console.log(err);
        }
    };

    const getAddedFilterProducts = async () => {
        // checks
        if (added_filter_target == "shelf" && !added_filter_shelf) {
            Notify.failure("Shelf Cannot Be Empty if its targeted");
            return;
        }

        if (added_filter_target == "user" && !added_filter_user) {
            Notify.failure("User Cannot Be Empty if its targeted");
            return;
        }

        let dt = {
            branch: added_filter_branch,
            user: added_filter_user,
            shelf: added_filter_shelf,
            target: added_filter_target,
            type: added_filter_type,
        };

        added_filter_sbt_btn_loading = true;

        try {
            const response = await axios({
                method: "POST",
                data: dt,
                url: `${apiBaseUrl}getAddedFilterProducts.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            generateAddedFilteredPrductsExcel(response.data);

            added_filter_sbt_btn_loading = false;
        } catch (err) {
            console.log(err);
        }
    };

    const generateShelves = () => {
        for (let index = 1; index < 51; index++) {
            // const element = array[index];
            let i;
            if (index < 10) {
                i = "0" + index;
            } else {
                i = index;
            }

            shelves.push(`SH-${i}`);
            shelves = shelves;
        }
    };

    const handleProductFilter = (query) => {
        let filteredp = products.filter((p) => {
            if (p.name.includes(query.toUpperCase())) {
                return p;
            }
        });

        filtered_products = filteredp;
    };

    const getProducts = async (branch) => {
        let dt = {
            branch: branch,
            user: authenticatedUser.name,
            position: authenticatedUser.position,
        };
        try {
            const response = await axios({
                method: "POST",
                data: dt,
                url: `${apiBaseUrl}getNsProductStockExpiries.php`,
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

    const generateExcel = async (type) => {
        let fb = filteredBranch ? filteredBranch : "All";
        let dt = {
            branch: fb,
            type: type,
        };

        if (type == "raw") {
            exportExcelBtnRawLoading = true;
        } else {
            exportExcelBtnLoading = true;
        }

        try {
            const response = await axios({
                method: "POST",
                data: dt,
                url: `${apiBaseUrl}getNProductExcelStockExpiries.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            if (type == "raw") {
                exportExcelBtnRawLoading = false;
            } else {
                exportExcelBtnLoading = false;
            }
            let timestamp = dayjs();
            // console.log(inventory);
            const ws = utils.json_to_sheet(res);
            const wb = utils.book_new();
            utils.book_append_sheet(wb, ws, "Data");
            writeFileXLSX(wb, `${fb}_NsProducts_${timestamp}.xlsx`);
        } catch (err) {
            console.log(err);
        }
    };

    const generateAddedFilteredPrductsExcel = (products) => {
        let timestamp = dayjs();
        // console.log(inventory);
        const ws = utils.json_to_sheet(products);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        writeFileXLSX(
            wb,
            `${added_filter_target}_filtered_products_${timestamp}.xlsx`,
        );
    };

    const getTakeTwoProducts = async () => {
        let dt = {
            branch: liu.b,
            shelf: takeTwoShelf,
        };

        takeTwoBtnLoading = true;
        try {
            const response = await axios({
                method: "POST",
                data: dt,
                url: `${apiBaseUrl}getNsProductStockExpiriesTakeTwo.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            takeTwoProducts = res;

            takeTwoBtnLoading = false;

            showTakeTwo = true;
            // console.log(takeTwoProducts);
        } catch (err) {
            console.log(err);
        }
    };

    const getVariance = async () => {
        let dt = {
            branch: liu.b,
        };

        try {
            varianceBtnLoading = true;

            const response = await axios({
                method: "POST",
                data: dt,
                url: `${apiBaseUrl}updateNsProductStockExpiry.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            // console.log(res);
            varianceData = res;

            varianceBtnLoading = false;
        } catch (err) {
            console.log(err);
        }
    };

    const refreshBranches = async () => {
        // console.log("Refreshing Branches");

        let dt = {
            user: authenticatedUser.name,
            position: authenticatedUser.position,
        };

        try {
            refreshBranchesBtnLoading = true;

            const response = await axios({
                method: "POST",
                data: dt,
                url: `${apiBaseUrl}refreshNsProductsBranches.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            Notify.info(res.message);

            refreshBranchesBtnLoading = false;
        } catch (err) {
            console.log(err);
        }
    };

    const handleDeleteTakeProduct = async (id) => {
        let dt = {
            id: id,
        };

        try {
            const response = await axios({
                method: "POST",
                data: dt,
                url: `${apiBaseUrl}deleteStockExpiryProduct.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            let res = response.data;

            if (res.success) {
                Notify.success(res.message);

                getProducts(liu.b);
            } else {
                Notify.failure(res.message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const archiveStockTake = async () => {
        let dt = {
            user: authenticatedUser.name,
            position: authenticatedUser.position,
        };

        try {
            archiveStockTakeBtnLoading = true;

            const response = await axios({
                method: "POST",
                data: dt,
                url: `${apiBaseUrl}archiveStockTake.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            // Notify.info(res.message);
            alert(res.message);

            window.location.reload();

            archiveStockTakeBtnLoading = false;
        } catch (err) {
            console.log(err);
        }
    };

    onMount(async () => {
        getStats(liu.b);

        filterBranches = await getBranches();

        if (liu.p != "admin") {
            filteredBranch = liu.b;
        }

        // console.log(filterBranches);
        generateShelves();
    });
</script>

<main>
    <div class="titleBar">
        <div class="title" style="margin: .5em;">
            Inventory Stock Take [{liu.b}]
        </div>

        {#if liu.p == "admin"}
            <div class="" style="margin: .5em;display:flex">
                <div class="">
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

                <div class="" style="padding: 1em;">
                    <Link to="access-tokens">Access Tokens</Link>
                </div>

                <div class="" style="padding: 1em;">
                    <button
                        on:click={() => {
                            show_branch_shelf_filters =
                                !show_branch_shelf_filters;
                        }}
                        class="ui purple mini icon button"
                    >
                        <i class="filter icon"></i> Filter
                    </button>
                </div>
            </div>
        {/if}
    </div>

    <!-- branch, shelf added by filters-->
    {#if show_branch_shelf_filters}
        <div class="branch_shelf_filters" style="padding: 1em;">
            <form
                class="ui form"
                on:submit|preventDefault={getAddedFilterProducts}
            >
                <div class="three fields">
                    <div class="field">
                        <label for="branch"> Branch </label>
                        <select
                            name="filter_branch"
                            id="filter_branch"
                            bind:value={added_filter_branch}
                            required
                        >
                            <option value="">Select Branch</option>
                            {#each filterBranches as b}
                                <option value={b}>{b}</option>
                            {/each}
                        </select>
                    </div>

                    <div class="field">
                        <label for="shelf"> Shelf </label>
                        <select
                            name="filter_shelf"
                            id="filter_shelf"
                            bind:value={added_filter_shelf}
                        >
                            <option value="">Select Shelf</option>
                            {#each shelves as s}
                                <option value={s}>{s}</option>
                            {/each}
                        </select>
                    </div>

                    <div class="field">
                        <label for="user"> User </label>
                        <select
                            name="filter_user"
                            id="filter_user"
                            bind:value={added_filter_user}
                        >
                            <option value="">Select User</option>
                            {#each added_filter_branch_users as u}
                                <option value={u}>{u}</option>
                            {/each}
                        </select>
                    </div>
                </div>

                <div class="two fields">
                    <div class="field">
                        <label for="target"> Target </label>
                        <select
                            name="filter_target"
                            id="filter_target"
                            bind:value={added_filter_target}
                            required
                        >
                            <option value="">Select Target</option>
                            <option value="branch">Branch</option>
                            <option value="shelf">Shelf</option>
                            <option value="user">User</option>
                        </select>
                    </div>

                    <div class="field">
                        <label for="type"> Report Type </label>
                        <select
                            name="filter_report_type"
                            id="filter_report_type"
                            bind:value={added_filter_type}
                            required
                        >
                            <option value="">Select Report Type</option>
                            <option value="clean">clean</option>
                            <option value="raw">raw</option>
                        </select>
                    </div>
                </div>

                <div class="field" style="text-align: center;padding-top:1em">
                    <button
                        class={added_filter_sbt_btn_loading
                            ? "ui loading brown mini icon button"
                            : "ui brown mini icon button"}
                    >
                        <i class="filter icon"></i> Filter
                    </button>
                </div>
            </form>
        </div>
    {/if}
    <!-- filters shelf added by filters-->

    <div class="actionsBar">
        <div class="actions" style="padding: 1em;display:flex">
            <div class="right" style="flex: 1;">
                <span style="margin: .4em;padding:1em">
                    <button
                        on:click={() => {
                            generateExcel("clean");
                        }}
                        class={exportExcelBtnLoading
                            ? "ui green loading mini button icon"
                            : "ui green mini button icon"}
                    >
                        <i class="excel file icon" /> Clean
                    </button>

                    <button
                        on:click={() => {
                            generateExcel("raw");
                        }}
                        class={exportExcelBtnLoading
                            ? "ui blue loading mini button icon"
                            : "ui blue mini button icon"}
                    >
                        <i class="excel file icon" /> Raw
                    </button>
                </span>
            </div>

            <!-- varinace check  -->
            <div class="refresh_branches">
                <button
                    on:click={() => {
                        if (confirm("Refresh Ziada Branches?")) {
                            refreshBranches();
                        }
                    }}
                    class={refreshBranchesBtnLoading
                        ? "ui basic mini icon loading red button"
                        : "ui basic mini icon  red button"}
                >
                    <i class="refresh icon" />
                </button>
            </div>
            <!-- varinace check  -->

            {#if authenticatedUser.position == "admin"}
                <!-- archive -->
                <div class="archive_stock_take">
                    <button
                        on:click={() => {
                            if (confirm("Archive Current Stock Take?")) {
                                archiveStockTake();
                            }
                        }}
                        class={archiveStockTakeBtnLoading
                            ? "ui basic mini icon loading orange button"
                            : "ui basic mini icon  orange button"}
                    >
                        <i class="archive icon" />
                    </button>
                </div>
                <!-- archive -->
            {/if}
        </div>
    </div>

    <Router primary={false}>
        <Route path="/">
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
                <div class="loggedCol">
                    <div class="lcol">
                        Current Branch: <span style="color: crimson;">
                            {liu.b}</span
                        >
                    </div>

                    <div class="lcol">
                        Current User: <span style="color: crimson;"
                            >{authenticatedUser.name}</span
                        >
                    </div>
                </div>
                <div class="statsCol">
                    <div class="statsPanel">
                        <div class="statsFig">{stats.all_products ?? 0}</div>
                        <div class="statDesc">Products</div>
                    </div>

                    <div class="statsPanel">
                        <div class="statsFig">{stats.added ?? 0}</div>
                        <div class="statDesc">Added</div>
                    </div>

                    <div class="statsPanel">
                        <div class="statsFig">{stats.remaining ?? 0}</div>
                        <div class="statDesc">Remaining</div>
                    </div>
                </div>

                <div class="tableCol">
                    <div class="table_title_col">
                        <div class="left">
                            {#if liu.p == "admin"}
                                <div class="subTitle">
                                    <b>
                                        Filtered Branch <i
                                            style="font-size: small;"
                                            >({filteredBranch})</i
                                        >
                                    </b>
                                </div>
                            {/if}
                        </div>
                        <div class="right">
                            <div class="filter_input">
                                <input
                                    type="text"
                                    name="filter_input"
                                    id="filter_input"
                                    placeholder="Filter Products"
                                    bind:value={products_filter_query}
                                />
                            </div>
                        </div>
                    </div>

                    <table class="ui very basic unstackable striped table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Code</th>
                                <th>Qty</th>
                                <th>Batch</th>
                                <th>Branch</th>
                                <th> Actions </th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each filtered_products as product, i}
                                <!-- show the product is admin or the user added it -->

                                <!-- if user is admin or the one who created the the product -->
                                {#if authenticatedUser.position === "admin" || authenticatedUser.name === product.created_by}
                                    <tr>
                                        <td>{i + 1}</td>
                                        <td>{product.name}</td>
                                        <td>{product.code}</td>
                                        <td
                                            >{product.qty}({product.sales_uom})</td
                                        >
                                        <td>{product.batch}</td>
                                        <td>{product.branch}</td>
                                        <td>
                                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                                            <i
                                                style="font-size: large;cursor:pointer"
                                                class="orange edit icon"
                                                on:click={() => {
                                                    if (
                                                        confirm(
                                                            `Edit ${product.name}?`,
                                                        )
                                                    ) {
                                                        editProduct = product;

                                                        showEditProduct = true;
                                                    }
                                                }}
                                            />

                                            <!-- deletc -->
                                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                                            <i
                                                style="font-size: large;cursor:pointer"
                                                class="red trash icon"
                                                on:click={() => {
                                                    if (
                                                        confirm(
                                                            `Delete ${product.name}?`,
                                                        )
                                                    ) {
                                                        handleDeleteTakeProduct(
                                                            product.id,
                                                        );
                                                    }
                                                }}
                                            />
                                            <!-- deletc -->
                                        </td>
                                    </tr>
                                {/if}

                                <!-- if user is admin or the one who created the the product -->
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        </Route>

        <Route path="take-two">
            <div class="contentBar">Take Two</div>
        </Route>

        <Route path="access-tokens">
            <div class="contentBar">
                <AccessTokens />
            </div>
        </Route>
    </Router>
</main>

<!-- show add product -->
{#if showAddProducts && searchProduct}
    <AddProduct
        {searchProduct}
        {authenticatedUser}
        on:cancel={() => {
            searchProduct = null;
            showAddProducts = false;
        }}
        on:success={() => {
            searchProduct = null;
            showAddProducts = false;
            getStats(liu.b);
            getProducts(liu.b);
        }}
    />
{/if}
<!-- show add product -->

<!-- show edit product -->
{#if showEditProduct && editProduct}
    <EditProduct
        searchProduct={editProduct}
        {authenticatedUser}
        on:cancel={() => {
            editProduct = null;
            showEditProduct = false;
        }}
        on:success={() => {
            let br = filteredBranch ? filteredBranch : "All";

            editProduct = null;
            showEditProduct = false;
            getProducts(br);
        }}
    />
{/if}
<!-- show edit product -->

<!-- take two  -->
{#if showTakeTwo}
    <TakeTwo
        products={takeTwoProducts}
        on:cancel={() => {
            showTakeTwo = false;
        }}
        on:success={() => {
            showTakeTwo = false;

            getProducts(liu.b);
        }}
    />
{/if}
<!-- take two  -->

<!-- auth token -->
{#if showAuthToken}
    <AuthToken
        bind:authenticatedUser
        on:cancel={() => {}}
        errorMessage={AUTH_ERROR_MESSAGE}
        cancelMessage="Operation Cannot Be Cancelled"
        payload={authTokens}
        on:success={() => {
            let br = filteredBranch ? filteredBranch : "All";

            showAuthToken = false;

            getProducts(br);
        }}
    />
{/if}

<!-- auth token -->

<style>
    .statsCol {
        display: flex;
    }

    .actionsBar {
        display: flex;
        justify-content: flex-end;
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

    .loggedCol {
        display: flex;
        justify-content: flex-end;
    }

    .lcol {
        padding: 1em;
        font-weight: 800;
    }

    .table_title_col {
        display: flex;
        justify-content: space-between;
    }

    .right {
        padding: 1em;
    }
</style>
