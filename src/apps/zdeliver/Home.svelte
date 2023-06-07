<script>
    // @ts-nocheck

    import { onMount } from "svelte";
    import {
        addCommas,
        formatDate,
        updateCrumbs,
    } from "../../scripts/js/methods";
    import { Link } from "svelte-navigator";
    import axios from "axios";
    import { apiBaseUrl } from "../../config/config";
    import { v4 } from "uuid";
    import { liveQuery } from "dexie";
    import { db } from "../../db/db";
    import { getPermittedTokens } from "../../scripts/js/methods";
    import AuthToken from "../../components/AuthToken.svelte";
    import CreateDelivery from "./CreateDelivery.svelte";
    import Delivery from "./Delivery.svelte";

    let showCreateDeliveryModal = false;

    let showDeliveryModal = false;

    let authTokens = [];

    let showAuthTokenModal = false;

    let authenticatedUser;

    let selectedDelivery;

    const RESOURCE = "deliveries";

    const ACTION = "create";

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
        title: "ZDeliver <sup>&trade;<sup>",
        crumbs: [
            {
                name: "Home",
                url: "/",
            },
            {
                name: "Apps",
                url: "/apps/",
            },
            {
                name: "ZDeliver",
                url: "/apps/zconnect",
            },
        ],
    };

    let deliveries = [];

    const getDeliveries = async () => {
        let response = await axios({
            method: "get",
            url: apiBaseUrl + "getDeliveries.php",
        });

        let res = response.data;

        // console.log(res);
        deliveries = res;
    };

    const authTokenSuccess = () => {
        showAuthTokenModal = false;

        // show bodCheck modal
        showCreateDeliveryModal = true;
    };

    const cancelAuthentication = () => {
        showAuthTokenModal = false;
    };

    onMount(() => {
        updateCrumbs(crumbs);

        getDeliveries();
    });
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="titleBar">
                <div class="title">Deliveries</div>
                <div class="action">
                    <button
                        on:click={() => {
                            showAuthTokenModal = true;
                        }}
                        class="ui icon mini teal basic button"
                    >
                        <i class="plus icon" />Add
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
                            <th>Branch</th>
                            <th>Destination</th>
                            <th>Receipt</th>
                            <th>Products</th>
                            <th>Total Cost</th>
                            <th>Total Retail</th>
                            <th>Created By</th>
                            <th>Created At</th>
                            <th
                                >Actions <i
                                    style="color: purple;"
                                    class="ri-list-check-2"
                                /></th
                            >
                        </tr>
                    </thead>
                    <tbody>
                        {#each deliveries as d, i}
                            <tr>
                                <td>{i + 1}</td>
                                <td>{d.hostBranch}</td>
                                <td>{d.destination}</td>
                                <td>{d.receiptNumber}</td>
                                <td>{d.products.length}</td>
                                <td>{addCommas(d.totalCost, 2)}</td>
                                <td>{addCommas(d.totalRetail, 2)}</td>
                                <td>{d.createdBy}</td>
                                <td>{formatDate(d.createdAt)}</td>

                                <td>
                                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                                    <span
                                        on:click={() => {
                                            selectedDelivery = d;
                                            showDeliveryModal = true;
                                        }}
                                        class="actionIcon"
                                    >
                                        <i class="ri-eye-2-line" />
                                    </span>
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

<!-- create delivery modal -->
{#if showCreateDeliveryModal}
    <CreateDelivery
        {authenticatedUser}
        on:close={() => {
            showCreateDeliveryModal = false;
        }}
        on:success={() => {
            getDeliveries();
            showCreateDeliveryModal = false;
        }}
    />
{/if}

<!-- create delivery modal -->

<!-- delivery -->
{#if showDeliveryModal}
    <Delivery
        delivery={selectedDelivery}
        on:close={() => {
            showDeliveryModal = false;
        }}
    />
{/if}

<!-- delivery -->

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
        cursor: pointer;
    }
</style>
