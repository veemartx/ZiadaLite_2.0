<script>
    // @ts-nocheck
    import Breadcrumbs from "../Breadcrumbs.svelte";
    import { Dexie, liveQuery } from "dexie";
    import { db } from "../../db/db";
    import { fade } from "svelte/transition";
    import { onMount } from "svelte";
    import axios from "axios";
    import { apiBaseUrl } from "../../config/config";
    import AuthToken from "../AuthToken.svelte";
    import { getPermittedTokens } from "../../scripts/js/methods";
    import Export from "../export/Export.svelte";
    import { navigate } from "svelte-navigator";

    let authTokens = [];

    let showAuthTokenModal = true;

    let authenticatedUser;

    let localDbStoreUsers = liveQuery(() =>
        db.users.where("position").notEqual("position").toArray()
    );

    let localDbStorePermissions = liveQuery(() => db.permissions.toArray());

    let currentPageUsers = [];

    const RESOURCE = "users";

    const ACTION = "view";

    let pageSize = 15;

    let currentPage = 1;

    let totalNumberOfPages = 1;

    let pages = [];

    let offset;

    $: {
        if ($localDbStoreUsers) {
            offset = (currentPage - 1) * pageSize;

            currentPageUsers = $localDbStoreUsers.slice(
                offset,
                offset + pageSize
            );
        }
    }

    // make pages
    $: {
        if ($localDbStoreUsers) {
            totalNumberOfPages = $localDbStoreUsers.length / pageSize + 1;

            for (let x = 1; x <= totalNumberOfPages; x++) {
                pages.push(x);
            }

            pages = pages;
        }
    }

    const AUTH_ERROR_MESSAGE =
        "Permission Denied: Action Not Allowed For This User.Check Allowed Permissions On Your Profile For More Details";

    let crumbs = {
        title: "Users",
        crumbs: [
            {
                name: "Home",
                url: "/",
            },
            {
                name: "Users",
                url: "/users",
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
    const authTokenSuccess = () => {
        showAuthTokenModal = false;

        // console.log(authenticatedUser);
    };

    const cancelAuthentication = () => {
        // showAuthTokenModal = false;
        if (confirm("Addition Authentication cannot be cancelled. Go back?")) {
            navigate(-1);
        }
    };

    onMount(() => {});
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="breadcrumbs">
                <Breadcrumbs {crumbs} />
            </div>

            <div class="contentContainer">
                <div class="titleBar">
                    <div class="title">Users</div>
                    <div class="action">
                        <div class="">
                            <button
                                class="ui mini blue basic icon button"
                                style="font-size: 12px;"
                            >
                                <i class="cog icon" />
                            </button>

                            <button
                                class="ui mini green  icon button"
                                style="font-size: 12px;"
                            >
                                <i class="plus icon" />
                            </button>
                        </div>

                        <div class="">
                            <Export />
                        </div>
                    </div>
                </div>

                <div class="" style="margin-top: 1em;overflow-x:auto;">
                    <table
                        class="ui very basic single line unstackable striped  table"
                    >
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Branch</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#if $localDbStoreUsers}
                                {#each currentPageUsers as u, i}
                                    <tr>
                                        <td>{i + 1 + offset}</td>
                                        <td>{u.name}</td>
                                        <td>{u.branch}</td>
                                        <td>{u.email}</td>
                                        <td>{u.phone}</td>
                                        <td>
                                            <button
                                                class="ui icon mini teal basic button"
                                            >
                                                <i class="eye icon" /> View
                                            </button>
                                        </td>
                                    </tr>
                                {/each}
                            {/if}
                        </tbody>
                    </table>
                </div>

                <br />
                <div class="">
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
    </div>
</main>

<!-- auth token modal  -->
{#if showAuthTokenModal}
    <AuthToken
        bind:authenticatedUser
        payload={authTokens}
        errorMessage={AUTH_ERROR_MESSAGE}
        on:success={authTokenSuccess}
        on:cancel={cancelAuthentication}
    />
{/if}

<!-- auth token modal  -->
<style>
    .contentContainer {
        background: #fff;
        padding: 1em;
        margin-bottom: 2em;
    }

    .title {
        flex: 1;
    }

    .action {
        flex: 1;
        display: flex;
        justify-content: right;
    }
</style>
