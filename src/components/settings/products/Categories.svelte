<script>
    // @ts-nocheck

    import axios from "axios";
    import CreateCategory from "./CreateCategory.svelte";
    import { apiBaseUrl } from "../../../config/config";
    import { onMount } from "svelte";
    import { Link } from "svelte-navigator";
    import { formatDate } from "../../../scripts/js/methods";
    import { Confirm, Notify } from "notiflix";
    import AuthToken from "../../AuthToken.svelte";
    import { AUTH_ERROR_MESSAGE } from "../../../scripts/js/messages";
    import { liveQuery } from "dexie";
    import { db } from "../../../db/db";
    import { getPermittedTokens } from "../../../scripts/js/methods";

    Notify.init({
        ID: "MKA",
        timeout: 4000,
        showOnlyTheLastOne: true,
        cssAnimationStyle: "from-bottom",
        zindex: 1000000000,
    });

    // auth
    let authenticatedUser;

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
                $localDbStorePermissions
            );
        }
    }

    let showAuthTokenModal = false;

    const RESOURCE = "products";

    const ACTION = "delete";

    const AUTH_CANCEL_MESSAGE =
        "Addition Authentication Cannot Be Cancelled. Returning";

    let categories = [];

    let showCreateCategoryModal = false;

    let currentDeletionCategory;

    const authTokenSuccess = () => {
        showAuthTokenModal = false;

        deleteCategory();
        // console.log(authenticatedUser);
    };

    const cancelAuthentication = () => {
        showAuthTokenModal = false;
        navigate("/");
    };

    const showCreateCategory = () => {
        showCreateCategoryModal = true;
    };

    const hideCreateCategory = () => {
        showCreateCategoryModal = false;

        getCategories();
    };

    const getCategories = async () => {
        try {
            let response = await axios({
                method: "POST",
                url: `${apiBaseUrl}getCategories.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            categories = response.data;

            console.log(categories);
        } catch (err) {
            console.log(err);
        }
    };

    const deleteCategory = async (catgoryId) => {
        let dt = {
            id: currentDeletionCategory,
            init: authenticatedUser.uid,
        };

        // console.log(dt);

        try {
            const response = await axios({
                method: "POST",
                data: dt,
                url: `${apiBaseUrl}deleteCategory.php`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            const res = response.data;

            // console.log(res);
            if (res.success) {
                Notify.success(res.message);

                getCategories();
            } else {
                Notify.failure(res.message);
            }
        } catch (err) {
            console.log(err);
        }
    };

    onMount(() => {
        getCategories();
    });
</script>

<main>
    <div class="wrapper">
        <div class="titleBar">
            <div class="title">Categories</div>
            <div class="action">
                <button
                    on:click={showCreateCategory}
                    class="ui basic icon green mini button"
                >
                    <i class="plus icon" />
                </button>
            </div>
        </div>
        <br />
        <div class="contentBar">
            <table class="ui very basic striped unstackable table">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Category</th>
                        <th>Subcategories</th>
                        <th>Created</th>
                        <th>Created By</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {#each categories as ct, i}
                        <tr>
                            <td>{i + 1}</td>
                            <td>{ct.name}</td>
                            <td>{ct.subcategories}</td>
                            <td>{formatDate(ct.created)}</td>
                            <td>{ct.createdBy}</td>
                            <td>{ct.status}</td>
                            <td>

                                <!-- <span
                                    on:click={() => {
                                        Confirm.show(
                                            `Delete  Category`,
                                            `Delete ${ct.name}?`,
                                            "Ok",
                                            "Cancel",
                                            () => {
                                                currentDeletionCategory = ct.id;
                                                showAuthTokenModal = true;
                                            }
                                        );
                                    }}
                                    class="view"
                                >
                                    <i class="red trash icon" />
                                </span> -->

                                <Link to={"../category/ct/" + ct.id}>
                                    <span class="view">
                                        <i class="eye icon" />
                                    </span>
                                </Link>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</main>

<!-- createCategoryModal  -->
{#if showCreateCategoryModal}
    <CreateCategory on:cancel={hideCreateCategory} />
{/if}
<!-- createCategoryModal  -->

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
    .title {
        font-size: small;
    }

    .view {
        font-weight: 600;
        font-size: large;
        cursor: pointer;
    }
</style>
