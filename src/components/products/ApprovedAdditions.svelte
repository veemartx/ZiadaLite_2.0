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
    import UploadApproved from "./UploadApproved.svelte";

    let showUploadAAsModal = false;

    let authTokens = [];

    let showAuthTokenModal = false;

    let authenticatedUser;

    const RESOURCE = "branch-orders";

    const ACTION = "check";

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
        title: "Approved Additions",
        crumbs: [
            {
                name: "Home",
                url: "/",
            },
            {
                name: "Approved Addition",
                url: "/approved-additions/",
            },
        ],
    };

    let approvedAdditions = [];

    const getOrders = async () => {
        let response = await axios({
            method: "get",
            url: apiBaseUrl + "getApprovedMonthyAdditions.php",
        });

        let res = response.data;

        // console.log(res);
        approvedAdditions = res;
    };

    const authTokenSuccess = () => {
        showAuthTokenModal = false;

        showUploadAAsModal = true;
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
                <div class="title">Approved Additions</div>
                <div class="action">
                    <button
                        on:click={() => {
                            showAuthTokenModal = true;
                        }}
                        class="ui icon mini teal basic button"
                    >
                        <i class="plus icon" /> New
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
                            <th>Approved</th>
                            <th>Init</th>
                            <th>Aprroved At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each approvedAdditions as aa, i}
                            <tr>
                                <td>{i + 1}</td>
                                <td>{aa.branch}</td>
                                <td>{aa.approved}</td>
                                <td>{aa.init}</td>
                                <td>{aa.approvedAt}</td>
                                <td>js</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</main>

<!-- modals -->
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

<!-- approved additions modal  -->
{#if showUploadAAsModal}
    <UploadApproved />
{/if}

<!-- approved additions modal  -->

<!-- modals -->

<style>
    .content {
        background: #fff;
        margin: 1em auto;
    }

    .titleBar {
        padding: 1em;
    }

    .title {
        color: var(--ziada-green);
        font-weight: 600;
    }

    .contentBar {
        margin-top: 1em;
        overflow-x: auto;
        padding: 1em;
    }

</style>
