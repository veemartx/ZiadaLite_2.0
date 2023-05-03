<script>
    // @ts-nocheck

    import { onMount } from "svelte";
    import { formatDate, getPermittedTokens, updateCrumbs } from "../../scripts/js/methods";
    import { liveQuery } from "dexie";
    import { db } from "../../db/db";
    import AuthToken from "../AuthToken.svelte";
    import { navigate } from "svelte-navigator";
    import axios from "axios";
    import { apiBaseUrl } from "../../config/config";

    let authTokens = [];

    let authenticatedUser;

    let recoveryProducts = [];

    let localDbStoreUsers = liveQuery(() => db.users.toArray());

    let localDbStorePermissions = liveQuery(() => db.permissions.toArray());

    const RESOURCE = "products";

    const ACTION = "view";

    let showAuthTokenModal = true;

    const AUTH_ERROR_MESSAGE =
        "Permission Denied: Action Not Allowed For This User.Check Allowed Permissions On Your Profile For More Details";

    const AUTH_CANCEL_MESSAGE =
        "Recovery Authentication Cannot Be Cancelled. Return";

    let ZL_LIU = window.localStorage.ZL_LIU;

    if (ZL_LIU) {
        ZL_LIU = JSON.parse(ZL_LIU);
    }

    let crumbs = {
        title: "Recover Additions",
        crumbs: [
            {
                name: "Home",
                url: "/",
            },
            {
                name: "Products",
                url: "/products/",
            },
            {
                name: "Recover",
                url: "/products/recover/",
            },
        ],
    };

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
    const getRecoveryProducts = async () => {
        let dt = {
            branch: ZL_LIU.b,
        };

        try {
            let response = await axios({
                method: "post",
                url: apiBaseUrl + "getRecoveryAdditionProducts.php",
                data: dt,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            let res = response.data;

            recoveryProducts = res;
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };

    const authTokenSuccess = () => {
        showAuthTokenModal = false;
        // console.log(authenticatedUser);
    };

    const cancelAuthentication = () => {
        showAuthTokenModal = false;
        navigate("/");
    };

    onMount(() => {
        updateCrumbs(crumbs);
        getRecoveryProducts();
    });
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="titleBar">
                <div class="title">Recover Additions</div>

                <div class="actions">.</div>
            </div>

            <div class="contentBar">
                <table
                    class="ui very basic unstackable single line striped table"
                >
                    <thead>
                        <tr>
                            <th> No </th>
                            <th> Name </th>
                            <th> Code </th>
                            <th> Qty </th>
                            <th> Pack Size </th>
                            <th> Missing </th>
                            <th> Added By </th>
                            <th> Added On </th>
                            <th> Action </th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each recoveryProducts as rp, i}
                            <tr>
                                <td>{i + 1}</td>
                                <td>{rp.name}</td>
                                <td>{rp.code}</td>
                                <td>{rp.qty}</td>
                                <td>{rp.packSize}</td>
                                <td style="color:crimson;font-weight:600;"
                                    >[{rp.missing}]</td
                                >
                                <td>{rp.addedBy}</td>
                                <td>{formatDate(rp.addedOn)}</td>
                                <td>
                                    <button
                                        class="ui basic orange edit mini icon button"
                                    >
                                        <i class="edit icon" /> Update
                                    </button>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</main>

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
    .content {
        background: #fff;
    }

    .titleBar {
        padding: 0.5em;
        /* border-bottom: 1px solid goldenrod; */
    }

    .title {
        color: var(--text-primary-light);
        font-weight: 600;
    }

    .contentBar {
        padding: 1em;
    }
</style>
