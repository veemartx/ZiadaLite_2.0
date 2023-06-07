<script>
    // @ts-nocheck

    import axios from "axios";
    import { onMount } from "svelte";
    import { Link } from "svelte-navigator";
    import { apiBaseUrl } from "../../config/config";
    import { getPermittedTokens, goBack } from "../../scripts/js/methods";
    import { liveQuery } from "dexie";
    import { db } from "../../db/db";
    import AuthToken from "../AuthToken.svelte";
    import { AUTH_ERROR_MESSAGE } from "../../scripts/js/messages";
    import UpdatePermission from "./UpdatePermission.svelte";

    // props
    export let crumbs;

    // consts
    const RESOURCE = "actions";

    const ACTION = "actions";

    const AUTH_CANCEL_MESSAGE = "Action Authentication Cancelled By User.";

    // vars

    let localDbStoreUsers = liveQuery(() => db.users.toArray());

    let localDbStorePermissions = liveQuery(() => db.permissions.toArray());

    let authTokens = [];

    let authenticatedUser;

    let showAuthTokenModal = false;

    let resources = [];

    let selectedResourceName;

    let selectedResource;

    let showUpdatePermissionModal = false;

    let actionToUpdate;

    // states
    $: {
        if (selectedResourceName) {
            let filteredResources = resources.filter((rs) => {
                if (rs.name == selectedResourceName) {
                    return rs;
                }
            });

            selectedResource = filteredResources[0];
        }
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
        }
    }
    // methods
    const getResources = async () => {
        let response = await axios.get(`${apiBaseUrl}getPermissions.php`);

        let res = response.data;

        resources = res;
    };

    const authTokenSuccess = () => {
        showAuthTokenModal = false;

        showUpdatePermissionModal = true;
        // console.log(authenticatedUser);
    };

    const cancelAuthentication = () => {
        showAuthTokenModal = false;
    };

    onMount(() => {
        crumbs = {
            title: "Permission Settings",
            crumbs: [
                {
                    name: "Home",
                    url: "/",
                },
                {
                    name: "Settings",
                    url: "/settings",
                },
                {
                    name: "Permissions Settings",
                    url: "/settings/permissions",
                },
            ],
        };

        getResources();

        // selectedResourceName = "products";
    });
</script>

<main>
    <div class="wrapper">
        <div class="content">
            <div class="titleBar">
                <div class="titleCol">
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div
                        class="backCol"
                        on:click={() => {
                            goBack();
                        }}
                    >
                        <div class="" style="padding-right:2px">
                            <i class="arrow left icon" />
                        </div>
                        <div class="">Back</div>
                    </div>

                    <div class="s-title">
                        <i class="cog icon" /> Permissions
                    </div>
                </div>
                <div class="actions">
                    <i class="ri-more-2-fill" />
                </div>
            </div>

            <div class="mainContainer">
                <div class="sideCol">
                    <form>
                        <div class="formInput">
                            <label for="resource">Select A Resource</label>
                            <select
                                name="resource"
                                id="resource"
                                bind:value={selectedResourceName}
                            >
                                <option value="">Select A Resource</option>
                                {#each resources as r}
                                    <option
                                        value={r.name}
                                        style="text-transform: capitalize;"
                                        >{r.name}</option
                                    >
                                {/each}
                            </select>
                        </div>
                    </form>
                </div>

                <br />

                {#if selectedResource}
                    <div class="mainCol">
                        <div class="titleBar">
                            <div class="title">
                                {#if selectedResourceName}
                                    {selectedResource.name}
                                {:else}
                                    Resource
                                {/if}
                            </div>

                            <div class="actions">
                                <button
                                    on:click={() => {
                                        showAuthTokenModal = true;
                                    }}
                                    class="ui basic purple mini icon button"
                                >
                                    <i class="plus icon" />
                                </button>
                            </div>
                        </div>

                        <div class="contentBar">
                            <div class="ss-title">Actions</div>
                            <div class="">
                                <table
                                    class="ui very basic striped unstackable table"
                                    style="text-transform: capitalize;"
                                >
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Allowed</th>
                                            <th>Confirmable</th>
                                            <th>Confirmers</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {#if selectedResource.actions}
                                            {#each selectedResource.actions as a}
                                                <tr>
                                                    <td>{a.name}</td>
                                                    <td>
                                                        <div class="">
                                                            {#each a.allowed as al}
                                                                {al},
                                                            {/each}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {#if a.confirmable}
                                                            <span
                                                                class="confirmable yes"
                                                            >
                                                                Yes
                                                            </span>
                                                        {:else}
                                                            <span
                                                                class="confirmable no"
                                                            >
                                                                No
                                                            </span>
                                                        {/if}
                                                    </td>

                                                    <td>
                                                        <div class="">
                                                            {#each a.allowedConfirmers as alc}
                                                                {alc},
                                                            {/each}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span class="aIcon">
                                                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                                                            <i
                                                                on:click={() => {
                                                                    actionToUpdate =
                                                                        a;

                                                                    showAuthTokenModal = true;
                                                                }}
                                                                class="edit orange icon"
                                                            />
                                                        </span>
                                                    </td>
                                                </tr>
                                            {/each}
                                        {/if}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                {/if}
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

<!-- create action modal -->
{#if showUpdatePermissionModal}
    <UpdatePermission
        resource={selectedResource}
        {authenticatedUser}
        {actionToUpdate}
        on:cancel={() => {
            showUpdatePermissionModal = false;
        }}
        on:close={() => {
            getResources();
            showUpdatePermissionModal = false;
        }}
    />
{/if}

<!-- create action modal -->

<style>
    .titleBar {
        padding: 0.5em;
        border-bottom: 1px solid rgba(166, 166, 166, 0.429);
    }
    .backCol {
        font-size: larger;
        color: crimson;
        font-weight: 600;
        display: flex;
        cursor: pointer;
    }

    .titleCol {
        display: flex;
        justify-content: space-between;
    }

    .s-title {
        font-size: larger;
        margin-left: 1em;
        font-weight: 500;
        color: var(--background-secondary);
    }

    .mainContainer {
        padding: 1em;
    }

    .title {
        text-transform: capitalize;
        color: var(--ziada-green);
        font-weight: 600;
    }

    .ss-title {
        font-weight: 600;
    }

    .contentBar {
        padding: 0.5em;
    }

    .aIcon {
        font-size: 20px;
        cursor: pointer;
    }

    .confirmable {
        font-weight: 600;
    }

    .yes {
        color: green;
    }

    .no {
        color: crimson;
    }
</style>
