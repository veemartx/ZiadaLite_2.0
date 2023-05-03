<script>
    // @ts-nocheck

    import { onMount } from "svelte";
    import { addCommas, updateCrumbs } from "../../scripts/js/methods";
    import { Link } from "svelte-navigator";
    import axios from "axios";
    import { apiBaseUrl } from "../../config/config";
    import BodCheck from "./BodCheck.svelte";
    import { v4 } from "uuid";
    import { liveQuery } from "dexie";
    import { db } from "../../db/db";
    import { getPermittedTokens } from "../../scripts/js/methods";
    import AuthToken from "../AuthToken.svelte";

    let showBodCheckModal = false;

    let authTokens = [];

    let showAuthTokenModal = false;

    let authenticatedUser;

    const RESOURCE = "branch-orders";

    const ACTION = "view";

    const AUTH_ERROR_MESSAGE =
        "Permission Denied: Action Not Allowed For This User.Check Allowed Permissions On Your Profile For More Details";

    const AUTH_CANCEL_MESSAGE = "Authentication Cancelled By User";

    let localDbStoreUsers = liveQuery(() =>
        db.users.where("position").notEqual("position").toArray()
    );

    let localDbStorePermissions = liveQuery(() => db.permissions.toArray());

    $: {
        if ($localDbStoreUsers && $localDbStorePermissions) {
            // get allowed tokens
            authTokens = getPermittedTokens(
                RESOURCE,
                ACTION,
                $localDbStoreUsers,
                $localDbStorePermissions
            );

            console.log(authTokens);
        }
    }

    let crumbs = {
        title: "Orders",
        crumbs: [
            {
                name: "Home",
                url: "/",
            },
            {
                name: "Orders",
                url: "/orders/",
            },
        ],
    };

    let branchOrders = [];

    const getOrders = async () => {
        let response = await axios({
            method: "get",
            url: apiBaseUrl + "getBranchOrders.php",
        });

        let res = response.data;

        // console.log(res);
        branchOrders = res;
    };

    const authTokenSuccess = () => {
        showAuthTokenModal = false;

        // show bodCheck modal
        showBodCheckModal = true;
    };

    const cancelAuthentication = () => {
        showAuthTokenModal = false;
    };

    onMount(() => {
        updateCrumbs(crumbs);

        getOrders();
    });
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="titleBar">
                <div class="title" />
                <div class="action">
                    <button
                        on:click={() => {
                            showAuthTokenModal = true;
                        }}
                        class="ui icon mini teal basic button"
                    >
                        <i class="check icon" />Check.Bod
                    </button>
                </div>
            </div>

            <div class="contentBar">
                <table
                    class="ui very basic striped unstackable single line table"
                >
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>BodNo</th>
                            <th>Branch</th>
                            <th>Items</th>
                            <th>Total Cost</th>
                            <th>
                                <i style="color: red;" class="ri-truck-line" /> Order
                                To</th
                            >
                            <th
                                >Deliver To <i
                                    style="color:green"
                                    class="ri-truck-line"
                                /></th
                            >
                            <th>Prepared By</th>
                            <th
                                >Actions <i
                                    style="color: purple;"
                                    class="ri-list-check-2"
                                /></th
                            >
                        </tr>
                    </thead>
                    <tbody>
                        {#each branchOrders as bod, i}
                            <tr>
                                <td>{i + 1}</td>
                                <td>{bod.bodNo}</td>
                                <td>{bod.branch}</td>
                                <td>{bod.items}</td>
                                <td
                                    >{addCommas(
                                        parseFloat(bod.totalCost),
                                        2
                                    )}</td
                                >
                                <td>{bod.orderFrom}</td>
                                <td>{bod.deliverTo}</td>
                                <td
                                    ><span style="text-transform:uppercase"
                                        >{bod.preparedBy}</span
                                    ></td
                                >
                                <td>
                                    <Link to={`/orders/bord/c/${bod.bodId}`}>
                                        <span class="actionIcon">
                                            <i class="ri-list-check-2" />
                                        </span>
                                    </Link>
                                    &nbsp;&nbsp;
                                    <Link to={`/orders/bord/v/${bod.bodId}`}>
                                        <span
                                            class="actionIcon"
                                            style="color: crimson;"
                                        >
                                            <i class="ri-eye-2-line" />
                                        </span>
                                    </Link>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</main>

<!-- modals -->
<!-- bod check modal  -->
{#if showBodCheckModal}
    <BodCheck
        {authenticatedUser}
        on:cancel={() => {
            showBodCheckModal = false;
        }}
    />
{/if}

<!-- bod check modal  -->

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

<!-- modals -->

<style>
    .content {
        background: #fff;
        margin: 1em auto;
    }

    .titleBar {
        padding: 1em;
    }

    .contentBar {
        margin-top: 1em;
        overflow-x: auto;
        padding: 1em;
    }

    .actionIcon {
        font-size: large;
        color: green;
        font-weight: 600;
    }
</style>
