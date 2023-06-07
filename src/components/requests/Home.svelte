<script>
    // @ts-nocheck

    import { onMount } from "svelte";
    import { addCommas, updateCrumbs } from "../../scripts/js/methods";
    import { Link } from "svelte-navigator";
    import axios from "axios";
    import { apiBaseUrl } from "../../config/config";
    import { v4 } from "uuid";
    import { liveQuery } from "dexie";
    import { db } from "../../db/db";
    import { getPermittedTokens } from "../../scripts/js/methods";
    import AuthToken from "../AuthToken.svelte";

    // props

    // consts
    const RESOURCE = "branch-orders";

    const ACTION = "check";

    const AUTH_ERROR_MESSAGE =
        "Permission Denied: Action Not Allowed For This User.Check Allowed Permissions On Your Profile For More Details";

    const AUTH_CANCEL_MESSAGE = "Authentication Cancelled By User";

    const LIU = window.localStorage.ZL_LIU;

    // vars
    let showBodCheckModal = false;

    let authTokens = [];

    let showAuthTokenModal = false;

    let authenticatedUser;

    let liu;

    let localDbStoreUsers = liveQuery(() =>
        db.users.where("position").notEqual("position").toArray()
    );

    let localDbStorePermissions = liveQuery(() => db.permissions.toArray());

    let crumbs = {
        title: "Transfer Requests",
        crumbs: [
            {
                name: "Home",
                url: "/",
            },
            {
                name: "Transfer Requests",
                url: "/transfer-requests/",
            },
        ],
    };

    let transferRequests = [];

    // products we have requested from other branches
    let requestedProducts = [];

    // products that have been requested by other branches
    let requestingProducts = [];

    // states
    if (LIU) {
        liu = JSON.parse(LIU);
    }

    $: {
        if ($localDbStoreUsers && $localDbStorePermissions) {
            // get allowed tokens
            authTokens = getPermittedTokens(
                RESOURCE,
                ACTION,
                $localDbStoreUsers,
                $localDbStorePermissions
            );

            // console.log(authTokens);
        }
    }

    $: {
        if (transferRequests.length > 0) {
            let requested = transferRequests.filter((r) => {
                if (r.requestedBranch == liu.b) {
                    return r;
                }
            });
            requestedProducts = requested;

            //

            let requesting = transferRequests.filter((r) => {
                if (r.requestingBranch == liu.b) {
                    return r;
                }
            });
            requestingProducts = requesting;
        }
    }

    // methods
    const getTransferRequests = async () => {
        try {
            let response = await axios({
                method: "get",
                url: apiBaseUrl + "getTransferRequests.php",
            });

            let result = response.data;

            transferRequests = result;
        } catch (err) {
            console.log(err);
        }
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
        getTransferRequests();
    });
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="titleBar">
                <div class="title">Requests</div>
                <div class="action">
                    <button
                        on:click={() => {
                            showAuthTokenModal = true;
                        }}
                        class="ui icon mini teal basic button"
                    >
                        <i class="ri-git-pull-request-line" /> Request
                    </button>
                </div>
            </div>

            <div class="contentBar">
                <div class="requested">
                    <div class="sTitleBar">
                        <div class="subTitle">Requested</div>
                    </div>

                    <div class="tableContainer">
                        <table class="ui very basic striped unstackable table">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Product</th>
                                    <th>Qty</th>
                                    <th>Requested</th>
                                    <th>Status</th>
                                    <th
                                        >Actions <i
                                            style="color: purple;"
                                            class="ri-list-check-2"
                                        /></th
                                    >
                                </tr>
                            </thead>
                            <tbody>
                                {#each requestedProducts as tr, i}
                                    <tr>
                                        <td>{i + 1}</td>
                                        <td>{tr.productName}</td>
                                        <td>{tr.qty}</td>
                                        <td>{tr.requestedBranch}</td>

                                        <td
                                            ><span
                                                class={tr.status == "Done"
                                                    ? "done"
                                                    : "pending"}
                                                >{tr.status}</span
                                            >
                                        </td>
                                        <td>
                                            <Link to={`tr/${tr.id}`}>
                                                <i class="eye icon" /> View
                                            </Link>
                                        </td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="requesting">
                    <div class="sTitleBar">
                        <div class="subTitle">Requesting</div>
                    </div>

                    <div class="tableContainer">
                        <table class="ui very basic striped unstackable table">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Product</th>
                                    <th>Qty</th>
                                    <th>Requested</th>
                                    <th>Status</th>

                                    <th
                                        >Actions <i
                                            style="color: purple;"
                                            class="ri-list-check-2"
                                        /></th
                                    >
                                </tr>
                            </thead>
                            <tbody>
                                {#each requestingProducts as tr, i}
                                    <tr>
                                        <td>{i + 1}</td>
                                        <td>{tr.productName}</td>
                                        <td>{tr.qty}</td>
                                        <td>{tr.requestedBranch}</td>
                                        <td
                                            ><span
                                                class={tr.status == "Done"
                                                    ? "done"
                                                    : "pending"}
                                                >{tr.status}</span
                                            >
                                        </td>
                                        <td>
                                            <Link to={`tr/${tr.id}`}>
                                                <i class="eye icon" /> View
                                            </Link>
                                        </td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>
                </div>
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
        display: flex;
        justify-content: space-between;
        flex-direction: column;
    }

    table {
        font-size: small !important;
    }

    .requesting {
        margin-top: 2em;
    }

    .sTitleBar {
        border-bottom: 1px solid rgba(128, 128, 128, 0.438);
    }

    .subTitle {
        color: var(--text-primary-light);
        font-weight: 600;
    }

    .done {
        color: var(--ziada-green);
        font-weight: 600;
    }

    .pending {
        color: orangered;
        font-weight: 600;
    }
    @media only screen and (min-width: 640px) {
        .contentBar {
            flex-direction: row;
        }

        .requesting {
            margin-left: 0.4em;
            margin-top: 0;
        }
    }
</style>
