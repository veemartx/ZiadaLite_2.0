<script>
    // @ts-nocheck
    import { onMount } from "svelte";
    import { Link } from "svelte-navigator";
    import {
        addCommas,
        getPermittedTokens,
        goBack,
    } from "../../../scripts/js/methods";
    import axios from "axios";
    import { apiBaseUrl } from "../../../config/config";
    import { read, utils, writeFileXLSX } from "xlsx";
    import dayjs from "dayjs";
    import CreateTakeModal from "./CreateTakeModal.svelte";
    import { liveQuery } from "dexie";
    import { db } from "../../../db/db";
    import AuthToken from "../../../components/AuthToken.svelte";
    import { AUTH_ERROR_MESSAGE } from "../../../scripts/js/messages";

    // constants
    const RESOURCE = "stock-takes";

    const ACTION = "create";

    const AUTH_CANCEL_MESSAGE = "Authentication Cancelled By User.";

    let authTokens = [];

    let authenticatedUser;

    let showAuthTokenModal = false;

    let showCreateTakeModal = false;

    let filterBranches = [];

    let currentlyFilteredBranch = "All";

    let localDbStoreUsers = liveQuery(() => db.users.toArray());

    let localDbStorePermissions = liveQuery(() => db.permissions.toArray());

    // state changes
    $: {
        if ($localDbStoreUsers && $localDbStorePermissions) {
            // get allowed tokens
            authTokens = getPermittedTokens(
                RESOURCE,
                ACTION,
                $localDbStoreUsers,
                $localDbStorePermissions
            );
        }
    }

    // all Takes
    let takes = [];

    // Filtered Takes
    let filteredTakes = [];

    // if currently filtered branch= All , filtered Takes = all Takes
    $: {
        // update bra
        if (takes.length > 1) {
            handleBranchFilter(currentlyFilteredBranch);
        }
    }

    const handleBranchFilter = (currentlyFilteredBranch) => {
        if (currentlyFilteredBranch == "All") {
            filteredTakes = takes;
        } else {
            // filter the branch
            let filteredBranchTakes = takes.filter((p) => {
                if (p.branch == currentlyFilteredBranch) {
                    return p;
                }
            });

            filteredTakes = filteredBranchTakes;
        }

        pages = [];

        currentPage = 1;
    };

    const authTokenSuccess = () => {
        showAuthTokenModal = false;

        showCreateTakeModal = true;
    };

    const cancelAuthentication = () => {
        showAuthTokenModal = false;
    };

    let currentPage = 1;

    let totalNumberOfPages = 1;

    let pages = [];

    let offset;

    let pageSize = 21;

    let currentPageTakes = [];

    $: {
        offset = (currentPage - 1) * pageSize;

        currentPageTakes = filteredTakes.slice(offset, offset + pageSize);
    }

    // make pages
    $: {
        if (takes.length > 0) {
            totalNumberOfPages = filteredTakes.length / pageSize + 1;

            for (let x = 1; x <= totalNumberOfPages; x++) {
                pages.push(x);
            }

            pages = pages;
        }
    }

    $: {
        getStockTakes();
    }

    const getStockTakes = async () => {
        try {
            const response = await axios({
                method: "POST",
                url: `${apiBaseUrl}core/getStockTakes.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            takes = res;
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

    const openAuthModal = () => {
        showAuthTokenModal = true;
    };

    const generateExcel = () => {
        let timestamp = dayjs();
        // console.log(inventory);
        const ws = utils.json_to_sheet(Takes);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, "Data");
        writeFileXLSX(wb, `${daysNotSold}_Stock_Takes_${timestamp}.xlsx`);
    };

    onMount(() => {
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
                            <div class="field" />
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
                        Stock Takes
                    </div>
                    <div class="">
                        <div class="ui mini basic icon buttons">
                            <button class="ui button"
                                ><i class="red pdf file icon" /></button
                            >
                            <button on:click={generateExcel} class="ui button"
                                ><i class="green excel file icon" /></button
                            >
                        </div>

                        <button
                            on:click={openAuthModal}
                            class="ui mini purple icon button"
                        >
                            <i class="plus icon" />
                        </button>

                        <button class="ui mini blue icon button">
                            <i class="cog icon" />
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
                                <th>Type</th>
                                <th>Items</th>
                                <th>Datetime</th>
                                <th>Variance</th>
                                <th>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each currentPageTakes as t, i}
                                <tr>
                                    <td>{i + 1 + offset}</td>
                                    <td>{t.branch}</td>
                                    <td>{t.type}</td>
                                    <td>{t.items}</td>
                                    <td>{t.date}</td>
                                    <td>{t.variance}</td>
                                    <td>
                                        <Link to={t.id}>
                                            <span> View </span>
                                        </Link>
                                    </td>
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

<!-- create take modal  -->
{#if showCreateTakeModal}
    <CreateTakeModal
        {authenticatedUser}
        on:cancel={() => {
            showCreateTakeModal = false;
        }}
    />
{/if}
<!-- create take modal  -->

<!-- auth token modal  -->
{#if showAuthTokenModal}
    <AuthToken
        bind:authenticatedUser
        payload={authTokens}
        errorMessage={AUTH_ERROR_MESSAGE}
        cancelMessage={AUTH_CANCEL_MESSAGE}
        on:success={authTokenSuccess}
        on:cancel={cancelAuthentication}
    />
{/if}

<!-- auth token modal  -->
<style>
    .titleBar {
        padding: 0.5em;
        border-bottom: 1px solid rgba(166, 166, 166, 0.429);
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
